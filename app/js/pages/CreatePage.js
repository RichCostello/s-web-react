var SidebarListeningStore = require('../stores/SidebarListeningStore');


var CreatePage = React.createClass({

   mixins: [SidebarListeningStore.mixin],

    storeDidChange: function(){

      var stations = SidebarListeningStore.fetchUserListening();
      if(stations!= undefined){ this.setState(stations);}else{this.forceUpdate(stations)}

    },
    getInitialState: function() {
        return ({
            userListening:[]
        });
    },

  getCreateType: function(){


    var type = window.location.pathname;

    switch(type){

      case '/create/photo':
        return <CreatePhoto {...this.state} tenant={this.props.tenant} />
        break;
      case '/create/video':
        return <CreateVideo {...this.state} tenant={this.props.tenant} />
        break;
      case '/create/audio':
        return <CreateAudio {...this.state} tenant={this.props.tenant} />
        break;
      case '/create/live':
        return <CreateLive {...this.state} tenant={this.props.tenant} />
        break;
      default:
        return <CreatePhoto {...this.state} tenant={this.props.tenant} />
        break;
    }


  },
  
  render: function() {

    return (
      <DocumentTitle title="Stationlocal | Create Content">
                  <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">                            
                        <div className="mdl-grid mdl-grid--no-spacing">
                          <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--12-col-desktop">
                                  <div className="mdl-cell mdl-cell--12-col">                                                                    
                                       <CreateType {...this.props} />
                                       {this.getCreateType()}
                                  </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </DocumentTitle>
    );
  }

});

export default CreatePage;