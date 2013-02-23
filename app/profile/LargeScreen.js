Ext.define('webinosTV.profile.LargeScreen', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'largescreen',
	namespace : 'largescreen',
        views: ['BrowserView']
    },

    isActive: function() {
      return (Ext.os.is.Desktop || Ext.os.is.Tablet); //WARNING this is either true or undefined, not false!!!
    },

    launch: function() {
      // Initialize the main view
      Ext.Viewport.add(Ext.create('webinosTV.view.largescreen.BrowserView'));
    }
});