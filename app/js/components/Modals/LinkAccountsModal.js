
 var LinkAccountsModal = React.createClass({

	linkFacebook(){

       FB.login(function(response){
                if(response.status && response.status === 'connected'){
                      var token=response.authResponse.accessToken;
                      var expiry=response.authResponse.expiresIn;
                      CurrentUserStore.LinkFB(token,expiry,function(fbResponse){
                             if(fbResponse.data.Success){
                                $($('#LinkAccountsModal').find('.zmdi-facebook')[0].parentNode).removeClass('saNotLinked').addClass('saLinked');
                             }else{
                                $('#linkErrorMessage').text('It seems like your Facebook Account is linked to a different Station Account. In order to link this account, you must unlink your other account first.');
                                $('#linkErrorMessage').css('display','block');
                             }
                      });
                }
        }, {scope: 'email,user_friends,public_profile,publish_actions'});

  },
  linkTwitter(){
      sessionStorage.setItem('linkTwitter',true);
      window.location = '/login/twitter';
  },
  linkGP(){    
    // console.log(gapi);
    var GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn();
    // GoogleAuth.then(function(){
    //   console.log(gapi.auth.getToken());
    // });


    gapi.auth.authorize({ client_id: '348804155327-79t4fmeip2hclhbuuqqt7quqkvvdklv9.apps.googleusercontent.com', scope: 'https://www.googleapis.com/auth/plus.me' }, this.gpInit);



  },
  gpInit(response){
    // console.log('Success');
    // console.log(response);
   // var gpToken = gapi.auth.getToken();
   // console.log(gapi);
   // console.log(gapi.auth);
   // console.log(gapi.auth.getToken());
   //  console.log(gapi.auth.getToken().access_token);
   //  console.log(gapi.auth.getToken().expires_at);
   //  console.log(gapi.auth.getToken().expires_in);
   //  console.log(gapi.auth.getToken().id_token);
   //  console.log(gapi.auth.getToken().issued_at);
        CurrentUserStore.linkGoogle(gapi.auth.getToken().id_token,gapi.auth.getToken().expires_at,function(response){
        console.log(response);
        console.log(response);
    });
  },
  gpFail(response){
    console.log('GP Linked Fail');
    console.log(response);
  },
	closeModal() {
    	  React.unmountComponentAtNode(document.getElementById('LinkAccountsModal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
  },
	componentWillMount(){
		if(window.location.href.indexOf('oauth_token')!=-1){
      var stat = window.location.href.substring(window.location.href.indexOf('feed?oauth_token')+17);
      console.log('from Modal');
      // CurrentUserActions.loginTwit(stat);
      // window.location = '/feed';
    }
	},
  componentDidMount: function(){

///////////////////////////////////////////////////////////////////////////////////////////

      var params = {
      client_id: '348804155327-79t4fmeip2hclhbuuqqt7quqkvvdklv9.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/plus.me',
    }


    gapi.load('auth2', function() {
        gapi.auth2.init(params);
        var GoogleAuth = gapi.auth2.getAuthInstance();
        // GoogleAuth.then(this.onInit,this.onFail);
      }.bind(this));  
    
////////////////////////////////////////////////////////////////////////////////////////////

    window.fbAsyncInit = null;

    window.fbAsyncInit = function() {

        FB.init({
          appId      : 1479198108988461,
          cookie     : true,  // enable cookies to allow the server to access the session               
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.1' // use version 2.1
        });
        /* Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus().  This function gets the state of the person visiting this page and can return one of three states to the callback you provide.  They can be: 1. Logged into your app ('connected') 2. Logged into Facebook, but not your app ('not_authorized') 3. Not logged into Facebook and can't tell if they are logged into your app or not. These three cases are handled in the callback function. */
    };

    window.fbAsyncInit();


  },
	render: function(){
 

var checkSocial = this.props.social;
var linkedClass = ['saNotLinked','saNotLinked','saNotLinked','saNotLinked'];

console.log(this.props);

if(checkSocial.Facebook.Authorized == true){linkedClass[0]='saLinked';}
if(checkSocial.Google.Authorized == true){linkedClass[1]='saLinked';}
if(checkSocial.Instagram.Authorized == true){linkedClass[2]='saLinked';}
if(checkSocial.Twitter.Authorized == true){linkedClass[3]='saLinked';}

		return(
			<div id="LinkAccountsModal" className="postModal">

         <div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>
					<div className="linkedAccounts">

            <div className="margin25_auto_0">Linked Social Accounts</div>

            <div className={'ilb margin20 '+linkedClass[0]}>
  						<span className="zmdi zmdi-facebook" onClick={this.linkFacebook}></span>
              <div className="fbLinkedLabel">Facebook</div>
            </div>

            <div className={'ilb margin20 '+linkedClass[3]}>
  						<span className="zmdi zmdi-twitter" onClick={this.linkTwitter}></span>
              <div className="twitLinkedLabel">Twitter</div>
            </div>

            <div className={'ilb margin20 '+linkedClass[1]}>
  						<span className="zmdi zmdi-google-plus" onClick={this.linkGP}></span>
              <div className="gpLinkedLabel">Google+</div>
            </div>

					</div>	

          <div id="linkErrorMessage"></div>

			</div>
		);

	}

});

 
LinkAccountsModal['contextTypes'] = {
    router: React.PropTypes.func.isRequired
}




export default LinkAccountsModal;







