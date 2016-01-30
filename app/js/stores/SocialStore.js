var _state = {};
 
// _state["like"] = user;
// _state["dislike"] = user;
// _state["flag"] = user;
// _state["share"] = user;

var SocialStore = Flux.createStore({
 
  setFlag: function(postID){
    _state["flag"] = postID;
    SocialStore.emitChange();
  },
  getFlag: function(){
    return _state["flag"];
  },
  Like: function(postID,bool) {

       var sessionToken = STStore.fetchToken();   

        var obj =    {
        "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"LIKE"},
        "payload":{"postID": postID,"like":bool}
        }
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/like', obj).then(function (response) {
             SocialStore.emitChange(); 
        }).catch(function (response) {
          console.log(response);
        });

    // return _state["like"];
  },
  Dislike: function(postID,bool) {
        var sessionToken = STStore.fetchToken();   

        var obj =    {
        "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"DISLIKE"},
        "payload":{"postID": postID,"dislike":bool}
        }
        
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/dislike', obj).then(function (response) {
           SocialStore.emitChange();
        }).catch(function (response) {
          console.log(response);
        });
  },
  Flag: function(postID) {

    var sessionToken = STStore.fetchToken();   
    var postID = postID;

    var obj =    {
    "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"LIKE"},
    "payload":{"flagID": postID, "flagType": 1}
    }
    obj = JSON.stringify(obj);

    axios.post(APIAddress+'/flag', obj).then(function (response) {
        if(response.data.Success){
            SocialStore.setFlag(postID);
        }
        else{
          console.log(response);
        }

    }).catch(function (response) {
        console.log(response);
    });
  },
}, function(payload){

  if(payload.actionType == "LIKE") {
      SocialStore.Like(payload.postID,true);
  }
  if(payload.actionType == "UNLIKE") {
      SocialStore.Like(payload.postID,false);
  }
  if(payload.actionType == "DISLIKE") {
       SocialStore.Dislike(payload.postID,true);
  }
  if(payload.actionType == "UNDISLIKE") {
       SocialStore.Dislike(payload.postID,false);
  }
  if(payload.actionType == "FLAG") {
      SocialStore.Flag(payload.postID);
  }
  if(payload.actionType == "SHARE") {
      SocialStore.Share(payload.userID,payload.postID);
  }
});

export default SocialStore;