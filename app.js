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
    'ColumnView',
    'TilesDataView', //generic component, list-like, whose elements are made of tiles
    'DefaultTilePanel', //generic component, base element of the UI
    'SourceDevicesColumn', //1st column of the browser view
    'SourceDevicesDataView', //inner component of SourceDevices Column, subclass of TilesDataView
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
    'DeviceQueueMediaStore',
    'MediaGroupStore',
    'DevicesStore'
  ],
  controllers: [
    'BrowserViewController',
    'SelectSourceDeviceController',
    'SelectCategoryController',
    // 'SelectMediaController',
    //    'SelectTargetDeviceController',//TODO drop if no column specific events are to be managed
    'SelectPlayModeController'
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
    //ADD THIS Utility to Store prototype and its derived classes
    /**
     * Query items by using a pseudo querystring
     * that is attribute1=value1&attribute2=value2...
     * but value can include spaces and is not urlencoded
     * @param {string} querystring the query string
     * @return {Array} items array of records
     **/
    Ext.data.Store.prototype.queryByString = function(querystring) {
      var store = this;
      var queryconditions = querystring.split("&");
      var queryObject = {};
      for (var i = 0; i < queryconditions.length; i++) {
        var qc = queryconditions[i].split("=");
        queryObject[qc[0]] = qc[1];
      }
      var validFields = store.getModel().getFields().keys;
      var qresult = store.queryBy(function(record, id) {
        var condition = true;
        for (var key in queryObject) {
          if (validFields.indexOf(key) !== -1)
            condition = condition && queryObject[key] === record.get(key);
        }
        return condition;
      });
      return qresult.items;
    };

    // Initialize the stores
    //Unified device store (both source and target)
    webinosTV.app.devicesStore = Ext.create('webinosTV.store.DevicesStore', {
      storeId: 'devicesstore-id',
      listeners: {
        load: function(store) {
          //console.warn("Devices store loaded: - storeId = ", webinosTV.app.devicesStore.getStoreId(), "; id = ", webinosTV.app.devicesStore.getId());

          //Unified media store
          //Currently only 6 media types/categories/groups: 'audio','video' 'image', 'tvchannel', 'app', 'doc'
          //Plus one collection: 'album' (that should work also as playlist, but we could split those role in the future)
          webinosTV.app.mediaStore = Ext.create('webinosTV.store.MediaStore', {
            groupStores: [
              'audio',
              'video',
              'images',
              'tvchannel',
              'app',
              'doc'
            ],
            storeId: 'mediastore-id',
            listeners: {
              load: function(store) {
                //console.warn("General Media store loaded: - storeId = ", webinosTV.app.mediaStore.getStoreId(), "; id = ", webinosTV.app.mediaStore.getId());
                //load substores
                webinosTV.app.mediaStore.loadGroupStores();
                //connect webinos platform
                webinosTV.app.connectUi = Ext.create('integration.Ui');
                webinosTV.app.connectEvents = Ext.create('integration.EventsConnector');//run_events_connect();
                webinosTV.app.connectConnector = Ext.create('integration.PZPConnector');//run_connector_connect();
                // Destroy the #appLoadingIndicator element
                Ext.fly('appLoadingIndicator').destroy();
                // Initialize the main view, which was instantiated in the profile
                var bw = Ext.getCmp('browserMainView');
                //load main view components (which will search for the stores)
                bw.addAllColumns();
                //show the main view
                Ext.Viewport.add(bw);
              }
            }
          });
          //load media store (this triggers its 'load' listener)
          webinosTV.app.mediaStore.load();
        }
      }
    });

    //load devices store (this triggers all the above)
    webinosTV.app.devicesStore.load();
  },
  //connect interface with ui
  connectUi: null,
  //connect interface with events
  connectEvents: null,
  //connect interface with PZP
  connectConnector: null,
  devicesStore: null,
  mediaStore: null,
  //Sencha delta upgrade
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
});
