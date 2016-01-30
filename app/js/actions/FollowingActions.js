'use strict';

var FollowingActions = Flux.createActions({
	loadFollowing: function(userID) {
	    return {
	    	actionType: "LOAD_FOLLOWING",
	    	userID: userID
	    }; 
	},
	fetchFollowing: function(){
	    return {
	    	actionType: "FETCH_FOLLOWING"
	    };
	},
	follow: function(id,username){

		console.log(id);
		return {
			actionType: "FOLLOW_USER",
			userID: id,
			username:username
		}
	},
	unfollow: function(id){

		return {
			actionType: "UNFOLLOW_USER",
			userID: id
		}
	}	
}); 

export default FollowingActions;