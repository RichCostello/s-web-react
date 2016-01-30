
import CurrentUserStore    from '../../stores/CurrentUserStore';
var SBUserInfo = React.createClass({
    mixins: [CurrentUserStore.mixin],

    getInitialState: function(){
      return{
      };
    },

    storeDidChange: function(){

        var l = CurrentUserStore.fetchCurrentUser();

          if(l != undefined){
          this.setState(l);
        }
        else{
          this.forceUpdate(l);
        }
    },   

    linkAccounts: function(){
        $('.fixedModal').css('display','block');
        ModalActions.setContent(<LinkAccountsModal tenant={this.props.tenant} social={this.props.Social} key="0" />);
    },
    editProfile: function(){
       $('.fixedModal').css('display','block');
        ModalActions.setContent(<EditProfileModal tenant={this.props.tenant} user={this.props.userInfo} key="0" />);
    },
    changePassword: function(){
       $('.fixedModal').css('display','block');
        ModalActions.setContent(<ChangePasswordModal tenant={this.props.tenant} user={this.props.userInfo} key="0" />);
    },
     componentWillMount: function(){
             functions.drawSlidedd();
        },
    render: function() {
        //<button className="sdrop mdl-button mdl-js-button" onClick={this.linkAccounts}>Link Social Accounts</button>

        var linkParams = {username:''}
        if(this.props.userInfo.Profile.DisplayName){ linkParams = {username:this.props.userInfo.Profile.DisplayName} }
       var userInfo = this.props.userInfo.Profile;
        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
       var branded={color:primary}
       
       var coverImage = {backgroundImage: 'url("'+ResizeURL+'/resize/3/0/500/500/0/0/100/'+userInfo.Cover+'")'}
       
       var userName = '';
        if(userInfo && !userInfo.location){
            userName = userInfo.FirstName + " " + userInfo.LastName;
        }else if(userInfo){
           userName = userInfo.location;
        }

        return (
          <div>
              <div className="current-user-cover">

              <ProfileAvatar {...this.props} type="cover" avatar={userInfo.Cover} height={520} width={1024} cname={"demo-cover"} />
            </div>
            <header className ="demo-drawer-header current-user-avatar" style={coverImage}>
              <ProfileAvatar {...this.props} type="avatar" avatar={userInfo.Avatar} height={300} width={300} cname={"demo-avatar"} />
            </header>
            <section className="sblag">
                <div className="demo-username">@{userInfo.DisplayName}
               <button id="issuebtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-color-text--black">
                <i className="material-icons">arrow_drop_down</i>
              </button>
              <ul className="sbdrop mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="issuebtn">
                <button className="sdrop mdl-button mdl-js-button" onClick={this.editProfile}>Edit Profile</button>
                <button className="sdrop mdl-button mdl-js-button" onClick={this.linkAccounts}>Link Social Media</button>
                <button className="sdrop mdl-button mdl-js-button" onClick={this.changePassword}>Change Password</button>
                  <Link to="Support"><button className="sdrop mdl-button mdl-js-button" onClick={this.drawSlidedd}>Help</button></Link>
                  <Link to="Terms"><button className="sdrop mdl-button mdl-js-button" onClick={this.drawSlidedd}>Terms &amp; Conditions</button></Link>
                  <Link to="Privacy"><button className="sdrop mdl-button mdl-js-button" onClick={this.drawSlidedd}>Privacy Policy</button></Link>
                <LogoutBtn />
              </ul>
              </div>
              <div className="demo-desciption"><p>{userInfo.AboutMe}</p></div>

             
                      <div className="demo-section">
        <span className="demo-location"><i className="zmdi zmdi-pin  zmdi-hc-fw" style={branded}></i>
        {userInfo.Location}
        </span>
        <span className="demo-link"><i className="zmdi zmdi-link zmdi-hc-lg zmdi-hc-fw" style={branded}></i>
        {userInfo.SocialURL}
        </span>
        </div>
             
               <div className="demo-section-followers">
                <Link to="User" params={linkParams} query={{following:true}}><span className="demo-following" style={branded}>{functions.convertCounts(userInfo.FollowingCount)} following</span></Link>
                <Link to="User" params={linkParams} query={{followers:true}}><span className="demo-followers" style={branded}>{functions.convertCounts(userInfo.FollowerCount)} followers</span></Link>
               </div>
            </section>
          </div>
        );
    }
});

export default SBUserInfo;