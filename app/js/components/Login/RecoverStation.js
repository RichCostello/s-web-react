var RecoverStation = React.createClass({

	render: function() {

		return (
	        <section className="splash-page recover">
	        	<div className="hero">
			          <div className="gradient">
			          	<TakeTour />
			             <div className="odh2">
			             	 <img src="/images/splash_screen_logo.png" className="logo" />
			             	<RecoverForm {...this.props} className="odh" />    
			             </div>
			             <SimpleFooter />
			          </div>
			    </div>
	        </section>
	      );
	}
});

export default RecoverStation;