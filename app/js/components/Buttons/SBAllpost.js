

var SBAllpost = React.createClass({

	clickHandler: function(){
		console.log("Show all Posts");
	},	
 componentWillMount: function(){
             functions.drawSlidedd();
        },
    render: function() {
     
         if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary, borderColor: primary}

        var linkParams = {username:''}
        if(this.props.userInfo.Profile.DisplayName){ linkParams = {username:this.props.userInfo.Profile.DisplayName} }

        return (
      		<a href="#" onClick={this.clickHandler}>
		          <Link to="User" className="PostcardUserpic sb" params={linkParams} query={{posts:true}}><div className="view-all-sb" style={branded}  onClick={this.drawSlidedd}>
		           	 View All Posts
		          </div></Link>
		    </a>
        );
    }
});

export default SBAllpost;