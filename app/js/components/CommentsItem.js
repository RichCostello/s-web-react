var commentItem = React.createClass({
	
	render: function(){

		var primary = this.props.tenant.defaultHeader;
		var branded = {color: primary}

		var links = {username:''}
		if(this.props.cobj.DisplayName){links = {username:this.props.cobj.DisplayName}}

		return(
				<li>
					<div className="commenterPic"><img className="ilb vt" src={ResizeURL+"/resize/4/0/150/150/0/0/100/"+this.props.cobj.Avatar} /></div>
					<div className="ilb comment">
						<Link to="User" params={links} query={{posts:true}}><h2 className="commenterUserName" style={branded}>@{this.props.cobj.DisplayName}</h2></Link>
						<i>{functions.convertTime(this.props.cobj.CreatedAt)}</i>
						<p className="postedComment">{this.props.cobj.Content}</p>
					</div>
				</li>
		);

	}

});

export default commentItem;