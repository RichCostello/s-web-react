var SidebarListeningStore = require('../../stores/SidebarListeningStore');

var AddContentBtn = React.createClass({
	mixins: [SidebarListeningStore.mixin],
	storeDidChange: function(){

      var stations = SidebarListeningStore.fetchUserListening();
      if(stations!= undefined){ this.setState(stations);}else{this.forceUpdate(stations)}

    },
    getInitialState: function() {
        return ({
            userListening:[]
        });
    },
	expand: function(){

		var el = document.getElementById('add');
		var className = document.getElementById('add_sub_nav').className;


		if(className == "active"){
			document.getElementById('add_sub_nav').className = '';
			el.className = el.className.replace('active','');
		}
		else{
			document.getElementById('add_sub_nav').className = 'active';
			el.className = el.className + ' active';
		}

	},
	create(str){
		this.expand();
		$('.fixedModal').css('display','block');
		if(str=='photo'){
			  ModalActions.setContent(<CreatePhoto {...this.state} tenant={this.props.tenant} />);
		}
		if(str=='video'){
			  ModalActions.setContent(<CreateVideo {...this.state} tenant={this.props.tenant} />);
		}
	},
	render: function(){


  //     	<li>
      	 
		// 	  <button className="demo mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp" className="add_sub" onClick={this.create.bind(this,'audio')}>
	 //            <i className="zmdi zmdi-mic" style={textColor}></i>
	 //          </button>
     
  //     	</li>

		
		if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
		
		var branded={backgroundColor:primary,color:'rgba(255,255,255,.8)'}
		var textColor={color:primary}

		return(
				<div>
				  <button className="demo mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp" style={branded} onClick={this.expand} id="add">
		            <i className="material-icons" role="presentation">add</i>
		          </button>
		          <ul id="add_sub_nav">
		          	<li>
		          
						  <button className="demo mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp add_sub" onClick={this.create.bind(this,'photo')}>
				            <i className="zmdi zmdi-camera" style={textColor}></i>
				          </button>
			        
		          	</li>
		          	 <li>
		          
						  <button className="demo mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp add_sub" onClick={this.create.bind(this,'video')}>
				            <i className="zmdi zmdi-videocam" style={textColor}></i>
				          </button>
			        
		          	</li>
		          </ul>	
		        </div>
	    );
	}

});

export default AddContentBtn