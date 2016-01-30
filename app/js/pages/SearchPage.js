import Auth           from '../mixins/AuthenticatedrouteMixin.js';

var SearchPage = React.createClass({

  mixins: [Auth],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },
  showHide: function(){
    
    if(document.getElementById('search').value == ""){
      document.getElementById('example').style.display = "block";
      document.getElementById('results').style.display = "none";
    }
    else{
      document.getElementById('example').style.display = "none";
      document.getElementById('results').style.display = "block";
    }

  },
  hideShow: function(){
    document.getElementById('search').value = "";
    document.getElementById('example').style.display = "block";
    document.getElementById('results').style.display = "none";
  },
  render: function() {
    return ( 
           <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--12-col">                            
                  <div className="mdl-grid mdl-grid--no-spacing">
                      <div className="mdl-cell mdl-cell--12-col">
                        <div className="search-box mdl-shadow--2dp">
                          <input type="text" id="search" placeholder="Search" onKeyUp={this.showHide} />
                          <a href="#" className="close-search" onClick={this.hideShow}>
                              <i className="zmdi zmdi-close-circle cp"></i>
                          </a>
                        </div>
                      </div>
                      <div className="mdl-cell mdl-cell--12-col search-banner">
                        <h4>Categories</h4>
                      </div>
                      <div className="mdl-cell mdl-cell--12-col" id="example">
                        <ul className="search-results">
                            <li>Top Level Category</li>
                            <li>Top Level Category</li>
                            <li>Top Level Category</li>
                            <li>Top Level Category</li>
                            <li>Top Level Category</li>
                            <li>Top Level Category</li>
                        </ul>
                      </div>

                      <div className="mdl-cell mdl-cell--12-col" id="results">
                        <div>       
                            <div className="mdl-grid mdl-list">
                                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                                    <Link to="User" params={{username: 'jim'}}><img src="/images/gopro_profile.jpg" className="image-avatar" /></Link>
                                </div>
                                <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--2-col-phone">
                                    <div>
                                        <span>@ </span>
                                        <span>LMaverickL</span>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                                    <div className="action-marg">
                                        <FollowingBtn isFollowing="true" userID="1" {...this.props} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>       
                            <div className="mdl-grid mdl-list">
                                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                                    <Link to="User" params={{username: 'jim'}}><img src="/images/gopro_profile.jpg" className="image-avatar" /></Link>
                                </div>
                                <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--2-col-phone">
                                    <div>
                                        <span>@ </span>
                                        <span>LMaverickL</span>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                                    <div className="action-marg">
                                        <FollowingBtn isFollowing="true" userID="1" {...this.props} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>       
                            <div className="mdl-grid mdl-list">
                                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                                    <Link to="User" params={{username: 'jim'}}><img src="/images/gopro_profile.jpg" className="image-avatar" /></Link>
                                </div>
                                <div className="mdl-cell mdl-cell--8-col mdl-cell--6-col-tablet mdl-cell--2-col-phone">
                                    <div>
                                        <span>@ </span>
                                        <span>LMaverickL</span>
                                    </div>
                                </div>
                                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                                    <div className="action-marg">
                                        <FollowingBtn isFollowing="true" userID="1" {...this.props} />
                                    </div>
                                </div>
                            </div>
                        </div>

                      </div>
                  </div>
              </div>
            </div>
    );
  }

});

export default SearchPage;