Ext.define('webinosTV.view.phone.DeviceQueueColumn', {
  extend: 'webinosTV.view.ColumnView', //'Ext.Container',
  xtype: 'phonedevqueuecol',
  config: {
    device: null,
    headerComponent: {//Headers  #1
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
    contentComponent: {
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
    ,
    listeners: {
///Forward refresh event to the Device media play list view
      queuerefresh: function(qcolumn, eOpts) {
        var playList = qcolumn.query('#deviceq-status-plist-' + qcolumn.getDevice().getDeviceId());
        playList.fireEvent('updatedata', playList, eOpts);
      }
    }
  },
  destroy: function() {
    this._cleanStore();
    this.callParent(arguments);
  },
  applyHidden: function(hidden) {
//    console.warn("HIDDEN", hidden);
    return false; //never hide
  },
  applyDevice: function(device) {
    // console.log("ApplyDevice", device, device.isModel, device.$className, "Q len", device.getCounter());
    if (device !== null && device !== undefined && device.isModel && device.$className === 'webinosTV.model.Device') {
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
          emptyText: "No items queued on this device",
          defaultType: 'mplistitem',
          store: this._createQueueStore(device),
          listeners: {
            resize: {
              fn: function(elem) {
                var pl = this;
                var items = pl.getInnerItems()[0].innerItems;
                if (items)
                  items.forEach(function(listItem) {
                    listItem.checkTextOverflow();
                  });
              }
            }
          }
        });
      }
    }
    else if (device === null)
    {
      this._cleanStore();
    }
    return device;
  },
  _cleanStore: function() {
    var device = this.getDevice();
    if (device) {
      var qstoreId = device.getDeviceId() + '-queuestore-id';
      var s = Ext.getStore(qstoreId);
      if (s)
      {
        s.destroy();
      } //It is important to do this in order to unregister the q store
    }
  },
  /**
   * Created local queue store for given device using its mediaItem references
   * @param {Device} device device for which the view was built
   */
  _createQueueStore: function(device) {
    var qs = Ext.create('webinosTV.store.DeviceQueueMediaStore', {
      storeId: device.getDeviceId() + '-queuestore-id',
      data: device.getMediaItemsQueue()
    });
    return qs;
  },
  /**
   * Update playlist data
   */
  updatePlaylist: function() {
    var device = this.getDevice();
    var qs = Ext.getStore(device.getDeviceId() + '-queuestore-id');
    qs.setData(device.getMediaItemsQueue());
  }
});