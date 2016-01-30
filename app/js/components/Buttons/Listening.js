var ListeningBtn = React.createClass({

	getInitialState: function(){
        return({
            PermissionLevel:({})
        });
    },
	listen: function(){
                      
         if(CurrentUserStore.checkLoginStatus()){

            if((this.state.PermissionLevel && this.state.PermissionLevel >= 1) || (this.state.PermissionLevel != 0 && this.props.PermissionLevel >= 1)){
                ListeningActions.unlisten(this.props.ID);
                this.setState({PermissionLevel: 0});
            }else{          
                ListeningActions.listen(this.props.ID);
                this.setState({PermissionLevel: 1});
            }
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

            var permissionLevel = this.state.PermissionLevel >= 0 ? this.state.PermissionLevel : this.props.PermissionLevel;

            if(permissionLevel > 0){
                    var listen={backgroundColor:primary, borderColor:primary}
                    var lol='Listening';
            }else{
                var listen={color:primary, borderColor:primary}
                var lol='Listen';
            }


			return(
				<div className="isListening cp" style={listen} onClick={this.listen}><i><span className="zmdi zmdi-portable-wifi"></span>{lol}</i></div>
			);

	
	}

});

export default ListeningBtn;






