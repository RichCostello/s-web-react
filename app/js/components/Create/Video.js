var Video = React.createClass({
	  getInitialState() {
      return {
        files: []
      };
  },
  onDrop(files) {
    for(i=0; i<files.length; i++){
    files[i]['poster'] = "http://portfoliotheme.org/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg";
    }
    console.log(files);
    this.setState({
      files: files
    });

    $('.dropzoneBox').css('display','none');
    $('.uploadInstructionsInstructions').css('display','none');
     $('#support-submit-btn').css('display','inline-block');
     $('#cancelVideoPost').css('display','inline-block');

        // setTimeout(function(){
        // vidsnap($(elroot).find('.vidsnap')[0],'q');
        // },200);             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

  },
  vidsnap(index){

          // Get handles on the video and canvas elements
           // now video node var video = document.querySelector('video');
          var qvid = $('#video'+index).find('video')[0];
          var canvas = $('#video'+index).find('canvas')[0];
          // Get a handle on the 2d context of the canvas element
          var context = canvas.getContext('2d');
          // Define some vars required later
          var w, h, ratio;
          // Calculate the ratio of the video's width to height
          ratio = qvid.videoWidth / qvid.videoHeight;
          // Define the required width as 100 pixels smaller than the actual video's width
          w = qvid.videoWidth - 100;
          // Calculate the height based on the video's width and the ratio
          h = parseInt(w / ratio, 10);
          // Set the canvas width and height to the values just calculated
          canvas.width = w;
          canvas.height = h;
          // Define the size of the rectangle that will be filled (basically the entire element)
          context.fillRect(0, 0, w, h);
          // Grab the image from the video
          context.drawImage(qvid, 0, 0, w, h);
          // save canvas image as data url (png format by default)
          var dataURL = canvas.toDataURL();
          // set canvasImg image src to dataURL
          // so it can be saved as an image
          // $(root).find('.vpic').removeClass('bahid');
          $('#video'+index).find('.vidPosterPreview')[0].src = dataURL;
  },
  onOpenClick() {
    this.refs.dropzone.open();
  },
  closeModal: function() {
        React.unmountComponentAtNode(document.getElementById('CreateVideoPost'));
          ModalActions.setContent(<empty />);
           $('.fixedModal').css('display','none');
  },
  cancelPost(){
    this.setState({
      files: []
    });
    $('.dropzoneBox').css('display','block');
    $('.uploadInstructionsInstructions').css('display','block');
    $('#support-submit-btn').css('display','none');
    $('#cancelVideoPost').css('display','none');
    $('#progressError').css('display','none');
    $('#videoProgressBar').css('display','none');
    $('#progress').css('width','0px');
  },
  handleSubmit(){
      if(this.context.router.getCurrentPath()=='/feed'){}
      var barProgess=0;
      var fileLength = this.state.files.length;
      var indexReturn = 0;
      var reloadUser = false;
      var onUser ='';
      var onStation='';
      var onUser = this.props.username;
      var onStation = this.props.station;
      var reloadStation = false;
      var reloadFeed = false;
      if(this.context.router.getCurrentPath()=='/feed'){reloadFeed = true;}
      var currentUser = CurrentUserStore.fetchCurrentUser();

       $('#videoProgressBar').css('display','block');
      // ModalActions.setContent(<ProgressModal id={this.props.ID} context={this.context} tenant={this.props.tenant} key="0" />);
 
      this.state.files.map(function(file,index){

        var stationName = $('[name="station['+index+']"]').val().substring(0,$('[name="station['+index+']"]').val().indexOf(';'));
        var stationIdentifier = $('[name="station['+index+']"]').val().substring($('[name="station['+index+']"]').val().indexOf(';')+1);
        var postTitle = $('[name="title['+index+']"]').val();
        var postDesc = $('[name="desc['+index+']"]').val();

        PostOffice.createPost(stationName,postTitle,postDesc,function(response){

          if(response.data.Success){
            barProgess+=200/fileLength*0.25;
            $('#progress').css('width',barProgess);

            var fd = new FormData();
            fd.append('file',file);
            fd.append('uploadID',response.data.Payload.UploadID);

            $.ajax({
            url: UploadURL+'/upload',
            data : fd,
            processData: false,
            contentType: false,
            type: 'POST',
              success: function(data){
                indexReturn++;
                barProgess += 200/fileLength*0.75;
                $('#progress').css('width',barProgess);

                  if (currentUser.userInfo.Profile.DisplayName == onUser){reloadUser = true;}
                  if (stationIdentifier == onStation){reloadStation = true;}

                  if(indexReturn == fileLength){

                      CurrentUserActions.loadCurrentUser();


                        setTimeout(function(){ 
                          $('.fixedModal').css('display','none');
                          ModalActions.setContent(<empty />); 
                            if(reloadUser){UserActions.loadByUsername(onUser,40,0,100,0,false); }
                            if(reloadStation){StationActions.loadStation(onStation,20,0,false);}
                            if(reloadFeed){PostActions.loadFeed(20, 0,false);}
                        }, 800);
                      
                  }
              },// end success
              fail: function(data){
                $('#progressError').css('display','block');
                $('#progressErrorText').text('Whoops, Something went wrong with the upload :(');
              }

            });//end ajax

          }//end if response.data.success
          else{
                $('#progressError').css('display','block');
                 $('#progressErrorText').text('Whoops, Something went wrong with the upload :(');
          }

        });//end callback     

      });//end map function
      
    //end handleSubmit
    },
	render: function(){
	
    var brandedbg = {backgroundColor: this.props.tenant.defaultHeader};
    var branded = {color: this.props.tenant.defaultHeader};
    var brandedbg = {backgroundColor: this.props.tenant.defaultHeader};
    var branded = {color: this.props.tenant.defaultHeader};



    var postToStation = this.props.userListening.map(function(station,index){
        if(station.Name != ''){var thisStationName = station.Name}else{var thisStationName = station.Identifier}
      return(
        <option value={station.ID+';'+station.Identifier} key={index}>{thisStationName}</option>
        );
    });

// 
if (this.props.tenant == 'none'){var primary=DefaultPrimary;} else {var primary= this.props.tenant.Primary;}
        var style = {backgroundColor: primary}
      if(this.props.userListening.length > 0){
          	return(
        			<div id="CreateVideoPost">
                        <div id="general-form-content">
                          <div className="uploadInstructions">
                            <div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>
                            <div className="uploadInstructionsTitle">Upload Video</div>
                            <div className="uploadInstructionsInstructions">Click below to choose a video you would like to upload to Station.</div>
                            </div>
                            <div className="dropzoneBox">
                              <Dropzone ref="dropzone" disableClick={true} onDrop={this.onDrop}>
                              
                                <div onClick={this.onOpenClick}>Or try dropping some files here.</div>
                              
                              </Dropzone>

                              <span className="uploadBtn" style={style} onClick={this.onOpenClick}>Upload</span>

                            </div>
                                      {this.state.files.length > 0 ? <div>
                              <h2>Uploading {this.state.files.length} files...</h2>
                              <div className="dropzoneCcontainer">{this.state.files.map((file,index) => 
                                            <div id={'video'+index} className="preview">
                                              <div className="prev" >
                                                 <video id={'vidPreview'+index} controls src={file.preview} poster={file.poster} type={file.type} />
                                                 <canvas className="vidcanvas bahid" width="150px" height="100px"></canvas>
                                                 <img className="vidPosterPreview" src={file.poster} />
                                              </div>
                                              <div className="descript">
                                                    <button onClick={this.vidsnap.bind(this,index)}>Choose a frame for your poster</button>
                                                    <div className="postTo">
                                                    <span className="ilb">Post to</span>
                                                    <select name={'station['+index+']'} className="ilb">{postToStation}</select>
                                                    </div>
                                                <input type="text" name={'title['+index+']'} placeholder="Post Title" />
                                                <input type="text" name={'desc['+index+']'} placeholder="Post Description" />
                                              </div>
                                            </div> )}</div>
                              </div> : null}                                           
                                <div style={style} id="cancelVideoPost" onClick={this.cancelPost}>Cancel</div>
                              <input style={style} type="submit" className="submitBtn transItem block" onClick={this.handleSubmit} id="support-submit-btn" name="button"/>
                             
                              <div id="notify"></div>

                        </div>
                          {/*
                            <div id="videoProgressBar">

                                <div id="ProgressModal" className="progressModal">
                                  <h1>Upload Progress</h1>

                                  <div id="progressBar">
                                    <div id="progress"></div>
                                  </div>
                                  
                                  <div id="progressError">
                                    <div id="progressErrorText"></div>
                                    <div id="cancelError" onClick={this.cancelPost}>Cancel</div>
                                  </div>

                                </div>
                            </div>
                        */}
                      </div>
        		);
      }
    }

});


Video.contextTypes = {
    router: React.PropTypes.func.isRequired
}

 
export default Video;