var PostcardFoot = React.createClass({
    moreActions: function() {
        var el=$('#post'+this.props.ID).find('.moreActionsMenu');
        if(el.hasClass('showLessActions')){
            el.removeClass('showLessActions').addClass('showMoreActions');
            
        }else{
            el.removeClass('showMoreActions').addClass('showLessActions');
        }
    },
    getTitle: function(title){

        if(title != ""){
            return <h1>{title}</h1>
        }
        else{ return ''; }

    },
    getDescription: function(description){

        if(description != ""){
            return <p>{description}</p>
        }
        else{ return ''; }

    },
	render: function(){
        // console.log(this.props);
		return(
            <div className="mdl-grid mdl-grid--no-spacing PostcardFoot">
                            <div className="mdl-grid--no-spacing mdl-cell mdl-cell--2-col lbspan lblike"><LikeBtn {...this.props} /></div>

                           <div className="mdl-grid--no-spacing mdl-cell mdl-cell--2-col lbspan lbdlike"><DislikeBtn {...this.props}/></div>

                             <div className="mdl-grid--no-spacing mdl-cell mdl-cell--2-col lbspan lbcomment"><CommentBtn {...this.props}/></div>

                            <div className="mdl-grid--no-spacing mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet lbspan lbshare"><ShareBtn {...this.props}/></div>

                             <div className="mdl-grid--no-spacing mdl-cell mdl-cell--4-col lbspan enddots"><div><i onClick={this.moreActions} className="zmdi zmdi-more pull-right mdc-text-grey cp"></i></div>
                                <MoreActions {...this.props} />
                            </div>
                    <div className="mdl-cell mdl-cell--12-col ">
                        {this.getTitle(this.props.Title)}
                        {this.getDescription(this.props.Description)}
                    </div>
            </div>
		);
	}

});


export default PostcardFoot;