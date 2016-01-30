var SignupStation = React.createClass({
 
 render: function() {

    return (
       <section className="splash-page login">
            <div className="hero signup">
                <div className="gradient">
                  <div className="odh2">
                      <TakeTour />
                      <img src="/images/splash_screen_logo.png" className="logo" />
                      <LoginForm {...this.props} className="odh" />    
                  </div>
                  <SimpleFooter />
                </div>
          </div>
          </section>
    );
  }

});

export default SignupStation;