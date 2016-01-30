var DiscoverList = React.createClass({
  handleTouchStart(){
    alert('touch started');
  },
  render: function(){

   // console.log(this.props);
      var DSItemList = this.props.list.map(function(item, index){
         //we are only going to load the first 3 and deal with swapping in DSBtn
         if(index<3){
            return(
            <DiscoveryItem {...this.props.list[index]} />
            );
         }
      }.bind(this));

      var dsdisplay ='';
      if(this.props.list.length<2){ dsdisplay = "none"; }

    return(
            <div className="DiscoverPosts DisToolbar" onTouchStart={this.handleTouchStart}>
   
               <DSBtn {...this.props} orientation="left" display="none" />
               <DSBtn {...this.props} orientation="right" display={dsdisplay} />

               <div className="w300">


                  {DSItemList}


               </div>

            </div>
    );
  }

});


export default DiscoverList;