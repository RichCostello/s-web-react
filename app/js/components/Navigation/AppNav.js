var LeftNavComponent = React.createClass({
  

    render: function () {
      // Optionally, you may add a header to the left navigation bar, by setting
      // the `LeftNav`'s `header` property to a React component, like os:
      //
      //     header={<div className='logo'>Header Title.</div>}
      return (
         <LeftNav
          ref="leftNav"
          docked={true}
          menuItems={this.props.menuItems}
          onClick={this._onLeftNavChange}
          onChange={this._onLeftNavChange} />
      );
    },

    toggle:function () {
      console.log("toggle");
      this.refs.leftNav.toggle();
    },

    close: function () {
      console.log("close");
      this.refs.leftNav.close()
    },

    _onLeftNavChange: function(e, selectedIndex, menuItem) {
      this.transitionTo(menuItem.payload);
      this.refs.leftNav.close();
    }
  });

export default LeftNavComponent;