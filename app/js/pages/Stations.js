import StationStore             from '../stores/StationStore';
import StationActions           from '../actions/StationActions';

var Stations = React.createClass({

  mixins: [StationStore.mixin],
  
  getInitialState: function() {
    return {
      'allStations': undefined
    };
  },
  storeDidChange: function(){
    var s = StationStore.fetchAllStations();
    if(s!= undefined){this.setState(s);}else{this.forceUpdate(s)}
  },
  onScroll: function(){
    var subdomain = window.location.hostname.substring(0,window.location.hostname.indexOf('.'));
    var contentScrollTop = parseInt($('#StationsPage').css('height').replace('px',''))-window.innerHeight-$('.mdl-layout__content')[0].scrollTop;
    var sl = this.state.allStations.length;
    // console.log(contentScrollTop);
    // console.log(allstationsloading);
    if(contentScrollTop < 0 && allstationsloading == false){
      // console.log('load allstationsloading')
      allstationsloading = true;
      StationActions.loadAllStations(subdomain,'recent',20,sl+1,true);
    } 
  },
  componentWillMount: function(){
 
           var subdomain = window.location.hostname.substring(0,window.location.hostname.indexOf('.'));
           StationActions.loadAllStations(subdomain,'recent',20,0,false);
  },
  componentDidMount: function(){
    $( ".mdl-layout__content").bind("scroll",this.onScroll);
     if(this.state.allStations!=undefined){
       var sl = this.state.allStations.length;
         var subdomain = window.location.hostname.substring(0,window.location.hostname.indexOf('.'));
          $('.mdl-layout__content').bind("scroll",this.onScroll);
          // console.log(sl);
          if(sl<3 && allstationsloading == false){
            // console.log('shouldnt be true right now');
            allstationsloading = true;
            StationActions.loadAllStations(subdomain,'recent',20,sl+1,true);
          }
      }
  },
  componentWillUnmount: function(){
          $( ".mdl-layout__content").unbind("scroll",this.onScroll);
  },
  getStations: function(state){
    if(state.allStations!=undefined){
          var station = state.allStations.map(function(post, index){  
                return(       
                  <StationCardWithPosts {...state.allStations[index]} tenant={this.props.tenant} key={index}/>
                )
              }.bind(this));
          if(station == undefined || station == ""){

            station = <div>No results</div>

          }
    }else{
      var station = '';
    }

    return station;
 

  },
  render: function() {
        return( 
            <DocumentTitle title="Stationlocal | Stations">
              <div id="StationsPage" className="mdl-grid mfpage">
                  {this.getStations(this.state)}         
              </div>
            </DocumentTitle>
        )


  }
});


export default Stations;