

 var ProgressModal = React.createClass({
	
	
	render: function(){

		 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
		var branded = {color: primary}


		return(
			<div id="ProgressModal" className="progressModal">
				<h1>Upload Progress</h1>

				<div id="progressBar">
					<div id="progress"></div>
				</div>

				<div id="progressError">
					<div id="progressErrorText">Whoops, Something went wrong with the Upload :(</div>
					<div id="cancelError">Cancel</div>
				</div>

			</div>
		);

	}

});





export default ProgressModal;







