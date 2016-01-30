


var display = {display : 'none'}
var displayStation = {display: 'block'}

var AppHeader = React.createClass({
	getInitialState: function() {
    	    return ({
      'currentUser': {}

  });
  	},
  	componentWillMount: function(){
        this.router = this.context.router;

  	},
 	  render: function(){
        
        if(this.props.tenant == 'none'){
          displayStation = {display : 'block'};
          var primary = '#ff5722';
        }
        else{
          displayStation = {display: 'none'};
          var primary = this.props.tenant.Primary;
        }



      if(this.props.isLoggedIn)
      {display = {display : 'block'};}
      else{display = {display: 'none'};}
      

  		
  		var branded={color:primary};
  		var appHeaderStyle = document.getElementById('appHeaderStyle');
    	
      if(!appHeaderStyle && primary){   
  		  $("body").append('<style id="appHeaderStyle" class="style">.mdl-layout__tab.is-active, .mdl-tabs__tab.is-active{ border-bottom: 4px solid '+primary+' !important;} </style>');
  		}

		return(

			<header className="mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600 is-casting-shadow">
		      <Hammenubrnd {...this.props} />
		        <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
            
		        <div className="mdl-tabs__tab-bar">
		        	 
		           <div>
			        <Link to="Feed" className="mdl-layout__tab" style={branded}><i className="zmdi zmdi-filter-list zmdi-hc-fw"></i>Feed</Link>
			        </div>
			         <div>
			        <Link to="Stations" className="mdl-layout__tab" style={branded}><i className="zmdi zmdi-portable-wifi zmdi-hc-fw"></i>Stations</Link>
			         </div>
			         <div style={display}>
			        <Link to="Activity" className="mdl-layout__tab" style={branded}><i className="zmdi zmdi-notifications-none zmdi-hc-fw"></i>Activity</Link>
			        </div>

			        <div className="flex1 relative" style={display}>
		        	  	<AddContentBtn {...this.props} />
		        	</div>
				</div>
					<div className="mdl-tabs__panel is-active" id="posts-panel"></div>
				</div>
				
		    </header>
		);
	}
});

AppHeader.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default AppHeader;