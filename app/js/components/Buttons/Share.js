var ShareBtn = React.createClass({
	
	share: function() {
  
       var userID = CurrentUserStore.getUserID();
       var postID = this.props.ID;
        SocialActions.Share(postID,userID);
    },

	render: function(){
		return(
			<li className="zmdi zmdi-share" onClick={this.share}>Share</li>
		);
	}
});

export default ShareBtn;

                                    
                                  