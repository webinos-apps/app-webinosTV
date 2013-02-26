Ext.define('webinosTV.store.TempVideoStore', {
  extend: 'Ext.data.Store',
  xtype: 'tmpvideostore',

  //TODO this store should change depending on the selected media type
  config:
  {
    storeId:'tmpvideostore-id',
    model: 'webinosTV.model.VideoMedia',
    proxy: {
      type: 'ajax',
      url : './storage/video.json',
      reader: {
	type: 'json',
	rootProperty: 'playlist'
      }
    },
    autoLoad: true //WARNING be careful with this!
  }
});
