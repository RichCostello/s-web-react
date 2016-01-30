'use strict';

import Flux from '../Flux';

var ModalActions = Flux.createActions({
	setContent: function(obj) {
	    return {
	    	actionType: "SET_CONTENT",
	    	content: obj
	    };
	},
	fetchContent: function(){
	    return {
	    	actionType: "FETCH_CONTENT",
	    };
	}
});

export default ModalActions;