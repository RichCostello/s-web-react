var FollowingProfBtn = React.createClass({
	
	getInitialState: function(){

		return({
			isFollowing:undefined
		})

	},
	unfollow: function(){
		
		FollowingActions.unfollow(this.props.id);
		

		this.state.isFollowing = false;


	},
	follow: function(){
		if(CurrentUserStore.checkLoginStatus()){
			FollowingActions.follow(this.props.id);
			this.state.isFollowing = true;
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

        var defaultStyle={border: '1px solid '+primary, color: primary};
        var followingStyle={ border: '1px solid '+primary, color: '#fff', backgroundColor: primary }
        var followingIcon = "zmdi zmdi-account zmdi-hc-lg zmdi-hc-fw";

        if(this.state.isFollowing == undefined){
        	if(this.props.isFollowing){
	        	var clickHandler = this.unfollow;
	        	var fof = 'Following';
	        	followingStyle = followingStyle;
	        }else{
	            var clickHandler = this.follow;
	            var fof = 'Follow';
	        	followingStyle = defaultStyle;
	        	followingIcon = "zmdi zmdi-account-add zmdi-hc-lg zmdi-hc-fw";
	        }
        }else{
        	if(this.state.isFollowing){
	        	var clickHandler = this.unfollow;
	        	followingStyle = followingStyle;
	        	var fof = 'Following';
	        }else{
	            var clickHandler = this.follow;
	        	followingStyle = defaultStyle;
	        	followingIcon = "zmdi zmdi-account-add zmdi-hc-lg zmdi-hc-fw";
	        	var fof = 'Follow';
	        }
        }


			return(
				<div>
					<a href="#" onClick={clickHandler}>
						<button className="followprof" style={followingStyle}><i className={followingIcon}></i>{fof}</button>
					</a>
				</div>
			)
		

	}
 
});

export default FollowingProfBtn;