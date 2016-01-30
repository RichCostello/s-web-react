

import CurrentUserActions from '../actions/CurrentUserActions';
import STAction from '../actions/SessionTokenActions';

var _state = {};
var tokenExchange = false;
var validationCode = false;
var passwordUpdate = false;
  
var currentUserStore = Flux.createStore({
  fetchCurrentUser: function() {
    return _state["currentUser"];
  },
  fetchUserSettings: function() {
    return _state["userSettings"];
  },
  fetchUploadAvatarID: function() {
    return _state["uploadAvatarID"];
  },
  fetchUploadCoverID: function() {
    return _state["uploadCoverID"];
  },
  setValidationCode: function(val){
    validationCode = val;
  },
  getValidationCode: function(){
    return validationCode;    
  },
  setPasswordUpdate: function(val){
    passwordUpdate = val;
  },
  getPasswordUpdate: function(){
    return passwordUpdate;    
  },
  setCurrentUser: function(currentUser) {
    _state["currentUser"] = currentUser;
    CurrentUserStore.emitChange();
  },
  loadCurrentUser(userID){


      if(!userID){
        userID=document.cookie.substring(document.cookie.indexOf("userID=")+7);
        if(userID.indexOf(';') != -1 ){userID=userID.substring(0,userID.indexOf(';'))}
      }

        if(STStore.fetchToken()){
          var sessionToken = STStore.fetchToken();
        }else{

          sessionToken = document.cookie.substring(document.cookie.indexOf('sessionToken=')+13);
          sessionToken = sessionToken.substring(0, sessionToken.indexOf(';'));

        }


      var obj = {
               meta : {request: "PROFILE", "apiKey":APIKey, "sessionToken":sessionToken, "requestedAt":"{{timestamp}}"},
                payload: { "userID": userID, "postsCount": 6, "postsOffset": 0, "stationsCount": 10, "stationsOffset": 0 }
      };
      
      obj = JSON.stringify(obj);


      axios.post(APIAddress+'/profile', obj).then(function (response) { 

          if(response.data.Success){
            // console.log(response);
              currentUser.userInfo = response.data.Payload;
              currentUser.TotalPosts =  response.data.Payload.TotalPosts;
              currentUser.TotalStations =  response.data.Payload.TotalStations;

              currentUserStore.setCurrentUser(currentUser);
              SidebarListeningStore.setSidebarListening('userListening', response.data.Payload.Stations);
              PostOffice.setPosts('myposts',response.data.Payload.Posts);
              CurrentUserActions.loadUserSettings();

            
          }
          else{
            console.log(response);
            console.log(response.data.Errors[0].Message);
          }
      
      }).catch(function (response) {
        console.log('something went wrong loading the current user profile');
        console.log(response);
      });

  },

  loadUserSettings: function(){

    var sessionToken = STStore.fetchToken();

    var obj = { "meta": {"apiKey": APIKey,"sessionToken": sessionToken,"request": "SETTINGS","requestedAt": "{{timestamp}}"},
                "payload": {}}
      
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/settings', obj).then(function (response) { 
        // console.log('userSettings');
        //   console.log(response);
          if(response.data.Success){

             _state["userSettings"]=response.data.Payload;
              currentUserStore.emitChange();

            
          }
          else{
            //Not authorized for this action
          }
      
      }).catch(function (response) {
        console.log('something went wrong loading the current user profile');
        console.log(response);
      });
  },
  loginUser(username, password){
      
      var sessionToken = STStore.fetchToken();   

       var obj =    {
        "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"LOGIN_NATIVE"},
        "payload":{"username": username,"password":password}
        }


      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/login', obj).then(function (response) {
              if(response.data.Success){
                currentUser.isLoggedIn = true;
                currentUser.id = response.data.Payload.UserID;
                currentUserStore.saveUserToCookie(currentUser);
                // currentUserStore.setUser(currentUser);
                
                CurrentUserActions.loadCurrentUser(currentUser.id);
                 
            
              }else{
                document.getElementById('error_message').style.display = "block";
                document.getElementById('error_text').innerHTML = response.data.Errors[0].Message;
              }
      }).catch(function (response) {
          console.log(response);
         document.getElementById('error_message').style.display = "block";
         document.getElementById('error_text').innerHTML = "API Login Issue";
      });
  },
  loginFB(token,expiry,callback){
      var sessionToken = STStore.fetchToken();
      var d = Math.floor(Date.now() / 1000);
      var expiresAt = d+expiry;
      var obj = {
        meta : {
          request: "AUTH_FACEBOOK",
          "apiKey":APIKey,
          "sessionToken":sessionToken,
          "requestedAt": d
        },
        payload: {
          facebookToken: token,
          expiresAt  : expiresAt
        }
      };
      
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/auth/facebook', obj).then(function (response) { 
         
          if(response.data.Success){
                currentUser.isLoggedIn = true;
                currentUser.id = response.data.Payload.UserID;
                currentUserStore.saveUserToCookie(currentUser);
                // currentUserStore.setUser(currentUser);
                CurrentUserActions.loadCurrentUser(currentUser.id);
                 
          }
          else{

            if(response.data.Errors[0].Message == "Error User not registered"){
              callback(response);
            }else{
            console.log('Facebook API login issue');
            console.log(response);
             $('.fixedModal').css('display','block');
            ModalActions.setContent(<NoFBmodal key="0" />);
            }
  
          }


      }).catch(function (response) {
        console.log('somethings amiss');
        console.log(response);
      });
  },
  LinkFB(token,expiry){
      var sessionToken = STStore.fetchToken();
      var d = Math.floor(Date.now() / 1000);
      var expiresAt = d+expiry;
      var obj = { "meta": { "apiKey": APIKey, "sessionToken": sessionToken, "request": "SEND_VERIFICATION", "requestedAt": d },
                  "payload": { "facebookToken": token, "expiresAt" : expiresAt}
                }
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/user/link/facebook', obj).then(function (response) { 
         

                  callback(response);

      
      }).catch(function (response) {
        console.log('somethings amiss');
        console.log(response);
      });


  },
  loginGoogle(token,expiry){
    console.log(token);
    console.log(expiry);
      var sessionToken = STStore.fetchToken();
      var obj = {
        meta : {
          request: "AUTH_GOOGLE",
          "apiKey":APIKey,
          "sessionToken":sessionToken,
          "requestedAt": '{{timestamp}}'
        },
        payload: {
          googleAuthToken: token,
          "expiresAt" : expiry
        }
      };
      
      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/auth/google', obj).then(function (response) { 
         
          if(response.data.Success){
                currentUser.isLoggedIn = true;
                currentUser.id = response.data.Payload.UserID;
                currentUserStore.saveUserToCookie(currentUser);
                // currentUserStore.setUser(currentUser);
                
                CurrentUserActions.loadCurrentUser(currentUser.id);
           }
          else{
           console.log(response.data.Errors[0].ErrMessage);
            console.log(response);
          }
      
      }).catch(function (response) {
        console.log('somethings amiss');
        console.log(response);
      });
  },
  linkGoogle(token,expiry,callback){
    console.log(token);
    console.log(expiry);
   var sessionToken = STStore.fetchToken();
   var d = Math.floor(Date.now() / 1000);
   var obj = {"meta": {"apiKey": APIKey,"sessionToken": sessionToken, "request": "SEND_VERIFICATION", "requestedAt": d},"payload": {"googleAuthToken": token,"expiresAt" : expiry}}
   obj = JSON.stringify(obj);

         axios.post(APIAddress+'/user/link/google', obj).then(function (response) {

             callback(response);

      }).catch(function (response) {
               console.log('link gp api error');
               console.log(response);
      });

  },
  loginTwit(){
      var sessionToken = STStore.fetchToken();
      var d = Math.floor(Date.now() / 1000);
      var obj = {
                    "meta": {
                    "apiKey":APIKey,
                    "sessionToken":sessionToken,
                    "requestedAt":d,
                    "request":"AUTH_TWITTER"
                    }
                };
      
      obj = JSON.stringify(obj);

      // $.ajax({
      //       url: 'anton.dev.api.stationlocal.com/auth/twitter/getAuthLink',
      //       data : obj,
      //       processData: false,
      //       contentType: false,
      //       type: 'POST',
      //         success: function(data){
      //               console.log(data);
      //         },// end success
      //         fail: function(data){
      //           console.log(data);
      //         }

      // });//end ajax

      axios.post('anton.dev.api.stationlocal.com/auth/twitter/getAuthLink', obj).then(function (response) { 
          
          if(response.data.Success){
            console.log(response);
          }
          else{
            console.log(response);
          }
      
      }).catch(function (response) {
        console.log('somethings amiss twitter get auth link');
        console.log(response);
      });
  },
  linkTwitter(token,callback){
    var d = Math.floor(Date.now() / 1000);
    
        if(STStore.fetchToken()){
          var sessionToken = STStore.fetchToken();
        }else{

          sessionToken = document.cookie.substring(document.cookie.indexOf('sessionToken=')+13);
          sessionToken = sessionToken.substring(0, sessionToken.indexOf(';'));

        }

    var  oauth_token = token.substring(12,token.indexOf('&'));
    var  oauth_verifier = token.substring(token.indexOf('&oauth_verifier=')+16);

    var obj = {"meta": { "apiKey": APIKey, "sessionToken": sessionToken, "request": "SEND_VERIFICATION", "requestedAt": d }, "payload": { "twitterToken": oauth_token, "twitterVerifier": oauth_verifier } }

    obj = JSON.stringify(obj);

    axios.post(APIAddress+'/user/link/twitter', obj).then(function (response) {

            callback(response)

    }).catch(function (response) {
        console.log("linkTwitter API issue");
    });

  },
  signup(email, username, password){

    var sessionToken = STStore.fetchToken();
    var obj =    {
        "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"SIGNUP"},
        "payload":{"username": username,"password":password, "email": email}
        }


      obj = JSON.stringify(obj);

      axios.post(APIAddress+'/signup', obj).then(function (response) {

              if(response.data.Success){

                CurrentUserActions.loginUser(username, password);
                
              }else{
                console.log(response);
                document.getElementById('error_message').style.display = "block";
                document.getElementById('error_text').innerHTML = response.data.Errors[0].Message;
              }
      }).catch(function (response) {
                console.log(response);
                document.getElementById('error_message').style.display = "block";
                document.getElementById('error_text').innerHTML = "API Signup Issue";
      });

  },
  logoutCurrentUser(){


    /* Put this within the axios call once it is done */
    document.cookie = "userID=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "sessionToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
    currentUser.isLoggedIn = false;
    currentUser.userID = "";
    currentUserStore.setUser(currentUser);

    var sessionToken = STStore.fetchToken();
    var obj =    {
    "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"LOGOUT"}
    }

     obj = JSON.stringify(obj);

     axios.post(APIAddress+'/logout', obj).then(function (response) {

            if(response.data.Success){
              
              /* Put in here */
              
            }else{
              alert("There has been an issue");
            }

    }).catch(function (response) {
        console.log("Logout API issue");
    });

    

  },

  recoverPassword(username){

    var sessionToken = STStore.fetchToken();
    
    var obj =    {
      "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"PROFILE_RECOVER"},
      "payload":{"username": username}
    }

     obj = JSON.stringify(obj);

     axios.post(APIAddress+'/profile/sendVerification', obj).then(function (response) {

            if(response.data.Success){
              
                currentUserStore.setValidationCode(true);
                currentUserStore.emitChange();
              
            }else{
              console.log(response.data);
              document.getElementById('error_message').style.display = "block";
              document.getElementById('error_text').innerHTML = response.data.Errors[0].Message;
            }

    }).catch(function (response) {
       console.log("Send Verification API issue");
    });



  },

  updatePassword(username, password, code){

    var sessionToken = STStore.fetchToken();
    
    var obj =    {
      "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"UPDATE_PASSWORD"},
      "payload":{"username": username, "password": password, "code": code}
    }

     obj = JSON.stringify(obj);

     axios.post(APIAddress+'/profile/updatePassword', obj).then(function (response) {

            if(response.data.Success){
              
              currentUserStore.setPasswordUpdate(true);
              currentUserStore.emitChange();             
              
            }else{
              console.log(response.data);
              document.getElementById('error_message').style.display = "block";
              document.getElementById('error_text').innerHTML = response.data.Errors[0].Message;
            }

    }).catch(function (response) {
        console.log(response);
        console.log("Update password API issue");
    });
  },

  changePassword(oldPassword, password){

    var sessionToken = STStore.fetchToken();
    
    var obj =    {
      "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"UPDATE_PASSWORD"},
      "payload":{"oldPassword": oldPassword, "newPassword": password}
    }

     obj = JSON.stringify(obj);

     axios.post(APIAddress+'/profile/changePassword', obj).then(function (response) {

            if(response.data.Success){
              
              currentUserStore.setPasswordUpdate(true);
              currentUserStore.emitChange();             
              
            }else{
              console.log(response.data);
            }

    }).catch(function (response) {
        console.log(response);
        console.log("Change password API issue");
    });
  },

  checkLoginStatus(){
    if(currentUser.isLoggedIn || currentUserStore.getStatusFromCookie()){
      currentUser.isLoggedIn = true;
      return true;
    }else{
      currentUser.isLoggedIn = false;
      return false;
    }    
  },
  saveUserToCookie(userObj){
    //Save userdata to cookie
    console.log("saveUserToCookie");
    document.cookie = "userID="+userObj.id+"; path=/";
  },
  getStatusFromCookie(){

    // check expiration date
    var checkUserID = false;
    var dateInMil = Date.now();
    var ca = document.cookie.split(';');
    var noExpiry = document.cookie.indexOf('expires=');

    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);

        // if cookie contains "expires=" at the zero index
        if(c.indexOf('expires=') == 0 ){   
          var expiresInMil = Date.parse(c.substring(8));
        } 


        if(c.indexOf('userID=') == 0 ){   
          // console.log('true');
          currentUser.id = c.substring(7);
          checkUserID = true;
        } 


        //if cookie has not expired && cookie has a userid
       


        if (expiresInMil != undefined && checkUserID == true && expiresInMil - dateInMil > 0){

            if(CurrentUserActions && currentUser.userInfo == null){

              CurrentUserActions.loadCurrentUser(parseInt(currentUser.id));
            }

            return true;  

        }else if(checkUserID == true  && noExpiry == -1){
          //exchange session token
          if(tokenExchange == false){
            tokenExchange = true;
            STAction.exchangeToken();
          console.log('exchange');
          }

        }
    }


  },

  getUploadId(Aobj,str){
      // console.log(Aobj);
      // console.log(str);
      var sessionToken = STStore.fetchToken();

        var obj=  { "meta": { "apiKey": APIKey, "sessionToken": sessionToken, "request": "PROFILE", "requestedAt": "{{timestamp}}" }, "payload": Aobj }

        obj = JSON.stringify(obj);

     axios.post(APIAddress+'/profile/edit', obj).then(function (response) {

            if(response.data.Success){
              // console.log('response.data Successful');
              //   console.log(response.data);
                if(str=='Avatar'){
                    _state['uploadAvatarID'] = {}
                    _state["uploadAvatarID"]["uploadAvatarID"] = response.data.Payload.uploadAvatarID;
                  }
                if(str=='Cover'){
                  
                    _state['uploadCoverID'] = {}
                    _state["uploadCoverID"]["uploadCoverID"] = response.data.Payload.uploadCoverID;
                    // console.log(response.data.Payload.uploadCoverID);
                  }
                    currentUserStore.emitChange();

               // response.data.Payload.uploadAvatarID;
            }else{
              console.log('response.data not Successful');
              console.log(response.data);

            }

    }).catch(function (response) {
        console.log(response);
        console.log("getUploadId issue");
    });
  }, 
  uploadForm(formdata){
          $.ajax({
            url: UploadURL+'/upload',
            data : formdata,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
              console.log('formdata upload success');
              console.log(data);
          }
          });
  },
  updateInfo: function(aboutme, location, website){

      var sessionToken = STStore.fetchToken();
    
      var obj =    {
        "meta": { "apiKey":APIKey,"sessionToken": sessionToken,"requestedAt":"{{timestamp}}","request":"UPDATE_PASSWORD"},
        "payload":{"aboutMe": aboutme, "socialURL": website, "location": location}
      }
       obj = JSON.stringify(obj);

       axios.post(APIAddress+'/profile/edit', obj).then(function (response) {

              if(response.data.Success){

                console.log(response.data.Payload);
                
                currentUser.userInfo.Profile = response.data.Payload;
                currentUserStore.setCurrentUser(currentUser);           
                
              }else{
                console.log(response.data);
              }

      }).catch(function (response) {
          console.log(response);
          console.log("Update Profile Information API issue");
      });



  }
  
}, function(payload){

    if(payload.actionType == "FETCH_CURRENT_USER"){
    currentUserStore.fetchCurrentUser();
    }

    if(payload.actionType == "LOAD_CURRENT_USER"){
      currentUserStore.loadCurrentUser(payload.userID);
    }

    if(payload.actionType == "LOAD_USER_SETTINGS"){
      currentUserStore.loadUserSettings();
    }

    if(payload.actionType == "LOGIN_USER"){
    currentUserStore.loginUser(payload.username, payload.password);
    }

    if(payload.actionType == "LOGIN_FB"){
      currentUserStore.loginFB(payload.token,payload.expiry,payload.callback);
    }

    if(payload.actionType == "LOGIN_GOOGLE"){
      currentUserStore.loginGoogle(payload.token,payload.expiry);
    }

    if(payload.actionType == "LOGIN_TWIT"){
      currentUserStore.loginTwit();
    }

    if(payload.actionType == "LOGOUT_CURRENT_USER"){
    currentUserStore.logoutCurrentUser();
    }
    if(payload.actionType == "RECOVER_PASSWORD"){
        currentUserStore.recoverPassword(payload.username);
    }
    if(payload.actionType == "UPDATE_PASSWORD"){
       currentUserStore.updatePassword(payload.username, payload.password, payload.code);
    }
    if(payload.actionType == "CHANGE_PASSWORD"){
       currentUserStore.changePassword(payload.oldPassword, payload.password);
    }
    if(payload.actionType == "CHECK_LOGIN_STATUS"){
      currentUserStore.checkLoginStatus();
    }

    if(payload.actionType == "SIGNUP_USER"){
      currentUserStore.signup(payload.email, payload.username, payload.password);
    }


    if(payload.actionType == "GET_UPLOAD_ID"){
      currentUserStore.getUploadId(payload.type,payload.name);
    }

    if(payload.actionType == "UPLOAD_FORM"){
      currentUserStore.uploadForm(payload.formdata);
    }

    if(payload.actionType == "UPDATE_INFORMATION"){
      currentUserStore.updateInfo(payload.aboutme, payload.location, payload.website);

    }
  
});

/* This is just for now until the API works */
var currentUser = {
          id : null,
  isLoggedIn : false,
};

currentUserStore.contextTypes = {
     transitionTo: React.PropTypes.func.isRequired
}

export default currentUserStore;








