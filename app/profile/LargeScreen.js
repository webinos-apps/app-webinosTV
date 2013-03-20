Ext.define('webinosTV.profile.LargeScreen', {
  extend: 'Ext.app.Profile',
  config: {
    name: 'largescreen',
    namespace: 'largescreen',
    views: ['BrowserView']
  },
  isActive: function() {
    return (Ext.os.is.Desktop || Ext.os.is.Tablet); //WARNING this is either true or undefined, not false!!!
  },
  launch: function() {
//    // Initialize the stores
//    //Unified device store (both source and target)
//    webinosTV.app.devicesStore = Ext.create('webinosTV.store.DevicesStore');
//
//    //Unified media store
//    //Currently only 6 media types/categories/groups: 'audio','video' 'image', 'tvchannel', 'app', 'doc'
//    //Plus one collection: 'album' (that should work also as playlist, but we could split those role in the future)
//    webinosTV.app.mediaStore = Ext.create('webinosTV.store.MediaStore', {
//      substores: [
//        'audio',
//        'video',
//        'images',
//        'tvchannel',
//        'app',
//        'doc'
//      ]
//    });
//
//    //connect webinos platform
//    webinosTV.app.connectUi = Ext.create('integration.Ui');
//    webinosTV.app.connectEvents = Ext.create('integration.EventsConnector');//run_events_connect();
//    webinosTV.app.connectConnector = Ext.create('integration.PZPConnector');//run_connector_connect();

    // Initialize the main view
    Ext.Viewport.add(Ext.create('webinosTV.view.largescreen.BrowserView'));
  }
});