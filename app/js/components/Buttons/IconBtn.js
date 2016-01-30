var IconBtn = React.createClass({
	
	render: function(){

		return(
			<div>
               <button id="issuebtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon mdl-color-text--black">
            <i className="material-icons">arrow_drop_down</i>
          </button>
          <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlfor="issuebtn">
            <button className="mdl-menu__item">All Issues</button>
          </ul>
            </div>
		)
	}

});

export default IconBtn;
                                    
                                  