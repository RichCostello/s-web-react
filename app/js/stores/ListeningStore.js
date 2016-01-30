var _state = {}; 

var ListeningStore = Flux.createStore({
  
  fetchListening: function() {
    return _state["listeningList"];
  },
  setProfileListening: function(str,listeningObj) {
    _state[str] = {};
    _state[str][str] = listeningObj;
    ListeningStore.emitChange();
  },
  listen: function(stationID,lfrom){

      var sessionTok = STStore.fetchToken();
      var obj = {
                meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "LISTEN", requestedAt: "{{timestamp}}"},
                payload: { "stationID": stationID, "listen": true }
              }
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/listen', obj).then(function (response) {
                if(response.data.Success){
                   CurrentUserActions.loadCurrentUser();
                }
                else{
                  console.log(response.data.Errors[0].Message);
                }
        }).catch(function (response) {
            console.log(response);
        });
  },
  unlisten: function(stationID,lfrom){

        var sessionTok = STStore.fetchToken();
    
        var obj = {
                meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "UNLISTEN", requestedAt: "{{timestamp}}"},
                payload: { "stationID": stationID, "unlisten": true }
              }
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/unlisten', obj).then(function (response) {
                if(response.data.Success){

                   CurrentUserActions.loadCurrentUser();                   
                }
                else{
                  console.log(response.data.Errors[0].Message);
                }
        }).catch(function (response) {
            console.log(response);
        });
  }
}, function(payload){

  if(payload.actionType == "FETCH_LISTENING") {
    if(listeningStore.fetchListening() != undefined) {
      ListeningStore.emitChange();
    } else {
      ListeningStore.fetchListening();
    }
  }
  if(payload.actionType == "LISTEN"){
    ListeningStore.listen(payload.stationID,payload.lfrom);

  }
  if(payload.actionType == "UNLISTEN"){
      ListeningStore.unlisten(payload.stationID,payload.lfrom);
  }
  if(payload.actionType == "SET_LISTENING"){
      ListeningStore.setListening('listeningList', payload.stations);
  }

});

export default ListeningStore;