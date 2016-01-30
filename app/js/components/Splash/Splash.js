var LoginCheck = require('../../mixins/LoginMixin.js');
var SplashComponent = React.createClass({

  mixins: [LoginCheck],

  getSplashPage: function(){
      if(TenantStore.isPrivateLabelTenant()){
            return <SplashPL {...this.props} />
      }
      else{
             return  <SplashStation {...this.props} />
      }
  },
  render : function() {
   // console.log(this.props);
        return(
              <DocumentTitle title="StationLocal | Splash">
                {this.getSplashPage()}
              </DocumentTitle>               
        );
    }

});

 export default SplashComponent;