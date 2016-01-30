var zoom;
var initMarkX = [];
var initMarkY = [];
var markerDist;
var clusters = [];
var overlayArray = [];
var markers;

window.PrivateLabel     = require('../mixins/HomepageRouteMixin.js');


var DiscoveryPage = React.createClass({

  mixins: [PrivateLabel],

  getInitialState: function() {
    return {
      list:
        [
         {
          title: 'Events Name/Title',
          category: 'Category - Cost',
          desc: 'Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon',
          position: {x: 32.7171, y: -117.1641}
         },
         {
          title: 'Events2 Name/Title',
          category: 'Category - Cost',
          desc: 'Ham Ham Ham Ham Ham Ham Ham Ham Ham Ham Ham Ham',
          position: {x: 32.7172, y: -117.1642}
         },
         {
          title: 'Events3 Name/Title',
          category: 'Category - Cost',
          desc: 'Sausage Sausage Sausage Sausage Sausage Sausage Sausage Sausage Sausage Sausage Sausage Sausage',
          position: {x: 32.7173, y: -117.1643}
         },
         {
          title: 'Events Name/Title',
          category: 'Category - Cost',
          desc: 'Pork Pork Pork Pork Pork Pork Pork Pork Pork Pork Pork Pork',
          position: {x: 32.7184, y: -118.1644}
         },
         {
          title: 'Events2 Name/Title',
          category: 'Category - Cost',
          desc: 'Ribs Ribs Ribs Ribs Ribs Ribs Ribs Ribs Ribs Ribs Ribs Ribs',
          position: {x: 32.7175, y: -117.1645}
         },
         {
          title: 'Events3 Name/Title',
          category: 'Category - Cost',
          desc: 'Feet Feet Feet Feet Feet Feet Feet Feet Feet Feet Feet Feet',
          position: {x: 32.7176, y: -117.1656}
         }
        ]
      ,
      center: new LatLng(32.7173, -117.1643),
      zoom: 14
    };
  },
  handleCenterChange: function(map) {
    this.setState({
      center: map.getCenter()
    });
  },
  handleClick(str){
    console.log('clicked');
    if($('.map_canvas').hasClass('shiftUp')){
       $('.map_canvas').removeClass('shiftUp').addClass('shiftDown');
       $('.DisToolbar').removeClass('toolShiftUp').addClass('toolShiftDown');
    }else{
      $('.map_canvas').removeClass('shiftDown').addClass('shiftUp');
      $('.DisToolbar').removeClass('toolShiftDown').addClass('toolShiftUp');
    }
    console.log(str);
    console.log(this);
  },
  handleZoomChange(map){

      zoom = map.getZoom();
      console.log(zoom);
      $('.map_canvas').find('.overlayView').remove();
      markers = [];
      overlayArray = [];
      initMarkX = [];
      initMarkY = [];
      clusters = [];


      markers = this.state.list.map(this.renderMarkers);

  },
  renderMarkers: function(state, index) {

        //we are looping through the markers
        //position n/s
        var markX = state.position.x;
        //position e/w
        var markY = state.position.y;
        if(zoom==17){markerDist = 0.000625;}
        if(zoom==16){markerDist = 0.00125;}
        if(zoom==15){markerDist = 0.025;}
        if(zoom==14){markerDist = 0.1;}
        if(zoom==13){markerDist = 0.2;}
        if(zoom==12){markerDist = 0.3;}
        if(zoom==11){markerDist = 0.4;}
        if(zoom==10){markerDist = 0.5;}
        if(zoom==9){markerDist = 0.6;}
        if(zoom==8){markerDist = 0.7;}
        if(zoom==7){markerDist = 0.8;}
        if(zoom==6){markerDist = 0.9;}
        if(zoom==5){markerDist = 1;}
        if(zoom==4){markerDist = 5;}
        if(zoom==3){markerDist = 10;}
        if(zoom==2){markerDist = 15;}
        if(zoom==1){markerDist = 20;}

        //get first point
        if(initMarkX[0] == undefined){
          initMarkX[0] = markX;
          initMarkY[0] = markY;
        }

        //compare first point to second point
        //markerDist is based on zoom level right now marker dist is 0.0005
        //0.0005 X

        var dex = 0;
        var inserted = false;
        //loop through initMarkers to find a cluster to put a point into 
        for(i=0; i < initMarkX.length; i++){

            if(markX > initMarkX[i] - markerDist && markX < initMarkX[i] + markerDist && markY > initMarkY[i] - markerDist && markY < initMarkY[i] + markerDist){
                //this marker point is within 0.001 radians from init
                //this is also the first cluster regarless
                inserted=true;
                
                if(clusters[i]==undefined){
                  clusters[i]=new Array();
                }
                //push mark into cluster
                clusters[i].push(state.position);
                break;
            }
            
            if(i==initMarkX.length-1 && inserted == false) 
                //make new init point 
                initMarkX.push(markX);
                initMarkY.push(markY);

                //make new cluster and push the mark
                var cl = parseInt(clusters.length);
                if(clusters[cl]==undefined){
                clusters[cl]=new Array();
                } 

                clusters[cl].push(state.position);
                break;
            
        }

        if(index == this.state.list.length-1){
          for(var k=0;k<clusters.length;k++){
              var overlayNum = clusters[k].length;
              var overlayPos = new LatLng(clusters[k][0].x, clusters[k][0].y);
              var ciRad;
              if(overlayNum==1){ciRad={height: 30, width:30}}
                if(overlayNum==4){ciRad={height: 50, width:50}}
                  if(overlayNum==5){ciRad={height: 80, width:80}}
                    if(overlayNum==6){ciRad={height: 110, width:110}}
              
                      // console.log(OverlayView.OVERLAY_MOUSE_TARGET);
               overlayArray.push(
                <OverlayView className={'overlayView ov'+k} style={ciRad} position={overlayPos} mapPane="floatPane" getPixelPositionOffset={this.getPixelPositionOffset} key={k}><span onClick={this.handleClick.bind(this)} className="dtable"><div className="tcell vam">{overlayNum}</div></span></OverlayView>
              );
          }

          if(k == overlayArray.length){
          return(overlayArray);
          }

        }

            //return (<Marker className="label" icon={circleMarker} label={'stationsNum'} position={state.position} />);

  },
  componentWillMount(){

      zoom=this.state.zoom;
      //responsive function for map
      google.maps.event.addListener(window, "resize", function() {
       var center = map.getCenter();
       google.maps.event.trigger(Map, "resize");
       Map.setCenter(center); 
      });
      //end responsive for map

     markers = this.state.list.map(this.renderMarkers);
  },
  componentWillUnmount: function(){
    google.maps.event.clearListeners(Map);
  },
  render: function() {

    //this should be a call to update the list, but this will work for now

  

        return( 
            <div>
              <SubNavigation {...this.props} id="discoverySub" />
              <div className="DiscoveryPage">
                
                 <div className="map_canvas">
                <Map initialZoom={this.state.zoom} center={this.state.center} onZoomChange={this.handleZoomChange} onCenterChange={this.handleCenterChange} width="100%" height="100%">
                {markers}
                  </Map>
                  </div>
                  <DiscoverList {...this.state} />
              </div>
            </div>
        )
  }
});

export default DiscoveryPage;

