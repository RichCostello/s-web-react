var GoogleAuth;

module.exports = React.createClass({
	onInit: function(GoogleUser){
		// console.log(GoogleUser.zd);
		//zb id_tolken
		console.log('onInit');
		if(gapi && gapi.auth && gapi.auth.getToken()){
		console.log(gapi.auth.getToken());
		CurrentUserActions.loginGoogle(gapi.auth.getToken().id_token,gapi.auth.getToken().expires_at);
		}
	},
	onFail: function(){
		console.log('fail');
	},
	gpbSign: function(){
		console.log(gapi);
		GoogleAuth = gapi.auth2.getAuthInstance();
		GoogleAuth.signIn();
		GoogleAuth.then(this.onInit,this.onFail);
	},
	componentDidMount: function(){
		var params = {
			client_id: '348804155327-79t4fmeip2hclhbuuqqt7quqkvvdklv9.apps.googleusercontent.com',
			scope: 'https://www.googleapis.com/auth/plus.me',
		}


	  gapi.load('auth2', function() {
        gapi.auth2.init(params);
        GoogleAuth = gapi.auth2.getAuthInstance();
        // GoogleAuth.then(this.onInit,this.onFail);
      }.bind(this));	
	},
	render(){ 	
		return(
		  	<div>
		  		<p onClick={this.gpbSign} className="l-google shadow">Google +</p>
		 	</div>
		);
	}	
});
