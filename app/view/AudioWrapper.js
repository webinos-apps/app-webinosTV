/**
 * Wrap HTML5 video element
 * see http://www.w3schools.com/tags/ref_av_dom.asp
 *
 * */
Ext.define('webinosTV.view.AudioWrapper', {
  extend: 'Ext.Container',
  xtype: 'audiowrap',
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
    innerAudioElement: document.createElement('audio'),
    innerSourceElement: document.createElement('source'),
    listeners: {
      hide: {
        fn: function(audioPlayerPanel, eOpts) {
          //TODO destroy? notify? ...
          //console.log("Video Player Panel Hidden", audioPlayerPanel);
          // alert("Hiding player  - Hidden ?"+audioPlayerPanel.getHidden());
          Ext.Viewport.remove(audioPlayerPanel, true);
        }
      }
    }
  },
  applyUrl: function(url)
  {
    var aw = this;
    var srcElement = aw.getInnerSourceElement();
    var audioElement = aw.getInnerAudioElement();
    srcElement.src = url;
    var typeMap = {
      'ogg': 'audio/ogg',
      'mp3': 'audio/mp3',
      'wav': 'audio/wav'
    };
    var type = typeMap[url.split('.').pop()];
    srcElement.type = type ? type : '';
    audioElement.appendChild(srcElement);
    audioElement.setAttribute('width', '100%');
    audioElement.setAttribute('height', '100%');
    //Set Video Event handlers - TODO use or delete
//    audioElement.setAttribute('onloadstart', '(' + aw.onLoadStart + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('durationchange', '(' + aw.onDurationChange + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('onloadedmetadata', '(' + aw.onLoadedMetaData + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('onloadeddata', '(' + aw.onLoadedData + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('progress', '(' + aw.onProgress + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('canplay', '(' + aw.onCanPlay + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('canplaythrough', '(' + aw.onCanPlayThrough + ')("' + aw.getId() + '")');
//    audioElement.setAttribute('error', '(' + aw.onLoadError + ')("' + aw.getId() + '")');
    //Set HTML for this component
    aw.setHtml(audioElement);
    return url;
  },
  applyAutoplay: function(autoPlay)
  {
    var aw = this;
    aw.getInnerAudioElement().autoplay = autoPlay;
    //aw.getInnerAudioElement().setAttribute('autoplay', autoPlay);
    return autoPlay;
  },
  applyLoop: function(loop)
  {
    var aw = this;
    aw.getInnerAudioElement().loop = loop;
    return loop;
  },
  applyPreload: function(value)
  {
    var aw = this;
    var allowedValues = ['auto', 'metadata', 'none'];
    if (allowedValues.indexOf(value) !== -1) {
      aw.getInnerAudioElement().preload = value;
    }
    return value;
  },
  applyType: function(type)
  {
    var aw = this;
    aw.getInnerSourceElement().type = type;
    return type;
  },
  applyUseControls: function(showControls) {
    var aw = this;
    if (showControls)
    {
      aw.enableControls();
    }
    else
    {
      aw.disableControls();
    }
    return showControls;
  },
  applyTapToControl: function(tapToControl) {
    var aw = this;
    if (tapToControl)
    {
      aw.setUseControls(false);
      //This is necessary to give the proper scope
      aw.getInnerAudioElement().setAttribute('onclick', '(' + aw.togglePlay + ')("' + aw.getId() + '")');
    }
    else
    {
//      aw.setUseControls(true); - NOT set to true: explicitly set useControls to true instead
      aw.getInnerAudioElement().removeAttribute('onclick');
    }
    return tapToControl;
  },
  hasControls: function() {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    return audioElement;
  },
  isPaused: function() {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    return audioElement.paused;
  },
  maySupportMediaType: function(videoType, codecType)
  {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    var isSupported = audioElement.canPlayType(videoType + ';codecs="' + codecType + '"') === "" ? true : false;
    return isSupported;
  },
  play: function() {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    audioElement.play();
  },
  pause: function() {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    audioElement.pause();
  },
  togglePlay: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
    var aw = elementId === undefined ? this : Ext.getCmp(elementId);

    if (aw.isPaused()) {
      aw.play();
    }
    else
    {
      aw.pause();
    }
  },
  load: function() {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    audioElement.reload();
  },
  enableControls: function()
  {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    aw.setTapToControl(false);
    audioElement.controls = true;
    audioElement.load();
  },
  disableControls: function()
  {
    var aw = this;
    var audioElement = aw.getInnerAudioElement();
    audioElement.controls = false;
    audioElement.load();
  },
  onLoadStart: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Load START");
  },
  onDurationChange: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Duration CHANGE");
  },
  onLoadedMetaData: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Loaded METADATA");
  },
  onLoadedData: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Loaded DATA");
  },
  onProgress: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Progress");
  },
  onCanPlay: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Can PLAY");
  },
  onCanPlayThrough: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Can PLAY THROUGH");
  },
  onLoadError: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var aw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("LOAD ERROR");
  }
});