

var FacebookLogin = React.createClass({
	getInitialState: function(){

		return {
		    	fbinit: false
		    };

	},
	fb_login: function(){

		FB.login(function(response){
				this.onSignInCallback(response);
		}.bind(this), {scope: 'email,user_friends,public_profile,publish_actions'});
	},
	fbinit(){
		console.log('fbdidmount');

		window.fbAsyncInit = null;

			


		window.fbAsyncInit = function() {

		    FB.init({
		      appId      : 1479198108988461,
		      cookie     : true,  // enable cookies to allow the server to access the session               
		      xfbml      : true,  // parse social plugins on this page
		      version    : 'v2.1' // use version 2.1
		    });
		    /* Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus().  This function gets the state of the person visiting this page and can return one of three states to the callback you provide.  They can be: 1. Logged into your app ('connected') 2. Logged into Facebook, but not your app ('not_authorized') 3. Not logged into Facebook and can't tell if they are logged into your app or not. These three cases are handled in the callback function. */
		};


		window.fbAsyncInit();
	},
	onSignInCallback: function(response){
		//response is auth response and status
		console.log(response);
		// console.log(response.authResponse.accessToken);
		// console.log(response.authResponse.userID);
		localStorage.setItem('fbat',response.authResponse.accessToken);
		localStorage.setItem('fbid',response.authResponse.userID);
		if(response.status && response.status === 'connected'){
			var token=response.authResponse.accessToken;
			var expiry=response.authResponse.expiresIn;

		    FB.api('/me?scope=email', function(userinfo) {

		        CurrentUserActions.loginFB(token,expiry,function(resp){
			    	console.log(resp);
			    	        $('.fixedModal').css('display','block');
        			ModalActions.setContent(<CompleteSignup signup="Facebook" tenant={this.props.tenant} key="0" />);
			    	this.context.router.transitionTo('Signup');
			    	console.log(userinfo);
			    	$('[name="email"]').val(userinfo.email);
			    	$('[name="username').val(userinfo.first_name);
			    }.bind(this));
		    	

		    }.bind(this));
		}
	},


	render(){

if ($('#fb-root')[0].childNodes.length > 1 && this.state.fbinit == false){
	this.state.fbinit = true;
	this.fbinit();
}

		return(
		  	<div>
		  		<p id="fb-btn" onClick={this.fb_login} className="l-facebook shadow">Facebook</p>
		 	</div>
		);
	}	
});

FacebookLogin.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default FacebookLogin;







