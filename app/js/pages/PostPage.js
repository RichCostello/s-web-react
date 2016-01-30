import PostActions from '../actions/PostActions';
import PostOffice   from '../stores/PostOffice'; 

var PostPage = React.createClass({

  mixins: [PostOffice.mixin],
  storeDidChange: function(){
    //Do Nothing
  },
  getInitialState: function() {

        return ({
            post:{}
        });
  },
  componentWillMount: function(){
        this.router = this.context.router;  
        var post = this.router.getCurrentParams().post;
        functions.redirect(post, "post");
  },
  render: function() {
    return (
        <DocumentTitle title="Stationlocal | Post Page">
          <div className="postpage dtable">
            <div className="tcell">
              <PostModal ID={this.router.getCurrentParams().post} context={this.context} tenant={this.props.tenant} />
            </div>
          </div>
        </DocumentTitle>
      )

  }
});

PostPage.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default PostPage;