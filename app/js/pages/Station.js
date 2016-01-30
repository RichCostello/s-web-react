import StationStore             from '../stores/StationStore';
import StationActions           from '../actions/StationActions';
 
var i = 0;


var Station = React.createClass({
  mixins: [StationStore.mixin],
  getInitialState() {
    return {
      'station':[{
        PostCount:[],
        Posts:[]
      }]
    };
  },
  storeDidChange: function(){

    var s = StationStore.fetchStation();

    /* If station was not found transition to 404 Not found page */
    if(s!= undefined && s.station == 404){
      this.router.transitionTo("Feed");
      return;
    }
    if(s!= undefined){this.setState(s);}else{this.forceUpdate(s)}

  },
  onScroll: function(e){
    var contentScrollTop = parseInt($('#stationContainer').css('height').replace('px',''))-window.innerHeight-$('.mdl-layout__content')[0].scrollTop;
    var pc = this.state.station.PostCount;
    
    if(this.state.station.Posts){
      var pl = this.state.station.Posts.length;
    }
    else{
      var pl = 0;
    }

    if(contentScrollTop < 0 && pl < pc && stationloading == false){
      stationloading = true;
      StationActions.loadStation(this.router.getCurrentParams().station,20,pl,true);
    }
  },
  componentWillMount: function(){
      this.router = this.context.router;
      var station = this.router.getCurrentParams().station

      functions.redirect(station, "station");

      StationActions.loadStation(station,20,0,false); 
  },
  componentDidMount: function(){
          $('.mdl-layout__content').bind("scroll",this.onScroll);
  },
  componentWillUnmount: function(){
          $( ".mdl-layout__content").unbind("scroll",this.onScroll);
  },
  componentDidUpdate: function(){

      if(this.router.getCurrentParams().station!=undefined &&this.state.station.Identifier!=undefined && this.router.getCurrentParams().station.toLowerCase()!=this.state.station.Identifier.toLowerCase() && reloadingStation == false){
              reloadingStation = true;
              StationActions.loadStation(this.router.getCurrentParams().station,20,0,false);
      }
 
  },
  render: function() {

      return (<div className="mdl-grid mfpage" id="stationContainer">
                        <StationCard {...this.state.station} tenant={this.props.tenant}/>
                        <Feed posts={this.state.station.Posts} tenant={this.props.tenant}/>
                        </div>);
              
      }

});

Station.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default Station;