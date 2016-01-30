var ViewCount = React.createClass({
	render: function(){

		return(
            <div className="ViewCount zmdi zmdi-eye">
               <span>{this.props.ViewCount}</span>
            </div>
		);
	}

});


export default ViewCount;