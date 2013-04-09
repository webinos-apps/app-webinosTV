Ext.define('webinosTV.view.TargetDevicesColumn', {
  extend: 'webinosTV.view.ColumnView',
  xtype: 'tgtdevscol',
  config: {
    headerComponent: {//Headers  #3
      xtype: 'container',
      width: '100%',
      cls: ['title-container', 'col-title'], //used for selection only
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [{
          xtype: 'panel',
          name: 'columnheadertext',
          html: 'Target Device',
          padding: 2,
          margin: 2
        } //#3
      ]
    },
    contentComponent: {//Container #3 - Display devices
      xtype: 'tileslist',
      id: 'targetDevicesList',
      disabled: true,
      masked: true,
      mode: 'MULTI',
      defaultType: 'targetdevlistitem', //for display devices
      cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
      width: '100%',
      height: '100%',
      store: 'devicesstore-id',
      loadingText: null

    }
  }
});