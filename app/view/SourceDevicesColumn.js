// Queue and Source devices
Ext.define('webinosTV.view.SourceDevicesColumn', {
  extend: 'webinosTV.view.ColumnView', //''Ext.Container',
  xtype: 'srcdevscol',
  config: {
    headerComponent: {//Headers  #0 (#0a and #0b)
      xtype: 'container',
      name: 'columnheadertext',
      width: '100%',
      cls: 'title-container',
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [{
          xtype: 'panel',
          html: 'Queue',
          cls: ['col-title'], //used for selection only - here at lower level wrt other cols
          padding: 2,
          margin: 2,
          flex: 1,
          style: 'text-align:center;'
        }, //#0a
        {
          xtype: 'panel',
          html: 'Source Device',
          cls: ['col-title'], //used for selection only - here at lower level wrt other cols
          padding: 2,
          margin: 2,
          flex: 1.5,
          style: 'text-align:center;'
        } //#0b
      ]
    },
    contentComponent: {//Container #0 (#0a and #0b)
      xtype: 'srctileslist',
      width: '100%',
      id: 'sourceDeviceList'
    }
  }
});