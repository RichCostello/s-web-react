var FollowerStore = require('../../stores/FollowerStore');

var ListOFollowers = React.createClass({
	mixins: [FollowerStore.mixin],
	 getInitialState() {
	    return({

	        'Followers' : [],

	    });
  	},
  	 storeDidChange: function(){

 	var followerList = FollowerStore.fetchFollower();
    if(followerList != undefined){this.setState(followerList);}
    else{this.forceUpdate(followerList);} 

  	},
  	 componentWillMount: function(){

	    this.router = this.context.router;    
		FollowerActions.loadFollower(this.router.getCurrentParams().username);

  	},
  	componentDidUpdate: function(){

      // if(this.router.getCurrentParams().username != undefined && this.state.User.DisplayName!=undefined && this.router.getCurrentParams().username.toLowerCase() != this.state.User.DisplayName.toLowerCase() && FetchingUser == false){
      //         FetchingUser = true;
      //         FollowingActions.loadFollowing(this.router.getCurrentParams().username);
      // }
  
  	},
	render: function(){


  if(!this.props.user.FullProfileAccess){

          var FollowerObj = <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-lock lock"></i><span>This User is Private</span></div>;

  }
  else{
        if(this.state.Followers && this.state.Followers.length > 0){
        var FollowerObj = this.state.Followers.map(function(aItem, index){
                          return(
                            <Followers fobj={this.state.Followers[index]} tenant={this.props.tenant} key={index} />
                          )
                        }.bind(this));
        }else{
         var FollowerObj = <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-mood-bad lock"></i><span>User does not have any followers yet</span></div>;
        }
  }

		return(
							  <div className="mdl-grid mdl-grid--no-spacing listofollowers">
                  <div className="mdl-cell mdl-cell--12-col">                            
                      <div className="mdl-grid mdl-grid--no-spacing">
                        <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                         {FollowerObj}
                        </div>
                      </div>
                  </div>
                </div>
		);
	}

});


ListOFollowers.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default ListOFollowers;




