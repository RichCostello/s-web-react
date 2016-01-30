
var socialMessage = '';
var shareBtn = React.createClass({
  shareFacebook(){
    console.log('shareFacebook');
    // console.log(localStorage.getItem('fbid'));
    // var FBID = localStorage.getItem('fbid');
    // var FBAT = localStorage.getItem('fbat');

    //  var socialMessage =$('#post'+this.props.ID).find('h1').text();

    //  var FBresponse = confirm("you are about to share this post with facebook");

    //  if(FBresponse == true){
    //             FB.api(
    //                       "/"+FBID+"/feed",
    //                       "POST",
    //                       {
    //                           "access_token": FBAT,
    //                           "picture" : 'http://www.joshuawink.com/chow/chowbubble2-master/public_html/img/bunny.png',
    //                           "message": socialMessage
    //                       },
    //                       function (response) {
    //                         if (response && !response.error) 
    //                           {console.log(response);} 
    //                         else {
    //                           console.log(response);}
                             
    //                       }
    //                     );
    //           }

    window.open("http://www.facebook.com/share.php?u=dev.stationlocal.com&title=Hello&image=http%3A%2F%2Fwww.joshuawink.com%2Fchow%2Fchowbubble2-master%2Fpublic_html%2Fimg%2Fbunny.png", "Facebook Share", "width=500, height=300, top=50, left=50");

  },
  shareTwitter(){

  console.log(socialMessage);
   console.log('twitter');
   console.log(twttr);
     twttr.widgets.createShareButton(
        'https://dev.twitter.com/',
        document.getElementById('post12'),
        {
          text: 'Hello World'
        }
    );


  },
  shareGP(){
      console.log('share GP');
      console.log(gapi);
  },
  shareURL(){
    console.log(this.props);
      console.log(this.props.id);
      $('#post'+this.props.id).find('')
  },
  expand() {
        console.log('make share big');

    // this expands share in the postcard itself
    //     var el=$('#post'+this.props.ID).find('.ShareBtn');
    //     if(el.hasClass('shareClosed')){
    //         el.removeClass('shareClosed').addClass('shareOpen');
    //         el.find('i').removeClass('zmdi-mail-reply').addClass('zmdi-close');
    //         window.setTimeout(function(){
    //           console.log('time');
    //           el.find('.postSharePost').css('display','block');
    //         },400);
        
    //     }else{
    //         el.removeClass('shareOpen').addClass('shareClosed');
    //         el.find('i').removeClass('zmdi-close').addClass('zmdi-mail-reply');
    // el.find('.postSharePost').css('display','none');
    //     }
    },
    throwToModal(){
        $('.fixedModal').css('display','block');
        ModalActions.setContent(<ShareModal id={this.props.ID}  tenant={this.props.tenant} key="0" />);
    },

  componentWillMount(){
       //   oauth_token=SjCBcAAAAAAAfarvAAABUD8FpRc&oauth_verifier=G3c79qFZsHSDShjA0RtjMofbHIhPr4YL
       // var socialMessage =$('#post'+this.props.ID).find('h1').text();
       //     socialMessage = encodeURIComponent(socialMessage);

             window.fbAsyncInit = function() {
      FB.init({appId: 'YOUR APP ID', status: true, cookie: true,
      xfbml: true});
      };
      (function() {
      var e = document.createElement('script'); e.async = true;
      e.src = document.location.protocol +
      '//connect.facebook.net/en_US/all.js';
      document.getElementById('fb-root').appendChild(e);
      }());

  },
  componentDidMount(){
        // if(gapi){
        // console.log(gapi);
        //     if(gapi.plusone){
        //       console.log(gapi.plusone);
        //         if(gapi.plusone.go){
        //           console.log('horray!');
        //           gapi.plusone.go('contentGP'+this.props.id);
        //         }
        //     }
        // }
  },
  render: function(){
    // console.log(this.props);
    //   console.log(this.props.Description);
      var encodedMessage = encodeURIComponent(this.props.Description);
      // console.log(socialMessage);

              //       <div id={'contentGP'+this.props.id}>
              // <div consolelassName="g-plusone"></div>
              // </div>
              //console.log(encodeURIComponent('http://www.joshuawink.com/chow/chowbubble2-master/public_html/img/bunny.png'));

    return(
      <div className="ilb ShareBtn shareClosed">




        <i onClick={this.throwToModal} className="zmdi zmdi-mail-reply zmdi-hc-fw mdc-text-grey cp"></i>

        <div className="postSharePost">

          <div>
               <span className="shareURL"><span className="closeShareURL">http://www.stationlocal.com/p/23</span></span>
          </div>

          <div className="ilb">

         <a onClick={this.shareFacebook}>

            <div className="postShareFB" onClick={this.shareFacebook}><i className="zmdi zmdi-facebook"></i></div></a>
          </div> 

          <div className="ilb"><a href={'https://twitter.com/intent/tweet?text='+encodedMessage}><div className="postShareTwit"><i className="zmdi zmdi-twitter"></i></div></a></div>
          <div className="ilb">
              <div className="postShareGP" onClick={this.shareGP}><i className="zmdi zmdi-google-plus"></i></div>
                <span id={'myBtn'+this.props.ID} 
                  className = "gpShareBtn g-interactivepost"
                  data-clientid="348804155327-79t4fmeip2hclhbuuqqt7quqkvvdklv9.apps.googleusercontent.com"
                  data-contenturl={'https://www.stationlocal.com/p/'+this.props.ID}
                  data-calltoactionlabel="Share"
                  data-calltoactionurl={'https://www.stationlocal.com/p/'+this.props.ID}
                  data-cookiepolicy="single_host_origin"
                  data-prefilltext={'hello word'+this.props.Description}
                  data-callback={this.gpCallback}
                  >
              </span>
          </div>
          <div className="ilb"><div className="postShareLink" onClick={this.shareURL}><i className="zmdi zmdi-link"></i></div></div>
              



        </div>
      </div>
    );
  }

});

export default shareBtn;