/**
 * Manages webinosTV app media player
 *
 * ## Notes
 *
 * - Handles the instantiation of the mediaplayer
 *
 */
Ext.define('integration.Ui.MediaPlayerManager', {
  mixins: ['Ext.mixin.Observable'],
  config: {
    ///modal or preview
    mode: 'modal',
    ///video or audio
    mediaType: 'video',
    ///mandatory: media url
    url: '',
    ///optional: still image url or album cover
    posterUrl: ''

  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  applyMode: function(mode) {
    if (mode === 'modal' || mode === 'preview')
      return mode;
    else
      return null;
  },
  applyMediaType: function(mediaType) {
    if (mediaType === 'video' || mediaType === 'audio')
      return mediaType;
    else
      return null;
  },
  //TODO testing only: remove reference to media files
  applyUrl: function(url) {
    if (url)
      return url;
    else //TODO use some better defaults
      return this.getMediaType() === 'video' ? 'resources/BigBen/bb1.mov' : 'resources/BigBen/Skill_Borrower_-_Ain_t_Gonna_Ask_You.mp3';
  },
  //TODO testing only: remove reference to media files
  applyPosterUrl: function(posterUrl) {
    if (posterUrl)
      return posterUrl;
    else //TODO use some webinos-like defaults
      return this.getMediaType() === 'video' ? 'resources/BigBen/bb1.JPG' : 'resources/BigBen/Skill_Borrower_album_art.jpg';
  },
  /**
   * @private
   * Scales the browser view when showing media preview
   */
  _reduceBrowserView: function() {
    var browserView = Ext.Viewport.query('#browserMainView')[0];
    browserView.setCls(['main-container', 'reduce-size']);
    browserView.setTop('15%');
    browserView.setLeft('-15%');
  },
  /**
   * @private
   * Restores the browser view when the media preview is closed
   */
  _restoreBrowserView: function() {
    var browserView = Ext.Viewport.query('#browserMainView')[0];
    browserView.setTop(0);
    browserView.setLeft(0);
    browserView.setCls(['main-container', 'restore-size']);
  },
  /**
   * @private
   * sets player configuration
   * @param {object} mediaPlayerConfig
   * {
   *    mode:{string}, - 'modal' or 'preview'
   *    mediaType:{string}, - 'audio' or 'video'
   *    url:{string}, - media url
   *    posterUrl:{string} - media poster (still image) url OPTIONAL
   *  }
   */
  _setPlayerParams: function(mediaPlayerConfig) {
    this.setMode(mediaPlayerConfig.mode);
    this.setMediaType(mediaPlayerConfig.mediaType);
    this.setUrl(mediaPlayerConfig.url);
    this.setPosterUrl(mediaPlayerConfig.posterUrl);
  },
  /**
   * show the media preview using the mediaPlayer configuration object
   * @param {object} mediaPlayerConfig
   * {
   *    mode:{string}, - 'modal' or 'preview'
   *    mediaType:{string}, - 'audio' or 'video'
   *    url:{string}, - media url
   *    posterUrl:{string} - media poster (still image) url OPTIONAL
   *  }
   *
   *
   * @returns {Class} mediaPlayer
   */
  showMediaPlayer: function(mediaPlayerConfig) {
    var mgr = this;
    mgr._setPlayerParams(mediaPlayerConfig);
    var _mode = mgr.getMode();
    var _mediaType = mgr.getMediaType();
    var _url = mgr.getUrl();
    var _posterUrl = mgr.getPosterUrl();

    //console.log("Param", _mode, _mediaType, _url, _posterUrl)
    var mediaPlayer = null;
    var queryMediaPlayer = Ext.Viewport.query('#theMediaPlayer');
    var mediaPlayerAlreadyExists = queryMediaPlayer.length > 0;
    //console.warn("mediaPlayerAlreadyExists", mediaPlayerAlreadyExists)
    if (!mediaPlayerAlreadyExists)
    {
      mediaPlayer = Ext.create('webinosTV.view.MediaWrapper', {
        id: 'theMediaPlayer',
        mediaType: _mediaType,
        url: _url,
        poster: _posterUrl,
        autoplay: true, //useless on android
        preload: 'true', //useless on android
        loop: false,
        centered: true
      });
    }
    else {
      mediaPlayer = queryMediaPlayer[0];
    }
    //check mode
    if (_mode === 'modal') {
      mgr._restoreBrowserView(); //if was preview, restore screen
      // mediaPlayer.setHideOnMaskTap(true);
      mediaPlayer.setCentered(true);
      mediaPlayer.setWidth('90%');
      mediaPlayer.setHeight('90%');
      mediaPlayer.setUseControls(true);
      mediaPlayer.setTapToControl(false);
      mediaPlayer.setModal({
        id: 'vpmask',
        cls: 'videoplayermask',
        listeners: {
          tap: function() {
            mgr.hideMediaPlayer();
          }
        }
      });

    }
    else if (_mode === 'preview') {
      mediaPlayer.setTop(0);
      mediaPlayer.setLeft('70%');
      mediaPlayer.setWidth('28%');
      mediaPlayer.setHeight('28%');
      mediaPlayer.setUseControls(_mediaType === 'audio');
      mediaPlayer.setTapToControl(_mediaType !== 'audio');
      mediaPlayer.setHideOnMaskTap(false);
      mediaPlayer.setModal(false);
      mgr._reduceBrowserView();
    }
    if (!mediaPlayerAlreadyExists)
      Ext.Viewport.add(mediaPlayer);
    mediaPlayer.play();



    return mediaPlayer;
  },
  /**
   * hides the media preview
   */
  hideMediaPlayer: function() {
    var mgr = this;
    var mediaPlayer = null;
    var queryMediaPlayer = Ext.Viewport.query('#theMediaPlayer');
    if (queryMediaPlayer.length > 0)
    {
      mediaPlayer = queryMediaPlayer[0];
      //getModal should return boolean, but it actually return an object
      if (mediaPlayer.getModal().getCls() === null)
      {
        mgr._restoreBrowserView();
      }
      mediaPlayer.pause();
      mediaPlayer.setUrl('');
      mediaPlayer.setHidden(true);
    }
  },
  showModalVideo: function(url, posterUrl) {
    this.showMediaPlayer({
      mode: 'modal',
      mediaType: 'video',
      url: url,
      posterUrl: posterUrl
    });
  },
  showModalAudio: function(url, posterUrl) {
    this.showMediaPlayer({
      mode: 'modal',
      mediaType: 'audio',
      url: url,
      posterUrl: posterUrl
    });
  },
  showVideoPreview: function(url, posterUrl) {

    this.showMediaPlayer({
      mode: 'preview',
      mediaType: 'video',
      url: url,
      posterUrl: posterUrl
    });
  },
  showAudioPreview: function(url, posterUrl) {
    this.showMediaPlayer({
      mode: 'preview',
      mediaType: 'audio',
      url: url,
      posterUrl: posterUrl
    });
  }
});

