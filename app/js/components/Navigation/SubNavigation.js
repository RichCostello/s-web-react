var display = {display: 'block'};

var SubNavigation = React.createClass({

  componentDidMount: function(){

    if(TenantStore.isPrivateLabelTenant() == true){
        display = {display: 'none'}
    }
  },
  render: function(){
     if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
    var branded = {color: primary};
            var linkto = [];
            var hroot = window.location.href;
            if(hroot.indexOf('discovery') != -1){
            //hroot = hroot.substring(hroot.indexOf('discovery')+10);
             // if(hroot=='posts'){this.state.list.title = 'Posts Name/Title'}
             // if(hroot=='events'){this.state.list.title = 'Events Name/Title'}
             // if(hroot=='stations'){this.state.list.title = 'Stations Name/Title'}
                  linkto[0]='DiscoverPosts';
                  linkto[1]='DiscoverStations';
                  linkto[2]='DiscoverEvents';
           }else{
                  linkto[0]='Feed';
                  linkto[1]='StationFeed';
                  linkto[2]='EventFeed';
           }


		return(
           <div className="mdl-cell mdl-cell--12-col subnav" id={this.props.id} style={display}>                            
                  <div className="mdl-grid mdl-grid--no-spacing">
                       <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                              <div className="mdl-tabs__tab-bar">
                                  <div className="flex1">
                                      <Link to={linkto[0]} className="flex1 mdl-layout__tab" style={branded}><i className="zmdi zmdi-filter-list"></i>Feed</Link>
                                  </div>
                                  <div className="flex1">
                                      <Link to={linkto[1]} className="flex1 mdl-layout__tab" style={branded}><i className="zmdi zmdi-portable-wifi"></i>Stations</Link>
                                  </div>
                                  <div className="flex1">
                                      <Link to={linkto[2]} className="flex1 mdl-layout__tab" style={branded}><i className="zmdi zmdi-calendar"></i>Events</Link>
                                  </div>
                               </div>
                        <div className="mdl-tabs__panel is-active" id="posts-panel"></div>
                  </div>
                </div>
            </div>
		);
	}
});


export default SubNavigation;