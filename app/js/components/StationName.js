var StatName = React.createClass({
	render: function(){
		if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
		var branded = {color: primary};
		
		if (this.props.StationIdentifier && this.props.StationIdentifier){
			var sname = this.props.StationIdentifier;
		}else{
			var sname = this.props.Identifier;
		}
		return(
                    <div className="StationName" style={this.props.style}>
                     <i className="zmdi zmdi-portable-wifi mdc-text-grey"></i>
                     <Link to="Station" params={this.props.sid} style={branded}>{sname}</Link>
                    </div>
		);
	}

});


export default StatName;