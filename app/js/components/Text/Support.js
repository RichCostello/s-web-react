var Support = React.createClass({
	
	getInitialState: function() {
			return {
		    	name: '',
		      	email: '',
		      	subject: '',
		      	message: ''
		    };
		},
	changeName: function(e) {
		this.setState({
	    	name: e.target.value
	    });
	},
	changeEmail: function(e) {
		this.setState({
	    	email: e.target.value
	    });
	},
	changeSubject: function(e) {
		this.setState({
	    	subject: e.target.value
	    });
	},
	changeMessage: function(e) {
		this.setState({
	    	message: e.target.value
	    });
	},
	handleSubmit: function(e){

		e.preventDefault();

		if(this.state.name == "" || this.state.email == "" || this.state.subject == "" || this.state.message == ""){

			document.getElementById('error_message').style.display = "block";
   			document.getElementById('error_text').innerHTML = 'Please make sure all fields are filled out properly';

   			return;
		}

		 if(STStore.fetchToken()){
          var sessionToken = STStore.fetchToken();
          }
          else{
          var 	sessionToken = document.cookie.substring(document.cookie.indexOf('sessionToken=')+13);
          		sessionToken = sessionToken.substring(0, sessionToken.indexOf(';'));

        }
	    var obj = {
	    	meta : {request: "SUPPORT", "apiKey":APIKey, "sessionToken":sessionToken, "requestedAt":"{{timestamp}}"},
	        payload: { "name": this.state.name, "email": this.state.email, "subject": this.state.subject, "message": this.state.message}
	    };
      
      	obj = JSON.stringify(obj);


      axios.post(APIAddress+'/support', obj).then(function (response) { 

          if(response.data.Success){

                document.getElementById('error_message').style.display = "block";
   				document.getElementById('error_text').innerHTML = 'Your support inquiry has been sent successfully!';       

          }
          else{
            console.log(response);
            console.log(response.data.Errors[0].Message);

          }
      
      }).catch(function (response) {
        console.log('something went wrong sending the inquiry');
        console.log(response);

      });

      this.setState({
	      name: '',
	      email: '',
	      subject: '',
	      message: '',
	    });  


	},
	render: function(){

		if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}
		var branded = {backgroundColor: primary, display: 'block', float: 'right', maxWidth: '200px'}

		return(
			<div className="mdl-grid" id="support">
              	<div className="mdl-cell mdl-cell--12-col">
					<h1>Support</h1>
				
					<p className="updateDate">›› &nbsp;Effective October 22, 2015 </p>
				
					<p>These Terms of Service (Terms) apply to your access and use of Station-App, Inc. (Station) Station-App platform (the Platform), 
					mobile application (the App), Station.s website (Site), and other online products and services (collectively, the Service).</p>


		            <h5>Need help?</h5>
		            <p>Please let us know if you need any help by filling out the form below, or you can send us an email to <a href="mailto:support@stationlocal.com">support@stationlocal.com</a> </p>

		            
		            <form action="#" name="contactForm" id="support-contactForm" method="post" onSubmit={ this.handleSubmit }>

		                <div id="support-form-content">

		                	<div className="mdl-cell mdl-cell--6-col relative">
			                	<InputErrorBox {...this.props} />
							</div>
		                    <input type="text" className="block" maxLength="200" id="support-user-name" name="userName" placeholder="Name" value={ this.state.name } onChange={this.changeName} />

		                    <input type="text" className="block" maxLength="200" id="support-user-email" name="email"  placeholder="Email" value={ this.state.email } onChange={this.changeEmail}/>

		                    <input type="text" className="block" maxLength="25" id="support-user-subject" name="subject"  placeholder="Subject" value={ this.state.subject } onChange={this.changeSubject} />

		                    <textarea id="support-message-content" className="block" name="messageContent" rows="3" cols="17" placeholder="Message" onChange={this.changeMessage} defaultValue={ this.state.message }></textarea>


		                    <input type="submit" className="submitBtn transItem block" value="Submit" id="support-submit-btn" name="button" style={branded}/>


		                </div>

		            </form>
				</div>
			</div>
		);

	}

});

export default Support;