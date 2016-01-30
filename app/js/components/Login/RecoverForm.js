var CurrentUserStore = require('../../stores/CurrentUserStore');

var linkStyles = {
	backgroundColor: "#1DCAFF"
}

var RecoverForm = React.createClass({

		mixins: [CurrentUserStore.mixin],

		storeDidChange: function(){

			if(CurrentUserStore.getValidationCode()){
				this.router.transitionTo("UpdatePassword");
			}

		},
		getInitialState: function() {
			return {
		    	username: ''
		    };
		},
		componentWillMount: function(){

			this.router = this.context.router;

		},
		changeUsername: function(e) {
			this.setState({
		    	username: e.target.value
		    });
		},
		handleSubmit: function(e) {

			e.preventDefault();

		    var userName = this.state.username.trim();

		    		if(!userName){
		    			document.getElementById('error_message').style.display = "block";
    					document.getElementById('error_text').innerHTML = 'Please enter a username or email address';	
		    			return;
		    		}
		    
		    CurrentUserActions.recoverPassword(userName);

		    this.setState({
		      username: ''
		    });		
		    
		},
		render: function(){
			
			 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
			var linkStyles = {backgroundColor: primary}
			var linkColor = {color: primary}

			return(
		            <form method="post" action="#" className="ls-form" onSubmit={ this.handleSubmit }>
		        
	              	  <p>Recover Password</p>

		              
	              	  <InputErrorBox {...this.props} />
		              <input className="recoverpass" type="text" name="username" placeholder="Username or Email" value={ this.state.username } onChange={this.changeUsername} />	              

		              <div className="row-fluid">
		              	<Link to="UpdatePassword" onClick={this.handleSubmit}><input type="submit" className="shadow logblu" value="Continue" style={linkStyles} /></Link>
		              </div>

		              <div className="row-fluid">
		              	<Link to="Login" className="small">Home</Link>
					  </div>
		            </form>		     
			);
		}
});

RecoverForm.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default RecoverForm;