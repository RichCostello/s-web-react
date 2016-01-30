var functions = {
	convertTime: function(unixTime){
        // console.log(unixTime);

        var seconds = Math.floor((new Date() - (unixTime*1000)) / 1000);


        var interval = Math.floor(seconds / 604800);
        if (interval >= 1) {
            return interval + "w";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + "d";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + "h";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + "m";
        }
        return Math.ceil(seconds) + "s";
    },


    drawSlidedd: function(){ 
          if(window.innerWidth < 1024){
          $('.mdl-layout').removeClass('expanded');
        }
    },
    convertCounts: function(number){

        var rounded = 0;

        if(number >= 1000000){
            rounded = Math.round( (number / 1000000) * 10 ) / 10;
            return rounded + "M";
        }
        if(number >= 1000){

            rounded = Math.round( (number / 1000) * 10 ) / 10;
            return rounded + "k";
        }
        else{
            return number;
        }


    },
    redirect: function(id, type){
        //Check is device is iOS
        var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        
        if(type == "post"){
           var appUrlScheme = "station://p/"+id;
           var appstoreFail = WebsiteURL+"/p/"+id;
        }    
        else if(type == "station"){
            var appUrlScheme = "station://s/"+id;
            var appstoreFail = WebsiteURL+"/"+id;
        }
        else if(type == "user"){
            var appUrlScheme = "station://user/"+id;
            var appstoreFail = WebsiteURL+"/user/"+id;
        }

        if (iOS || isAndroid)
        {
            //If the app is not installed the script will wait for .5sec and redirect to web.
            var loadedAt = +new Date;
            setTimeout(
                function(){
                    if (+new Date - loadedAt < 500){
                        window.location = appstoreFail;
                    }
                }
                ,25);
            window.open(appUrlScheme,"_self");
        } 
    },

};


export default functions;