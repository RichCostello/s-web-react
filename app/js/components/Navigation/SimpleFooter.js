var counter = 0;

var SimpleFooter = React.createClass({

    getLink: function(){

        if(window.innerWidth < 1024){
            return(
                <ul>
                    <li><a href="/privacy">Privacy</a></li>
                    <li><a href="/support">Support</a></li>
                    <li><a href="/terms">Terms & Conditions</a></li>
                </ul>
            );
        }
        else{
            return(
                <ul>
                    <li><Link to="Privacy">Privacy</Link></li>
                    <li><Link to="Support">Support</Link></li>
                    <li><Link to="Terms">Terms & Conditions</Link></li>
                </ul>
            );
        }

    },
    render: function() {
        return (
              <div className="simpleFooter">
                    {this.getLink()}
              </div>
        );
    }
});

module.exports = SimpleFooter;
