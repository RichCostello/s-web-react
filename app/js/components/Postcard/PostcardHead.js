var PostcardHead = React.createClass({
	
    //<ViewCount {...this.props} />
    //<CreatedAt {...this.props} />   


    render: function(){
		return(
                    <div className="PostcardHead">
                                <div className="ilb vm">  
                                    <PostcardUserpic {...this.props} />
                                </div>
                                <div className="ilb vm">
                                    <Username {...this.props} />
                                    <StationName {...this.props} />
                                </div>
                                <div className="ilb fr mt5 postcardMeta">
                                    <CreatedAt {...this.props} />
                                </div>
                                                  
                    </div>
		);
	}

});


export default PostcardHead;