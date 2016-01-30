'use strict';
 
var SidebarListeningActions = Flux.createActions({
	loadUserListening: function(userID) {
	    return {
	    	actionType: "LOAD_USERLISTENING",
	    	userID: userID
	    };
	},
	fetchUserListening: function(userID){
	    return {
	    	actionType: "FETCH_USERLISTENING",
	    	userID: userID
	    };
	},
	setListening: function(stations){
		return{
			actionType: "SET_LISTENING",
			stations: stations
		}
	}
}); 

export default SidebarListeningActions;