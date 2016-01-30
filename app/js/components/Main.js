var Main = React.createClass({
    render: function () {
        return (
            <div>
                <Sidebar />    
                <Header />      
                <RouteHandler />
            </div>
        );
    }

});

module.exports = Main;