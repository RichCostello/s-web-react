var DiscoveryItem = React.createClass({
	render: function(){

// console.log(this);
		return(
                <div className="DiscoverItem">
                  <div className="dflex">
                      <div className="ilb vt halfPic">
                          <img className="media" src="../images/gopro_profile.jpg"/>
                      </div>
                      <div className="ilb tal vt flex1 pad10">
                          <img className="diUserPic" src="../images/gopro_profile.jpg"/>
                          <div className="disTitle">{this.props.title}</div>
                          <div className="disCat">{this.props.category}</div>
                          <div className="disDesc over_ellipsis">{this.props.desc}</div>
                      </div>
                    </div>
                  </div>
		);
	}

});


export default DiscoveryItem;