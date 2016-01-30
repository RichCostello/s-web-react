var SignupForm = React.createClass({
		// getInitialState: function() {
		// 	return {
		//     	email: '',
		//     	username: '',
		//     	password: '',
		//       	confirm: ''
		//     };
		// },
		// changeEmail: function(e) {
		// 	console.log('change email');
		// 	this.setState({
		//     	email: e.target.value
		//     });
		// },
		// changeUsername: function(e) {
		// 	this.setState({
		//     	username: e.target.value
		//     });
		// },
		// changePassword: function(e) {
		// 	this.setState({
		//     	password: e.target.value
		//     });
		// },
		// changeConfirm: function(e) {
		// 	this.setState({
		//     	confirm: e.target.value
		//     });
		// },
		validateEmail: function(email) {
		    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		    return re.test(email);
		},
		handleSubmit: function(e) {

			e.preventDefault();

			var email = $('[name="email"]').val().trim();
		    var username = $('[name="username"]').val().trim();
		    var password = $('[name="password"]').val().trim();
		    var confirm = $('[name="confirm"]').val().trim();

    		
    		if(!email || !this.validateEmail(email)){
    			document.getElementById('error_message').style.display = "block";
    			document.getElementById('error_text').innerHTML = 'Please enter a valid email address';
    			return;
    		}
    		if(!username){
    			document.getElementById('error_message').style.display = "block";
    			document.getElementById('error_text').innerHTML = 'Please enter a username';
    			return;
    		}
    		if(username.length > 15 || username.length < 4){
    			document.getElementById('error_message').style.display = "block";
    			document.getElementById('error_text').innerHTML = 'Username must be between 4 and 15 characters.';
    			return;
    		}
		    if((password  != confirm) || password.length < 6){ 
		    	document.getElementById('error_message').style.display = "block";
    			document.getElementById('error_text').innerHTML = 'Password must be at least 6 characters long';
		    	return;
		    }

		    /* Calling Signup Action with user data */
		    CurrentUserActions.signup(email, username, password);
		    
		},
		render: function(){
			
			 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
			var linkStyles = {backgroundColor: primary}
			var linkColor = {color: primary}

			return(
		            <form method="post" action="#" className="ls-form" onSubmit={this.handleSubmit}>
		              <p>Create Your Station Account</p>

		             

		              <InputErrorBox {...this.props} />
		              <input className="logname" type="text" name="email" placeholder="Email" />

		              <input type="text" name="username" placeholder="Username" />
		              <input type="password" name="password" placeholder="Password"  />
		              <input className="logpass" type="password" name="confirm" placeholder="Confirm Password" />
		              
		              <div className="row-fluid">
		              	<input type="submit" className="shadow" value="Signup" style={linkStyles} />
		              	<Link to="Login" className="small fl">Have an Account? Log in</Link>
		              </div>

		              <div className="row-fluid"></div>

					  <div className="login-block">
			              <p>Or Login Using</p>
			              <ul className="social-login">
			                <li><FacebookLogin /></li>
			              </ul>
			           </div>

		            </form>
		      
		         
			);
		}

});

export default SignupForm;