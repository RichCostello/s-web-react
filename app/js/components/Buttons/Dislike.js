
var thumbsDown={};

var DislikeBtn = React.createClass({
	
	getInitialState: function(){

		return {
		    	count: undefined
		    };

	},
	dislike: function() {

		if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}

		if(CurrentUserStore.checkLoginStatus()){
		       	
		       	var postID = this.props.ID;
		        
		        if(this.props.User.HasDisliked == false){
		       		this.props.User.HasDisliked = true;
		       		this.props.User.HasLiked = false;
			       SocialActions.Dislike(postID);

			       $('#post'+postID).find('.zmdi-thumb-down').css('color',primary);
			       $('#post'+postID).find('.zmdi-thumb-up').css('color','#B9B5B4');

			       this.setState({count: this.state.count + 1});
			   }else{

			   		this.props.User.HasDisliked = false;
			   	   	SocialActions.UnDislike(postID);
			       	$('#post'+postID).find('.zmdi-thumb-down').css('color','#B9B5B4');

			       	this.setState({count: this.state.count - 1});		
			    }
		}else{

			//prompt login
			    $('.fixedModal').css('display','block');
        		ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
		}

    },
	render: function(){

		if(this.state.count == undefined){this.state.count = this.props.DislikeCount}

		if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary}

        if(this.props.User && !!this.props.User.HasDisliked){thumbsDown=branded}else{thumbsDown={}}

		return(
			<div className="ilb"><i style={thumbsDown} onClick={this.dislike} className="zmdi zmdi-thumb-down zmdi-hc-fw mdc-text-grey cp"></i><label className="innersoc">{functions.convertCounts(this.state.count)} </label></div>

		);
	}

});

export default DislikeBtn;