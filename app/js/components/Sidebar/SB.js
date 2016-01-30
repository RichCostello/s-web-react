var CurrentUserStore = require('../../stores/CurrentUserStore');
var CurrentUserActions = require('../../actions/CurrentUserActions');

var station = 'null';
var sbresp ='custom-drawer';
var sblog ='log-drawer';
var splsh ='splash-drawer';

var SB = React.createClass({

   mixins : [CurrentUserStore.mixin],

   storeDidChange: function(){
       var l = CurrentUserStore.fetchCurrentUser();
       this.setState(l);

       if(l != undefined){
         this.setState(l);
       }
       else{
         this.forceUpdate(l);
       }
   },
   getInitialState: function() {
       return ({});
   },

   expandDrawer: function(){
     if(window.innerWidth < 1024 && !$('.mdl-layout').hasClass('expanded')){
       $('.mdl-layout').addClass('expanded');
     }
     else if(window.innerWidth < 1024){
       $('.mdl-layout').removeClass('expanded');
     }
   },
   isUserLoggedIn: function(){
     if(CurrentUserStore.checkLoginStatus())
         return true;
     else      
         return false;

   },
   componentDidUpdate: function(){
    var pathname = this.router.getCurrentPathname();
    if(pathname == '/login' || pathname == '/signup' || pathname == '/splash'){
      if(CurrentUserStore.checkLoginStatus()){

        this.router.transitionTo('Feed');
      }
    }

   },
   componentWillMount: function(){
      this.router = this.context.router;

      $('body').keyup(function(e){CurrentUserActions.check(e)});
   },
   render: function() {
        var pathname = this.router.getCurrentPathname();
        station = pathname.station;

        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}

      if($('#hoverTransition').length < 1 && this.props.tenant != undefined && primary != undefined){
        $('head').append('<style id="hoverTransition"> .zmdi-thumb-up:hover, .zmdi-thumb-down:hover{transition: color .35s  ease-in;color:'+primary+';}</style>')
      }

        // console.log(this.props.tenant);
   if(!CurrentUserStore.checkLoginStatus()){
                  if(pathname == '/splash'){
                     return (
                          <div className ={ splsh+' mdl-layout--fixed-drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'} >
                             <Splash {...this.props} />
                         </div>
                     );
                   }else if(pathname == '/login'){
                     return (
                       <div className ={ sblog+' mdl-layout--fixed-drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'} {...this.props}>
                             <Login {...this.props} />
                       </div>
                     );
                   }else if(pathname == '/recover'){
                     return (
                        <div className ={ sblog+' mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'} {...this.props}>                
                             <Recover {...this.props} />
                         </div>
                     );
                   }
                  else if(pathname == '/updatePassword'){
                     return (
                        <div className ={ sblog+' mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'} {...this.props}>                
                             <UpdatePassword {...this.props} />
                         </div>
                     );
                   }
                   else if(pathname == '/signup'){
                     return (
                         <div className ={ sblog+' mdl-layout--fixed-drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'}>  
                             <Signup {...this.props}/>
                         </div>
                     );
                   }else{
                     return (  
                         <div className ={ sbresp+' mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'} >
                             <Hammenu />
                             <Splash {...this.props} />
                         </div>
                     );
                   }
     }else{
      
              return (
               <div className ={ sbresp+' mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50'} >
                 <Hammenu />
                 <SBUserInfo {...this.props} />
                 <SBTabs {...this.props} />        
               </div>
           );
     }
   }

});

SB.contextTypes = {
   router: React.PropTypes.func.isRequired
}

export default SB;