var burgundy = React.createClass({
    
  componentDidMount(){

            var baseURL = 'http://www.joshuawink.com/videos/stayClassy.mp4';    
                    jwplayer('burgundy').setup({
                    file: baseURL,
                    // image: cover,
                    title: 'Play',
                    width: '100%',
                    height: '100%',
                    autostart: 'true',
                    controls: 'true',
                    repeat: 'true'
                    });
  },
    render: function() {
         return(
            <div id="burgundy">

            </div>
            );
    }
});



export default burgundy;