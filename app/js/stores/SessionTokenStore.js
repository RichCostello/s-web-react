var _state = {};
var cookiename = "sessionToken";
_state["sessionToken"] = "";

var STStore = Flux.createStore({
 
  fetchToken: function() {
    return _state["sessionToken"];
  },

  setToken: function(token) {
    _state["sessionToken"] = token;
  }, 

  getToken: function(){
    //console.log('getToken');
    var obj =    {
      "meta": { "apiKey":APIKey}
    }


    obj = JSON.stringify(obj);

    axios.post(APIAddress+'/session/new', obj).then(function (response) {

        if(response.data.Success){
            var Payload = response.data.Payload;
            STStore.createTokenCookie(Payload.Token);
        }else{
          console.log(response.data.Errors[0].Message);
        }
    }).catch(function (response) {
      console.log(response)
    });

  },

  exchangeToken(){
    var oldToken = document.cookie.substring(document.cookie.indexOf('sessionToken=')+13);
    if(oldToken.indexOf(';') != -1){
     oldToken = oldToken.substring(0,oldToken.indexOf(';'));
    }

    var obj =    {
      "meta": { "apiKey":APIKey, "sessionToken":oldToken},
      payload: {
        Token : oldToken
      }
    }


    obj = JSON.stringify(obj);

    axios.post(APIAddress+'/session/exchange', obj).then(function (response) {
          console.log(response);
        if(response.data.Success){
            var Payload = response.data.Payload;
            STStore.createTokenCookie(Payload.Token);
  
          
        }else{
          console.log("Session Token exchange Store Error");
          STStore.getToken();
          console.log(response);
          console.log(response.data.Errors[0]);
        }
    }).catch(function (response) {
      console.log(response);
        STStore.getToken();
      console.log('Something went wrong exchanging the session Token');
    });
  },

  isTokenExpired: function(){

    var days,date, expires,now;
    var cname = "expires";
    var name = cname + "=";
    var ca = document.cookie.split(';');
    

    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0){
          
          date = new Date();
          date.setTime(date.getTime());
          now = date.toGMTString();

          expires = new Date(c.substring(name.length,c.length));      

          if(now > expires){
            return "expired";
          }
          else{
            return "";
          }
          
        } 
    }
    return "";

  },

  createTokenCookie: function(value) {
    
    var days,date, expires,expireDate;
    
    days = 1;

    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expireDate = date.toGMTString();
        expires = ";expires="+expireDate;
    } else {
        expires = "";
        expireDate = "";
    }

    document.cookie = cookiename+"="+value+expires+";path=/";
    document.cookie = "expires="+expireDate+";path=/";

    STStore.setToken(value);
    STStore.emitChange();

                TenantActions.loadTenant();
                CurrentUserActions.checkLoginStatus(); 
  },
  
  getTokenCookie: function(cname) {
    var name = ""+cname + "=";
    var ca = document.cookie.split(';');

    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  } ,
  
  deleteTokenCookie: function(){
    document.cookie = cookiename + '=;expires=Thu, 05 Oct 1990 00:00:01 GMT;';
  }
 

}, function(payload){
  
  /* Delete cookie for testing purposes */
  // STStore.deleteTokenCookie();

  if(payload.actionType == "LOAD_TOKEN") {
    
    if(STStore.getTokenCookie(cookiename) != undefined && STStore.getTokenCookie(cookiename) != "") {

      /* If the cookie exists we can setToken so that we can fetch it from there for any of the API calls. */
      if(STStore.isTokenExpired(cookiename) == "expired"){     
         STStore.exchangeToken();
      }
      else{
        STStore.setToken(STStore.getTokenCookie(cookiename));
         STStore.emitChange();
                        TenantActions.loadTenant();
                CurrentUserActions.checkLoginStatus(payload.callback); 
      }
      
    } 
    else {
      /* If the cookie does not exist, then get a new token and create the new cookie */
      STStore.getToken();
    }
  }

  if(payload.actionType == "EXCHANGE_TOKEN"){
    STStore.exchangeToken(payload.callback);
  }
  
  if(payload.actionType == "UPDATE_TOKEN"){
      
      /* Get the current Token and set the token with the new expiration date */
      var token = STStore.fetchToken();
      createTokenCookie(token);

  }

  if(payload.actionType == "FETCH_TOKEN"){
    return STStore.fetchToken();
  }

});

export default STStore;