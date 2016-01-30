
var commented={};

var CommentBtn = React.createClass({
	
	viewPost: function() {
        console.log('viewPost big post');
        $('.fixedModal').css('display','block');
        ModalActions.setContent(<PostModal id={this.props.ID}  tenant={this.props.tenant} key="0" />);
    },

	render: function(){

		 if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary}
        // console.log(this);

        if(this.props.User && !!this.props.User.HasCommented){commented=branded}else{commented={}}

		return(
			<div className="ilb"><i style={commented} onClick={this.viewPost} className="zmdi zmdi-comments zmdi-hc-fw mdc-text-grey"></i><label className="innersoc l3">{functions.convertCounts(this.props.CommentCount)} </label></div>
		);
	}

});

export default CommentBtn;