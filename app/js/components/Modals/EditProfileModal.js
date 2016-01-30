 var EditProfileModal = React.createClass({
	
 	getInitialState: function() {
		return {
	    	aboutme: '',
	    	location: '',
	    	website: ''
	    };
	},
	changeAboutMe: function(e) {
		this.setState({
	    	aboutme: e.target.value
	    });
	},
	changeLocation: function(e) {
		this.setState({
	    	location: e.target.value
	    });
	},
	changeWebsite: function(e) {
		this.setState({
	    	website: e.target.value
	    });
	},

	componentWillMount: function(){
			console.log(this.props);
		this.setState({
	    	aboutme: this.props.user.Profile.AboutMe,
	    	location: this.props.user.Profile.Location,
	    	website: this.props.user.Profile.SocialURL
	    });

	},
	componentDidMount: function(){

	},
	closeModal: function() {
    	  React.unmountComponentAtNode(document.getElementById('EditProfileModal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
    },
    handleSubmit: function(e){

    	e.preventDefault();

		var aboutme = this.state.aboutme;
	    var location = this.state.location;
	    var website = this.state.website;

	    CurrentUserActions.updateInfo(aboutme, location, website);

	    this.closeModal();

    },
	render: function(){
	if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
	var branded = {backgroundColor:primary}

		return(
			 <form id="EditProfileModal" className="editProfileModal profileModal" method="post" action="#" onSubmit={this.handleSubmit}>
		

					<div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>

					<div className="editProfileTitle">Edit Profile</div>


					<div className="EPaboutme tal">
						<div className="epLabel">About Me</div>

						<textarea onChange={this.changeAboutMe}>
						{this.state.aboutme}
						</textarea>
					</div>

					<div>
						<div className="ilb tal">
							<div className="epLabel">Location</div>
							<input type="text" value={this.state.location} onChange={this.changeLocation} />
						</div>
						<div className="EPweburl ilb tal">
							<div className="epLabel">Website URL</div>
							<input type="text" value={this.state.website} onChange={this.changeWebsite} />
						</div>
					</div>

					<input type="submit" className="EPsubmit" style={branded} value="Save" />


	
				</form>
			);

	}

});





export default EditProfileModal;







