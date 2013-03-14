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
    mediaStoreId: 'mediastore-id'
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  //WARNING Now all ops are made on a single media store
//category determined by the media type field

//  categoryStoreIdMap: {//WARNING this should be populated at setup time, or passed to run_ui_connect
//    //associate a mediaType type with an icon name
//    'videos': 'videostore-id',
//    'music': 'audiostore-id',
//    'images': null,
//    'tvchannels': null, //TODO fix not displayed
//    'webinos': null, //TODO find a suitable SVG icon
//    'docs': null,
//    'all': 'mediastore-id' //all media here
//  },
  /**
   * Add a new media item or updates it if it already exists
   * @param mediaItem Object or webinosTV.model.Media record
   */
  addMediaItem: function(mediaItem) {
    var mimgr = this;
    var store = Ext.getStore(mimgr.getMediaStoreId());
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
  /**
   * Add an array of media items
   * @param objects array of Object or webinosTV.model.Media record
   */
  addMediaItems: function(objects) {
    var mimgr = this;
    objects.forEach(function(object) {
      mimgr.addMediaItem(object.mediaItem);
    });
  },
  /**
   * Remove a media item
   * @param mediaItem Object or webinosTV.model.Media record
   */
  removeMediaItem: function(mediaItem) {
    var mimgr = this;
    var store = Ext.getStore(mimgr.getMediaStoreId());
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
  /**
   * clear all items or all items of a given category (if type is passed)
   * @param type string must be equal to the group/category/media type, i.e. 'video', 'audio','images','tvchannel','app','doc'
   *
   */
  clearMediaItems: function(type) {
    var mimgr = this;
    //TODO get this from category store or from mediastore.getGroups labels?
    var types = ['video', 'audio', 'images', 'tvchannel', 'app', 'doc'];
    var store = Ext.getStore(mimgr.getMediaStoreId());
    var records = [];
    if (type !== undefined)
    {
      if (types.indexOf(type) !== -1)
      {
        var group = store.getGroups(type);
        records = group === undefined ? [] : group.children;
      }
    }
    else {
      records = store.getRange();
    }
//     console.log("Clear category",category,"from store", store);
    if (store)
    {
      store.remove(records);
    }
  }
});