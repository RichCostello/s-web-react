var SidebarListeningStore = require('../../stores/SidebarListeningStore');
var PostOffice = require('../../stores/PostOffice');

var SBTabs = React.createClass({
 
    mixins: [SidebarListeningStore.mixin, PostOffice.mixin],

    storeDidChange: function(){

      var stations = SidebarListeningStore.fetchUserListening();
      if(stations!= undefined){ this.setState(stations);}else{this.forceUpdate(stations)}

      var posts = PostOffice.fetchMyPosts();
      if(posts!= undefined){this.setState(posts);}else{this.forceUpdate(posts)}

      var currentUserInfo = CurrentUserStore.fetchCurrentUser();
      if(currentUserInfo!= undefined){this.setState(currentUserInfo);}else{this.forceUpdate(currentUserInfo)}


    },
    getInitialState: function() {
        return ({
            myposts:[{}],
            userListening:[{}],
            userInfo:[{}],
        });
    },
    componentDidMount: function(){
        componentHandler.upgradeDom();
    },
    render: function() {
      // console.log(this);
        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
       var branded={color:primary}
       var sidebarStyle = document.getElementById('sidebarStyle');
      var prevPosts = '';
      if(this.state.myposts.length > 0){
          prevPosts = this.state.myposts.map(function(post, index){
            if(index < 6){
                   return(<PostPreview {...this.state.myposts[index]} key={index} tenant={this.props.tenant} />);   
                 }
          }.bind(this));
      }else{
        prevPosts = <div className="no-posts">No Posts to display</div>;
      }

      var userListening = '';
      var counter = 0;

      if(this.state.userListening && this.state.userListening.length > 0){
          userListening = this.state.userListening.map(function(station, index){
                    
                    if(counter < 5){
                      counter++;
                      return( <SBActivity {...this.state.userListening[index]} tenant={this.props.tenant} key={index} /> );  
                    }
          }.bind(this));

      }else{
        userListening = <div className="no-posts">No Stations to display</div>;
      }

        return (
            <section id="lag"> 
                  <div className="sidetabs mdl-tabs mdl-js-tabs">
                    <div className="sb mdl-tabs__tab-bar">
                      <a href="#demopost" className="sb mdl-tabs__tab is-active" style={branded}>{functions.convertCounts(this.state.userInfo.TotalPosts)} Posts</a>
                      <a href="#demolistening" className="sb mdl-tabs__tab" style={branded}>{functions.convertCounts(this.state.userInfo.TotalStations)} Listening</a>
                    </div>
                    <div className="sbpanel mdl-tabs__panel is-active" id="demopost">
                      <div className="side mdl-grid">
                        {prevPosts}
                      </div>
                       <SBAllpost {...this.props} /> 
                    </div>
                    <div className="sbpanel mdl-tabs__panel" id="demolistening">
                      <div className="mdl-grid">
                        {userListening}
                      </div>
                        <SBAllstat {...this.props} /> 
                    </div>
                  </div> 
            </section>
        );
    }
});

export default SBTabs;