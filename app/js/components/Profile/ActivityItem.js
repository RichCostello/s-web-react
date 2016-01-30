var ActivityItem = React.createClass({
	getInitialState: function(){

        return ({
            isFollowing: undefined
        });

    },
    activityTypeFromID: function(id){
        switch(id){
            case 1:
                return "posted to your station ";
                break;
            case 2:
                return "liked your post ";
                break;
            case 3:
                return "disliked your post ";
                break;
            case 4:
                return "commented on your post ";
                break;
            case 5:
                return "is following you";
                break;
            case 6:
                return "unfollowed you ";
                break;
            case 7:
                return "made you a broadcaster ";
                break;
            case 8:
                return "made you a manager ";
                break;
            case 9:
                return "made you a listener ";
                break;
            case 10:
                return "flagged your post ";
                break;
            case 11:
                return "flagged your comment ";
                break;
        }
    },
    senderTypeFromID: function(id, sender, fColor){

         if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}

        var branded2 = {color: primary}

        switch(id){
            case 1:

                return <Link to="User" className="link" params={{'username': sender}} query={{"posts": true}} style={branded2}>{"@"+sender} </Link>
                break;
            case 2:
                return sender+" ";
                break;
            case 3:
                return "An anonymous user ";
                break;
            default:
                return "A Test that should be blank";
                break;
        }

    },
    recipientTypeFromID: function(type, id, image, name){

            switch(type){
            case 1:
                return <Link to="User" params={{username: name}}><img src={ResizeURL+"/resize/4/0/200/200/0/0/100/"+image} /></Link>;
                break;
            case 2:
                return <Link to="Station" params={{station: name}}><img src={ResizeURL+"/resize/2/0/200/200/0/0/100/"+image} /></Link>;
                break;
            case 3:
                return <a href="#" onClick={this.viewPost}><img src={ResizeURL+"/resize/1/0/200/200/0/0/100/"+image} /></a>;
                break;
            case 4:
                return <a href="/comment/"><img src={image} /></a>;
                break;
            default:
                return "DEFAULT";
                break;
        }

    },
    senderImageFromID: function(type, id, image, name){

            switch(type){
            case 1:
                return <Link to="User" params={{username: name}}><img src={ResizeURL+"/resize/4/0/200/200/0/0/100/"+image} className="image-avatar" /></Link>;
                break;
            case 2:
                return <Link to="Station" params={{station: name}}><img src={ResizeURL+"/resize/2/0/200/200/0/0/100/"+image} className="image-avatar" /></Link>;
                break;
        }

    },
    elapsedTime: function(unixTime){

        var seconds = Math.floor((new Date() - (unixTime*1000)) / 1000);

        var interval = Math.floor(seconds / 31536000);

        interval = Math.floor(seconds / 604800);
        if (interval > 1) {
            return interval + "w";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + "d";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + "h";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + "m";
        }
        return Math.floor(seconds) + "s";
    },
    viewPost: function() {
        $('.fixedModal').css('display','block');
        ModalActions.setContent(<PostModal id={this.props.activityObjects.RecepientID} context={this.context} tenant={this.props.tenant} key="0" />);
    },
    follow(){
        if(this.state.isFollowing == undefined){
            this.state.isFollowing = this.props.activityObjects.FollowingSender;
        }

        console.log(this.props.activityObjects.SenderID);

        if(this.state.isFollowing == true){
            console.log('unfollow');
            FollowingActions.unfollow(this.props.activityObjects.SenderID);
            this.setState({isFollowing:false});
        }else{
            console.log('follow');
            FollowingActions.follow(this.props.activityObjects.SenderID);
            this.setState({isFollowing:true});
        }
    },
	render: function(){
        // console.log(this);
        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary, border: '1px solid '+primary};

        if(this.state.isFollowing != undefined){
            if(this.state.isFollowing == true){
            var style={backgroundColor:primary, border: '1px solid '+primary, color:'#FFF'};
            }else{
              var style={backgroundColor:'#FFF', border: '1px solid '+primary, color:primary};  
            }
        }else{

            if(this.props.activityObjects.FollowingSender == true){
            var style={backgroundColor:primary, border: '1px solid '+primary, color:'#FFF'};
            }else{
              var style={backgroundColor:'#FFF', border: '1px solid '+primary, color:primary};  
            }

        }




		return(
			<div>       
                <div className="mdl-grid mdl-list">
                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone act-tn pRel">
                        {this.senderImageFromID(this.props.activityObjects.SenderType, this.props.activityObjects.SenderID, this.props.activityObjects.SenderImage, this.props.activityObjects.SenderName)} 
                                <div className="littleFollower"><button className="follow" style={style}><i className="zmdi zmdi-account zmdi-hc-lg zmdi-hc-fw" onClick={this.follow}></i></button></div>
                    </div>
                    <div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet mdl-cell--2-col-phone">
                        <div className="act-msect">
                            <span>  {this.senderTypeFromID(this.props.activityObjects.SenderType, this.props.activityObjects.SenderName, this.props.tenant.Primary)} 
                                    {this.activityTypeFromID(this.props.activityObjects.ActivityType)} 
                            </span>
                            <span className="timeSince">({functions.convertTime(this.props.activityObjects.ActivityAt)})</span>
                        </div>
                    </div>
                    <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--1-col-phone right">
                        <div className="action-marg">
                            <div className="acitivity-post">
                                {this.recipientTypeFromID(this.props.activityObjects.RecepientType, this.props.activityObjects.RecepientID, this.props.activityObjects.RecepientImage, this.props.activityObjects.RecepientName)} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)

	}
});

export default ActivityItem;