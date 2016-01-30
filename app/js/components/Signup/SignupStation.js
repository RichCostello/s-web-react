var SignupStation = React.createClass({
 
 render: function() {

    var hero = {backgroundImage: 'url('+this.props.tenant.hero+')'};

    return (
      <section className="splash-page signup">
          <div className="hero signup">
            <div className="gradient">

                <div className="odh2">
                  <TakeTour />
                  <img src="/images/splash_screen_logo.png" className="logo" />
                  <SignupForm {...this.props} />
                </div>
                <SimpleFooter />
            </div>
          </div>
        </section>
    );
  }

});

export default SignupStation;