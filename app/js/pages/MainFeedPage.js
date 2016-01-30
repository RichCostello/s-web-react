var PostOffice = require('../stores/PostOffice');

var MainFeed = React.createClass({

  mixins: [PostOffice.mixin],

  getInitialState: function() {
    return {
      'feed':[{}]
    };
  },
  storeDidChange: function(){

    var s = PostOffice.fetchFeed();
    if(s!= undefined){this.setState(s);}else{this.forceUpdate(s)}
  },
  onScroll: function(){

    var contentScrollTop = parseInt($('#MainFeedPage').css('height').replace('px',''))-window.innerHeight-$('.mdl-layout__content')[0].scrollTop - 600;
    var fl = this.state.feed.length;

    if(contentScrollTop < 0 && feedloading == false){
      feedloading = true;
      PostActions.loadFeed(20,fl,true);
    }
  },
  componentWillMount: function(){
           var subdomain = window.location.hostname.substring(0,window.location.hostname.indexOf('.'));
           PostActions.loadFeed(20, 0,false);
  },
  componentDidMount: function(){
          $('.mdl-layout__content').bind("scroll",this.onScroll);
  },
  componentWillUnmount: function(){
          $( ".mdl-layout__content").unbind("scroll",this.onScroll);
  },
  render: function() {
        return(             
              <DocumentTitle title="Stationlocal | Feed">
                <div id="MainFeedPage" className="mdl-grid mfpage">
                    <Feed posts={this.state.feed} tenant={this.props.tenant}/>    
                </div>
              </DocumentTitle>
        )
  }
});
 
export default MainFeed;