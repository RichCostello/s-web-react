var Listening = React.createClass({
    
    getInitialState: function(){

        return({
            isListening: undefined
        })

    },
   listen: function(id) {

        if(CurrentUserStore.checkLoginStatus()){
             ListeningActions.listen(this.props.lobj.ID);

             var obj = {};

             this.state.isListening = true;
              this.setState(obj);

        }else{
            this.PromptLogin();
        }
 

    },
    PromptLogin: function(){


        $('.fixedModal').css('display','block');
        ModalActions.setContent(<LoginModal tenant={this.props.tenant} key="0" />);
    },
    unlisten: function(id){

        if(CurrentUserStore.checkLoginStatus()){
           
            ListeningActions.unlisten(this.props.lobj.ID);
            
            var obj = {};

            this.state.isListening = false;
            this.setState(obj);

        }else{
            this.PromptLogin();
        }

    },
	render: function(){

        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary, borderColor: primary}
        var branded={color:primary, border: '1px solid '+primary};
        var color = {color: primary}
        var linkParams = {station:''}

        if(this.props.lobj.Identifier){ linkParams = {station:this.props.lobj.Identifier} }

        if(this.state.isListening == undefined){
            if(this.props.lobj.PermissionLevel > 0 && CurrentUserStore.checkLoginStatus()){
                var clickHandler = this.unlisten;
                var brandedbtn = branded;
            }else{
                var clickHandler = this.listen;
                var brandedbtn = {background: 'transparent'};
            }
        }else{
            if(this.state.isListening){
                var clickHandler = this.unlisten;
                var brandedbtn = branded;
            }else{
                var clickHandler = this.listen;
                var brandedbtn = {background: 'transparent'};
            }
        }

		return(
			<div>       
                <div className="mdl-grid mdl-list">
                    <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                        <Link to="Station" params={linkParams}><img src={ResizeURL+"/resize/2/0/100/100/0/0/100/"+this.props.lobj.Image} className="image-avatar station" /></Link>
                    </div>
                    <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--2-col-phone relative">
                        <div>
                             <Link to="Station" params={linkParams}><span className="station-meta" style={color}>{this.props.lobj.Identifier}</span></Link>
                            <span className="station-meta-title" style={color}>{this.props.lobj.Name}</span>
                        </div>
                        <div className="act-bottom listeningCount">
                          <div style={color}>{this.props.lobj.PostCount} Posts<span className="act-list">{this.props.lobj.ListenCount} Listening</span></div>
                         </div>
                    </div>
                    <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                        <div className="action-marg">
                            <button id="btn-station" className="btn-station" onClick={clickHandler} style={brandedbtn}><i className="zmdi zmdi-portable-wifi zmdi-hc-3x"></i></button>
                        </div>
                    </div>
                </div>
            </div>
		)

	}
});

export default Listening;