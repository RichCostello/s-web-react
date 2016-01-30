var LoginCheck = require('../../mixins/LoginMixin.js');
var SplashStation = React.createClass({

  mixins: [LoginCheck],

  render : function() {
   
	  return (

                <section className="splash-page">
                    <div className="hero"> 

                    <div className="gradient">
                     <TakeTour />

                      <div className="station-branding">
                        <img src="/images/splash_screen_logo.png" className="logo" />
                      </div>
                      <div className="mza tac block localPulse">
                          <span className="lpulse block">the local pulse</span>
                       </div>
                      <div className="splash-content bottom">                 
                       	<Link to="Signup" className="stl wobBtn ilb shadow">Sign Up</Link>
                       	<Link to="Login" className="bowBtn ilb shadow">Log In</Link>
                      </div>
                      <SimpleFooter />
                      </div>
                     </div>
                  </section>
                
           );
    }

});

 export default SplashStation;