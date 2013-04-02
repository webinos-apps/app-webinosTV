Ext.define('webinosTV.store.DevicesStore', {
  extend: 'Ext.data.Store',
  xtype: 'devicestore',
//   requires:[''],

  //TODO this store should change depending on the selected media type
  config:
    {
      model: 'webinosTV.model.Device',
      proxy: {
        type: 'ajax',
        url: './storage/devices.json',
        reader: {
          type: 'json',
          rootProperty: 'devices'
        }
      }
    }
});