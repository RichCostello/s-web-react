var FollowingStore = require('../../stores/FollowingStore');

var ListOFollowing = React.createClass({
	mixins: [FollowingStore.mixin],
	 getInitialState() {
	    return({

	       'followingList' : [],

	    });
  	},
  	 storeDidChange: function(){

	    var followingList = FollowingStore.fetchFollowing();

	    if(followingList != undefined){this.setState(followingList);}
	    else{this.forceUpdate(followingList);}   

  	},
  	 componentWillMount: function(){

	    this.router = this.context.router;    
	    FollowingActions.loadFollowing(this.router.getCurrentParams().username);

  	},
  	componentDidUpdate: function(){

      // if(this.router.getCurrentParams().username != undefined && this.state.User.DisplayName!=undefined && this.router.getCurrentParams().username.toLowerCase() != this.state.User.DisplayName.toLowerCase() && FetchingUser == false){
      //         FetchingUser = true;
      //         FollowingActions.loadFollowing(this.router.getCurrentParams().username);
      // }
  
  	},
	render: function(){


    if(!this.props.user.FullProfileAccess){

          var FollowingObj = <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-lock lock"></i><span>This User is Private</span></div>;

    }
    else{

  		 if(this.state.followingList && this.state.followingList.length > 0){
          var FollowingObj = this.state.followingList.map(function(aItem, index){
                          return(
                            <Following fobj={this.state.followingList[index]} tenant={this.props.tenant} key={index} />
                          )
                        }.bind(this));
        } else{
           var FollowingObj = <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-mood-bad lock"></i><span>User is currently not following anyone</span></div>;
          }
    }

		return(
							  <div className="mdl-grid mdl-grid--no-spacing listofollowing">
                                <div className="mdl-cell mdl-cell--12-col">                            
                                    <div className="mdl-grid mdl-grid--no-spacing">
                                      <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                                       {FollowingObj}
                                      </div>
                                    </div>
                                </div>
                              </div>
		);
	}

});


ListOFollowing.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default ListOFollowing;




