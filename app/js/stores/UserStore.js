var _state = {};
 
_state["user"] = {};

var UserStore = Flux.createStore({
 
  fetchUser: function() {
    return _state["user"];
  },

  setUser: function(user) {
    _state["user"] = [];
    _state["user"]['User'] = user;
  },

  loadUser: function(username,count,offset, stationCount,stationOffset, lazy){
    // console.log(payload.username);
      var sessionTok = STStore.fetchToken();

      var obj = {
              meta: { "apiKey": APIKey, "sessionToken": sessionTok, request: "PROFILE", requestedAt: "{{timestamp}}"},
              payload: { "username": username, "postsCount": count, "postsOffset": offset, "stationCount": stationCount, "stationOffset": stationOffset }
      }
      

      obj = JSON.stringify(obj);
     
      axios.post(APIAddress+'/profile', obj).then(function (response) {
                if(response.data.Success){

                  if(lazy==true){
                         //here we are checking if the lazy loader is loading posts or stations
                        if(stationOffset > 0){
                           var lsobj = ListeningStore.fetchListening('listeningList');
                            lsobj.push.apply(lsobj,response.data.Payload.Stations);
                            ListeningStore.setProfileListening('listeningList',lsobj);
                        }else{
                            PostOffice.appendPosts('profileposts',response.data.Payload.Posts);
                            _state['user']['User'].HasMorePosts = response.data.Payload.HasMorePosts;
                            if(response.data.Payload.HasMorePosts == false){
                              UserStore.emitChange();
                            }
                        }
                  }
                  if(lazy==false){
                    var extendUser = response.data.Payload.Profile;
                    extendUser['TotalPosts'] =  response.data.Payload.TotalPosts;
                    extendUser['TotalStations'] =  response.data.Payload.TotalStations;
                    extendUser['HasMorePosts'] =  response.data.Payload.HasMorePosts;
                    UserStore.setUser(extendUser);
                    ListeningStore.setProfileListening('listeningList', response.data.Payload.Stations);
                    PostOffice.setPosts('profileposts',response.data.Payload.Posts);
                    UserStore.emitChange();
                    FetchingUser=false;
                  }

              }else{

                 if(response.data.Errors[0].Code == 400){
                   UserStore.setUser('404');
                   UserStore.emitChange();
                  }    
              }
      }).catch(function (response) {
        console.log(response);
      });
  }
}, function(payload){
  if(payload.actionType == "FETCH_USER") {
    if(UserStore.fetchUser() != undefined) {
      UserStore.emitChange();
    } else {
      UserActions.loadUser();
    }
  }
  if(payload.actionType == "LOAD_USER") {
    
    UserStore.loadUser(payload.username,payload.count,payload.offset, payload.stationCount, payload.stationOffset, payload.lazy);


  }
});

export default UserStore;



