var CreateType = React.createClass({
	
	render: function(){
		 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
		var brandedbg = {backgroundColor: primary};
	    var branded = {color: primary};
	
		return(
			 <ul className="contentType" style={brandedbg}>
                <li><Link to="Photo" href="#" style={branded}><i className="zmdi zmdi-camera"></i></Link></li>
                <li><Link to="Video" href="#" style={branded}><i className="zmdi zmdi-videocam"></i></Link></li>
                <li><Link to="Audio" style={branded}><i className="zmdi zmdi-mic"></i></Link></li>
                <li><Link to="Live" style={branded}><i className="zmdi zmdi-tv-alt-play"></i></Link></li>
            </ul>
		)

	}


});

export default CreateType;