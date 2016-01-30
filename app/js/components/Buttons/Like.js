
var thumbsUp={};

var LikeBtn = React.createClass({
	
	getInitialState: function(){

		return {
		    	count: undefined
		    };

	},
	like: function() {

		if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}

		if(CurrentUserStore.checkLoginStatus()){
	       var postID = this.props.ID;
	       
	       if(this.props.User.HasLiked == false){
	       		this.props.User.HasLiked = true;
	       		this.props.User.HasDisliked = false;
		       SocialActions.Like(postID);
		       $('#post'+postID).find('.zmdi-thumb-up').css('color',primary);
		       $('#post'+postID).find('.zmdi-thumb-down').css('color','#B9B5B4');

		       this.setState({
		       		count: this.state.count + 1
		       });

		   }else{
		   	   this.props.User.HasLiked = false;
		   	   SocialActions.UnLike(postID);
		       $('#post'+postID).find('.zmdi-thumb-up').css('color','#B9B5B4');
		       this.setState({
		       		count: this.state.count - 1
		       });
		   }
		}else{

			//prompt login
			    $('.fixedModal').css('display','block');
        		ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
		}

    },
	render: function(){

		if(this.state.count == undefined){this.state.count = this.props.LikeCount}

		if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary}

        if(this.props.User && !!this.props.User.HasLiked){thumbsUp=branded}else{thumbsUp={}}


		return(
			<div className="ilb"><i style={thumbsUp} onClick={this.like} className="zmdi zmdi-thumb-up zmdi-hc-fw mdc-text-grey cp"></i><label className="innersoc">{functions.convertCounts(this.state.count)} </label></div>
		);
	}

});

export default LikeBtn;