var socStore = require('../../stores/SocialStore');

var Flag = React.createClass({
	
    setInitialState: function(){
        return({
            isFlagged: false
        })
    },
    flagPost: function() {
   
        if(CurrentUserStore.checkLoginStatus()){
               var postID = this.props.ID;
               SocialActions.Flag(postID);
               this.setState({isFlagged: true})
        }
        else{
            this.PromptLogin();
        }
    },
    PromptLogin: function(){

        $('.fixedModal').css('display','block');
        ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
    },
    render: function(){ 	

        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded = {};
        var naming = "flag";


        if(this.state && this.state.isFlagged){
            branded = {color: primary}
            naming = "flagged";
        }

		return(
			  <li className="zmdi zmdi-flag" style={branded} onClick={this.flagPost}>{naming}</li>
		);
	}

});

export default Flag;