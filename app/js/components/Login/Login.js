var LoginCheck = require('../../mixins/LoginMixin.js');
var LoginComponent = React.createClass({
 
	mixins: [LoginCheck],

	getLoginComponent: function(){

		if(TenantStore.isPrivateLabelTenant()){
			return <LoginPL {...this.props} />
		}
		else{
			return <LoginStation {...this.props} />
		}

	},
	render: function() {

    var hero = {backgroundImage: 'url('+this.props.tenant.Hero+')'};
	    return (
	      <DocumentTitle title="Login">
	       		{this.getLoginComponent()}
	      </DocumentTitle>
	      );
	}
});

export default LoginComponent;