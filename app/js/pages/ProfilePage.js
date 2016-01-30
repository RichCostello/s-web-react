var UserStore = require('../stores/UserStore');
var isActive = [];
var username = '';

var Profile = React.createClass({


  mixins: [UserStore.mixin],

  getInitialState: function() {
    return({
       'User': {}
    });
  },
  storeDidChange: function(){
    var t = UserStore.fetchUser();
   
    if(t!= undefined && t.User == '404'){
      this.router.transitionTo("Feed");
      return;
    }

    if(t != undefined){this.setState(t);}
    else this.forceUpdate(t);
  },



  onScroll: function(){
  //   // console.log($('#ProfilePage'));
  //   /* -76 at the end to compensate for .mdl-grid.pfile margin-top: -76px */
  //   var contentScrollTop = parseInt($('#ProfilePage').css('height').replace('px',''))-window.innerHeight-$('.mdl-layout__content')[0].scrollTop - 76;
  //   var pl = this.state.profileposts.length;
  //   var sl = this.state.listeningList.length;

  //   if(contentScrollTop < 0 && this.state.User.HasMorePosts == true && profilepostsloading == false){
  //     profilepostsloading = true;
  //     UserActions.loadByUsername(this.router.getCurrentParams().username,20,pl, 20, sl, true); 
  //   }
  },
  componentWillMount: function(){
    
    this.router = this.context.router;       
    
    var username = this.router.getCurrentParams().username;

    functions.redirect(username, "user");
    UserActions.loadByUsername(username,40,0,40,0,false);    
  },
  componentDidMount: function(){
    /* This will upgrade the dom with any kind of javascript necessary */
    componentHandler.upgradeDom();
  },
  componentDidUpdate: function(){
      if(this.router.getCurrentParams().username != undefined && this.state.User.DisplayName!=undefined && this.router.getCurrentParams().username.toLowerCase() != this.state.User.DisplayName.toLowerCase() && FetchingUser == false){
              FetchingUser = true;
              UserActions.loadByUsername(this.router.getCurrentParams().username,40,0,100,0,false); 
      }  
  },
  componentWillUnmount: function(){
    $( ".mdl-layout__content").unbind("scroll",this.onScroll);
  },
  newTab: function(str){
    var query;
    if(str == 'posts'){query={posts:true}}
    if(str == 'listening'){query={listening:true}}
    if(str == 'following'){query={following:true}}
    if(str == 'followers'){query={followers:true}}
    this.router.transitionTo('User',{'username':this.router.getCurrentParams().username},query);
  },
  checkTabs: function(){
        isActive = ['','','',''];
        
        if(window.innerWidth<767 && $('#mdlsb').hasClass('expanded')){$('#mdlsb').removeClass('expanded');}

        if(this.router.getCurrentQuery().posts == 'true'){
          isActive[0]='is-active';
        }else if(this.router.getCurrentQuery().listening == 'true'){
          isActive[1]='is-active';
        }else if(this.router.getCurrentQuery().following == 'true'){
          isActive[2]='is-active';
        }else if(this.router.getCurrentQuery().followers == 'true'){
          isActive[3]='is-active';
        }else{
          isActive[0]='is-active';
        }
        return false;
  },
  showAbout: function(){

    document.getElementById('card').className = "flipped";

  },
  hideAbout: function(){

     document.getElementById('card').className = "";

  },
  render: function() {

        this.checkTabs();

        if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}
        
        if(!this.state.User.Avatar){
            this.state.User.Avatar = "default";
        }
        if(!this.state.User.Cover){
          this.state.User.Cover = "default";
        }

        var style = {backgroundImage: 'url("'+ResizeURL+"/resize/3/0/1024/1024/0/0/100/"+this.state.User.Cover+'")'}
        var branded={color:primary};
    
        
        var linkParams ={username:''}
        if(this.state.User.DisplayName){linkParams = {username:this.state.User.DisplayName} }


        return(
               <DocumentTitle title="Stationlocal | Profile">

                <div id="ProfilePage" className="mdl-grid pfile">
                    <div className="mdl-cell mdl-cell--12-col profile_cover_image" style={style}>
                       
                          <div className="profileGradient">
                           
                          
                            <div className="profile-follow">
                                <FollowingProfBtn isFollowing={this.state.User.IsFollowing} fullProfileAccess={this.state.User.FullProfileAccess}  id={this.state.User.UserID} tenant={this.props.tenant} />
                            </div>
                          </div>
                          <div className="prof-left-overlay">
                            <div id="card">                            
                              <div className="prof-left-details">
                                <div className="profile-avatar" style={{backgroundImage: 'url('+ResizeURL+"/resize/4/0/150/150/0/0/100/"+this.state.User.Avatar+')'}} />
                                  <div className="profile-meta">
                                       <span className="ppl profile-name">@{this.state.User.DisplayName}</span>
                                       <span className="demo-location"><i className="zmdi zmdi-pin zmdi-hc-fw" style={branded}></i>{this.state.User.Location}</span>
                                       <span className="demo-link"><i className="zmdi zmdi-link zmdi-hc-fw" style={branded}></i><a href={this.state.User.SocialURL} target="_blank">{this.state.User.SocialURL}</a></span>
                                       <span className="demo-about"><a href="#" className="cp" onClick={this.showAbout}><i className="zmdi zmdi-info-outline zmdi-hc-fw" style={branded}></i>About</a></span>
                                  </div>
                                </div>
                                <div className="prof-left-about" onClick={this.hideAbout} id="about">
                                  <div>
                                    <div className="close cp"><i className="zmdi zmdi-close"></i></div>
                                    <p>{this.state.User.AboutMe}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                      </div>
                        <div className="mdl-cell mdl-cell--12-col">
                          <div className="profilePageContentTabs">
                            <div className="profile-tabs mdl-shadow--2dp dflex">
                                <div onClick={this.newTab.bind(this,'posts')} className={'flex1 mdl-tabs__tab '+isActive[0]} style={branded}>{functions.convertCounts(this.state.User.TotalPosts)} posts</div>
                                <div onClick={this.newTab.bind(this,'listening')} className={'flex1 mdl-tabs__tab '+isActive[1]} style={branded}>{functions.convertCounts(this.state.User.TotalStations)} listening</div>
                                <div onClick={this.newTab.bind(this,'following')} className={'flex1 mdl-tabs__tab '+isActive[2]} style={branded}>{functions.convertCounts(this.state.User.FollowingCount)} following</div>
                                <div onClick={this.newTab.bind(this,'followers')} className={'flex1 mdl-tabs__tab '+isActive[3]} style={branded}>{functions.convertCounts(this.state.User.FollowerCount)} followers</div>
                            </div>
                            <div className={'mdl-tabs__panel '+isActive[0]} id="posts-panel">
                                <ListOProfPosts tenant={this.props.tenant} user={this.state.User} />
                            </div>   
                            <div className={'mdl-tabs__panel '+isActive[1]} id="posts-panel">
                                <ListOListeners tenant={this.props.tenant} user={this.state.User} />
                            </div>                                          
                            <div className={'mdl-tabs__panel '+isActive[2]} id="following-panel">
                                <ListOFollowing tenant={this.props.tenant} user={this.state.User} />
                            </div>
                            <div className={'mdl-tabs__panel '+isActive[3]} id="followers-panel">
                               <ListOFollowers tenant={this.props.tenant} user={this.state.User} />
                            </div>
                          </div>
                          </div>
                </div>
                </DocumentTitle>
        )
  }
});

Profile.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default Profile;


