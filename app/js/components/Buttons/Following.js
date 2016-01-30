var FollowingBtn = React.createClass({
	
	getInitialState: function(){

		return({
			isFollowing: undefined
		})
 
	},
	unfollow: function(id){
		
		FollowingActions.unfollow(id);
		
		var obj = {};
		this.state.isFollowing = false;

		this.setState(obj);

	},
	follow: function(id){

		if(CurrentUserStore.checkLoginStatus()){

			FollowingActions.follow(id,this.props.fobj.DisplayName);

			var obj = {};
			this.state.isFollowing = true;

			this.setState(obj);
		}
		else{
			this.PromptLogin();
		}
	},
	PromptLogin: function(){

        $('.fixedModal').css('display','block');
        ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
    },
	render: function(){

		 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var defaultStyle={color:primary, border: '1px solid '+primary};
        var followingStyle={backgroundColor:primary, border: '1px solid '+primary, color: '#fff'}
        var followingIcon = "zmdi zmdi-account zmdi-hc-lg zmdi-hc-fw";

        if(this.state.isFollowing == undefined){
        	if(this.props.isFollowing){
	        	var clickHandler = this.unfollow.bind(this, this.props.userID);
	        	followingStyle = followingStyle;
	        }else{
	            var clickHandler = this.follow.bind(this, this.props.userID);
	        	followingStyle = defaultStyle;
	        	followingIcon = "zmdi zmdi-account-add zmdi-hc-lg zmdi-hc-fw";
	        }
        }else{
        	if(this.state.isFollowing){
	        	var clickHandler = this.unfollow.bind(this, this.props.userID);
	        	followingStyle = followingStyle;
	        }else{
	            var clickHandler = this.follow.bind(this, this.props.userID);
	        	followingStyle = defaultStyle;
	        	followingIcon = "zmdi zmdi-account-add zmdi-hc-lg zmdi-hc-fw";
	        }
        }

			return(
				<div>
					<a href="#" onClick={clickHandler}>
						<button className="follow" style={followingStyle}><i className={followingIcon}></i></button>
					</a>
				</div>
			)


	}

});

export default FollowingBtn;