import PostOffice             from '../../stores/PostOffice';
import PostActions           from '../../actions/PostActions';

var ProfilePosts = React.createClass({
	
	mixins: [PostOffice.mixin],
	getInitialState: function() {
	    return {
	      'pageposts':[{}]
	    };
	},
	storeDidChange: function(){

	    var s = PostOffice.fetchPagePosts();
	    if(s!= undefined){this.setState(s);}else{this.forceUpdate(s)}

	    console.log(s);
	},
	componentWillMount: function(){
	    this.router = this.context.router;
	    PostActions.loadPagePosts();
	},

	render: function(){

		return(
			<Feed posts={this.state.pageposts} tenant={this.props.tenant}/>
		);

	}

});

ProfilePosts.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default ProfilePosts;