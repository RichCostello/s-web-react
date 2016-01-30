var Following = React.createClass({
	
    render: function(){

        var primary = this.props.tenant.defaultHeader;
        var branded={color:primary, border: '1px solid '+primary};
        var color = {color: primary}
        var linkParams = {username:''}
        if(this.props.fobj.DisplayName){ linkParams = {username:this.props.fobj.DisplayName} }

		return(
			<div>       
                <div className="mdl-grid mdl-list">
                    <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                        <Link to="User" params={linkParams} query={{posts:true}}><img src={ResizeURL+"/resize/4/0/100/100/0/0/100/"+this.props.fobj.Avatar} className="image-avatar" /></Link>
                    </div>
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--2-col-phone">
                        <div>
                            <Link to="User" className="fuser" params={linkParams} query={{posts:true}}>
                            <span>@ </span>
                            <span>{this.props.fobj.DisplayName}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                        <div className="action-marg">
                            <FollowingBtn isFollowing={this.props.fobj.IsFollowing} userID={this.props.fobj.UserID} {...this.props} />
                        </div>
                    </div>
                </div>
            </div>
		)

	}
});

export default Following;