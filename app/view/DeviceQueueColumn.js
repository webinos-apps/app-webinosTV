Ext.define('webinosTV.view.DeviceQueueColumn', {
  extend: 'Ext.Container',
  xtype: 'devqueuecol',
  config: {
    device: null,
    xtype: 'container',
    flex: 2,
    height: '100%',
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    items: [
      {//Headers  #1
        xtype: 'container',
        width: '100%',
        cls: ['title-container', 'selected-column-header'],
        layout: {
          type: 'hbox',
          align: 'center',
          pack: 'center'
        },
        items: [
          {
            xtype: 'panel',
            html: 'Device Queue',
            padding: 2,
            margin: 2
          }
        ]
      },
      {
        //Container #2 - Queue Info with header
        id: 'deviceq-info',
        xtype: 'container',
        name: 'mediaContent',
        cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
        width: '100%',
        height: '100%',
        layout:
          {
            type: 'vbox'
          },
        items:
          [
            //Default items
            {//Header Panel
              id: 'deviceq-name',
              flex: 2,
              xtype: 'tilepanel',
              cls: 'tile-panel',
              text: 'Device Name'
            },
            {//Content Panel
              flex: 9,
              id: 'deviceq-status',
              xtype: 'tilepanel',
              cls: 'tile-panel',
              text: 'please select a media type...'
            }
          ]
      }
//      {//device queue info
//        id: 'deviceq-status',
//        xtype: 'tilepanel',
//        cls: 'tile-panel',
//        width: '100%',
//        flex: 9,
//        text: ('Device queue to be displayed here')
//      }
    ]
  },
  applyDevice: function(device) {
    var deviceName = this.query('#deviceq-name')[0];
    if (deviceName)
      deviceName.setText("Device: " + device.getName());

    var deviceInfo = this.query('#deviceq-status')[0];
    if (deviceInfo)
      deviceInfo.setText("items in queue: " + (device.getCounter() + "").fontcolor('orange'));

    return device;
  }
});