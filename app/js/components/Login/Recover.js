var LoginCheck = require('../../mixins/LoginMixin.js');
var Recover = React.createClass({

	mixins: [LoginCheck],

	getRecoverComponent: function(){

		if(TenantStore.isPrivateLabelTenant()){
			return <RecoverPL {...this.props} />
		}
		else{
			return <RecoverStation {...this.props} />
		}

	},
	render: function() {

    var hero = {backgroundImage: 'url('+this.props.tenant.hero+')'};
	    return (
	      <DocumentTitle title="Recover Password">
	       	{this.getRecoverComponent()}
	      </DocumentTitle>
	      );
	}
});

export default Recover;