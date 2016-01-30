import ModalActions from '../../actions/ModalActions';
import ModalStore   from '../../stores/ModalStore';
 
var Modal = React.createClass({
  mixins: [ModalStore.mixin],
  storeDidChange: function(){
        var t = ModalStore.fetchContent();
        if(t != undefined){this.setState(t);}else{this.forceUpdate(t);}
  },
  getInitialState: function(){

        return ({
            content: {}
        });

  },
  closeModal: function(e) {
    if( $(e.target).hasClass('modalWindow') ){
      $('.fixedModal').css('display','none');
          ModalActions.setContent(<empty />);
    }
  },
  componentWillMount: function(){
        ModalActions.fetchContent();
        this.router = this.context.router;
  },
  render:function(){
    var mod = '';
    var modContent = this.state.content;
 
        if(this.state.content=='burgundy'){
            modContent = <Burgundy />;
        }else if(modContent && modContent.type){
          var exchange = modContent._store;
          if(modContent.type.displayName == 'PostModal'){
            
            modContent =  [<PostModal ID={exchange.props.id} tenant={exchange.props.tenant} />];
                                   
          }

          else if(modContent.type.displayName == 'ShareModal'){
            
            modContent =  [<ShareModal ID={exchange.props.id} tenant={exchange.props.tenant} />];
                                   
          }

          else if(modContent.type.displayName == 'LoginModal'){
            
            modContent =  [<LoginModal tenant={exchange.props.tenant} />];
                                   
          }

          else if(modContent.type.displayName == 'LinkAccountsModal'){
            
            modContent =  [<LinkAccountsModal tenant={exchange.props.tenant} social={exchange.props.social} />];
                                   
          }


          else if(modContent.type.displayName == 'Photo'){
            modContent =  [<CreatePhoto station={this.router.getCurrentParams().station} username={this.router.getCurrentParams().username} userListening={exchange.props.userListening} tenant={exchange.props.tenant} />];
                                   
          }

          else if(modContent.type.displayName == 'Video'){
            modContent =  [<CreateVideo station={this.router.getCurrentParams().station} username={this.router.getCurrentParams().username} userListening={exchange.props.userListening} tenant={exchange.props.tenant} />];
                                   
          }

          else if(modContent.type.displayName == 'CompleteSignup'){
            modContent =  [<CompleteSignup {...exchange.props} />];
                                   
          }

        }

    return (

                <div className="fixedModal" onClick={this.closeModal}>
                    <div className="semiTransBlack">
                      <div onClick={this.closeModal} className="modalWindow cp">
                        <div className="modalContent">
                              { modContent  }
                        </div>
                      </div>
                    </div>
                </div>
    )
  }
});

Modal.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default Modal;

