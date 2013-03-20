/**
 *  Class that implements a media group store
 *  Useful for showing mixed subsets of media (e.g. a device queue)
 *  Change to this store are reflected to the main media store
 *
 */
Ext.define('webinosTV.store.GenericMediaSubStore', {
  extend: 'Ext.data.Store',
  config:
    {
      model: 'webinosTV.model.Media',
      data: []//,
//      autoLoad: true
    },
  initialize: function() {
    var mediaStore = Ext.getStore('mediastore-id');
    if (mediaStore)
      mediaStore.registerSubStore(this.getStoreId());
  },
  destroy: function() {
// console.log("Destroy", this.getStoreId());
    var mediaStore = Ext.StoreManager.get('mediastore-id');
    mediaStore.unregisterSubStore(this._storeId);
//Unregister to media store events
    Ext.data.StoreManager.unregister(this);
    this.callParent(arguments);
  }
});