'use strict';
 
import Flux from '../Flux';
 
var UserActions = Flux.createActions({
	// loadUser: function() {
	//     return {
	//     	actionType: "LOAD_USER"
	//     };
	// },
	fetchUser: function(user){
	    return {
	    	actionType: "FETCH_USER",
	    	user: user
	    };
	},
	loadByUsername: function(username,count,offset, stationCount, stationOffset, lazy){
		return{
			actionType: "LOAD_USER",
			username: username,
			count:count,
			offset:offset,
			stationCount: stationCount,
			stationOffset: stationOffset,
			lazy:lazy
		};
	}
});
export default UserActions;