module.exports = React.createClass({
  twit_login(){
    CurrentUserActions.loginTwit();
  },
	render: function(){
		return(
			<p onClick={this.twit_login} className="l-twitter shadow">Twitter</p>
		);
	}

});