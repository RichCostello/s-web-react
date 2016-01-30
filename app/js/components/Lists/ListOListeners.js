var ListeningStore = require('../../stores/ListeningStore');

var ListOListeners = React.createClass({
	mixins: [ListeningStore.mixin,],
	 getInitialState() {
	    return({

	        'listeningList' : [],
 
	    });
  	},
  	 storeDidChange: function(){

        var listeningList = ListeningStore.fetchListening();
        if(listeningList != undefined){this.setState(listeningList);}
        else{this.forceUpdate(listeningList);}    

  	},
    onScroll(){
      // /* -76 at the end to compensate for .mdl-grid.pfile margin-top: -76px */
      // var contentScrollTop = parseInt($('#ProfilePage').css('height').replace('px',''))-window.innerHeight-$('.mdl-layout__content')[0].scrollTop - 76;
      // if(this.state.listeningList){var ll = this.state.listeningList.length;}else{var ll = 0;}
 
      // if(contentScrollTop < 0 && this.state.listeningList.length < this.props.user.TotalSations && listeninglistloading == false){
      //   listeninglistloading = true;
      //   UserActions.loadByUsername(this.router.getCurrentParams().username,20,0,10,ll,true); 
      // }
    },
  	componentWillMount: function(){

	    this.router = this.context.router;    
  	},
    componentDidMount: function(){
       $('.mdl-layout__content').bind("scroll",this.onScroll);
    },
    componentDidUnmount: function(){
       $('.mdl-layout__content').unbind("scroll",this.onScroll);
    },
	render: function(){
        
        var ListeningObj = "";

        console.log(this.props.user)

        if(!this.props.user.FullProfileAccess){

          
          ListeningObj = <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-lock lock"></i><span>This User is Private</span></div>;

        }
        else
        {        
          ListeningObj = this.state.listeningList.map(function(aItem, index){
                            return(
                              <Listening lobj={this.state.listeningList[index]} tenant={this.props.tenant} key={index} />
                            )
                          }.bind(this));
          
          if(ListeningObj == undefined || ListeningObj == ""){
             ListeningObj = <div className="mdl-grid mdl-list priv"><i className="zmdi zmdi-mood-bad lock"></i><span>User is currently not subscribed to any stations</span></div>;
          }

       }        


		return(
							  <div className="mdl-grid mdl-grid--no-spacing listolisteners">
                                <div className="mdl-cell mdl-cell--12-col">                            
                                    <div className="mdl-grid mdl-grid--no-spacing">
                                      <div className="mdl-cell mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                                       {ListeningObj}
                                      </div>
                                    </div>
                                </div>
                              </div>
		);
	}

});


ListOListeners.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default ListOListeners;




