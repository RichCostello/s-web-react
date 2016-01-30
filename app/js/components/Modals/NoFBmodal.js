
 var NoFBmodal = React.createClass({


	closeModal() {
    	  React.unmountComponentAtNode(document.getElementById('NoFBmodal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
  },

	render: function(){
 


		return(
			<div id="NoFBmodal" className="nofbmodal">

          <div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>
          <div>Facebook must first be linked to a Station account, therefore you cannot login with Facebook at this time</div>
          
			</div>
		);

	}

});

 




export default NoFBmodal;







