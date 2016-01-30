'use strict';
 
import Flux from '../Flux';

var PostActions = Flux.createActions({
	loadPost(int) {
	    return {
	    	actionType: "LOAD_POST",
	    	postid : parseInt(int),
	    	commentCount : 20,
	    	commentOffset : 0
	    }; 
	},
	loadMyPosts(postcount,offset) {
		// console.log('loadMyPosts');
	 //    return {
	 //    	actionType: "LOAD_MYPOSTS",
	 //    	postcount : postcount,
	 //    	offset : offset
	 //    }; 
	},
	loadProfilePosts() {
	    
	    // return {
	    // 	actionType: "LOAD_PROFILEPOSTS",
	    //     postcount : 50,
	    // 	offset : 0
	    // };
	},
	loadStationPosts(int) {
	    return {
	    	actionType: "LOAD_STATIONPOSTS",
	    	postid : parseInt(int),
	    	commentCount : 20,
	    	commentOffset : 0
	    }; 
	},
	loadFeed(postcount,offset,lazy) {
	    return {
	    	actionType: "LOAD_FEED",
	    	postcount : postcount,
	    	offset : offset,
	    	lazy: lazy
	    }; 
	},
	fetchPost(post){
	    return {
	    	actionType: "FETCH_POST"
	    };
	},
	deletePost(postID){
		return{
			actionType: "DELETE_POST",
			postID: postID,
		};
	},
	fetchFeed(){
	    return {
	    	actionType: "FETCH_FEED"
	    };
	},
	fetchMyPosts(){
	    return {
	    	actionType: "FETCH_MYPOSTS"
	    };
	},
	fetchProfilePosts(){
	    return {
	    	actionType: "FETCH_PROFILEPOSTS"
	    };
	},
	fetchStationPosts(station){
	    return {
	    	actionType: "FETCH_PAGEPOSTS"
	    };
	},
	lazyLoad(str){
		return {
			actionType: "LAZY_LOAD",
			load:str
		}
	},
	createPost(){
		return{
			actionType: "CREATE_POST"
		}
	}
});

export default PostActions;