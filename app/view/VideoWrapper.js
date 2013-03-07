/**
 * Wrap HTML5 video element
 * see http://www.w3schools.com/tags/ref_av_dom.asp
 *
 * */
Ext.define('webinosTV.view.VideoWrapper', {
  extend: 'Ext.Container',
  xtype: 'videowrap',
  config: {
    autoplay: false,
    loop: false,
//    preload: 'auto',
    cls: ['videobox', 'main-container'],
    useControls: false,
    tapToControl: true,
    url: '',
    type: '',
    //TODO allow multiple alternative sources?
    innerVideoElement: document.createElement('video'),
    innerSourceElement: document.createElement('source'),
    listeners: {
      hide: {
        fn: function(videoPlayerPanel, eOpts) {
          //TODO destroy? notify? ...
          //console.log("Video Player Panel Hidden", videoPlayerPanel);
          // alert("Hiding player  - Hidden ?"+videoPlayerPanel.getHidden());
          Ext.Viewport.remove(videoPlayerPanel, true);
        }
      }
    }
  },
  applyUrl: function(url)
  {
    var vw = this;
    var srcElement = vw.getInnerSourceElement();
    var videoElement = vw.getInnerVideoElement();
    srcElement.src = url;
    var typeMap = {
      'ogg': 'video/ogg',
      'mp4': 'video/mp4',
      'mov': 'video/mp4',
      'webm': 'video/webm'
    };
    var type = typeMap[url.split('.').pop()];
    srcElement.type = type;
    videoElement.appendChild(srcElement);
    videoElement.setAttribute('width', '100%');
    videoElement.setAttribute('height', '100%');
    //Set Video Event handlers - TODO use or delete
//    videoElement.setAttribute('onloadstart', '(' + vw.onLoadStart + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('durationchange', '(' + vw.onDurationChange + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('onloadedmetadata', '(' + vw.onLoadedMetaData + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('onloadeddata', '(' + vw.onLoadedData + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('progress', '(' + vw.onProgress + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('canplay', '(' + vw.onCanPlay + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('canplaythrough', '(' + vw.onCanPlayThrough + ')("' + vw.getId() + '")');
//    videoElement.setAttribute('error', '(' + vw.onLoadError + ')("' + vw.getId() + '")');
    //Set HTML for this component
    vw.setHtml(videoElement);
    return url;
  },
  applyAutoplay: function(autoPlay)
  {
    var vw = this;
    vw.getInnerVideoElement().autoplay = autoPlay;
    //vw.getInnerVideoElement().setAttribute('autoplay', autoPlay);
    return autoPlay;
  },
  applyLoop: function(loop)
  {
    var vw = this;
    vw.getInnerVideoElement().loop = loop;
    return loop;
  },
  applyPreload: function(value)
  {
    var vw = this;
    var allowedValues = ['auto', 'metadata', 'none'];
    if (allowedValues.indexOf(value) !== -1) {
      vw.getInnerVideoElement().preload = value;
    }
    return value;
  },
  applyType: function(type)
  {
    var vw = this;
    vw.getInnerSourceElement().type = type;
    return type;
  },
  applyUseControls: function(showControls) {
    var vw = this;
    if (showControls)
    {
      vw.enableControls();
    }
    else
    {
      vw.disableControls();
    }
    return showControls;
  },
  applyTapToControl: function(tapToControl) {
    var vw = this;
    if (tapToControl)
    {
      vw.setUseControls(false);
      //This is necessary to give the proper scope
      vw.getInnerVideoElement().setAttribute('onclick', '(' + vw.togglePlay + ')("' + vw.getId() + '")');
    }
    else
    {
//      vw.setUseControls(true); - NOT set to true: explicitly set useControls to true instead
      vw.getInnerVideoElement().removeAttribute('onclick');
    }
    return tapToControl;
  },
  hasControls: function() {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    return videoElement;
  },
  isPaused: function() {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    return videoElement.paused;
  },
  maySupportMediaType: function(videoType, codecType)
  {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    var isSupported = videoElement.canPlayType(videoType + ';codecs="' + codecType + '"') === "" ? true : false;
    return isSupported;
  },
  play: function() {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    videoElement.play();
  },
  pause: function() {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    videoElement.pause();
  },
  togglePlay: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
    var vw = elementId === undefined ? this : Ext.getCmp(elementId);

    if (vw.isPaused()) {
      vw.play();
    }
    else
    {
      vw.pause();
    }
  },
  load: function() {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    videoElement.reload();
  },
  enableControls: function()
  {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    vw.setTapToControl(false);
    videoElement.controls = true;
    videoElement.load();
  },
  disableControls: function()
  {
    var vw = this;
    var videoElement = vw.getInnerVideoElement();
    videoElement.controls = false;
    videoElement.load();
  },
  onLoadStart: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Load START");
  },
  onDurationChange: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Duration CHANGE");
  },
  onLoadedMetaData: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Loaded METADATA");
  },
  onLoadedData: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Loaded DATA");
  },
  onProgress: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Progress");
  },
  onCanPlay: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Can PLAY");
  },
  onCanPlayThrough: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Can PLAY THROUGH");
  },
  onLoadError: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var vw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("LOAD ERROR");
  }
});