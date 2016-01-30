var LoginCheck = require('../../mixins/LoginMixin.js');
var SplashPL = React.createClass({

  mixins: [LoginCheck],

  render : function() {
   // console.log(this.props);
    var hero = {backgroundImage: 'url('+this.props.tenant.Hero+')'};

    return (

                <section className="splash-page">

                    <div className="hero" style={hero}>

                    <div className="gradient">
                     
                      <div className="splash-content">
                 
                       <img src={this.props.tenant.Logo} />
                       <Link to="Signup" className="wobBtn ilb shadow">Sign Up</Link>
                       <Link to="Login" className="bowBtn ilb shadow">Log In</Link>
                      </div>
                      <div className="mza tac block poweredByBlock">
                          <span className="poweredBy block">POWERED BY</span>
                          <span className="pbstation block">STATION</span>
                       </div>
                          <SimpleFooter />
                       </div>
                    </div>
                  </section>
                
           );
    }

});

 export default SplashPL;