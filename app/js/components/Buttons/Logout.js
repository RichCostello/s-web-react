

var SBLogout = React.createClass({

	_logoutUser: function(){
		CurrentUserActions.logoutUser();
    window.location = '/';
	},
    render: function() {
        return (

          <button className="sdrop mdl-button mdl-js-button" onClick={this._logoutUser}>Log Out</button>
        );
    }
});

export default SBLogout;