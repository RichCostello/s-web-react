window.PrivateLabel     = require('../mixins/HomepageRouteMixin.js');

var HomePage = React.createClass({

  mixins: [PrivateLabel],

  render: function() {
    return (
      <div>
      <DocumentTitle title="Stationlocal | Home">
          <div className="content marketing"> 
              
              <div className="mdl-grid parallax" id="banner">
                <div className="mdl-cell mdl-cell--12-col">
                        <div className="rect"></div>
                        <div className="mid">
                          <h1>A Platform to Share Your Vision with the World</h1>
                          <h2>By Content Creators, for Content Creators</h2>

                          <ul className="downloadapp">
                            <li><a href="https://itunes.apple.com/us/app/station!/id908837297?ls=1&amp;mt=8" target="_blank"><img src="/images/apple.png"></img></a></li>
                            <li><a href="https://play.google.com/store/apps/details?id=com.station" target="_blank"><img src="/images/android.png"></img></a></li>
                          </ul>
                        </div>
                </div>
              </div>

              <div className="mdl-grid parallax">
                  <div className="mdl-cell mdl-cell--6-col relative">
                         <h3>{"We're the world's most expansive"} broadcasting platform</h3>
                          <p>Station distributes your content across the globe. With support in almost every country, our platform is perfectly designed to extend your reach and find other creative individuals, places, and events.</p>
                  </div>
                  <div className="mdl-cell mdl-cell--6-col relative">
                         <img src="/images/laptop.png" className="fr max mtop" />
                  </div>
                
              </div>

              <div className="mdl-grid parallax light">
                  
                  <div className="mdl-cell mdl-cell--12-col relative">
                         <h4>Station helps creators deliver<br/>their vision in 2 ways</h4>
                  </div>
                
              </div>

              <div className="mdl-grid parallax light">
                  
                  <div className="mdl-cell mdl-cell--4-col relative">
                         <div className="centerpiece">
                           <h3 className="nomarg">{"The Station App"}</h3>
                           <h5>(iOS, Android & Web)</h5>
                           <p>A place to discover all Stations</p>
                            <ul className="list">
                              <li>Discover what is going on around you</li>
                              <li>Monetize and control your content</li>
                              <li>Bring it all together on one platform</li>
                            </ul>

                            <Link to="Feed" className="btn-orange">Visit the app</Link>
                          </div>
                  </div>
                  <div className="mdl-cell mdl-cell--4-col relative">
                         <center><img src="/images/station_gp.png" className="max" /></center>
                  </div>
                   <div className="mdl-cell mdl-cell--4-col relative">
                         <div className="centerpiece">
                           <h3 className="nomarg">{"Private label Apps"}</h3>
                           <h5>(iOS, Android & Web)</h5>
                            <p>Your Voice. Your Station.</p>
                            <ul className="list">
                              <li>Professionally Branded Apps</li>
                              <li>Built-in Analytics</li>
                              <li>Retain 100% of Your Monetization</li>
                            </ul>

                            <Link to="Feed" className="btn-orange">Learn More</Link>
                          </div>
                  </div>
                
              </div>

              <div className="mdl-grid parallax min400">
                  <div className="mdl-cell mdl-cell--6-col relative">
                         <h3>Share your creative content on Station with all of your favorite social networks</h3>
                          <p>Our platform helps you share your content directly from Station to your favorite social sites. As long as you can share it, Station can help you extend its reach.</p>
                          <p>We want to let you deliver your content how you want.</p>
                  </div>
                  <div className="mdl-cell mdl-cell--6-col relative">
                         <img src="/images/social.png" className="fr max" />
                  </div>
                
              </div>


            </div>
      </DocumentTitle>
      </div>
    );
  }

});

export default HomePage;