/**
 * Wrap HTML5 video or audio element
 * see http://www.w3schools.com/tags/ref_av_dom.asp
 *
 * */
Ext.define('webinosTV.view.MediaWrapper', {
  extend: 'Ext.Container',
  xtype: 'mediawrapper',
  requires: ['Ext.Img'],
  config: {
    mediaType: null, //values: 'video' | 'audio'
    url: '',
    poster: '',
    layout: {
      type: 'vbox',
      align: 'middle',
      pack: 'center'
    },
    autoplay: false,
    loop: false,
    preload: 'auto',
    cls: ['videobox', 'main-container'],
    useControls: false,
    tapToControl: true,
//    type: '',
    //TODO allow multiple alternative sources?
    innerMediaElement: document.createElement('video'),
    innerSourceElement: document.createElement('source'),
    listeners: {
      hide: {
        fn: function(videoPlayerPanel, eOpts) {
          //TODO destroy? notify? ...
          //console.warn("Hide & destroy", videoPlayerPanel);
          // alert("Hiding player  - Hidden ?"+videoPlayerPanel.getHidden());
          Ext.Viewport.remove(videoPlayerPanel, true);
        }
      }
    }
  },
  applyMediaType: function(mediaType) {
    return mediaType;
  },
  applyUrl: function(url)
  {
    var mw = this;
    var srcElement = mw.getInnerSourceElement();
    var mediaType = mw.getMediaType();
    mw.setInnerMediaElement(document.createElement(mediaType));
    var mediaElement = mw.getInnerMediaElement();
    srcElement.src = url;
    var audioTypesMap = {
      'ogg': 'audio/ogg',
      'mp3': 'audio/mp3',
      'wav': 'audio/wav'
    };
    var videoTypesMap = {
      'ogg': 'video/ogg',
      'mp4': 'video/mp4',
      'mov': '',
      'webm': 'video/webm'
    };
    var extension = url.split('.').pop();
    var mediaType = mw.getMediaType();
    var type = undefined;
    if (mediaType === 'audio')
    {
      type = audioTypesMap[extension];
    }
    else if (mediaType === 'video')
    {
      type = videoTypesMap[extension];
    }
    srcElement.type = type ? type : '';
    mediaElement.appendChild(srcElement);
    mediaElement.setAttribute('width', '100%');
    mediaElement.setAttribute('height', '100%');
//    mediaElement.setAttribute('preload', true);
    //Set Video Event handlers - TODO use or delete
//    mediaElement.setAttribute('onloadstart', '(' + mw.onLoadStart + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('durationchange', '(' + mw.onDurationChange + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('onloadedmetadata', '(' + mw.onLoadedMetaData + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('onloadeddata', '(' + mw.onLoadedData + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('progress', '(' + mw.onProgress + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('canplay', '(' + mw.onCanPlay + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('canplaythrough', '(' + mw.onCanPlayThrough + ')("' + mw.getId() + '")');
//    mediaElement.setAttribute('error', '(' + mw.onLoadError + ')("' + mw.getId() + '")');
    //Set HTML for this component
    mw.setHtml(mediaElement);
    return url;
  },
  applyAutoplay: function(autoPlay)
  {
    var mw = this;
    mw.getInnerMediaElement().autoplay = autoPlay;
    //mw.getInnerMediaElement().setAttribute('autoplay', autoPlay);
    return autoPlay;
  },
  applyLoop: function(loop)
  {
    var mw = this;
    mw.getInnerMediaElement().loop = loop;
    return loop;
  },
  applyPreload: function(value)
  {
    var mw = this;
    var allowedValues = ['true', 'auto', 'metadata', 'none'];
    if (allowedValues.indexOf(value) !== -1) {
      mw.getInnerMediaElement().preload = value;
    }
    return value;
  },
  applyUseControls: function(showControls) {
    var mw = this;
    if (showControls)
    {
      mw.enableControls();
    }
    else
    {
      mw.disableControls();
    }
    return showControls;
  },
  applyTapToControl: function(tapToControl) {
    var mw = this;
    if (tapToControl)
    {
      mw.setUseControls(false);
      //This is necessary to give the proper scope
      mw.getInnerMediaElement().setAttribute('onclick', '(' + mw.togglePlay + ')("' + mw.getId() + '")');
    }
    else
    {
//      mw.setUseControls(true); - NOT set to true: explicitly set useControls to true instead
      mw.getInnerMediaElement().removeAttribute('onclick');
    }
    return tapToControl;
  },
  applyPoster: function(poster) {
    var mw = this;
    if (mw.getMediaType() === 'video')
    {
      mw.getInnerMediaElement().setAttribute('poster', poster); //.poster = poster;
    }
    else if (mw.getMediaType() === 'audio')
    {
      mw.insert(0, {
        xtype: 'image',
        src: poster,
        height: '50%',
        width: '50%'
      });
    }
    return poster;
  },
  hasControls: function() {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    return mediaElement;
  },
  isPaused: function() {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    return mediaElement.paused;
  },
  maySupportMediaType: function(videoType, codecType)
  {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    var isSupported = mediaElement.canPlayType(videoType + ';codecs="' + codecType + '"') === "" ? true : false;
    return isSupported;
  },
  play: function() {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    mediaElement.play();
  },
  pause: function() {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    mediaElement.pause();
  },
  togglePlay: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
    var mw = elementId === undefined ? this : Ext.getCmp(elementId);

    if (mw.isPaused()) {
      mw.play();
    }
    else
    {
      mw.pause();
    }
  },
  load: function() {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    mediaElement.reload();
  },
  enableControls: function()
  {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    mw.setTapToControl(false);
    mediaElement.controls = true;
    mediaElement.load();
  },
  disableControls: function()
  {
    var mw = this;
    var mediaElement = mw.getInnerMediaElement();
    mediaElement.controls = false;
    mediaElement.load();
  },
  onLoadStart: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Load START");
  },
  onDurationChange: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Duration CHANGE");
  },
  onLoadedMetaData: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Loaded METADATA");
  },
  onLoadedData: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Loaded DATA");
  },
  onProgress: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Progress");
  },
  onCanPlay: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Can PLAY");
  },
  onCanPlayThrough: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("Can PLAY THROUGH");
  },
  onLoadError: function(elementId) {
    //toggle play/pause - TODO check media type, raise errors/exceptions etc?
//    var mw = typeof elementId === undefined ? this : Ext.getCmp(elementId);
    console.log("LOAD ERROR");
  }
});