//<debug>
Ext.Loader.setPath({
  'Ext': 'touch/src',
  'webinosTV': 'app',
  'integration': 'integration'
});
//</debug>

Ext.application({
  name: 'webinosTV',
  requires: [
    'Ext.MessageBox',
    'integration.Ui',
    'integration.EventsConnector',
    'integration.PZPConnector'
  ],
  viewport: {
    autoMaximize: false,
    top: 0,
    left: 0,
    layout: 'float',
    width: '100%',
    height: '100%'
  },
  views: [
    'BrowserView', //main view
    'TilesDataView', //generic component, list-like, whose elements are made of tiles
    'DefaultTilePanel', //generic component, base element of the UI
    'SourceDevicesColumn', //1st column of the browser view
    'SourceDeviceDataViewItem', //represents a source device and its queued items (2 tiles)
    'DeviceQueueColumn', //Shows item in the currently selected source device
    'CategoriesColumn', //2nd column of the browser view
    'MediaCategoryDataViewItem', //represents a single media category tile
    'MediaSelectionColumn', //3rd column of the browser view
    'MediaPlaylist', //shows a list of media (e.g. mp3, videos)
    'MPListItem', //represents single generic media item
    'VideoMPListItem', //represents single video item
    'AudioMPListItem', //represents single audio item
    'TargetDevicesColumn', //4th column of the browser view
    'TargetDeviceDataViewItem', //represents a list of target devices
    'ActionControlsColumn', //5th column of the browser view
    'ActionControlDataViewItem', //represents a customizable action button
    'MediaWrapper' //replaces Ext.Video and Ext.Audio by wrapping HTML5 video and audio tag/dom obkect
  ],
  models: [
    'Device',
    'Media',
    'VideoMedia',
    'AudioMedia'
  ],
  stores: [
    'MediaStore',
    'GenericMediaSubStore',
    'MediaGroupStore',
    'DevicesStore'
  ],
  controllers: [
    'SelectPlayModeController',
    'SelectTargetDeviceController',
    'SelectCategoryController',
    'SelectMediaController',
    'SelectSourceDeviceController'
  ],
  profiles: ['Phone', 'LargeScreen'],
  icon: {
    '57': 'resources/icons/Icon.png',
    '72': 'resources/icons/Icon~ipad.png',
    '114': 'resources/icons/Icon@2x.png',
    '144': 'resources/icons/Icon~ipad@2x.png'
  },
  isIconPrecomposed: true,
  startupImage: {
    '320x460': 'resources/startup/320x460.jpg',
    '640x920': 'resources/startup/640x920.png',
    '768x1004': 'resources/startup/768x1004.png',
    '748x1024': 'resources/startup/748x1024.png',
    '1536x2008': 'resources/startup/1536x2008.png',
    '1496x2048': 'resources/startup/1496x2048.png'
  },
  launch: function() {
    // Destroy the #appLoadingIndicator element
    Ext.fly('appLoadingIndicator').destroy();

    //connect webinos platform
    webinosTV.app.connectUi = Ext.create('integration.Ui');
    webinosTV.app.connectEvents = Ext.create('integration.EventsConnector');//run_events_connect();
    webinosTV.app.connectConnector = Ext.create('integration.PZPConnector');//run_connector_connect();

    // Initialize the stores

    //Unified device store (both source and target)
    var devicesStore = Ext.create('webinosTV.store.DevicesStore');

    //Unified media store
    //Currently only 6 media types/categories/groups: 'audio','video' 'image', 'tvchannel', 'app', 'doc'
    //Plus one collection: 'album' (that should work also as playlist, but we could split those role in the future)
    var mediaStore = Ext.create('webinosTV.store.MediaStore', {
      substores: [
        'audio',
        'video',
        'images',
        'tvchannel',
        'app',
        'doc'
      ]
    });

  },
  //connect interface with ui
  connectUi: null,
  //connect interface with events
  connectEvents: null,
  //connect interface with PZP
  connectConnector: null,
  onUpdated: function() {
    Ext.Msg.confirm(
      "Application Update",
      "This application has just successfully been updated to the latest version. Reload now?",
      function(buttonId) {
        if (buttonId === 'yes') {
          window.location.reload();
        }
      }
    );
  }
//  ,
//  addDisplayDevices: function(deviceItems) {
//    var dispDevStore = Ext.getStore('tmpdispdevstore-id');
//    //dispDevStore.add(deviceItems);
//  },
//  addSourceDevices: function(deviceItems) {
//    var srcDevStore = Ext.getStore('tmpsrcdevstore-id');
//    //srcDevStore.add(deviceItems);
//  }
});
