var _state = {};
var post;
 
var postOffice = Flux.createStore({
  setPosts(str,postObj) {

     _state[str] = {};
    _state[str][str] = postObj;
    postOffice.emitChange();

  },
  appendPosts(str,postObj){
      /*
      Generally we appending in the same store, this is not the case with profileposts
      str in this case is profileposts
      */
      _state[str][str].push.apply(_state[str][str],postObj);
      postOffice.emitChange();
      profilepostsloading = false;
  },
  fetchPost() {
    return _state["post"];
  },
  fetchMyPosts() {
    return _state["myposts"];
  },
  fetchProfilePosts() {
    return _state["profileposts"];
  },
  fetchStationPosts() {
    return _state["stationposts"];
  },
  fetchFeed() {
    return _state["feed"];
  },
  loadPost: function(postid,commentcount,offset) {
    var sessionTok = STStore.fetchToken();
    var obj = {
              meta: {request: "POST", "sessionToken": sessionTok, "apiKey": APIKey},
              payload: {"postID": postid, "commentCount": commentcount, "commentOffset": offset}
        }
    obj = JSON.stringify(obj);

   axios.post(APIAddress+'/post', obj).then(function (response) {

                 if(response.data.Success){
                  post=response.data.Payload.Post;
                  post['user']=response.data.Payload.User;
                    postOffice.setPosts('post',post);
                    $('#pagehead').append('<meta property="og:image" content="/images/splash_screen_logo.png" />');
                    CommentActions.setComments(response.data.Payload.Comments);
                }else{
                    console.log(response.data.Errors[0].Message);
                }

    }).catch(function (response) {
          console.log('somethings went wrong loading single post.');
          console.log(response);
    });
  },
  loadStationPosts: function(postcount,offset) {
    var sessionToken = STStore.fetchToken();
    var obj = {
                meta: { "apiKey": APIKey, "sessionToken": sessionToken, request: "FEED", requestedAt: "{{timestamp}}"},
                payload: { "postCount": postcount, "postOffset": offset }
              }
        obj = JSON.stringify(obj);

        axios.post(APIAddress+'/feed', obj).then(function (response) {
                if(response.data.Success){
                    postOffice.setPosts('stationposts',response.data.Payload.Posts)
                }else{
                  console.log(response.data.Errors[0].ErrMessage);
                }
        }).catch(function (response) {
          console.log('somethings went wrong while loading stationposts');
          stationPostStore.setPosts('stationposts',stationposts);
        });
  },
  loadFeed: function(postcount,offset,lazy) {
    var sessionToken = STStore.fetchToken();
    if(sessionToken != ''){
            // console.log(sessionToken);
            var obj = {
                        meta: { "apiKey": APIKey, "sessionToken":sessionToken, request: "FEED", requestedAt: "{{timestamp}}"},
                        payload: { "postCount": postcount, "postOffset": offset }
                      }
            obj = JSON.stringify(obj);

            axios.post(APIAddress+'/feed', obj).then(function (response) {
                        if(response.data.Success){
                           if(lazy == true){
                            _state["feed"]["feed"].push.apply(_state["feed"]["feed"],response.data.Payload.Posts);
                            postOffice.emitChange();
                            feedloading = false;
                           }
                           if(lazy == false){
                           postOffice.setPosts('feed',response.data.Payload.Posts);
                           }
                        }else{
                          console.log(response.data.Errors[0].ErrMessage);
                        }

            }).catch(function (response) {
                  console.log('somethings went wrong while loading feed');
                  console.log(response);
            });
    }else{
      window.setTimeout(function(){
        PostActions.loadFeed(50,0);
      },10);
    }
  },
  createPost: function(station,name,desc,callback){
      var sessionToken = STStore.fetchToken();
      var obj = {
              meta: { "apiKey": APIKey, "sessionToken":sessionToken, request: "POST_CREATE", requestedAt: "{{timestamp}}"},
              payload: { "stationID": station, "title": name, "description": desc, "mediaType": 1 }
            }
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/post/create', obj).then(function (response) {
             
                  callback(response);
       
         
      }).catch(function (response) {
        
        console.log(response);
        console.log('somethings went wrong creating the post');
        
      });
  },
  deletePost: function(postID){

      var sessionToken = STStore.fetchToken();
      var obj = {
              meta: { "apiKey": APIKey, "sessionToken":sessionToken, request: "POST_CREATE", requestedAt: "{{timestamp}}"},
              payload: { "postID": postID }
            }
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/post/delete', obj).then(function (response) {
             
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
  if(payload.actionType == "FETCH_POST") {
    if(postOffice.fetchPost() != undefined) {
      postOffice.emitChange();
    } else {
      PostActions.loadPost();
    }
  }
  if(payload.actionType == "FETCH_MYPOSTS") {
    if(postOffice.fetchMyPosts() != undefined) {
      postOffice.emitChange();
    } else {
      PostActions.loadMyPosts();
    }
  }

  if(payload.actionType == "FETCH_PROFILEPOSTS") {
    if(postOffice.fetchPagePosts() != undefined) {
      postOffice.emitChange();
    } else {
      PostActions.loadProfilePosts();
    }
  }

  if(payload.actionType == "FETCH_STATIONPOSTS") {
    if(postOffice.fetchStationPosts() != undefined) {
      postOffice.emitChange();
    } else {
      PostActions.fetchStationPosts();
    }
  }

  if(payload.actionType == "FETCH_FEED") {
    if(postOffice.fetchFeed() != undefined) {
      postOffice.emitChange();
    } else {
      PostActions.fetchFeed();
    }
  }

  if(payload.actionType == "LOAD_POST") {
      postOffice.loadPost(payload.postid,payload.commentcount,payload.offset);  
  }
  if(payload.actionType == "DELETE_POST"){
      postOffice.deletePost(payload.postID);      
  }

  if(payload.actionType == "LOAD_MYPOSTS") {
      // postOffice.loadMyPosts(payload.postcount,payload.offset);  
  }

  if(payload.actionType == "LOAD_PAGEPOSTS") {
      postOffice.loadPagePosts(payload.postcount,payload.offset);
  }

  if(payload.actionType == "LOAD_STATIONPOSTS") {
      postOffice.loadStationPosts(payload.postcount,payload.offset);  
  }

  if(payload.actionType == "LOAD_FEED") {
      postOffice.loadFeed(payload.postcount,payload.offset,payload.lazy);  
  }

  if(payload.actionType == "LAZY_LOAD") {
      postOffice.lazyLoad(payload.load);  
  }

  if(payload.actionType == "CREATE_POST"){
      postOffice.createPost();
  }

}); 

export default postOffice;





