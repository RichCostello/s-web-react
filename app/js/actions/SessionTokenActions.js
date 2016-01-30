'use strict';

var SessionTokenAction = Flux.createActions({
	load: function() {
	    return {
	    	actionType: "LOAD_TOKEN"
	    };
	},
	fetchToken: function(){
		return{
			actionType: "FETCH_TOKEN"
		};
	},
	exchangeToken(){
		return{
			actionType: "EXCHANGE_TOKEN",
		};
	},
	setToken: function(token){
		return{
			actionType: "SET_TOKEN",
			token: token
		}
	},
	updateToken: function(){
		return{
			actionType: "UPDATE_TOKEN",
		}
	}
});

export default SessionTokenAction;