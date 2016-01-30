var GoogleMapMarkers = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(32.7300, -117.1825),
      zoom: 14,
      markers: [
        {position: new LatLng(32.7150, -117.1645)},
        {position: new LatLng(32.7170, -117.1605)},
        {position: new LatLng(32.7190, -117.1625)}
      ]
    };
  },

  render: function() {
    var center=new LatLng(32.7300, -117.1825);
    return (
      <Map
        initialZoom="14"
        center={center}
        onCenterChange={this.handleCenterChange}
        width="500"
        height={500}
        onClick={this.handleMapClick}>
        {this.state.markers.map(this.renderMarkers)}
      </Map>
      );
  },

  renderMarkers: function(state, i) {
    return (
      <Marker position={state.position} key={i} />
      );
  },

  handleMapClick: function(mapEvent) {
    var marker = {
      position: mapEvent.latLng
    };

    var markers = React.addons
      .update(this.state.markers, {$push: [marker]});

    this.setState({
      markers: markers,
      center: mapEvent.latLng
    });
  },

  handleCenterChange: function(map) {
    this.setState({
      center: map.getCenter()
    });
  }
});

module.exports = GoogleMapMarkers;