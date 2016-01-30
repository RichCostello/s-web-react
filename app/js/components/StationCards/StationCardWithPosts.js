var convertedTime = '';
var timer;
var tpid = '';
var StationCardWithPosts = React.createClass({
 
        propTypes() {
            currentUser: React.PropTypes.object.isRequired
        },

        componentWillMount: function(){
            this.router = this.context.router;
        },
        render: function() {
             if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
            var branded={color:primary}
            var brandedbk={backgroundColor:primary}
            convertedTime = ( Math.floor(new Date().getTime())/1000) - parseInt(this.props.LastActivityAt);
            if( convertedTime < 60 ){convertedTime = 'a few seconds'; }
            if( convertedTime < 120){convertedTime = 'about a minute'; }
            if( convertedTime < 3599){ convertedTime = Math.floor( convertedTime / 60 )+' minutes';}
            if( convertedTime < 7199){ convertedTime = '1 hour';}
            if( convertedTime < 864000){ convertedTime = Math.floor( convertedTime / 3600 )+' hours';} 

            // if(this.router.getCurrentParams().station==undefined){
                if(this.props.Posts){
                     var recentPosts = this.props.Posts.map(function(post, index){
                          return(<PostPreview {...this.props.Posts[index]} key={index} tenant={this.props.tenant} />);
                        }.bind(this));
                }else{
                    var recentPosts='No posts to display';
                }

                 if(recentPosts.length<1){recentPosts='No posts to display';}
                 
            // }else{
            //     var recentPosts='';
            // }

            // if(this.router.getCurrentParams().station!=undefined &&this.props.Identifier!=undefined && this.router.getCurrentParams().station!=this.props.Identifier){
            //    console.log('*************************************** Something Went Wrong ********************************************'); 
            // }

            if(this.props.Identifier!=undefined){ tpid = this.props.Identifier; }
            var sparams = {station: tpid}


            var image = ResizeURL+"/resize/2/0/600/600/0/0/100/"+this.props.Image;

            var show = {opacity: 1.0}
            if(this.props.Website == ""){
                show = {opacity: 0}
            }
  
            return(               
                <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop m150015 stationCard">
                    <div className="mdl-card__actions mdl-card--border p2082">
                        
                        <div className="stationView">
                            <div className="stationViewHead">
                                <Link to="Station" params={sparams}><img src={image} alt="this covers alt text" /></Link>                         
                            </div>
                            <div className="stationViewContent">
                                    <StationName style={branded} {...this.props} sid={sparams} />
                                    <h2 className="mdc-text-grey stationCardh2">{functions.convertTime(this.props.LastActivityAt)}</h2>
                                    <div className="stationTitle">{this.props.Name}</div>
                                    <div className="stationCardPL">
                                    <h3 className="ilb stationCardh3" style={branded}>{functions.convertCounts(this.props.PostCount)} posts</h3>
                                    <h3 className="ilb stationCardh3" style={branded}>{functions.convertCounts(this.props.ListenCount)} listeners</h3>
                                    </div>
                                    <p className="stationCardp">{this.props.Description}</p>
                                    <a className="zmdi zmdi-link stationCarda mdc-text-grey" style={show} href={this.props.link}><span style={branded}>{this.props.Website}</span></a>
                                      <div className="recentPosts"> {recentPosts}  </div>   
                                    <ListeningBtn className="web-listening" {...this.props} stationID={this.props.ID} />
                                    <ViewBtn {...this.props} link={sparams} /> 
                            </div>
                                      
                        </div>
                    </div>
                </div>
            );
        }

});

StationCard.contextTypes = {
    router: React.PropTypes.func.isRequired
}


export default StationCardWithPosts;





