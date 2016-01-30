'use strict'; 

var SocialActions = Flux.createActions({
	Like(postID) {
	    return {
	    	actionType: "LIKE",
	    	postID: postID
	    }; 
	},
	UnLike(postID){
		return{
			actionType: "UNLIKE",
			postID: postID
		}
	},
	Dislike(postID){
		return{
			actionType: "DISLIKE",
			postID: postID
		}
	},
	UnDislike(postID){
		return{
			actionType: "UNDISLIKE",
			postID: postID
		}
	},
	Flag(postID) {
	    return {
	    	actionType: "FLAG",
	    	postID: postID
	    }; 
	},
	Share(postID,userID) {
		// console.log(postID+' '+userID);
	    return {
	    	actionType: "SHARE",
	    	userID: userID,
	    	postID: postID
	    }; 
	},


}); 

export default SocialActions;