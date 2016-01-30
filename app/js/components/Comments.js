var CommentStore  	= require('../stores/CommentStore');

var comments = React.createClass({
	
	mixins: [CommentStore.mixin],

	storeDidChange: function(){
		var c = CommentStore.fetchComments();
		if(c != undefined){this.setState(c);}else{this.forceUpdate(c);}   
	},
	getInitialState: function() {
        return ({
            comments:[]
        });
    }, 
    handleSubmit: function(){

    	/* Save comment when the user hits enter */
    	

    		var postID = this.props.ID;
    		var commentBox = document.getElementById("commentText");
    		var comment = commentBox.value;

    		if(comment != ""){
    			CommentActions.saveComment(comment, postID);
	    		commentBox.value = "";
    		}  

   

    },
	getCommentsList: function(state){


		var commentList;

		if(state.comments != null){

			commentList = state.comments.map(function(cItem, index){
			                	return(
			                      <CommentItem cobj={state.comments[index]} tenant={this.props.tenant} key={index} />
			                    )
			                  }.bind(this));
		}
		if(commentList == undefined || commentList == ""){
        commentList = <div className="mdl-grid mdl-list">
                        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">There are currently no comments available!</div></div>;
      	}

      	return commentList;
	},
	checkSubmit: function(e){

		if(CurrentUserStore.checkLoginStatus() == true){
			if(e.keyCode == 13){
				this.handleSubmit();
			}
		}else{
			    $('.fixedModal').css('display','block');
        		ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
		}
	},
	getCommentInput: function(branded, brandedbk){

		var profileImage = '/images/user.jpg';


			if(CurrentUserStore.checkLoginStatus()){

				if(CurrentUserStore.fetchCurrentUser()){
					profileImage = ResizeURL+"/resize/4/0/150/150/0/0/100/"+CurrentUserStore.fetchCurrentUser().userInfo.Profile.Avatar;
				}
			}
			return (<div className="pa100">
					<div className="commentOn">
						<img className="ilb commenterPic" src={profileImage} />
						<input type="text" placeholder="Post a comment" id="commentText" onKeyDown={this.checkSubmit} style={branded}/>
						 <input id="commentButton" className="commsubmit" type="submit" value="Post" onClick={this.handleSubmit} style={brandedbk}/> 
					</div>
				</div>);			


	},
	render: function(){

		

		 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
         var branded={border: '1px solid '+primary};
         var brandedbk={backgroundColor:primary, border: '1px solid '+primary};

		return(
			<div className="commentContainer">
				<div className="flexComments">
					<ul className="commentsList">
						{this.getCommentsList(this.state)}									
					</ul>
				</div>
				{this.getCommentInput(branded, brandedbk)}
			</div>
		);

	}

});

export default comments;