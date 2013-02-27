// Queue and Source devices
Ext.define('webinosTV.view.SourceDevicesColumn', {
  extend: 'Ext.Container',
  xtype:'srcdevscol',
  config:{
//     flex: 2.5,
//     height: '100%',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [{ //Headers  #0 (#0a and #0b)
        xtype: 'container',
        width: '100%',
        cls: 'title-container',
        layout: {
            type: 'hbox',
            align: 'center',
            pack: 'center'
        },
        items: [  {
            xtype: 'panel',
            html: 'Queue',
            padding: 2,
            margin: 2,
            flex: 1,
            style: 'text-align:center;'
        }, //#0a
        {
            xtype: 'panel',
            html: 'Source Device',
            padding: 2,
            margin: 2,
            flex: 1.5,
            style: 'text-align:center;'
        } //#0b
        ]
    }, { //Container #0 (#0a and #0b)
        xtype: 'tileslist',
        id: 'sourceDeviceList',
        defaultType: 'sourcedevlistitem', //for source devices
        cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
        width: '100%',
        store: 'tmpsrcdevstore-id'
    }]
  }
});