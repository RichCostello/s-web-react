'use strict';



var TenantActions = Flux.createActions({
	loadTenant: function() {
		// console.log('loadTenant');
	    return {
	    	actionType: "LOAD_TENANT"
	    }; 
	},
	fetchTenant: function(){
	    return {
	    	actionType: "FETCH_TENANT"
	    };
	},
}); 

export default TenantActions;