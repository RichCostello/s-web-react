var _state = [{}];

var commentsStore = Flux.createStore({
 
  fetchComments: function() {
    return _state["comments"];
  },
  setComments: function(comments) {
     _state['comments'] = {};
     _state['comments']['comments'] = comments;
  },
}, function(payload){

 if(payload.actionType == "SAVE_COMMENT"){

      var sessionTok = STStore.fetchToken();
      var pID = payload.postID;

      var obj = {
                meta: { "apiKey": APIKey, "sessionToken":sessionTok, request: "COMMENTS_CREATE", requestedAt: "{{timestamp}}"},
                payload: { "postID": payload.postID, "content": payload.comment }
              }
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/comments/create', obj).then(function (response) {
          if(response.data.Success){

             /* Reload the post so it can reload the comments */
             PostActions.loadPost(pID);
          }
          else{
            console.log("Comment Store Error");
            console.log(response.data.Errors[0].ErrMessage);
          }
      }).catch(function (response) {
          console.log(response);
          console.log("something went wrong saving the comment");
      });      
  }
  if(payload.actionType == "SET_COMMENT"){

      commentsStore.setComments(payload.comments);
      commentsStore.emitChange();

  }
});

export default commentsStore;