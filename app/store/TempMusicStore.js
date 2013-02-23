Ext.define('webinosTV.store.TempMusicStore', {
  extend: 'Ext.data.Store',
  xtype: 'tmpmusicstore',

  //TODO this store should change depending on the selected media type
  config:
  {
    storeId:'tmpmusicstore-id',
    model: 'webinosTV.model.Media',
    proxy: {
      type: 'ajax',
      url : './storage/music.json',
      reader: {
	type: 'json',
	rootProperty: 'playlist'
      }
    },
    autoLoad: true //WARNING be careful with this!
  }
});
