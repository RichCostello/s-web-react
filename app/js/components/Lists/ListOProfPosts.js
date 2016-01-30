var PostOffice = require('../../stores/PostOffice');

var ListOProfPosts = React.createClass({
	mixins: [PostOffice.mixin,],
	 getInitialState: function() {
	    return({

	       'profileposts':[],

	    });
  	},
  	 storeDidChange: function(){

        var postList = PostOffice.fetchProfilePosts();
        if(postList != undefined){this.setState(postList);}
        else{this.forceUpdate(postList);}   

  	},
  	onScroll: function(){
	
	    // var contentScrollTop = parseInt($('#ProfilePage').css('height').replace('px',''))-window.innerHeight-$('.mdl-layout__content')[0].scrollTop - 76;
	    // if(this.state.profileposts){var pl = this.state.profileposts.length;}else{var pl = 0;}
 
     //  //console.log(this.state.User.HasMorePosts);
	    // if(contentScrollTop < 0 && this.props.user.HasMorePosts == true && profilepostsloading == false){
	    //   profilepostsloading = true;
     //    UserActions.loadByUsername(this.router.getCurrentParams().username,20,pl,100,0,true); 
	    // }
  	},
  	 componentWillMount: function(){
	    this.router = this.context.router;  
  	},
  	componentDidMount: function(){
       $('.mdl-layout__content').bind("scroll",this.onScroll);
    },
    componentDidUnmount: function(){
       $('.mdl-layout__content').unbind("scroll",this.onScroll);
    },
  	isPrivate: function(){

        if(!this.props.user.FullProfileAccess){

            return <div className="mdl-cell mdl-cell--12-col">                            
                        <div className="mdl-grid mdl-grid--no-spacing">
                          <div className="mdl-cell mdl-card mdl-shadow--2dp  mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                              <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-lock lock"></i><span>This User is Private</span></div>
                          </div>
                        </div>
                    </div>
        }
        else{
            return <Feed posts={this.state.profileposts} tenant={this.props.tenant}/>
        }
    },
    render: function(){


  		return(
              <div className="mdl-grid mdl-grid--no-spacing">
                      {this.isPrivate()}
              </div>
  		);
  	}

});


ListOProfPosts.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default ListOProfPosts;




