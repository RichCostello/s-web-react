var LoginCheck = require('../../mixins/LoginMixin.js');
var UpdatePassword = React.createClass({

	mixins: [LoginCheck],

	getUpdatePasswordComponent: function(){

		if(TenantStore.isPrivateLabelTenant()){
			return <RUpdatePasswordPL {...this.props} />
		}
		else{
			return <UpdatePasswordStation {...this.props} />
		}

	},
	render: function() {

    var hero = {backgroundImage: 'url('+this.props.tenant.hero+')'};
	    return (
	      <DocumentTitle title="Update Password">
	       	{this.getUpdatePasswordComponent()}
	      </DocumentTitle>
	      );
	}
});

export default UpdatePassword;