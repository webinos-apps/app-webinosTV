Ext.define('webinosTV.store.TempDisplayDevsStore', {
  extend: 'Ext.data.Store',
  xtype: 'tmpdispdevstore',
//   requires:[''],

  //TODO this store should change depending on the selected media type
  config:
  {
    storeId:'tmpdispdevstore-id',
    model:'webinosTV.model.Device',
    proxy: {
      type: 'ajax',
      url : './storage/dispdev.json',
      reader: {
	type: 'json',
	rootProperty: 'displayDevices'
      }
    },
    listeners: {
      load: function(store, records, successful, operation, eOpts){
        //auto loading store will unset mask, this is what we dont want
        Ext.getCmp('targetDevicesList').container.setMasked(true);
      }
    },
    refs: {
      tdevList: '#targetDevicesList'
    },

    autoLoad: true //WARNING be careful with this!
  }
});
