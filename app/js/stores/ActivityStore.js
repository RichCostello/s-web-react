var _state = {};

var activityStore = Flux.createStore({
 
  fetchActivities() {
    return _state["activityItem"];
  },

  setActivities(activities) {
    _state["activityItem"] = activities;
     activityStore.emitChange();
  }

//closes flux create store
}, function(payload){
  if(payload.actionType == "FETCH_ACTIVITIES") {
    if(activityStore.fetchActivities() != undefined) {
      activityStore.emitChange();
    } else {
      ActivityActions.loadActivities();
    }
  }

  if(payload.actionType == "LOAD_ACTIVITIES") {   

    var sessionTok = STStore.fetchToken();

    var obj = {
          "meta": {"apiKey":APIKey,"sessionToken":sessionTok,"requestedAt":"{{timestamp}}","request":"ACTIVITY"},
          "payload":{ "activityCount":200,"activityOffset":0}
    }
    obj = JSON.stringify(obj);
   
    axios.post(APIAddress+'/activity', obj).then(function (response) {
      
            if(response.data.Success){
              activityStore.setActivities(response.data.Payload);
             
            }
            else{
              console.log(response.data.Errors[0].Message)
            }
    }).catch(function (response) {
        console.log(response);
        console.log('something went wrong with the activities');
    }); 
  }
});

export default activityStore;