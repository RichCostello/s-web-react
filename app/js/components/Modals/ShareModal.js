var PostOffice  	= require('../../stores/PostOffice');
var tpid = '';
var ShareModal={};
  
ShareModal['contextTypes'] = {
    router: React.PropTypes.func.isRequired
}

  ShareModal = React.createClass({
	
	mixins : [PostOffice.mixin],

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

    window.open("http://www.facebook.com/share.php?u=dev.stationlocal.com", "Facebook Share", "width=500, height=300, top=50, left=50");

  },
    shareTwitter(){

  // console.log(socialMessage);
  //  console.log('twitter');
  //  console.log(twttr);
  //    twttr.widgets.createShareButton(
  //       'https://dev.twitter.com/',
  //       document.getElementById('post12'),
  //       {
  //         text: 'Hello World'
  //       }
  //   );


  },
  shareGP(){
      console.log('share GP');
      console.log(gapi);
      
      window.open("https://plus.google.com/share?url=dev.stationlocal.com", "Google Share", "width=500, height=300, top=50, left=50");
  },
	
	storeDidChange(){
        var t = PostOffice.fetchPost();
        if(t != undefined){this.setState(t);}else{this.forceUpdate(t);}     
    },
	getInitialState() {
        return ({
            post:{}
        });
    }, 
    moreActions() {
    	console.log('more');
        var el=$('.postActionLine').find('.moreActionsMenu');
        if(el.hasClass('showLessActions')){
            el.removeClass('showLessActions').addClass('showMoreActions');
        }else{
            el.removeClass('showMoreActions').addClass('showLessActions');
        }
    },
    closeModal() {
    	  React.unmountComponentAtNode(document.getElementById('ShareModal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
    },
	escapeHTML(string){ 
        var pre = document.createElement('pre');
        var text = document.createTextNode(string);
        pre.appendChild(text);
        return String(pre.innerHTML);
	},
	componentWillMount(){
		PostActions.loadPost(this.props.ID);
	},
	componentDidMount(){
		var embedCode = '<code><div></div></code>';
		var escapedEmbed = this.escapeHTML(embedCode);
		$('.embedShare div').html(escapedEmbed);
	},
	render: function(){
		console.log(this);
		console.log(this.state);

		var post = this.state.post;
		 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
		var branded = {color: primary}
		var encodedMessage = encodeURIComponent(post.Description);

		// console.log(escapedEmbed);

        if(this.props.ID!=undefined){ tpid = this.props.ID; }
        
        var params = {post: tpid}

        console.log(post);

		return(
			<div id="ShareModal" className="postModal">
				
				<div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>

				<div className="ilb vt modal_post_media">
	  			<Link to="Post" params={params} onClick={this.closeModal} style={{backgroundImage: 'url('+ResizeURL+'/resize/1/4/720/720/0/0/100/'+post.MediaLink+')'}}></Link>
				</div>

				<div className="vt tal modal_post_content">
					
					<span>Share Post</span>

					<div className="urlShare">
						<h1>URL</h1>
						<div className="urlShareUrl">{'http://www.stationlocal.com/p/'+post.ID}</div>
					</div>

					<div className="embedShare">
						<h1>Embed</h1>
						<div></div>
					</div>

					<div className="socialShare">
						<span className="zmdi zmdi-facebook" onClick={this.shareFacebook}></span>
						<a href={'https://twitter.com/intent/tweet?text='+encodedMessage}><span className="zmdi zmdi-twitter"></span></a>
						

						<span className="zmdi zmdi-google-plus" onClick={this.shareGP}>

									{/*<span id={'myBtn'+post.ID} 
						                  className = "g-interactivepost"
						                  data-clientid="348804155327-79t4fmeip2hclhbuuqqt7quqkvvdklv9.apps.googleusercontent.com"
						                  data-contenturl={'https://www.stationlocal.com/p/'+post.ID}
						                  data-calltoactionlabel="Share"
						                  data-calltoactionurl={'https://www.stationlocal.com/p/'+post.ID}
						                  data-cookiepolicy="single_host_origin"
						                  data-prefilltext={'hello word'+post.Description}
						                  >
						              </span>*/}

						</span>

						

			
					</div>
					
				</div>


			</div>
		);

	}

});





export default ShareModal;







