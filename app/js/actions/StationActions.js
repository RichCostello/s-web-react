'use strict'; 

import Flux from '../Flux';
 
var StationActions = Flux.createActions({
	loadStation: function(stationName,count,offset,lazy) {
		// console.log(stationID);
	    return {
	    	actionType: "LOAD_STATION",
	    	stationName: stationName,
	    	postnum: count,
	    	offset:offset,
	    	lazy: lazy
	    };
	},
	loadAllStations: function(subdomain,filter,count,offset,lazy) {
	    return {
	    	actionType: "LOAD_ALLSTATIONS",
	    	subdomain: subdomain,
	    	filter: filter,
	    	count: count,
	    	offset: offset,
	    	lazy: lazy
	    };
	},
	fetchStation: function(stationID){
		console.log(stationID);
	    return {
	    	actionType: "FETCH_STATION"
	    };
	},
	fetchAllStations: function(subdomain,filter){
	    return {
	    	actionType: "FETCH_ALLSTATIONS"
	    };
	}
});

export default StationActions;