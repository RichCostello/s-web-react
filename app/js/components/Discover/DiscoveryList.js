var DiscoverList = React.createClass({
  render: function(){

      var DSItemList = this.props.items.map(function(item, index){
            <DiscoveryItem {...this.props} />
      });

    return(
            <div className="DiscoverPosts DisToolbar">
   
               <DSBtn orientation="left" />
               <DSBtn orientation="right" />

               <div className="w200">
                <div className="DiscoverItem">
                  <div className="ilb vt">
                      <img src="../images/gopro_profile.jpg"/>
                  </div>
                  <div className="ilb tal vt flex1">
                      <div>{this.props.title}</div>
                      <div>{this.props.category}</div>
                      <div>{this.props.desc}</div>
                  </div>
                  </div>



                  <div className="DiscoverItem ondeck">
                  <div className="ilb vt dh100">
                      <img src="../images/gopro_profile.jpg"/>
                  </div>
                  <div className="ilb tal vt">
                      <div>Events Name/Title</div>
                      <div>Category - Cost</div>
                      <div>Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon Bacon</div>
                  </div>
                  </div>
               </div>

            </div>
    );
  }

});


export default DiscoverList;