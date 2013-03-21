/**
 *  Class that implements a media group store
 *  Media are grouped by type (audio, video, etc)
 *  Change to this store are reflected to the main media store
 *
 */
Ext.define('webinosTV.store.MediaGroupStore', {
  extend: 'webinosTV.store.GenericMediaSubStore',
  config:
    {
      groupName: ''//, //mandatory and must be === model.type,
//      listeners: {
//        clear: function(store) {
//          console.error("Called clear for ", store.id, store.getId(), store.getGroupName());
//        }
//      }
    },
  //override
  insert: function(index, records) {
    var subStore = this;
    if (!Ext.isArray(records)) {
      records = Array.prototype.slice.call(arguments, 1);
    }
    var _records = records.filter(function(r, i, arr) {

      var predicate = false;
      if (r.isModel) {
        predicate = r.get('type') === subStore.getGroupName();
      }
      else
      {
        predicate = r.type === subStore.getGroupName();
      }
//      console.log("FILTH", subStore.getStoreId(), r, predicate);
      return predicate;
    });
//    console.log("insert: records", records, records.length);
//    console.log("insert: _records", records, _records.length);

//    webinosTV.store.MediaGroupStore.superclass.insert.call(subStore, _records);
    return subStore.callParent([index, _records]);
  }
});