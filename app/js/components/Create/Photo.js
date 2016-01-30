

var Photo = React.createClass({
	
  getInitialState() {
      return {
        files: []
      };
  },
  onDrop(files) {
    this.setState({
      files: files
    });
    $('.dropzoneBox').css('display','none');
    $('.uploadInstructionsInstructions').css('display','none');
     $('#support-submit-btn').css('display','inline-block');
     $('#cancelPhotoPost').css('display','inline-block');
  },
  onOpenClick() {
    this.refs.dropzone.open();
  },
  closeModal: function() {
        React.unmountComponentAtNode(document.getElementById('CreatePhotoPost'));
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
    $('#cancelPhotoPost').css('display','none');
    $('#progressError').css('display','none');
    $('#photoProgressBar').css('display','none');
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

       $('#photoProgressBar').css('display','block');
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
    componentWillMount(){
      // this.router = this.context.router;
    },

	render: function(){
		
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
		          <div id="CreatePhotoPost">
                <div id="general-form-content">
                  <div className="uploadInstructions">
                    <div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>
                    <div className="uploadInstructionsTitle">Upload Photo</div>
                    <div className="uploadInstructionsInstructions">Click below to choose the photos you would like to upload to Station.</div>
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
                                    <div className="preview">
                                      <div className="prev" >
                                        <img src={file.preview} />
                                      </div>
                                      <div className="descript">
                                            <div className="postTo">
                                            <span className="ilb">Post to</span>
                                            <select name={'station['+index+']'} className="ilb">{postToStation}</select>
                                            </div>
                                        <input type="text" name={'title['+index+']'} placeholder="Post Title" />
                                        <input type="text" name={'desc['+index+']'} placeholder="Post Description" />
                                      </div>
                                    </div> )}</div>
                      </div> : null}                                           
                        <div style={style} id="cancelPhotoPost" onClick={this.cancelPost}>Cancel</div>
                      <input style={style} type="submit" className="submitBtn transItem block" onClick={this.handleSubmit} id="support-submit-btn" name="button"/>

                </div>
                    <div id="photoProgressBar">
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
              </div>

            
		    );
      }else{
            return(
              <div id="CreatePhotoPost">
                <div id="general-form-content">
                 <div className="close"><i className="zmdi zmdi-close" onClick={this.closeModal}></i></div>
                  <div className="uploadInstructions">
                    <div className="uploadInstructionsTitle">Upload Photo</div>
                    <div className="uploadInstructionsInstructions">You must be listening to a station in order to create a post</div>
                  </div>
                </div>
              </div>
            );
      }
	}

});


Photo.contextTypes = {
    router: React.PropTypes.func.isRequired
}


export default Photo;









