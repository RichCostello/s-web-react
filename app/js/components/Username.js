var Username = React.createClass({

	render: function(){
		
		if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color: primary};

		var links = {username:''}
		if(this.props.CreatorDisplayName){links = {username:this.props.CreatorDisplayName}}

		return(
                <div className="Username"><Link to="User" params={links} query={{posts:true}} style={branded}><span>@</span>{this.props.CreatorDisplayName}</Link></div>
		);
	}

});


export default Username;