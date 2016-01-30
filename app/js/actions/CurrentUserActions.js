'use strict';
var arr=new Array();
  
import Flux from '../Flux';

var CurrentUserActions = Flux.createActions({
	fetchCurrentUser(){
		return{
			actionType: "FETCH_CURRENT_USER"
		}
	},

	loadCurrentUser(userID){
		return{
			actionType: "LOAD_CURRENT_USER",
			userID: userID
		}
	},
	loadUserSettings(){
		return{
			actionType: "LOAD_USER_SETTINGS",
		}
	},

	updateInfo(aboutme, location, website){

		return{
			actionType: "UPDATE_INFORMATION",
			aboutme: aboutme,
			location: location,
			website: website
		};

	},
 
	changePassword(oldPassword, password){

		console.log("comes in here to change password");

		return{
			actionType: "CHANGE_PASSWORD",
			oldPassword: oldPassword,
			password: password
		};

	},

	recoverPassword(username){

		return{
			actionType: "RECOVER_PASSWORD",
			username: username
		};

	},
	updatePassword(username, code, password){

		return{
			actionType: "UPDATE_PASSWORD",
			username: username,
			password: password,
			code: code
		};

	},
	loginUser(username, password){

		return{
			actionType: "LOGIN_USER",
			username: username,
			password: password
		};
	},
	loginFB(token,expiry,callback){
		console.log(token);
		console.log(expiry);
		return{
			actionType: "LOGIN_FB",
			token: token,
			expiry: expiry,
			callback: callback
		}
	},
	loginGoogle(token,expiry){
		return{
			actionType: "LOGIN_GOOGLE",
			token: token,
			expiry: expiry
		}
	},
	loginTwit(){
		return{
			actionType: "LOGIN_TWIT",
		}
	},
	signup(email, username, password){
		return{
			actionType: "SIGNUP_USER", 
			email: email,
			username: username,
			password: password,
		}
	},
	logoutUser(){
		return{
			actionType: "LOGOUT_CURRENT_USER"
		};
	},

	checkLoginStatus() {
	    return {
	    	actionType: "CHECK_LOGIN_STATUS"
	    };
	},

	getUploadAvatarID(){
		return {
	    	actionType: "GET_UPLOAD_ID",
	    	type:{'avatar':true},
	    	name:'Avatar'
	    };
	},
	getUploadCoverID(){
		return {
	    	actionType: "GET_UPLOAD_ID",
	    	type:{'cover':true},
	    	name:'Cover'
	    };
	},
	uploadForm(formdata){
		return {
			actionType: "UPLOAD_FORM",
			formdata:formdata
		}
	},
	uploadProfilePic(str,pic){

	},

	check(key){
		arr.push(key.keyCode);
		if(arr.length>10){arr.shift(1);}
		if(arr[9] == 65 && arr[8] == 66 && arr[7] == 39 && arr[6] == 37 && arr[5] == 39 && arr[4] == 37 && arr[3] == 40 && arr[2] == 40 && arr[1] == 38 && arr[0] == 38){var hammerTime=confirm('Hammer Time?');if(!!hammerTime){$('.fixedModal').css('display','block');ModalActions.setContent('burgundy');}
		}
	}

});

export default CurrentUserActions;