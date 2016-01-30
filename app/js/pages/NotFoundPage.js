var NotFoundPage = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
              <DocumentTitle title="Stationlocal | 404 Not Found">
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">                            
                        <div className="mdl-grid mdl-grid--no-spacing">
                          <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--12-col-desktop">
                              <img src="/images/404-error.jpg" />

                              <center><h2>Return to <Link to="Splash" style={{color:'red'}}>Homepage</Link></h2></center>
                          </div>
                        </div>
                    </div>
                  </div>
                </DocumentTitle>
    );
  }

});

export default NotFoundPage;