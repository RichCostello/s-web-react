var CreatedAt = React.createClass({
	render: function(){

		return(
                <div className="CreatedAt">{functions.convertTime(this.props.CreatedAt)}</div>
		);
	}

});


export default CreatedAt;