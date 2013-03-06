//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'webinosTV': 'app'
});
//</debug>

Ext.application({
    name: 'webinosTV',

    requires: [
      'Ext.MessageBox'
    ],

    viewport: {
      autoMaximize: false,
      top:0,
      left:0,
      layout:'float',
      width:'100%',
      height:'100%'
    },

    views: [
    'BrowserView', //main view
    'TilesDataView', //generic component, list-like, whose elements are made of tiles
    'DefaultTilePanel', //generic component, base element of the UI
    'SourceDevicesColumn', //1st column of the browser view
    'SourceDeviceDataViewItem', //represents a source device and its queued items (2 tiles)
    'CategoriesColumn', //2nd column of the browser view
    'MediaCategoryDataViewItem', //represents a single media category tile
    'MediaSelectionColumn', //3rd column of the browser view
    'MediaPlaylist', //shows a list of media (e.g. mp3, videos)
    'AudioMPListItem', //represents single audio item
    'TargetDevicesColumn', //4th column of the browser view
    'TargetDeviceDataViewItem',//represents a list of target devices
    'ActionControlsColumn', //5th column of the browser view
    'ActionControlDataViewItem', //represents a customizable action button
    'VideoWrapper', //replaces Ext.Video by wrapping HTML5 video tag/dom obkect
    'VideoPlayerView' //floating panel with Video Player
    ],

    models:[
    'Device',
    'Media',
    'VideoMedia',
    'AudioMedia'
    ],

    stores:[
    'TempMusicStore',
    'TempVideoStore',
    'TempSourceDevsStore',
    'TempDisplayDevsStore'
    ],

    controllers:[
    'SelectPlayModeController',
    'SelectTargetDeviceController',
    'SelectCategoryController',
    'SelectMediaController',
    'SelectSourceDeviceController'
    ],

    profiles:['Phone','LargeScreen'],
    
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
      //connect interface with ui
      webinosTV.app.connectUi=run_ui_connect();
      webinosTV.app.connectEvents=run_events_connect();
      webinosTV.app.connectConnector=run_connector_connect();
      // Initialize the stores
      var tmpMusicStore=Ext.create('webinosTV.store.TempMusicStore');

    },
    
    //connect interface with ui.js
    connectUi:null,
    
    //connect interface with events.js
    connectEvents:null,

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
    },

    addDisplayDevices:function(deviceItems){
      var dispDevStore=Ext.getStore('tmpdispdevstore-id');
      //dispDevStore.add(deviceItems);
    },

    addSourceDevices:function(deviceItems){
      var srcDevStore=Ext.getStore('tmpsrcdevstore-id');
      //srcDevStore.add(deviceItems);
    }
});
