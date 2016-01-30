var Feed = React.createClass({

  render: function() {

        var posts = '';
        var leftposts = '';
        var rightposts = '';

        if(this.props.posts!=undefined){

          posts = this.props.posts.map(function(post, index){
              return(
                <Post {...this.props.posts[index]} tenant={this.props.tenant} key={index} />
              )
            }.bind(this)); 

          leftposts = this.props.posts.map(function(post, index){
            if(index % 2 == 0){
                return(
                  <Post {...this.props.posts[index]} tenant={this.props.tenant} key={index} />
                );
              }
          }.bind(this)); 

     

          rightposts = this.props.posts.map(function(post, index){
            if(index % 2 != 0){
              return(
                <Post {...this.props.posts[index]} tenant={this.props.tenant} key={index} />
              )
            }
          }.bind(this)); 

        }
        else{
          console.log("No posts");
        }

        if(window.innerWidth < 767){

                return (
                            <div className="mdl-cell mdl-cell--12-col">                            
                                <div className="mdl-grid mdl-grid--no-spacing">
                                  {posts}
                                </div>
                            </div>
                );
        }else{
            return (
                    <div className="mdl-cell mdl-cell--12-col"> 
                            <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet ilb">                            
                                <div className="mdl-grid mdl-grid--no-spacing">
                                  {leftposts}
                                </div>
                            </div>
                            <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet ilb">                            
                                <div className="mdl-grid mdl-grid--no-spacing">
                                  {rightposts}
                                </div>
                            </div>
                    </div>
                );

        }
  }

});

export default Feed;