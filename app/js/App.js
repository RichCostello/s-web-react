'use strict'; 

import SidebarListeningStore    from './stores/SidebarListeningStore';
import TenantStore              from './stores/TenantStore';
import CurrentUserStore         from './stores/CurrentUserStore';
import CurrentUserActions       from './actions/CurrentUserActions';
import PostOffice               from './stores/PostOffice';

var station = 'station';
var sbmobile = 'mdl-layout--fixed-drawer';

var App = React.createClass({
  
  mixins: [CurrentUserStore.mixin,SidebarListeningStore.mixin,PostOffice.mixin,TenantStore.mixin],
  
  getInitialState: function() {
    return {
      userInfo : {
          Profile : {

          }
      },
      id : '',
      isLoggedIn : '',
      tenant:'none'
    };
  },
  storeDidChange: function(){
    var t = TenantStore.fetchTenant();
    if(t!= undefined){this.setState(t);}else{this.forceUpdate(t)}
    var l = CurrentUserStore.fetchCurrentUser();
    if(l != undefined){this.setState(l);}else{this.forceUpdate(l);}
    var s = CurrentUserStore.fetchUserSettings();
    if(s != undefined){this.setState(s);}else{this.forceUpdate(s);}
  },


  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ currentUser: user || {}, error: null });
    }
  },
  setMobdrawer : function(){
          if(window.innerWidth < 480){
              sbmobile= 'mob-set';

          }else{
            sbmobile = 'mdl-layout--fixed-drawer';
          }
  },
  componentWillMount: function(){
    // console.log('componentWillMount');
    this.router = this.context.router;
  
    STAction.load();
    

  },
  componentDidMount: function() {
      if(window.location.href.indexOf('oauth_token=') != -1 && window.location.href.indexOf('oauth_verifier=')){
        if(sessionStorage.getItem('linkTwitter')=='true'){
            CurrentUserStore.linkTwitter(window.location.href.substring( window.location.href.indexOf('oauth_token=') ), function(response){
                  // console.log('linkTwitter');
                  // console.log(response);
            } );
            sessionStorage.removeItem('linkTwitter');
        }else{
            CurrentUserActions.loginTwit( window.location.href.substring( window.location.href.indexOf('oauth_token=') ) ) ;
        }
       
      }
  },
  render: function() {


    return (
     <div className="appcontent">
          <div id="mdlsb" className={'mdl-layout mdl-js-layout '+sbmobile+' mdl-layout--fixed-header is-casting-shadow'}>   
                     
              <AppHeader params={this.props.params} {...this.state}/>
              
              <SB params={this.props.params} {...this.state} />
              
              <main className="mdl-layout__content">           
                <RouteHandler params={this.props.params} {...this.state} />
              </main>

              <Modal />
          </div>
      </div>
   
    );
  }

});

App.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default App;


