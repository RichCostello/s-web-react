var PostOffice  	= require('../../stores/PostOffice');
var tpid = '';
var unid = '';
var stid = '';
var PostModal={};
 
PostModal['contextTypes'] = {
    router: React.PropTypes.func.isRequired
}

  PostModal = React.createClass({
	
	mixins : [PostOffice.mixin],
	
	storeDidChange: function(){
        var t = PostOffice.fetchPost();
        if(t != undefined){this.setState(t);}else{this.forceUpdate(t);}     
    },
	getInitialState: function() {
        return ({
            post:{}
        });
    }, 
    moreActions: function() {
        var el=$('.postActionLine').find('.moreActionsMenu');
        if(el.hasClass('showLessActions')){
            el.removeClass('showLessActions').addClass('showMoreActions');
        }else{
            el.removeClass('showMoreActions').addClass('showLessActions');
        }
    },
    closeModal: function() {
    	  React.unmountComponentAtNode(document.getElementById('postModal'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
    },
	componentWillMount: function(){
		PostActions.loadPost(this.props.ID);
	},
	getPrevCommentButton: function(){


		return "";
		return (<div className="vpc">View Previous Comments</div>);


	},
	render: function(){

		var post = this.state.post;
		if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
		var branded = {color: primary}

		if(this.props.ID!=undefined){ tpid = this.props.ID; }
		if(post.CreatorDisplayName){unid = post.CreatorDisplayName}
		if(post.StationIdentifier){stid = post.StationIdentifier}

        
        var image = 'url("'+ResizeURL+'/resize/1/0/1024/1024/0/0/100/'+post.MediaLink+'")';
        var params = {post: tpid}
        var userparams = {username: unid }
        var stationparams = {station: stid }

       	var creatorAvatar = ResizeURL+"/resize/4/0/100/100/0/0/100/"+post.CreatorAvatar;

		return(
			<div id="postModal" className="postModal">
				
				<div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>

				<div className="ilb vt modal_post_media">
	  				<Link to="Post" params={params} onClick={this.closeModal} style={{backgroundImage: image}}></Link>
				</div>

				<div className="vt tal modal_post_content">
	
						<div className="ptrWrap">
						<Link to="User" params={userparams} onClick={this.closeModal}>
							<img className="postUserPic ilb vt" src={creatorAvatar} />
						</Link>

						<div className="postUserInfo ilb">
							<div className="tc vm">

							<Link to="User" params={userparams} onClick={this.closeModal}><div className="postUserName" style={branded}>@{post.CreatorDisplayName}</div></Link>
							<Link to="Station" params={stationparams} onClick={this.closeModal}><div className="postStation" style={branded}><i className="zmdi zmdi-portable-wifi"></i> {post.StationIdentifier}</div></Link>


							</div>
							<div className="tc vm tar">
							<div className="postTime ilb">{functions.convertTime(post.CreatedAt)}</div>
							<div className="postViews ilb"><i className="zmdi zmdi-eye"></i><span>{post.ViewCount}</span></div>
							</div>
						</div>
						</div>
							<div className="postActionLine">
								<div className="ilb lbspan modlike"><LikeBtn {...this.props} User={post.User} LikeCount={post.LikeCount} tenant={this.props.tenant} /></div>
								<div className="ilb lbspan moddlike"><DislikeBtn {...this.props} User={post.User} DislikeCount={post.DislikeCount} tenant={this.props.tenant} /></div>
								<div className="ilb nb lbspan modcomment"><CommentBtn {...this.props} CommentCount={post.CommentCount} tenant={this.props.tenant} /></div>
							    <div className="ilb nb lbspan modshare"><ShareBtn {...this.props}/></div>
								<div className="more cp" onClick={this.moreActions}><i className="zmdi zmdi-more"></i></div>
								<MoreActions {...this.props} User={post.User} />
							</div>


							<div className="name2btn">
									<h1 className="postName">{post.Title}</h1>
									<p className="postDescription">{post.Description}</p>
									{this.getPrevCommentButton()}
							</div>

							<Comments {...this.props} />
				</div>
			</div>
		);

	}

});





export default PostModal;