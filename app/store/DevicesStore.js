Ext.define('webinosTV.store.DevicesStore', {
  extend: 'Ext.data.Store',
  xtype: 'devicestore',
//   requires:[''],

  //TODO this store should change depending on the selected media type
  config:
    {
      storeId: 'devicesstore-id',
      model: 'webinosTV.model.Device',
      proxy: {
        type: 'ajax',
        url: './storage/devices.json',
        reader: {
          type: 'json',
          rootProperty: 'devices'
        }
      },
      listeners: {
        load: function(store) {
          //auto loading store will unset mask, this is what we dont want
          setTimeout(function() {
            Ext.getCmp('targetDevicesList').container.dataview.mask();
          }, 100);
        }
      },
      refs: {
        tdevList: '#targetDevicesList'
      },
      autoLoad: true //WARNING be careful with this!
    }
});