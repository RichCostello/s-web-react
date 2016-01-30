var listening={}
var lobj;

var SmallListenBtn = React.createClass({
    getInitialState: function(){

        return({
            PermissionLevel:[{}]
        })

    },
    toggle: function(){
                             
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

        console.log(this.props.tenant);

        $('.fixedModal').css('display','block');
        ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
    },
    render: function(){
        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}

        var permissionLevel = this.state.PermissionLevel >= 0 ? this.state.PermissionLevel : this.props.PermissionLevel;

        if(permissionLevel > 0){
            var listening={color:primary }  
        }else{
            var listening={color: 'rgb(50,50,50)'}
        }

        return(
            <div>
       
                <button onClick={this.toggle} className="smlisten" style={listening}><i className="zmdi zmdi-portable-wifi zmdi-hc-lg zmdi-hc-fw zmdi-hc-3x"></i></button>
    
            </div>
        );
    
        
    
    }

});

export default SmallListenBtn;


