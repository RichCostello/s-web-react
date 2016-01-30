var PostcardUserpic = React.createClass({
	render: function(){

        // console.log(this.props);
        var linkParams = {username:''}
        if(this.props.CreatorDisplayName){ linkParams = {username:this.props.CreatorDisplayName} }

        var image = ResizeURL+"/resize/4/0/100/100/0/0/100/"+this.props.CreatorAvatar;

		return(

                <Link to="User" className="PostcardUserpic" params={linkParams}><img src={image} className="image-avatar" /></Link>
		);
	}

});


export default PostcardUserpic;