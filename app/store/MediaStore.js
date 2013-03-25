/*
 * Store for all webinosTV media.
 * It forwards events to all registered substores,
 * that should be one per category.
 *
 * The substores are created once the data are loaded.
 *
 * Such substores are only used for the list views, but any CRUD operation
 * should only involve this (singleton class)
 *
 */
Ext.define('webinosTV.store.MediaStore', {
  extend: 'Ext.data.Store',
  //TODO this store should change depending on the selected media type
  config:
    {
      //storeId: 'mediastore-id',
      groupStores: null,
      model: 'webinosTV.model.Media',
      proxy: {
        type: 'ajax',
        url: './storage/media.json',
        reader: {
          type: 'json',
          rootProperty: 'media'
        }
      },
      sorters: [
        {
          sorterFn: function(record1, record2) {
            var type1 = record1.get('type');
            var type2 = record2.get('type');
            return type1 > type2 ? 1 : (type1 === type2 ? 0 : -1);
          }
        }
      ],
      grouper:
        {
          groupFn: function(record) // = GROUP BY
          {
            return record.get('type');
          },
          direction: 'ASC'
        },
      //  autoLoad: true, //WARNING be careful with this!
      listeners: {
        addrecords: {
          fn: function(store, records, eOpts) {
            var mediaStore = this;
            mediaStore.registeredSubStores.forEach(function(storeId) {
              var subStore = Ext.StoreManager.get(storeId);
              if (subStore)
                subStore.add(records);
            });
          }
        },
        clear: {
          fn: function(store, eOpts) {
            //  console.error("Called clear for ", store.id, store.getId());
            var mediaStore = this;
            mediaStore.registeredSubStores.forEach(function(storeId) {
              var subStore = Ext.StoreManager.get(storeId);
              if (subStore)
                subStore.removeAll();
            });
          }
        },
        refresh: {
          fn: function(store, data, eOpts) {
            var mediaStore = this;
            mediaStore.registeredSubStores.forEach(function(storeId) {
              var subStore = Ext.StoreManager.get(storeId);
              subStore.fireEvent('refresh', subStore, data, eOpts);

            });
          }
        },
        removerecords: {
          fn: function(store, records, indices, eOpts) {
            var mediaStore = this;
            mediaStore.registeredSubStores.forEach(function(storeId) {
              var subStore = Ext.StoreManager.get(storeId);
              if (subStore)
                subStore.remove(records);
            });
          }
        },
        //TODO check if it is necessary or data get automatically update because the operation is performed
        //on the single model instance
        updaterecords: {
          fn: function(store, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
            var mediaStore = this;
            mediaStore.registeredSubStores.forEach(function(storeId) {
              var subStore = Ext.StoreManager.get(storeId);
              subStore.fireEvent('refresh', subStore, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts);
            });
          }
        }
      }
    },
  //load or create substores
  loadGroupStores: function() {
    //SUBSTORES: never perform actions on these stores, only on mediaStore!
    var mediaStore = this;//Ext.getStore('mediastore-id');
    var groupStores = mediaStore.getGroupStores();
    if (groupStores)
      groupStores.forEach(function(type) {

        var substoreId = type + 'store-id';
        var group = mediaStore.getGroups(type);
        var groupData = group === undefined ? [] : group.children;

        var subStore = Ext.getStore(substoreId);
        if (subStore === undefined) {
          subStore = Ext.create('webinosTV.store.MediaGroupStore',
            {
              storeId: substoreId,
              groupName: type,
              data: groupData
            });
        }
        else
        {
          subStore.setData(groupData);
        }
      });
  },
  //Event propagation and data syncing
///An array of (sub)store IDs
  registeredSubStores: [],
  registerSubStore: function(substoreId) {
//    console.log("Register ", substoreId)
    var mediaStore = this;
    mediaStore.registeredSubStores.push(substoreId);
  },
  unregisterSubStore: function(substoreId) {
    var mediaStore = this;
    var index = mediaStore.registeredSubStores.indexOf(substoreId);
    if (index !== -1)
    {
      mediaStore.registeredSubStores.splice(index, 1);
//      console.log("Unegistered ", substoreId)
    }
  }
});