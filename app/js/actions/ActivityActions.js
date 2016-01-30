'use strict';

import Flux from '../Flux';

var ActivityActions = Flux.createActions({
	loadActivities: function() {
	    return {
	    	actionType: "LOAD_ACTIVITIES"
	    };
	},
	fetchActivities: function(){
	    return {
	    	actionType: "FETCH_ACTIVITIES",
	    };
	}
});

export default ActivityActions;