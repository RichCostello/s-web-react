

var SBAllstat = React.createClass({
  componentWillMount: function(){
             functions.drawSlidedd();
        },

    render: function() {
         if(this.props.tenant == 'none'){var primary = DefaultPrimary;}else{var primary = this.props.tenant.Primary;}
        var branded={color:primary, borderColor: primary}

        var linkParams = {username:''}
        if(this.props.userInfo.Profile.DisplayName){ linkParams = {username:this.props.userInfo.Profile.DisplayName} }
           functions.drawSlidedd();

        return (
          <Link to="User" className="PostcardUserpic sb" params={linkParams} query={{listening:true}} onClick={this.drawSlidedd}>
            <div className="view-all-sb" style={branded}>
              View All Your Stations
            </div>
          </Link>


        );
    }
});

export default SBAllstat;