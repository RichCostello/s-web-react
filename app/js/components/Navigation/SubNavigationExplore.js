var SubNavigationExplore = React.createClass({

 render: function(){
   if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
    var branded = {color: primary};

		return(
           <div className="mdl-tabs__tab-bar">
              <div className="flex1">
                  <Link to="DiscoverPosts" className="flex1 mdl-layout__tab" style={branded}><i className="zmdi zmdi-image-o"></i>Posts</Link>
              </div>
              <div className="flex1">
                  <Link to="DiscoverStations" className="flex1 mdl-layout__tab" style={branded}><i className="zmdi zmdi-portable-wifi"></i>Stations</Link>
              </div>
              <div className="flex1">
                  <Link to="DiscoverEvents" className="flex1 mdl-layout__tab" style={branded}><i className="zmdi zmdi-calendar"></i>Events</Link>
              </div>
           </div>
		);
	}
});


export default SubNavigationExplore;