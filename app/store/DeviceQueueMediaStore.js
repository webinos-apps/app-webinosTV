/**
 *  Class that implements a device queue media store,
 *  that is the data container of the DeviceQueueColumn media playlist and
 *  it is actually a projection of the MediaStore
 *  You can add duplicate media items to this store (will affect media id)
 *
 */
Ext.define('webinosTV.store.DeviceQueueMediaStore', {
  extend: 'webinosTV.store.GenericMediaSubStore',
  //override - insert duplicate media items by changing their id
  config: {
    duplicateIds: {} //map that tracks duplicate ID to avoid headhaches on item removal
  },
  insert: function(index, records) {
    var subStore = this;
    if (!Ext.isArray(records)) {
      records = Array.prototype.slice.call(arguments, 1);
    }

    var rawrecords = records.map(function(e) {
      return e.raw;
    });
    var _records = new Array(rawrecords.length);
    for (var i = 0; i < rawrecords.length; i++) {
      var r = rawrecords[i];
      var firstIndex = rawrecords.indexOf(r);
      var isDuplicate = i > firstIndex;
      if (isDuplicate) {
        var r_id = rawrecords[firstIndex].id;
        var dupId = r_id + "-" + i;
        subStore._addDuplicateId(r_id, dupId);
        //console.warn("Dups", subStore.getDuplicateIds());
        _records[i] = {//clone
          id: dupId,
          title: r.title,
          file: r.file,
          meta: r.meta,
          type: r.type
        };
      }
      else
      {
        _records[i] = r;
      }

    }
    return subStore.callParent([index, _records]);
  },
  _addDuplicateId: function(id, duplicate) {
    var subStore = this;
    var dIdMap = subStore.getDuplicateIds();
    if (dIdMap[id] === undefined)
    {
      dIdMap[id] = [duplicate];
    }
    else {
      dIdMap[id].push(duplicate);
    }
    subStore.setDuplicateIds(dIdMap);
  },
  /**
   *  Return master id of the duplicate id, if any,
   *  else null
   *  @param {string} dupId candidate duplicate id
   *  @return {string/null} id of the master media store
   */
  _isDuplicateOf: function(dupId) {
    var masterId = null;
    var splitResult = dupId.split('-');
    if (splitResult.length > 1)
    {
      masterId = splitResult[0];
    }
    return masterId;
  },
  /**
   *  Return an array of duplicates id of the master id, if any,
   *  else undefined
   *  @param {string} id of the master media store
   *  @return {Array/undefined} ids of duplicate records
   */
  _getDuplicatesOf: function(masterId) {
    var subStore = this;
    var dIdMap = subStore.getDuplicateIds();
    return dIdMap[masterId];
  },
  //must remove all duplicates that may have been introduced by add
  //AND must clean devices queue
  remove: function(records) {
    var subStore = this;
    for (var i = 0; i < records.length; i++)
    {
      var masterId = records[i].get('id');
      var dups = subStore._getDuplicatesOf(masterId);
      if (dups)
      {
        for (var j = 0; j < dups.length; j++) {
          var dupRecord = subStore.queryByString("id=" + dups[j]);
          records = records.concat(dupRecord);
        }
      }

    }

    console.warn("Removing", records.length, "records from", subStore.getStoreId(), records);
    subStore.callParent(records);
  }
});