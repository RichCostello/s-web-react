var _state = {};


var subdomain = window.location.hostname.substring(0,window.location.hostname.indexOf('.'));

var tenantStore = Flux.createStore({
 
  fetchTenant: function() {
    return _state["tenant"];
  },
  setTenant: function(tenant) {
    _state['tenant'] = {};
    _state['tenant']['tenant'] = tenant;
    tenantStore.emitChange();
  },
  loadTenant: function(){
    if(subdomain != ''){

        var sessionTok = STStore.fetchToken();
        if(sessionTok == ''){
          sessionTok = document.cookie.substring(document.cookie.indexOf('sessionToken=')+13,document.cookie.indexOf('; expires'));
        }
        var obj = {
                  meta: {request: "TENANT", "sessionToken": sessionTok, "apiKey": APIKey},
                  payload: {"subdomain": subdomain}
            }
            obj = JSON.stringify(obj);

            axios.post(APIAddress+'/tenant', obj).then(function (response) {
                    // console.log(response);
                    if(response.data.Success){

                        console.log(response);
                        // var tenant = response.data.Payload;
                        tenantStore.setTenant(response.data.Payload);

                    }else{
                      tenantStore.setTenant('none');
                    }
            }).catch(function (response) {
                tenantStore.setTenant('none');
            });
    }else{
      tenantStore.setTenant('none');
    }

  },
  isPrivateLabelTenant: function(){
     
     var subdomain = window.location.hostname.substring(0,window.location.hostname.indexOf('.'));
     var tenant = "";

     try{
        tenant = tenantStore.fetchTenant().tenant;
     }
     catch(e){}

     if(subdomain != null && subdomain != "" && tenant != "none" && tenant != ""){
         return true;
     } 
     else{
       return false;
     }
 }

}, function(payload){

  if(payload.actionType == "FETCH_TENANT") {
    if(tenantStore.fetchTenant() != undefined) {
      tenantStore.emitChange();
    } else {
      tenantStore.fetchTenant();
    }
  }

  if(payload.actionType == "LOAD_TENANT") {
    tenantStore.loadTenant();
  }

});

export default tenantStore;