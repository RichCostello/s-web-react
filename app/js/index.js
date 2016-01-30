'use strict';

window.React  			    = require('react/addons');
window.Reflux               = require('reflux');
window.Flux                 = require('./Flux');
window.Router 			    = require('react-router');
window.axios                = require('axios');
window.routes 			    = require('./Routes');
window.Bootstrap            = require('react-bootstrap');
window.RouteHandler         = require('react-router').RouteHandler;
window.Link                 = require('react-router').Link;
window.DocumentTitle        = require('react-document-title');
window.Dropzone 			= require('react-dropzone');
window.AvatarCropper 		= require("react-avatar-cropper");

/* Material Design */
window.mui                  = require('material-ui');
 window.ThemeManager = new mui.Styles.ThemeManager();
  window.RaisedButton = mui.RaisedButton;
  window.DefaultPrimary     = '#ff5722';

/* Bootstrap Includes */
window.Navbar           = Bootstrap.Navbar;
window.Nav              = Bootstrap.Nav;
window.NavItem          = Bootstrap.NavItem;
window.DropdownButton   = Bootstrap.DropdownButton;
window.MenuItem         = Bootstrap.MenuItem;

/* Google Map Includes */
window.ReactGoogleMaps  = require('react-googlemaps');
window.GoogleMapsAPI    = window.google.maps;
window.Map              = ReactGoogleMaps.Map;
window.Marker           = ReactGoogleMaps.Marker;
window.OverlayView      = ReactGoogleMaps.OverlayView;
window.LatLng           = GoogleMapsAPI.LatLng;


/* Component Includes */
window.Ads              = require('./components/Ads');
window.FileUpload		= require('./components/FileUpload');
window.Comments 		= require('./components/Comments');
window.CommentItem		= require('./components/CommentsItem');
window.Username		    = require('./components/Username');
window.StationName		= require('./components/StationName');
window.CreatedAt		= require('./components/CreatedAt');
window.ViewCount   		= require('./components/ViewCount');
window.Feed           	= require('./components/Feed');
window.Burgundy         = require('./components/Burgundy');


/* Navigation */
window.AppHeader        = require('./components/Navigation/AppHeader');
window.AppNav           = require('./components/Navigation/AppNav');
window.Footer           = require('./components/Navigation/Footer');
window.Hammenu          = require('./components/Navigation/Hammenu');
window.Hammenubrnd      = require('./components/Navigation/Hammenubrnd');
window.SimpleFooter     = require('./components/Navigation/SimpleFooter');
window.SubNavigation	= require('./components/Navigation/SubNavigation');
window.SubNavigationFeed= require('./components/Navigation/SubNavigationFeed');
window.SubNavigationExplore= require('./components/Navigation/SubNavigationExplore');

/* Signup Components */
window.Signup           = require('./components/Signup/Signup');
window.SignupPL         = require('./components/Signup/SignupPL');
window.SignupStation    = require('./components/Signup/SignupStation');
window.SignupForm       = require('./components/Signup/SignupForm');
window.CompleteSignup  	= require('./components/Signup/CompleteSignup');

/* Login Components */
window.Login           	= require('./components/Login/Login');
window.LoginForm        = require('./components/Login/LoginForm');
window.LoginPL        	= require('./components/Login/LoginPL');
window.LoginStation    	= require('./components/Login/LoginStation');
window.Recover          = require('./components/Login/Recover');
window.RecoverForm      = require('./components/Login/RecoverForm');
window.RecoverPL        = require('./components/Login/RecoverPL');
window.RecoverStation   = require('./components/Login/RecoverStation');
window.UpdatePasswordForm=require('./components/Login/UpdatePasswordForm');
window.UpdatePassword   = require('./components/Login/UpdatePassword');
window.UpdatePasswordPL = require('./components/Login/UpdatePasswordPL');
window.UpdatePasswordStation   = require('./components/Login/UpdatePasswordStation');

/*Postcard Components*/
window.Post             = require('./components/Postcard/Post');
window.PostcardFoot     = require('./components/Postcard/PostcardFoot');
window.PostcardUserpic  = require('./components/Postcard/PostcardUserpic');
window.PostcardHead     = require('./components/Postcard/PostcardHead');
window.PostPreview      = require('./components/Postcard/postPreview');

/*StationCard Components */
window.StationCard      = require('./components/StationCards/StationCard');
window.StationCardWithPosts  = require('./components/StationCards/StationCardWithPosts');

/*Discovery Components*/
window.DiscoverList		= require('./components/Discover/DiscoverList');
window.DiscovereryList	= require('./components/Discover/DiscoveryList');
window.DiscoveryItem	= require('./components/Discover/DiscoveryItem');
window.DiscoverEvents	= require('./components/Discover/DiscoverEvents');
window.DiscoverPosts	= require('./components/Discover/DiscoverPosts');
window.DiscoverStations	= require('./components/Discover/DiscoverStations');
// window.OverlayView	= require('./components/Discover/OverlayView');


/* Modal Views */
window.Modal       		= require('./components/Modals/Modal');
window.PostModal        = require('./components/Modals/PostModal');
window.ShareModal       = require('./components/Modals/ShareModal');
window.LoginModal       = require('./components/Modals/LoginModal');
window.LinkAccountsModal   = require('./components/Modals/LinkAccountsModal');
window.EditProfileModal    = require('./components/Modals/EditProfileModal');
window.InputErrorBox	= require('./components/Modals/InputErrorBox');
window.ChangePasswordModal = require('./components/Modals/ChangePasswordModal');
window.ProgressModal       = require('./components/Modals/ProgressModal');
window.NoFBmodal           = require('./components/Modals/NoFBmodal');

/* Splash Page */
window.Splash           = require('./components/Splash/Splash');
window.SplashPL			= require('./components/Splash/SplashPL');
window.SplashStation	= require('./components/Splash/SplashStation');

/* Social Logins */
window.FacebookLogin    = require('./components/Social/FacebookLogin');
window.TwitterLogin     = require('./components/Social/TwitterLogin');
window.Google           = require('./components/Social/Google');

/* Profile Components */
window.Listening        = require('./components/Profile/Listening');
window.Following        = require('./components/Profile/Following');
window.Followers        = require('./components/Profile/Followers');
window.ProfilePosts		= require('./components/Profile/Posts');
window.ProfileAvatar	= require('./components/Profile/ProfileAvatar');
window.ActivityItem		= require('./components/Profile/ActivityItem');

/* List Components */
window.ListOFollowing   = require('./components/Lists/ListOFollowing');
window.ListOFollowers   = require('./components/Lists/ListOFollowers');
window.ListOListeners   = require('./components/Lists/ListOListeners');
window.ListOProfPosts   = require('./components/Lists/ListOProfPosts');

/*Sidebar Components*/
window.SB               = require('./components/Sidebar/SB');
window.SBActivity       = require('./components/Sidebar/SBActivity');
window.SBTabs           = require('./components/Sidebar/SBTabs');
window.SBUserInfo       = require('./components/Sidebar/SBUserInfo');

/* Button Components */
window.FollowingBtn		= require('./components/Buttons/Following');
window.FollowingProfBtn	= require('./components/Buttons/FollowingProf');
window.LikeBtn			= require('./components/Buttons/Like');
window.DislikeBtn		= require('./components/Buttons/Dislike');
window.CommentBtn		= require('./components/Buttons/Comment');
window.AddContentBtn    = require('./components/Buttons/AddContent');
window.LogoutBtn        = require('./components/Buttons/Logout');
window.ListeningBtn     = require('./components/Buttons/Listening');
window.SmallListenBtn   = require('./components/Buttons/ListeningSmall');
window.ViewBtn			= require('./components/Buttons/ViewStation');
window.SBAllpost        = require('./components/Buttons/SBAllpost');
window.SBAllstat        = require('./components/Buttons/SBAllstat');
window.Share          	= require('./components/Buttons/Share');
window.Flag          	= require('./components/Buttons/Flag');
window.TakeTour			= require('./components/Buttons/TakeTour');
window.MoreActions		= require('./components/Buttons/MoreActions');
window.DSBtn            = require('./components/Buttons/DSBtn');
window.ShareBtn			= require('./components/Buttons/ShareBtn');
window.DeleteBtn		= require('./components/Buttons/Delete');
window.CreateType		= require('./components/Buttons/CreateType');
window.IconBtn			= require('./components/Buttons/IconBtn');

/* Content Upload */
window.CreatePhoto		= require('./components/Create/Photo');
window.CreateVideo		= require('./components/Create/Video');
window.CreateAudio		= require('./components/Create/Audio');
window.CreateLive		= require('./components/Create/Live');

/* Text Components */
window.Terms				= require('./components/Text/Terms');
window.Privacy				= require('./components/Text/Privacy');
window.Support				= require('./components/Text/Support');

/* Store Includes */
window.STStore          	= require('./stores/SessionTokenStore');
window.TenantStore      	= require('./stores/TenantStore');
window.CurrentUserStore 	= require('./stores/CurrentUserStore');
window.StationStore     	= require('./stores/StationStore');
window.ActivityStore    	= require('./stores/ActivityStore');
window.UserStore        	= require('./stores/UserStore');
window.PostOffice       	= require('./stores/PostOffice');
window.ModalStore       	= require('./stores/ModalStore');
window.FollowingStore   	= require('./stores/FollowingStore');
window.FollowerStore   		= require('./stores/FollowerStore');

window.ListeningStore  		= require('./stores/ListeningStore');
window.SidebarListeningStore= require('./stores/SidebarListeningStore');

window.CommentStore  		= require('./stores/CommentStore');
window.SocialStore  		= require('./stores/SocialStore');



/* Actions Includes */
window.STAction         		= require('./actions/SessionTokenActions');
window.TenantActions      		= require('./actions/TenantActions');
window.CurrentUserActions  		= require('./actions/CurrentUserActions');
window.StationActions       	= require('./actions/StationActions');
window.ActivityActions      	= require('./actions/ActivityActions');
window.UserActions       		= require('./actions/UserActions');
window.PostActions       		= require('./actions/PostActions');
window.ModalActions       		= require('./actions/ModalActions');
window.FollowingActions    		= require('./actions/FollowingActions');
window.FollowerActions     		= require('./actions/FollowerActions');
window.ListeningActions     	= require('./actions/ListeningActions');
window.SidebarListeningActions  = require('./actions/SidebarListeningActions');
window.CommentActions     		= require('./actions/CommentActions');
window.SocialActions     		= require('./actions/SocialActions');

window.functions			= require('./utils/functions');

/* API Includes */
window.APIAddress           = 'http://dev.api.stationlocal.com'; 
window.OtherAPI				= 'http://dev.api.stationlocal.com'; 
window.APIKey				= '21922323610bcce1f91d8c272d71a4a7299aabef';
window.ResizeURL			= 'http://dev-images.stationlocal.com';
window.UploadURL			= 'http://dev-uploads.stationlocal.com';
window.WebsiteURL			= 'http://dev.stationlocal.com';


window.FetchingUser = false;
window.stationloading = false;
window.allstationsloading = false;
window.feedloading = false;
window.profilepostsloading = false;
window.listeninglistloading = false;
window.reloadingStation = false;

if ( process.env.NODE_ENV !== 'production' ) {
  // Enable React devtools
  window.React = React;
}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
 React.render(<Handler {...state} params={state.params} />, document.getElementById('app'));
});