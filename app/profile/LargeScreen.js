Ext.define('webinosTV.profile.LargeScreen', {
  extend: 'Ext.app.Profile',
  config: {
    name: 'largescreen',
    namespace: 'largescreen',
    views: ['BrowserView', 'DeviceQueueColumn'],
    controllers: ['SelectSourceDeviceController'],
    ratio: 23 / 1680  //computed by hand: body font-size/document clientWidth on my PC
  },
  isActive: function() {
    return (Ext.os.is.Desktop || Ext.os.is.Tablet); //WARNING this is either true or undefined, not false!!!
  },
  launch: function() {
    Ext.create('webinosTV.view.largescreen.BrowserView');
//    // Initialize the main view
//    Ext.Viewport.add();
  }
});