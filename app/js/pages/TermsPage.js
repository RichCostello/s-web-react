var TextPage = React.createClass({

  render: function() {
    return (
              <DocumentTitle title="Stationlocal | Terms">
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">                            
                        <div className="mdl-grid mdl-grid--no-spacing">
                          <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--12-col-desktop">                
                             <Terms />
                          </div>
                        </div>
                    </div>
                  </div>
                </DocumentTitle>
    );
  }

});

export default TextPage;