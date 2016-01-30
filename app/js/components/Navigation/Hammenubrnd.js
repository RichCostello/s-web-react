var Hammenubrnd = React.createClass({

  drawSlide: function(){
  
        $('.material--burger').toggleClass('material--arrow');
         if(window.innerWidth < 1024 && !$('.mdl-layout').hasClass('expanded')){
        console.log("Its smaller than 1024");
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
    
      if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}
      var branded={backgroundColor:primary}
        
      if(!document.getElementById('hamcolor') && primary){
       $('body').append('<style id="hamcolor">.material--burgerbrnd span:before{background-color: '+primary+';} .material--burgerbrnd span:after{background-color: '+primary+';}</style>');
      }

        return (     
           <div className="material--burgerbrnd" onClick={this.drawSlide} >
                <span style={branded}></span>
           </div>
        );
    }
});

export default Hammenubrnd;