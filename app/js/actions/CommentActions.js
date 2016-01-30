'use strict';

var CommentActions = Flux.createActions({
	saveComment: function(comment, pID){

		return{
			actionType: "SAVE_COMMENT",
			comment: comment,
			postID: pID
		}
	},
	setComments: function(comments){
		return{
			actionType: "SET_COMMENT",
			comments: comments
		}
	}
}); 

export default CommentActions;