var MoreActions = React.createClass({
	
	getDeleteComponent: function(){

		if(this.props.User){
			if(this.props.User.BelongsToUser){
				return  <DeleteBtn {...this.props} />
			}
		}
		return;
	},
	render: function(){

		return(
			<div className="moreActionsMenu showLessActions">
                <ul>
                   	{this.getDeleteComponent()}
                    <Flag {...this.props} />
                </ul>
            </div>
		)
	}

});

export default MoreActions;