var UpdatePasswordStation = React.createClass({

	render: function() {

	    return (
	        <section className="splash-page">
	        	<div className="hero signup">
			          <div className="gradient">
			          	<TakeTour />
			             <div className="odh2">
			             	 <img src="/images/splash_screen_logo.png" className="logo" />
			             	<UpdatePasswordForm {...this.props} className="odh" />    
			             </div>
			             <SimpleFooter />
			          </div>
			    </div>
	        </section>
	      );
	}
});

export default UpdatePasswordStation;