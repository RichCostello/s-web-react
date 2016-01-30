var CurrentUserStore = require('../../stores/CurrentUserStore');

var ProfileAvatar = React.createClass({
  mixins: [CurrentUserStore.mixin],

  storeDidChange: function(){
    var t = CurrentUserStore.fetchUploadAvatarID();
    if(t != undefined){this.setState(t);}
    else{this.forceUpdate(t);} 
    var u = CurrentUserStore.fetchUploadCoverID();
    if(u != undefined){this.setState(u);}
    else{this.forceUpdate(u);}     
    // console.log('store did change');
  },
  getInitialState: function() {
    return {
      cropperOpen: false,
      img: null,
      croppedImg:undefined,
      uploadAvatarID:'',
      uploadCoverID:''
    };
  },
  handleFileChange: function(dataURI) {
    // console.log(this);
    this.setState({
      img: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true
    });

    if(this.props.cname == 'demo-cover'){
      CurrentUserActions.getUploadCoverID();
    }else{
      CurrentUserActions.getUploadAvatarID();
    }
    

  },
  handleCrop: function(dataURI) {
    this.setState({
      cropperOpen: false,
      img: null,
      croppedImg: dataURI
    });


    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
      // console.log(ia);
      var blobimg = new Blob([ia], {type:mimeString});

    this.saveImg(blobimg);
  },
  saveImg: function(img){

    var fd = new FormData();
        fd.append('file',img);
        if(this.props.cname=='demo-cover'){
            fd.append('uploadID',this.state.uploadCoverID);
        }else{
            fd.append('uploadID',this.state.uploadAvatarID);
        }

    CurrentUserActions.uploadForm(fd);

  },
  handleRequestHide: function() {
    this.setState({
      cropperOpen: false
    });
  },
  render: function() {


    if(this.props.type == "avatar"){
          var thisImg = this.state.croppedImg ? this.state.croppedImg : ResizeURL+"/resize/4/0/400/400/0/0/100/"+this.props.avatar;    
    }
    else{
        var thisImg = this.state.croppedImg ? this.state.croppedImg : ResizeURL+"/resize/3/0/800/800/0/0/100/"+this.props.avatar;
    }


    return (
      <div>
        <div className="avatar-photo">
          <FileUpload handleFileChange={this.handleFileChange} />
          <div className="avatar-edit">
            <span>Click to Pick Avatar</span>
            <i className="fa fa-camera"></i>
          </div>
          <img src={thisImg} />
        </div>
        {this.state.cropperOpen &&
          <AvatarCropper
            onRequestHide={this.handleRequestHide}
            onCrop={this.handleCrop}
            height={this.props.height}
            width={this.props.width}
            image={this.state.img}
            className={this.props.cname} />
        }
      </div>
    );
  }
});

export default ProfileAvatar;
