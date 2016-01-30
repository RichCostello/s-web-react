var InputError = React.createClass({
	
	hide: function(){
		document.getElementById('error_message').style.display = "none";
	},
	render: function(){

		if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}
		
		var branded = {backgroundColor: primary}
		var border	= {borderTopColor: primary}

		return(

			<div className="error_message" style={branded} id="error_message">
					<i className="zmdi zmdi-close error_close cp" onClick={this.hide}></i>
					<span id="error_text">Please enter a valid password</span>
					<div className="error_arrow" style={border}></div>
			</div>

		);

	}

});

export default InputError;