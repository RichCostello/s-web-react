var convertedTime = '';
var timer;
var tpid = '';
var StationCard = React.createClass({
  
        propTypes() {
            currentUser: React.PropTypes.object.isRequired
        },
        getInitialState: function(){
            return({});
        },

        listen: function(){
                      
             if(CurrentUserStore.checkLoginStatus()){

                if((this.state.PermissionLevel && this.state.PermissionLevel >= 1) || (this.state.PermissionLevel != 0 && this.props.PermissionLevel >= 1)){

                    ListeningActions.unlisten(this.props.ID);
                    this.setState({PermissionLevel: 0});

                }else{
                
                    ListeningActions.listen(this.props.ID);
                    this.setState({PermissionLevel: 1});

                }
            }
            else{
                this.PromptLogin();
            }
    
        },
        PromptLogin: function(){


            $('.fixedModal').css('display','block');
            ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
        },
        render: function() {

            if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
            var branded={color:primary}
            var brandedbk={backgroundColor:primary}

            var permissionLevel = this.state.PermissionLevel >= 0 ? this.state.PermissionLevel : this.props.PermissionLevel;

            if(permissionLevel > 0){
                    var listen={backgroundColor:primary, borderColor:primary}
                    var lol='Listening';
            }else{
                var listen={color:primary, borderColor:primary}
                var lol='Listen';
            }
            
            if(this.props.Identifier!=undefined){ tpid = this.props.Identifier; }
            var sparams = {station: tpid}


            var image = ResizeURL+"/resize/2/0/600/600/0/0/100/"+this.props.Image;

            var website = '';
            if(this.props.Website){website=<a className="zmdi zmdi-link stationCarda mdc-text-grey" href={this.props.link}><span className="staCardalink" style={branded}>{this.props.Website}</span></a>}

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
                                    <h3 className="ilb stationCardh3" style={branded}>{this.props.PostCount} posts</h3>
                                    <h3 className="ilb stationCardh3" style={branded}>{this.props.ListenCount} listeners</h3>
                                    </div>
                                    <p className="stationCardp">{this.props.Description}</p>
                              
                                    {website}
                             
                                   <div className="details isListening l_StationCard" style={listen} onClick={this.listen}><i><span className="zmdi zmdi-portable-wifi">{lol}</span></i></div>
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


export default StationCard;