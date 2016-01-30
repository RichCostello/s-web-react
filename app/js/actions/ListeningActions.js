'use strict';
 
var ListeningActions = Flux.createActions({
	loadListening: function() {
	    return {
	    	actionType: "LOAD_LISTENING"
	    }; 
	},
	fetchListening: function(){
	    return {
	    	actionType: "FETCH_LISTENING"
	    };
	},
	listen: function(stationID, lfrom){
		return{
			actionType: "LISTEN",
			stationID: stationID,
			lfrom: lfrom
		};
	},
	unlisten: function(stationID, lfrom){
		return{
			actionType: "UNLISTEN",
			stationID: stationID,
			lfrom: lfrom
		};
	},
	setListening: function(stations){
		return{
			actionType: "SET_LISTENING",
			stations: stations
		}
	}
}); 
  
export default ListeningActions;