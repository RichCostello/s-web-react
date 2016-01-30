var _state = {};

var followingStore = Flux.createStore({
 
  fetchFollowing: function() {
    return _state["followingList"];
  },
  setFollowing: function(following) {
    _state['followingList'] = {}
    _state['followingList']['followingList'] = following;
    followingStore.emitChange();
  },
}, function(payload){

  if(payload.actionType == "FETCH_FOLLOWING") {
      followingStore.fetchFollowing();
  }

  if(payload.actionType == "LOAD_FOLLOWING") {
      var sessionTok = STStore.fetchToken();

      var obj = {
                meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "FOLLOWING", requestedAt: "{{timestamp}}"},
                payload: { "username": payload.userID, "followingCount": 50, "followingOffset": 0 }
              }
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/following', obj).then(function (response) {
                if(response.data.Success){
                    followingStore.setFollowing(response.data.Payload.Following);
                }
                else{
                  console.log(response.data.Errors[0].Message);
                }
        }).catch(function (response) {
            console.log(response);
        });
    
  }
  if(payload.actionType == "FOLLOW_USER"){

      var sessionTok = STStore.fetchToken();
      var userID = payload.userID;


      var obj = {
              meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "FOLLOW", requestedAt: "{{timestamp}}"},
              payload: { "userID": payload.userID }
            }
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/user/follow', obj).then(function (response) {
          if(response.data.Success){
              CurrentUserActions.loadCurrentUser();
              console.log(response);
          }
          else{
            console.log(response.data.Errors[0].Message);
          }
      }).catch(function (response) {
        console.log(response);
      });


  }
  if(payload.actionType == "UNFOLLOW_USER"){

      var sessionTok = STStore.fetchToken();
      var userID = payload.userID;

      var obj = {
              meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "UNFOLLOW", requestedAt: "{{timestamp}}"},
              payload: { "userID": payload.userID }
            }
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/user/unfollow', obj).then(function (response) {
          if(response.data.Success){
             CurrentUserActions.loadCurrentUser();
          }
          else{
            console.log(response);
            console.log(response.data.Errors[0].Message);
          }
      }).catch(function (response) {
          console.log(response);
      });

  }

});
export default followingStore;