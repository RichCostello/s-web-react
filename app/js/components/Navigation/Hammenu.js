var Hammenu = React.createClass({

  drawSlide: function(){ 
        $('.material--burger').toggleClass('material--arrow');
         if(window.innerWidth < 1024 && !$('.mdl-layout').hasClass('expanded')){
        // console.log("Its smaller than 1024");
        $('.mdl-layout').addClass('expanded');
         $('.sblag').hide(); 
        $('#lag, .expanded #lag2, .sblag').delay(500).fadeIn(100);
        $('.expanded #lag2').hide();
      }
      else if(window.innerWidth < 1024){
        $('.mdl-layout').removeClass('expanded');
        $('#lag').hide();
      };
  },
  render: function() {   
       return (     
           <div className="material--burger" onClick={this.drawSlide} >
                <span></span>
           </div>
        );
  }
});

export default Hammenu;