'use strict';



var FollowerActions = Flux.createActions({
	loadFollower: function(userID) {
	    return {
	    	actionType: "LOAD_FOLLOWER",
	    	userID: userID
	    }; 
	},
	fetchFollower: function(){
	    return {
	    	actionType: "FETCH_FOLLOWER"
	    };
	},
}); 

export default FollowerActions;