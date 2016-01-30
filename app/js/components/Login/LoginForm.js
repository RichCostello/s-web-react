
var LoginForm = React.createClass({
		getInitialState: function() {
			return {
		    	username: '',
		      	password: ''
		    };
		},
		changeUsername: function(e) {
			this.setState({
		    	username: e.target.value
		    });
		},
		changePassword: function(e) {
			this.setState({
		    	password: e.target.value
		    });
		},
		handleSubmit: function(e) {

			e.preventDefault();

		    var userName = this.state.username.trim();
		    var userPassword = this.state.password.trim();

		    if(!userName || !userPassword){
		    	// alert("Please enter username and password!");

		    		document.getElementById('error_message').style.display = "block";

		    		if(!userName){
		    			document.getElementById('error_text').innerHTML = 'Please enter a valid username';
		    			return;
		    		}
		    		if(!userPassword){
		    			document.getElementById('error_text').innerHTML = 'Please enter a valid password';
		    			return;
		    		}
		    }

		    CurrentUserActions.loginUser(userName, userPassword);

		    this.setState({
		      username: '',
		      password: '',
		    });
		},
		render: function(){

			if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
			var linkStyles = {backgroundColor: primary}
			var linkColor = {color: primary}

			return(
				
				
		            <form method="post" action="#" className="ls-form" onSubmit={ this.handleSubmit }>
		        
	              	<p>Log in with your Station Account</p>

		              
	              	  <InputErrorBox {...this.props} />
		              <input className="logname" type="text" name="username" placeholder="Username or Email" value={ this.state.username } onChange={this.changeUsername} />
		              <input className="logpass" type="password" name="password" placeholder="Password" value={ this.state.password } onChange={this.changePassword} />		             

		              <div className="row-fluid">

		              	<input type="submit" className="logblu shadow" value="Login" style={linkStyles} />

		              </div>

		              <div className="row-fluid">
		              	<Link to="Signup" className="small">{"Don't Have an Account? Sign Up"}</Link>
		              	<Link to="Recover" className="small fl">Recover Password</Link>
					  </div>

					  <div className="login-block">
			              <p>Or Login Using</p>
			              <ul className="social-login">
			                <li><FacebookLogin tenant={this.props.tenant} /></li>
			                <li><TwitterLogin /></li>
			                <li><Google /></li>
			              </ul>
			           </div>
		            </form>
	
		     
			);
		}
});

export default LoginForm;