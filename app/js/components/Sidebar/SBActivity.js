var tpid = '';
var SBActivity = React.createClass({
    drawSlidelist: function(){ 
          if(window.innerWidth < 1024){
          $('.mdl-layout').removeClass('expanded');
        }
      },
    render: function() {

      var style = {'backgroundImage' : 'url('+ResizeURL+"/resize/2/0/100/100/0/0/100/"+this.props.Image+')', 'backgroundSize' : 'cover'}
       if(this.props.Identifier!=undefined){ tpid = this.props.Identifier; }
           var sparams = {station: tpid}

        if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
       var branded={color:primary}

        return (
        <section>
          <div className="demo-grid-ruler mdl-grid act-feed">
                <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--1-col-phone">
                 <Link to="Station" params={sparams}> <div className="activity-avatar" style={style} onClick={this.drawSlidelist}></div> </Link>
                </div>
                <div className="mdl-cell mdl-cell--9-col mdl-cell--9-col-tablet mdl-cell--2-col-phone activity-desc">
                 <div className="act-top">{this.props.Identifier}</div>
                 <div className="act-bottom">
                  <div style={branded}>{this.props.PostCount} Posts<span className="act-list">{this.props.ListenCount} Listening</span></div>
                 </div>
                </div>
                <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--1-col-phone listsat"> 
                <SmallListenBtn {...this.props} stationID={this.props.ID} />
                </div>
                <div className="act-border"></div> 
          </div>
        </section>
        );
    }
});

export default SBActivity;