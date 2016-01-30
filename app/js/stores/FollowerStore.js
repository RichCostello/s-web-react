var _state = {};

var followerStore = Flux.createStore({
 
  fetchFollower: function() {
    return _state["followersList"];
  },
  setFollower: function(follower) {
 
    _state['followersList'] = follower;
  },
}, function(payload){

  if(payload.actionType == "FETCH_FOLLOWER") {
    if(followerStore.fetchFollower() != undefined) {
      followerStore.emitChange();
    } else {
      followerStore.fetchFollower();
    }
  }

  if(payload.actionType == "LOAD_FOLLOWER") {
    
      var sessionTok = STStore.fetchToken();

      var obj = {
                meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "FOLLOWERS", requestedAt: "{{timestamp}}"},
                payload: { "username": payload.userID, "followerCount": 50, "followerOffset": 0 }
              }
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/followers', obj).then(function (response) {
                if(response.data.Success){

                    followerStore.setFollower(response.data.Payload);
                    followerStore.emitChange();

                }
                else{
                  console.log(response.data.Errors[0].Message);
                }
        }).catch(function (response) {
            console.log(response);
        });
    
  }

});

export default followerStore;