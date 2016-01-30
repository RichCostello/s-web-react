var SignupPL = React.createClass({
 
  render: function() {

    var hero = {backgroundImage: 'url('+this.props.tenant.Hero+')'};

    return (
      <section className="splash-page signup">
          <div className="hero" style={hero}>
            <div className="gradient">
                <div className="odh2">
                  <img src={this.props.tenant.Logo} />
                  <SignupForm {...this.props} />
                </div>
                <SimpleFooter />
            </div>
          </div>
        </section>
    );
  }

});

export default SignupPL;