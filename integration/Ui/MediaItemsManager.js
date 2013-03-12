/**
 * Manages webinosTV ...
 *
 * ## Notes
 *
 * - Handles the ...
 *
 */
Ext.define('integration.Ui.MediaItemsManager', {
  mixins: ['Ext.mixin.Observable'],
  config: {
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  categoryStoreIdMap: {//WARNING this should be populated at setup time, or passed to run_ui_connect
    //associate a mediaType type with an icon name
    'videos': 'tmpvideostore-id',
    'music': 'tmpmusicstore-id',
    'images': null,
    'tvchannels': null, //TODO fix not displayed
    'webinos': null, //TODO find a suitable SVG icon
    'docs': null
  },
  //mediaItem = object with same fields of Media model or derived class
  //if exists, updates it
  addMediaItem: function(mediaItem, category) {
    var mimgr = this;
    var store = Ext.StoreManager.get(mimgr.categoryStoreIdMap[category]);
//     console.log("Add",mediaItem.file,"of category",category,"to store", store);
    if (store)
    {
      var index = store.findBy(function(record, id) {
        var condition = (record.get('file') === mediaItem.file || /*record.get('title')===mediaItem.title ||*/ record.internalId === mediaItem.id);
        return condition;
      });

      var record;
      if (index !== -1)
      {//perform update
        record = store.getAt(index);
        for (var key in mediaItem)
        {
          if (key !== 'id')
          {
            record.set(key, mediaItem[key]);
          }
        }
      }
      else
      {//add
        record = Ext.create(store.getModel().$className, mediaItem);
        store.add(record);
      }
    }
  },
  //objects = array[{mediaItem:item,category:category}]
  addMediaItems: function(objects) {
    var mimgr = this;
    objects.forEach(function(object) {
      mimgr.addMediaItem(object.mediaItem, object.category);
    });
  },
  //mediaItem = object with same fields of Media model or derived class
  removeMediaItem: function(mediaItem, category) {
    var mimgr = this;
    var store = Ext.StoreManager.get(mimgr.categoryStoreIdMap[category]);
//     console.log("Remove",mediaItem.file,"of category",category,"from store", store);
    if (store)
    {
      var index = store.findBy(function(record, id) {
        var condition = (record.get('file') === mediaItem.file || /*record.get('title')===mediaItem.title ||*/ record.internalId === mediaItem.id);
        return condition;
      });
      store.removeAt(index);
    }
  },
  //clear all items in a category store
  clearMediaItems: function(category) {
    var mimgr = this;
    var store = Ext.StoreManager.get(mimgr.categoryStoreIdMap[category]);
//     console.log("Clear category",category,"from store", store);
    if (store)
    {
      store.remove(store.getRange());
    }
  }
});