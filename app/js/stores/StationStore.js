var _state = {}; 

 
_state["station"] = station; 
_state["AllStations"] = allStations;
_state["tenantStations"] = tenantStations;

var station;
var allStations;
var tenantStations;

var sStore = Flux.createStore({

   setStation: function(str,stationObj) {
    _state[str] = {};
    _state[str][str] = stationObj;
     sStore.emitChange();

  },
  fetchStation: function() {
    return _state["station"];
  },
  fetchAllStations: function(){
    return _state["allStations"];
  },
  loadStation: function(stationName,count,offset,lazy){
       var sessionToken = STStore.fetchToken();
    
       var obj =    {
          "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"STATIONS"},
          "payload":{"stationName":stationName,"postsCount":count,"postsOffset":offset}
          }
          obj = JSON.stringify(obj);
          axios.post(APIAddress+'/station', obj).then(function (response) {
              if(response.data.Success){           
                
                if(lazy == true){
                  _state["station"].station.Posts.push.apply(_state["station"].station.Posts,response.data.Payload.Posts);
                   sStore.emitChange();
                  stationloading = false;
                }
                if(lazy==false){
                    var stationObj = response.data.Payload.Station;
                    stationObj['Posts'] = response.data.Payload.Posts;
                    sStore.setStation('station',stationObj);
                  reloadingStation = false;
                }
                
               
                
              }else{

                if(response.data.Errors[0].Code == 404){
                   sStore.setStation('station','404');
                }              
              }
              
      }).catch(function (response) {
          console.log(response);
          sStore.setStation('station','404');
      });
  },
  loadAllStations: function(subdomain,filter,count,offset,lazy){
        var sessionToken = STStore.fetchToken();

        var obj =    {
          "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"STATIONS"},
          "payload":{ "stationOffset":offset,"stationCount":count,"postCount":0}
          }
          obj = JSON.stringify(obj);
        axios.post(APIAddress+'/stations_web', obj).then(function (response) {
              if(response.data.Success){


                if(lazy == true){
                  _state["allStations"]["allStations"].push.apply(_state["allStations"]["allStations"],response.data.Payload.Stations);
                  sStore.emitChange();
                  allstationsloading = false;
                }
                if(lazy == false){
                  allStations=response.data.Payload.Stations;
                  sStore.setStation('allStations',allStations); 
                }    
                
              }else{
                console.log(response.data.Errors[0].Message);
              }
      }).catch(function (response) {
          console.log(response);
      });
  }


//closes flux create store
}, function(payload){
  if(payload.actionType == "FETCH_STATION") {
    if(sStore.fetchStation() != undefined) {
      sStore.emitChange();
    } else {
      sStore.fetchStation();
    }    
  }
  if(payload.actionType == "FETCH_ALLSTATIONS") {
    if(sStore.fetchAllStations() != undefined) {
      sStore.emitChange();
    } else {
      sStore.fetchAllStations();
    }
  }
  if(payload.actionType == "LOAD_STATION") {      
      sStore.loadStation(payload.stationName,payload.postnum,payload.offset,payload.lazy);
  }
  if(payload.actionType == "LOAD_ALLSTATIONS") {
      sStore.loadAllStations(payload.subdomain,payload.filter,payload.count,payload.offset,payload.lazy);
  }

});
export default sStore;




