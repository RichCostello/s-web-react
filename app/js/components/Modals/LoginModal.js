
var LoginModal = React.createClass({

	 	closeModal: function() {
    	  React.unmountComponentAtNode(document.getElementById('loginModal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
    	},

		render: function(){

			return(
				
					<div id="loginModal" className="whitebg">
						<div className="close cp"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>
						<LoginForm {...this.props} />
					</div>
		     
			);
		}
});

export default LoginModal;