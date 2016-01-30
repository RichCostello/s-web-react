
 
var branded= {}, primary='';
var sid = {station: ''};

var Post = React.createClass({

    play_pause: function() {

        if($('#wrap'+this.props.ID).hasClass('fade-in')){
             jwplayer('a'+this.props.ID).setControls(false);
             jwplayer('a'+this.props.ID).play();
             $('#wrap'+this.props.ID).removeClass('fade-in').addClass('fade-out');
        }else if($('#wrap'+this.props.ID).hasClass('fade-out')){
             jwplayer('a'+this.props.ID).setControls(true);
             jwplayer('a'+this.props.ID).play();
             $('#wrap'+this.props.ID).removeClass('fade-out').addClass('fade-in');
        }else{
             jwplayer('a'+this.props.ID).setControls(false);
             jwplayer('a'+this.props.ID).play();
             $('#wrap'+this.props.ID).addClass('fade-out');
        }
    },
    viewPost: function() {
        $('.fixedModal').css('display','block');
        ModalActions.setContent(<PostModal id={this.props.ID} context={this.context} tenant={this.props.tenant} key="0" />);
    },
    componentWillMount: function(){
        this.router = this.context.router;

    },
    componentDidMount: function(){
        // console.log('componentDidMount');
        $(window).load(function(){
                $('.jwpreview').attr('style','Background-size: cover !important');
        });
        
        if(this.props.MediaType > 1){
            var idToPlay = 'a'+this.props.ID;
            var baseURL = this.props.LiveURL;
            var cover = ResizeURL+"/resize/1/0/1024/1024/0/0/100/"+this.props.MediaLink;;
            var playerWidth = $($('.PostcardFoot')[0]).css('width').replace('px','') + 10;
                    jwplayer(idToPlay).setup({
                    file: baseURL,
                    image: cover,
                    title: 'Play',
                    width: playerWidth,
                    height: '360',
                    autostart: 'false',
                    controls: 'true'
                    });               
          }
    },
	render: function(){
    
       if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}

        var backgroundImg = ResizeURL+"/resize/1/0/800/800/0/0/100/"+this.props.MediaLink;
            backgroundImg = {backgroundImage: 'url('+backgroundImg+')'}


        /* Example images */      
        if(this.props.StationIdentifier != undefined && this.props.StationIdentifier != ""){
            sid = {station: this.props.StationIdentifier};
        }
 
		return(

			<div  id={'post'+this.props.ID} className="demo-cards mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-grid mdl-grid--no-spacing">


                <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--10-col-tablet mdl-cell--12-col-desktop">
                        <PostcardHead {...this.props} style={branded} sid={sid} />


                    <div className="mdl-card__title mdl-card--expand">
                        <div className="stationimg-card" style={backgroundImg} id={'a'+this.props.ID} onClick={this.viewPost}>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
     viewBox="0 0 200 200" enable-background="new 0 0 200 200">
                                <rect x="0.4" y="0" fill="#FFFFFF" opacity="0" stroke="#231F20" stroke-miterlimit="10" width="199.6" height="199.6"/>
                            </svg>
                        </div>
                    </div>

                    <div className="mdl-card__actions">
                        <PostcardFoot {...this.props} style={branded}/>
                    </div>
                </div>
            </div>
		);
	}

});

Post.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default Post;