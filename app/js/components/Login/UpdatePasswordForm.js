var CurrentUserStore = require('../../stores/CurrentUserStore');

var linkStyles = {
	backgroundColor: "#1DCAFF"
}

var UpdatePasswordForm = React.createClass({

		mixins: [CurrentUserStore.mixin],

		storeDidChange: function(){

			if(CurrentUserStore.getPasswordUpdate()){
				console.log("comes in here");
				this.context.router.transitionTo("Login");
			}

		},
		getInitialState: function() {
			return {
		    	username: '',
		    	code: '',
		    	password: '',
		    	confirm: ''
		    };
		},
		changeUsername: function(e) {
			this.setState({
		    	username: e.target.value
		    });
		},
		changeCode: function(e) {
			this.setState({
		    	code: e.target.value
		    });
		},
		changePassword: function(e) {
			this.setState({
		    	password: e.target.value
		    });
		},
		changeConfirm: function(e) {
			this.setState({
		    	confirm: e.target.value
		    });
		},
		handleSubmit: function(e) {

			e.preventDefault();

		    var username 	= this.state.username.trim();
		    var password 	= this.state.password.trim();
		    var confirm 	= this.state.confirm.trim();
		    var code 		= this.state.code.trim();

		    		if(!username){
		    			document.getElementById('error_message').style.display = "block";
    					document.getElementById('error_text').innerHTML = 'Please enter a username or email address';	
		    			return;
		    		}
		    		if(!code){
		    			document.getElementById('error_message').style.display = "block";
    					document.getElementById('error_text').innerHTML = 'Please enter the validation code';	
		    			return;
		    		}
		    		if(!password || !confirm || password != confirm || password.length < 6){
		    			document.getElementById('error_message').style.display = "block";
    					document.getElementById('error_text').innerHTML = 'Please make sure you enter two identical passwords';	
		    			return;
		    		}
		    
		    CurrentUserActions.updatePassword(username, code, password);

		    this.setState({
		      username: '',
		      code: '',
		      password: ''
		    });
		},
		render: function(){
			
			 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
			var linkStyles = {backgroundColor: primary}
			var linkColor = {color: primary}

			return(
		            <form method="post" action="#" className="ls-form" onSubmit={ this.handleSubmit }>
		        
	              	  <p>Update Password</p>

		              
	              	  <InputErrorBox {...this.props} />
		              <input className="recoverpass" type="text" name="username" placeholder="Username or Email" value={ this.state.username } onChange={this.changeUsername} />

		              <input className="recoverpass" type="text" name="code" placeholder="Verification Code" value={ this.state.code } onChange={this.changeCode} />	  

		              <input className="recoverpass" type="password" name="password" placeholder="New Password" onChange={this.changePassword} />	              

		              <input className="recoverpass" type="password" name="confirm" placeholder="Confirm Password" onChange={this.changeConfirm} />	  

		              <div className="row-fluid">
		              	<input type="submit" className="shadow logblu" value="Continue" style={linkStyles} />
		              </div>

		              <div className="row-fluid">
		              	<Link to="Login" className="small">Home</Link>
					  </div>
		            </form>		     
			);
		}
});

UpdatePasswordForm.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default UpdatePasswordForm;