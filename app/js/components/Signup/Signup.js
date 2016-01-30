var LoginCheck = require('../../mixins/LoginMixin.js');
var SignupComponent = React.createClass({
 
  mixins: [LoginCheck],

  getSignupComponent: function(){

      if(TenantStore.isPrivateLabelTenant()){
        return <SignupPL {...this.props} />
      }
      else{
        return <SignupStation {...this.props} />
      }

  },
  render: function() {

    var hero = {backgroundImage: 'url('+this.props.tenant.hero+')'};

    return (
      <DocumentTitle title="Signup">
          {this.getSignupComponent()}
      </DocumentTitle>
    );
  }

});

export default SignupComponent;