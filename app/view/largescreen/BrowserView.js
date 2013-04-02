Ext.define('webinosTV.view.largescreen.BrowserView', {
  //extend: 'webinosTV.view.BrowserView',
  extend: 'Ext.Container',
  xtype: 'largescreen-browserview', //It actually does not extend anything

  config: {
    id: 'browserMainView',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cls: ['main-container', 'restore-size'],
    layout: {
      type: 'hbox', //Main component
      align: 'center',
      pack: 'center'
    }
  },
  addAllColumns: function() {
    this.add([
      //queue details
      {
        xtype: 'devqueuecol',
        id: 'queuecol-id',
        hidden: true,
        flex: 2,
        height: '100%'
      },
      // Queue and Source devices
      {
        xtype: 'srcdevscol',
        flex: 2.5,
        height: '100%',
        id: 'sourceDevicesColumn'
      },
      // Categories
      {
        xtype: 'categscol',
        flex: 1.5,
        height: '100%',
        id: 'categoriesColumn'
      },
      // Media selection
      {
        xtype: 'mediaselcol',
        flex: 3,
        height: '100%',
        id: 'mediaSelectionColumn'
      },
      // Target devices
      {
        xtype: 'tgtdevscol',
        flex: 1.5,
        height: '100%',
        id: 'targetDevicesColumn'
      },
      // Actions
      {
        xtype: 'actctrlscol',
        flex: 1.5,
        height: '100%',
        id: 'actionControlsColumn'
      }
    ]);
  }
});