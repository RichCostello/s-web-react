
var CompleteSignup = React.createClass({
  closeModal(){
          $('.fixedModal').css('display','none');
          ModalActions.setContent(<empty />);
  },
  render: function() {

if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
var style={backgroundColor:primary, borderColor:primary}

    return (
          <div className="completeSignup">
                <div className="message">
                 {'Your '+this.props.signup+' account has been linked to Station. Please complete the signup form in the sidebar to finish creating your account.'} 
                 </div>
                 <div className="confirm" style={style} onClick={this.closeModal}>Continue</div>
          </div>
    );
  }

});

export default CompleteSignup;