var ActivityStore = require('../stores/ActivityStore');

var Activity = React.createClass({

  mixins: [ActivityStore.mixin],

  storeDidChange: function(){

    var activityList = ActivityStore.fetchActivities();

    if(activityList != undefined){ this.setState(activityList);}
    else{this.forceUpdate(activityList);}
    
  },
  getInitialState: function() {
    return({
       activities : []
    });
  },
  componentWillMount: function(){

    /* This will have to be the user for whom we need to load the activities */
    ActivityActions.loadActivities();

  },
  getActivitiesList: function(state){

    var ActivityObj;

     if(state.Activities){
       ActivityObj = state.Activities.map(function(aItem, index){
                        return(
                          <ActivityItem activityObjects={state.Activities[index]} tenant={this.props.tenant} key={index} />
                        )
                      }.bind(this));
      }
      if(ActivityObj == undefined || ActivityObj == ""){
        ActivityObj = <div className="mdl-grid mdl-list">
                        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone small">There are currently no activities available by this user!</div></div>;
      }

      return ActivityObj;

  },
  render: function() {

    return(
               <DocumentTitle title="Stationlocal | Activities">
                  <div className="mdl-grid activity">
                    <div className="mdl-cell mdl-cell--12-col">                            
                        <div className="mdl-grid mdl-grid--no-spacing">
                          <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                             {this.getActivitiesList(this.state)}
                          </div>
                        </div>
                    </div>
                  </div>
                </DocumentTitle>
        )
  }
});

export default Activity;


