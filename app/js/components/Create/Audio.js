var Audio = React.createClass({
	
	render: function(){

    var brandedbg = {backgroundColor: this.props.tenant.defaultHeader};
    var branded = {color: this.props.tenant.defaultHeader};

		return(
			<form action="" method="post">

                <h2>Audio</h2>

                <div id="general-form-content">                                    

                    <input type="submit" className="submitBtn transItem block" value="Submit" id="support-submit-btn" name="button" style={brandedbg}/>


                </div>

            </form>
		);
	}

});

export default Audio;