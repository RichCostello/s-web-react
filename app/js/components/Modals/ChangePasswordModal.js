 var EditProfileModal = React.createClass({
	
 	getInitialState: function() {
		return {
	    	oldPassword: '',
	    	password: '',
	    	confirm: ''
	    };
	},
	changeOldPassword: function(e) {
		this.setState({
	    	oldPassword: e.target.value
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
	closeModal: function() {
    	  React.unmountComponentAtNode(document.getElementById('ChangePasswordModal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
    },
    handleSubmit: function(e){

    	e.preventDefault();

		var oldPassword = this.state.oldPassword;
	    var password = this.state.password;
	    var confirm = this.state.confirm;

	    if(oldPassword == "" || password == "" || confirm == ""){
	    	alert("Please make sure you type in a password");
	    	return false;
	    }

	    CurrentUserActions.changePassword(oldPassword, password);

	    this.closeModal();

    },
	render: function(){
	if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
	var branded = {backgroundColor:primary}

		return(
			 <form id="ChangePasswordModal" className="editProfileModal profileModal" method="post" action="#" onSubmit={this.handleSubmit}>
		

					<div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>

					<div className="editProfileTitle">Change Password</div>


					<div className="EPaboutme tal">
						<div className="epLabel">Old Password</div>
						<input type="password" value={this.state.oldPassword} onChange={this.changeOldPassword} />
					</div>

					<div>
						<div className="EPaboutme tal">
							<div className="epLabel">Password</div>
							<input type="password" value={this.state.password} onChange={this.changePassword} />
						</div>
						<div className="EPaboutme tal">
							<div className="epLabel">Confirm Password</div>
							<input type="password" value={this.state.confirm} onChange={this.changeConfirm} />
						</div>
					</div>

					<input type="submit" className="EPsubmit" style={branded} value="Update" />


	
				</form>
			);

	}

});





export default EditProfileModal;







