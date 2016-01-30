var prevCache = [];
var DiscoverList = React.createClass({
   next(){
      
         //store item
         var DSI = $( '.DiscoverItem' )[0];

         //increment prevcache
        prevCache.push(1);

        //if we push next prev is active
      $('.DiscoverLeft').css({display:'inline-block'});
     
      //Animate discovery items
       $( '.DiscoverItem' ).css({left: '-'+$('.DiscoverItem').css('width')});
       

         //wait for animation to complete
         window.setTimeout(function(){

         //remove item
         $( '.DiscoverItem' )[0].remove();

         //overide transition
         $('.DiscoverItem').addClass('static');

         //reset css
         $( '.DiscoverItem' ).css({left: 0});


         //if there are no more to go through, hide right btn
         if(prevCache.length + 2 > this.props.list.length){
            $('.DiscoverRight').css({display:'none'});
         }

         //wait for $( '.DiscoverItem' ).css({left: 0}); becasue apperently it aint done yet
         window.setTimeout(function(){
         //reset overide transition           
            $('.DiscoverItem').removeClass('static');
 if(prevCache.length + 2 < this.props.list.length){
            //update info in stored var
            var dis = this.props.list[prevCache.length + 2];
            $($(DSI).find('.disTitle')[0]).text(dis.title);
            $($(DSI).find('.disCat')[0]).text(dis.category);
            $($(DSI).find('.disDesc')[0]).text(dis.desc);
}else{
            //if we dont have anything to throw in there just make it empty to stay at 3 divs
            $($(DSI).find('.disTitle')[0]).text('');
            $($(DSI).find('.disCat')[0]).text('');
            $($(DSI).find('.disDesc')[0]).text('');
}
            // format DSI element
            $(DSI).removeAttr('style');

            //add new item to discoverlist
            $('.DisToolbar').find('.w300').append(DSI);

         }.bind(this),20);



         }.bind(this),500);

   },
   prev(){
      $('.DiscoverRight').css({display:'inline-block'});
      //overide transition
      $('.DiscoverItem').addClass('static');

         //hold third item
         var DSI = $('.DiscoverItem')[2];

         // remove third item
         $(DSI).remove();

      //move 3rd item to 1st pos 
      //prepend DSI to w300
      $('.DisToolbar').find('.w300').prepend(DSI);

      //set item info
      var dis = this.props.list[prevCache.length - 1];
            $($(DSI).find('.disTitle')[0]).text(dis.title);
            $($(DSI).find('.disCat')[0]).text(dis.category);
            $($(DSI).find('.disDesc')[0]).text(dis.desc);

       //set to DSI left css to - DiscoverItem.css('width')
      $('.DiscoverItem').css('left','-' + $('.DiscoverItem').css('width'));

         //remove increment from array
         prevCache.pop();

         if(prevCache.length==0){
            $('.DiscoverLeft').css({display:'none'});
         }

         //wait for $( '.DiscoverItem' ).css({left: 0}); becasue apperently it aint done yet
         window.setTimeout(function(){
        //animatie
          $('.DiscoverItem').removeClass('static');
        $('.DiscoverItem').css({left: 0});
         },20);        

   },
	render: function(){
         var DSBtnstyle={}
         if(this.props.display=='none'){DSBtnstyle={'display':'none'}}
	      if(this.props.orientation=='left'){
               return(
               <div className="DiscoverLeft" style={DSBtnstyle} onClick={this.prev}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="-51 46.8 95.5 108.2">

                        <path fill="#FFFFFF" d="M44.5,147.5c0,6.2-2.7,7.9-6.2,7.4c-1.9-0.2-3.7-1.1-5.4-2.1c-8-4.6-16-9.4-23.9-14.1c-18.5-10.9-37-21.8-55.5-32.5
                           c-5.5-3.2-6.1-8.3,0.1-11.8c11.7-6.7,23.3-13.4,35.1-20.1c12.3-7,24.5-13.8,36.8-20.7c3.4-1.9,6.7-4,10.1-5.9c4.2-2.3,9,0.1,9,4.8
                            M33.4,61.4c-22.7,12.9-45.3,25.8-68.5,39c23.1,13.5,45.5,26.6,68.5,40C33.4,113.9,33.4,87.8,33.4,61.4z"/>
                  </svg>
               </div>
               );
      }else{
               return(

               <div className="DiscoverRight" style={DSBtnstyle} onClick={this.next}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
       viewBox="0 0 95.5 108.2" enable-background="new 0 0 95.5 108.2">

                        <path fill="#FFFFFF" d="M0.5,100.7c0,6.2,2.7,7.9,6.2,7.4c1.9-0.2,3.7-1.1,5.4-2.1c8-4.6,15.9-9.4,23.8-14.1C54.3,81,72.7,70.1,91.2,59.4
                           c5.5-3.2,6.1-8.3-0.1-11.8c-11.6-6.7-23.2-13.4-34.9-20.1c-12.2-7-24.4-13.8-36.6-20.7c-3.4-1.9-6.7-4-10.1-5.9
                           c-4.2-2.3-9,0.1-9,4.8 M11.6,14.6c22.6,12.9,45.1,25.8,68.2,39c-23,13.5-45.3,26.6-68.2,40C11.6,67.1,11.6,41,11.6,14.6z"/>

                  </svg>
               </div>
               );
      }
	}



});


export default DiscoverList;