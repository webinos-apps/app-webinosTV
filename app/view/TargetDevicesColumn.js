Ext.define('webinosTV.view.TargetDevicesColumn', {
  extend: 'Ext.Container',
  xtype:'tgtdevscol',
  config:{
//     height: '100%',
//     flex: 1.5,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [{ //Headers  #3
        xtype: 'container',
        width: '100%',
        cls: 'title-container',
        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },
        items: [{
            xtype: 'panel',
            html: 'Target Device',
            padding: 2,
            margin: 2 
        } //#3
        ]
    }, { //Container #3 - Display devices
        xtype: 'tileslist',
        id: 'targetDevicesList',
        disabled: true,
        masked: true,
        mode: 'MULTI',
        defaultType: 'targetdevlistitem', //for display devices
        cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
        width: '100%',
        height: '100%',
        store: 'tmpdispdevstore-id',
          loadingText: null

    }]
  }
});