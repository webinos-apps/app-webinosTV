Ext.define('webinosTV.store.TempSourceDevsStore', {
  extend: 'Ext.data.Store',
  xtype: 'tmpsrcdevstore',
//   requires:[''],

  //TODO this store should change depending on the selected media type
  config:
  {
    storeId:'tmpsrcdevstore-id',
    model:'webinosTV.model.Device',
    proxy: {
      type: 'ajax',
      url : './storage/srcdev.json',
      reader: {
	type: 'json',
	rootProperty: 'sourceDevs'
      }
    },
    autoLoad: true //WARNING be careful with this!
  }
});
