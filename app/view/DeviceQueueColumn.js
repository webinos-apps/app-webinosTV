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
            name: 'columnheadertext',
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
              xtype: 'panel',
              cls: 'tile-panel'//,
                // text: 'please select a media type...'
            }
          ]
      }
    ],
    listeners: {
      ///Forward refresh event to the Device media play list view
      queuerefresh: function(qcolumn, eOpts) {
        var playList = qcolumn.query('#deviceq-status-plist-' + qcolumn.getDevice().getDeviceId());
        playList.fireEvent('updatedata', playList, eOpts);
      }
    }
  },
  destroy: function() {
    var qstoreId = this.getDevice().getDeviceId() + '-queuestore-id';
    var s = Ext.getStore(qstoreId);
    if (s)
      s.destroy();
    //TODO rm queue store
    this.callParent(arguments);
  },
  applyDevice: function(device) {
    var deviceName = this.query('#deviceq-name')[0];
    if (deviceName)
      deviceName.setText("Device: " + device.getName());
    var deviceInfo = this.query('#deviceq-status')[0];
    if (deviceInfo) {
      deviceInfo.removeAll(true);
      //mediaPlaylist
      deviceInfo.add({
        width: '100%',
        height: '100%',
        id: 'deviceq-status-plist-' + device.getDeviceId(),
        xtype: 'mediaplaylist',
        defaultType: 'mplistitem',
        store: this._createQueueStore(device)
      });
    }
    return device;
  },
  _createQueueStore: function(device) {
    var qs = Ext.create('webinosTV.store.GenericMediaSubStore', {
      storeId: device.getDeviceId() + '-queuestore-id',
      data: device.getMediaItemsQueue()
    });
    return qs;
  },
  updatePlaylist: function() {
    var device = this.getDevice();
    var qs = Ext.getStore(device.getDeviceId() + '-queuestore-id');
    qs.setData(device.getMediaItemsQueue());
  }
});