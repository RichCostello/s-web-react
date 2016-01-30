
var ViewStation = React.createClass({
	
	render: function(){

		 if(this.props.tenant == 'none'){var primary = '#ff5722';}else{var primary = this.props.tenant.Primary;}
        var brandedbk={backgroundColor:primary,borderColor:primary}

		return(
			<Link to="Station" className="shadow" params={this.props.link}>
				<div className="viewStation" style={brandedbk}>
					<i>{'View Station'}</i>
				</div>
			</Link>
		);
	}

});

export default ViewStation;