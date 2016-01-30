var DeleteBtn = React.createClass({
	
    deleteFunc: function(){

    	PostActions.deletePost(this.props.ID);
        $('#post'+this.props.ID).fadeOut("slow");

    },
    render: function(){ 	

		return(
			  <li className="zmdi zmdi-delete" onClick={this.deleteFunc}>Delete</li>
		);
	}

});

export default DeleteBtn;