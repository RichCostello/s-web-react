

 
var postPreview = React.createClass({
	viewPost: function() {
        $('.fixedModal').css('display','block');
        ModalActions.setContent(<PostModal id={this.props.ID} tenant={this.props.tenant} key="0" />);
    },
    render: function() {
    	// console.log(this);
        
        var backgroundImg = {backgroundImage: 'url('+ResizeURL+"/resize/1/0/200/200/0/0/100/"+this.props.MediaLink+')', backgroundSize: 'cover'}

        return (
    
                    <div className="sb-post-preview cp" style={backgroundImg} onClick={this.viewPost}></div>

        );
    } 
});

export default postPreview;