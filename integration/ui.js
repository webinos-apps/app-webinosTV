// var run_ui_connect =
function run_ui_connect() {

  var categoryStoreIdMap = {//WARNING this should be populated at setup time, or passed to run_ui_connect
    //associate a mediaType type with an icon name
    'videos': 'tmpvideostore-id',
    'music': 'tmpmusicstore-id',
    'images': null,
    'tvchannels': null, //TODO fix not displayed
    'webinos': null, //TODO find a suitable SVG icon
    'docs': null
  };

  var addQueue = function() {
  };
  var updateQueue = function() {
  };
  var addQueues = function() {
  };
  var removeQueue = function() {
  };
  var clearQueues = function() {
  };

  //mediaItem = object with same fields of Media model or derived class
  //if exists, updates it
  var addMediaItem = function(mediaItem, category) {
    var store = Ext.StoreManager.get(categoryStoreIdMap[category]);
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
  };

  //objects = array[{mediaItem:item,category:category}]
  var addMediaItems = function(objects) {
    objects.forEach(function(object) {
      addMediaItem(object.mediaItem, object.category);
    });
  };

  //mediaItem = object with same fields of Media model or derived class
  var removeMediaItem = function(mediaItem, category) {
    var store = Ext.StoreManager.get(categoryStoreIdMap[category]);
//     console.log("Remove",mediaItem.file,"of category",category,"from store", store);
    if (store)
    {
      var index = store.findBy(function(record, id) {
        var condition = (record.get('file') === mediaItem.file || /*record.get('title')===mediaItem.title ||*/ record.internalId === mediaItem.id);
        return condition;
      });
      store.removeAt(index);
    }
  };

  //clear all items in a category store
  var clearMediaItems = function(category) {
    var store = Ext.StoreManager.get(categoryStoreIdMap[category]);
//     console.log("Clear category",category,"from store", store);
    if (store)
    {
      store.remove(store.getRange());
    }
  };

  var addCategory = function() {
  };
  var addCategories = function() {
  };
  var removeCategory = function() {
  };
  var clearCategories = function() {
  };

  //example: addActionButton(3,'tv','Watch',function(){alert("Video killed radio all stars");}})
  var addActionButton = function(id, icon, text, actionCB) {
    var actionColumnList = Ext.getCmp('actionsList');
    actionColumnList.addNewRecord({id: id, icon: icon, text: text, action: actionCB});
  };
  var addActionButtons = function() {
  };
  var removeActionButton = function() {
  };
  var clearActionButtons = function() {
  };

  var addSourceDevice = function(id, type, counter, name) {
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.add({"id": id, "type": type, "counter": counter, "deviceName": name});
  };
  var updateSourceDevice = function(id, counter) {
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    //TODO: update the model, to reflect counter change
  };
  var addSourceDevices = function(devices) {
    for (var i in devices) {
      if (device[i].id && device[i].type && device[i].name) {
        addTargetDevice(device[i].id, device[i].type, device[i].counter, device[i].name);
      }
    }
  };
  var removeSourceDevice = function(id) {
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.remove(Ext.create('webinosTV.model.Device', {id: id}));
  };
  var clearSourceDevices = function() {
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.clearData();
  };

  var addTargetDevice = function(id, type, counter, name) {
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.add({"id": id, "type": type, "counter": counter, "deviceName": name});
  };
  var addTargetDevices = function(devices) {
    for (var i in devices) {
      if (device[i].id && device[i].type && device[i].name) {
        addTargetDevice(device[i].id, device[i].type, device[i].counter, device[i].name);
      }
    }
  };
  var removeTargetDevice = function(id) {
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.remove(Ext.create('webinosTV.model.Device', {id: id}));
  };
  var clearTargetDevices = function() {
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.clearData();
  };


  var _reduceBrowserView = function() {
    var browserView = Ext.Viewport.query('#browserMainView')[0];
    browserView.setCls(['main-container', 'reduce-size']);
    browserView.setTop('15%');
    browserView.setLeft('-15%');
  };

  var _restoreBrowserView = function() {
    var browserView = Ext.Viewport.query('#browserMainView')[0];
    browserView.setTop(0);
    browserView.setLeft(0);
    browserView.setCls(['main-container', 'restore-size']);
  };

  /***
   * show the media player given a configuration object
   * @param {object} mediaPlayerConfig
   * {
   *    mode:{string}, - 'modal' or 'preview'
   *    mediaType:{string}, - 'audio' or 'video'
   *    url:{string}, - media url
   *    posterUrl:{string} - media poster (still image) url OPTIONAL
   *  }
   *
   *
   * @returns {Class} mediaPlayer
   */
  var showMediaPlayer = function(mediaPlayerConfig) {
    var _mode = mediaPlayerConfig.mode === undefined ? 'modal' : mediaPlayerConfig.mode;
    var _mediaType = mediaPlayerConfig.mediaType === undefined ? 'video' : mediaPlayerConfig.mediaType;

    //TODO set to something more "webinoish" or drop after debugging phase
    var _defaultUrl = _mediaType === 'video' ? 'resources/BigBen/bb1.mov' : 'resources/BigBen/Skill_Borrower_-_Ain_t_Gonna_Ask_You.mp3';
    var _defaultPosterUrl = _mediaType === 'video' ? 'resources/BigBen/bb1.JPG' : 'resources/BigBen/Skill_Borrower_album_art.jpg';

    var _url = mediaPlayerConfig.url === undefined ? _defaultUrl : mediaPlayerConfig.url;
    var _posterUrl = mediaPlayerConfig.posterUrl === undefined ? _defaultPosterUrl : mediaPlayerConfig.posterUrl;
    var mediaPlayer = null;
    var queryMediaPlayer = Ext.Viewport.query('#theMediaPlayer');
    var mediaPlayerAlreadyExists = queryMediaPlayer.length > 0;

    if (!mediaPlayerAlreadyExists)
    {
      mediaPlayer = Ext.create('webinosTV.view.MediaWrapper', {
        id: 'theMediaPlayer',
        mediaType: _mediaType,
        url: _url,
        poster: _posterUrl,
        autoplay: true, //useless on android
        preload: 'true', //useless on android
        loop: false,
        centered: true
      });
    }
    else {
      mediaPlayer = queryMediaPlayer[0];
    }
    if (_mode === 'modal') {
      mediaPlayer.setWidth('90%');
      mediaPlayer.setHeight('90%');
      mediaPlayer.setUseControls(true);
      mediaPlayer.setTapToControl(false);
      mediaPlayer.setHideOnMaskTap(true);
      mediaPlayer.setModal({
        cls: 'videoplayermask'
      });

    }
    else if (_mode === 'preview') {
      mediaPlayer.setTop(0);
      mediaPlayer.setLeft('70%');
      mediaPlayer.setWidth('28%');
      mediaPlayer.setHeight('28%');
      mediaPlayer.setUseControls(_mediaType === 'audio');
      mediaPlayer.setTapToControl(_mediaType !== 'audio');
      mediaPlayer.setHideOnMaskTap(false);
      mediaPlayer.setModal(false);
      _reduceBrowserView();
    }
    if (!mediaPlayerAlreadyExists)
      Ext.Viewport.add(mediaPlayer);
    mediaPlayer.play();

    return mediaPlayer;
  };

  ///hideMediaPlayer()
  var hideMediaPlayer = function() {
    var mediaPlayer = null;
    var queryMediaPlayer = Ext.Viewport.query('#theMediaPlayer');
    if (queryMediaPlayer.length > 0)
    {
      mediaPlayer = queryMediaPlayer[0];
      //getModal should return boolean, but it actually return an object
      if (mediaPlayer.getModal().getCls() === null)
      {
        _restoreBrowserView();
      }
      mediaPlayer.pause();
      mediaPlayer.setUrl('');
      mediaPlayer.setHidden(true);
    }
  };

  //TODO Deprecate?
  var showModalVideo = function(url, posterUrl) {
    showMediaPlayer({
      mode: 'modal',
      mediaType: 'video',
      url: url,
      posterUrl: posterUrl
    });
  };
  var hideModalVideo = function() {
    hideMediaPlayer();
  };

  var showModalAudio = function(url, posterUrl) {
    showMediaPlayer({
      mode: 'modal',
      mediaType: 'audio',
      url: url,
      posterUrl: posterUrl
    });
  };
  var hideModalAudio = function() {
    hideMediaPlayer();
  };


  //TODO Deprecate?
  var showVideoPreview = function(url, posterUrl) {
    showMediaPlayer({
      mode: 'preview',
      mediaType: 'video',
      url: url,
      posterUrl: posterUrl
    });
  };
  var hideVideoPreview = function() {
    hideMediaPlayer();
  };

  var showAudioPreview = function(url, posterUrl) {
    showMediaPlayer({
      mode: 'preview',
      mediaType: 'audio',
      url: url,
      posterUrl: posterUrl
    });
  };
  var hideAudioPreview = function() {
    hideMediaPlayer();
  };


  //Navigation
  var addTargetDevice = function(id, type, counter, name) {
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.add({"id": id, "type": type, "counter": counter, "deviceName": name});
  };

  var clearTargetDevices = function() {
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.clearData();
  };

  var browse = {
    browserView: 'browserMainView', //TODO use columns!!!
    columns: ['sourceDeviceList', 'mediaCategoryList', 'mediaPlaylist', 'targetDevicesList', 'actionsList'],
    lastVisitedColumnId: null,
    leftRightIndex: -1,
    upDownIndex: -1,
    startBrowsing: function() {
      var bw = Ext.get('browserView');
      var startCmp = Ext.getCmp(this.columns[0]);
      console.log("Started ok", startCmp.getCls());
      startCmp.setCls(["nav-selected", "phone-listview-indicator"]);
      this.lastVisitedColumnId = this.columns[0];
      this.leftRightIndex++;
    },
    stopBrowsing: function() {
      if (this.lastVisitedColumnId)
      {
        var currCmp = Ext.getCmp(this.lastVisitedColumnId);
        currCmp.removeCls("nav-selected");

        this.lastVisitedColumnId = null;
        this.leftRightIndex = -1;
        this.upDownIndex = -1;
        console.log("STOP BROWSING");
      }
    },
    moveLeft: function() {
      var index = this.leftRightIndex;
      if (index > 0)
      {
        this.cleanRowsNavigation();
        var currCmp = Ext.getCmp(this.lastVisitedColumnId);
        currCmp.removeCls("nav-selected");

        this.leftRightIndex--;
        index = this.leftRightIndex;
        var nextCmp = Ext.getCmp(this.columns[index]);
        nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
        this.lastVisitedColumnId = this.columns[index];
        console.log("Move LEFT");
      }
    },
    moveRight: function() {
      var index = this.leftRightIndex;
      if (index < this.columns.length)
      {
        this.cleanRowsNavigation();
        var currCmp = Ext.getCmp(this.lastVisitedColumnId);
        currCmp.removeCls("nav-selected");

        this.leftRightIndex++;
        index = this.leftRightIndex;
        var nextCmp = Ext.getCmp(this.columns[index]);
        nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
        this.lastVisitedColumnId = this.columns[index];
        console.log("Move RIGHT");
      }
    },
    moveUp: function() {
      var lrIndex = this.leftRightIndex;
      var index = this.upDownIndex === -1 ? 0 : this.upDownIndex;
      var currColumnCmp = Ext.getCmp(this.lastVisitedColumnId);
      if (lrIndex < this.columns.length && currColumnCmp)
      {
        var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
        if (index < numberOfRows)
        {
          var currCmp = currColumnCmp.getItemAt(index);
          currCmp.removeCls("nav-selected");
          this.upDownIndex--;
          index = this.upDownIndex;
          if (index > -1)
          {
            var nextCmp = currColumnCmp.getItemAt(index);
            nextCmp.addCls(["nav-selected"]);
          }
          console.log("Move UP to", index);
        }
      }
    },
    moveDown: function() {
      var lrIndex = this.leftRightIndex;
      var index = this.upDownIndex === -1 ? 0 : this.upDownIndex;
      var currColumnCmp = Ext.getCmp(this.lastVisitedColumnId);
      if (lrIndex < this.columns.length && currColumnCmp)
      {
        var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
        if (index < numberOfRows - 1)
        {
          if (index > -1)
          {
            var currCmp = currColumnCmp.getItemAt(index);
            currCmp.removeCls("nav-selected");
          }
          this.upDownIndex++;
          index = this.upDownIndex;
          var nextCmp = currColumnCmp.getItemAt(index);
          nextCmp.addCls(["nav-selected"]);
          console.log("Move DOWN to", index);
        }
      }
    }, //remove border from rows components
    cleanRowsNavigation: function() {
      if (this.lastVisitedColumnId) {
        var currColumnCmp = Ext.getCmp(this.lastVisitedColumnId);
        var index = this.upDownIndex;
        if (index > -1 && (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist'))
        {
          var currCmp = currColumnCmp.getItemAt(index);
          currCmp.removeCls("nav-selected");
          this.upDownIndex = -1;
        }
      }
    },
    //toggle item selected/deselected
    toggleSelectItem: function() {
      var lrIndex = this.leftRightIndex;
      var index = this.upDownIndex === -1 ? 0 : this.upDownIndex;
      if (lrIndex < this.columns.length)
      {
        var currColumnCmp = Ext.getCmp(this.lastVisitedColumnId);
        var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
        var isVisible = currColumnCmp.getMasked().getHidden(); //false if the column is masked
        if (index < numberOfRows && isVisible)
        {
          if (index > -1)
          {
            var currCmp = currColumnCmp.getItemAt(index);
            var record = currCmp.getRecord();
            var isSelected = currColumnCmp.isSelected(record);
            if (isSelected)
            {
              currColumnCmp.deselect(record);
            }
            else
            {
              currColumnCmp.select(record, true);
            }
          }
        }
      }
    },
    /**
     * position on a column and optionally on one items
     * @param columnId a valid column id
     * @param recordId a valid record id - if it is an array, only the last element is considered
     */
    moveTo: function(columnId, recordId) {
      var bw = Ext.get('browserView');
      var index = this.columns.indexOf(columnId);
      console.log("GoTo", columnId, index);
      if (index > -1)
      {
        var destinationColumn = Ext.getCmp(columnId);
        var isVisible = destinationColumn.getMasked().getHidden(); //false if the column is masked
        if (isVisible)
        {
          //clean nav status
          this.cleanRowsNavigation();
          if (this.lastVisitedColumnId) {
            var currCmp = Ext.getCmp(this.lastVisitedColumnId);
            currCmp.removeCls("nav-selected");
          }

          this.lastVisitedColumnId = columnId;
          destinationColumn.addCls(["nav-selected", "phone-listview-indicator"]);
          if (recordId && (destinationColumn.$className === "webinosTV.view.TilesDataView" || destinationColumn.id === 'mediaPlaylist'))
          {
            var destinationRowIndex = -1;
            var _recordId;
            if (recordId instanceof Array) //multiple
            {
              _recordId = recordId[recordId.length - 1];
            }
            else
            {
              _recordId = recordId;
            }

            var indexes = destinationColumn.getViewItems().filter(function(dataViewItem, index, array) {
//                 console.log("FILTH ",dataViewItem.get('record'),recordId)
              return dataViewItem.get('record').internalId === recordId;
            });
            var viewItemIndex = destinationColumn.getItemIndex(indexes.pop());
            if (typeof viewItemIndex === 'number') {
              if (this.upDownIndex > -1)
              {
                var currItem = destinationColumn.getItemAt(this.upDownIndex);
                currItem.removeCls("nav-selected");
              }
              this.upDownIndex = viewItemIndex;
              var destinationItem = destinationColumn.getItemAt(this.upDownIndex);
              destinationItem.addCls(["nav-selected"]);
            }
          }
        }
      }
    },
    /**
     * select an item in a column
     * if a column is not valid or disabled (masked) do nothing
     * @param columnId a valid column id
     * @param recordId a valid record id
     */
    selectAt: function(columnId, recordId) {
      var bw = Ext.get('browserView');
      var index = this.columns.indexOf(columnId);
      console.log("Select At", columnId, index);
      if (recordId && index > -1)
      {
        var destinationColumn = Ext.getCmp(columnId);
        var isVisible = destinationColumn.getMasked().getHidden(); //false if the column is masked
        if (isVisible)
        {
          if (destinationColumn.$className === "webinosTV.view.TilesDataView" || destinationColumn.id === 'mediaPlaylist')
          {
            var modelClassName = destinationColumn.getStore().getModel().$className;
//            console.log("modelClassName", modelClassName)
            var selection;
            if (recordId instanceof Array) //multiple
            {
              var length = recordId.length;
              selection = new Array(length);
              for (var i = 0; i < length; i++)
              {
                selection[i] = Ext.create(modelClassName, {id: recordId[i]});
              }
            }
            else //single
            {
              selection = Ext.create(modelClassName, {id: recordId});
            }
            destinationColumn.select(selection);
          }
          else {
            console.log("$CLASSNAME", destinationColumn.$className);
          }
        }
        else {
          console.log("Not vis");
        }
      }
      else {
        console.log("RecordID", recordId, "index", index);
      }
    },
    /**
     * select an item in a column
     * if a column is not valid or disabled (masked) do nothing
     * @param columnId a valid column id
     * @param recordId a valid record id
     */
    deselectAt: function(columnId, recordId) {
      var bw = Ext.get('browserView');
      var index = this.columns.indexOf(columnId);
      console.log("DEselect At", columnId, index);
      if (recordId && index > -1)
      {
        var destinationColumn = Ext.getCmp(columnId);
        var isVisible = destinationColumn.getMasked().getHidden(); //false if the column is masked
        if (isVisible)
        {
          if (destinationColumn.$className === "webinosTV.view.TilesDataView" || destinationColumn.id === 'mediaPlaylist')
          {
            var modelClassName = destinationColumn.getStore().getModel().$className;
            var selection;
            if (recordId instanceof Array) //multiple
            {
              var length = recordId.length;
              selection = new Array(length);
              for (var i = 0; i < length; i++)
              {
                selection[i] = Ext.create(modelClassName, {id: recordId[i]});
              }
            }
            else //single
            {
              selection = Ext.create(modelClassName, {id: recordId});
            }
            destinationColumn.deselect(selection);
          }
        }
      }
    },
    //deselected item
    deselectItem: function() {
      var lrIndex = this.leftRightIndex;
      var index = this.upDownIndex === -1 ? 0 : this.upDownIndex;
      if (lrIndex < this.columns.length)
      {
        var currColumnCmp = Ext.getCmp(this.lastVisitedColumnId);
        var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
        var isVisible = currColumnCmp.getMasked().getHidden(); //false if the column is masked
        if (index < numberOfRows && isVisible)
        {
          if (index > -1)
          {
            var currCmp = currColumnCmp.getItemAt(index);
            var record = currCmp.getRecord();
            var isSelected = currColumnCmp.isSelected(record);
            if (isSelected)
            {
              currColumnCmp.deselect(record);
            }
          }
        }
      }
    }
  };

  //TODO: move somewhere else, respecting the architecture
  //TODO: keys shall be bound only for the PC profile
  var bindKey = function(evt)
  {
    return;
    var key = evt.keyCode;
    switch (key) {
      case 37://left arrow key
        browse.moveLeft();
        break;
      case 40://down arrow key
        browse.moveDown();
        break;
      case 39://right arrow key
        browse.moveRight();
        break;
      case 38://up arrow key
        browse.moveUp();
        break;
      case 13://return
        browse.startBrowsing();
        break;
      case 32://space
        browse.stopBrowsing();
        break;
      case 83://s key
        browse.toggleSelectItem();
        break;
      case 68://d key
        browse.deselectItem();
        break;
      default:
        console.log("Unhandled key", key);
    }
  };
  document.onkeydown = bindKey;


  var remoteEvents = {
    //WARNING these 2 are dom events, not component events and therefore should
    //be better matched with some component methods!
    //if the method does not yet exist, better implement it than rely
    //on html id!!!
    //singletap( event, node, options, eOpts )
//     elementtap:function(){
//
//     },
//     //doubletap( event, node, options, eOpts )
//     elementdoubletap:function(){
//
//     },

    //TODO map also itemswipe( dataView, index, target, record, e, eOpts ) ? we need to implement listeners as well!
    itemdoubletap: function(dataViewID, index) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap', dataView, index);
    },
    itemsingletap: function(dataViewID, index) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap', dataView, index);
    },
    //itemtap( dataView, index, target, record, e, eOpts )
    itemtap: function(dataViewID, index) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap', dataView, index);
    },
    //record is a way of mapping through Model id: e.g. record could be Ext.create('webinosTV.model.Device',{id:12})
    //but can be also a number as for itemtap
    select: function(dataViewID, record) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('select', dataView, record);
    },
    deselect: function(dataViewID, record) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('deselect', dataView, record);
    }
  };

  var requestsCache = {};
  var requestDevNameAndType = function(serviceAdr, notifyCB, resultCB) {
    if (!requestsCache[serviceAdr]) {
      requestsCache[serviceAdr] = {n: notifyCB, r: resultCB};
    }
    processRequests();
  };

  var _sendNotification = function(adr) {
    if (requestsCache[adr]) {
      console.log(12);
      requestsCache[adr].n();
    }
  };

  var _showDialog = function(i) {
    Ext.Msg.show({
      title: 'New device detected!',
      html: '<div style="text-align:center; width:100%;">Choose a name <input id="selectedDevName" style="color:black;text-align:center;" type="text" /><br/>and select the type<br/><select style="color:black;text-align:center;"  id="selectedDevType"><option name="phone">phone</option><option name="tablet">tablet</option><option name="pc">pc</option><option name="tv">tv</option><<option name="laptop">laptop</option></select> <br/>Hint: For eased assignment <input type="button" style="color:black;" value="Send" onclick="webinosTV.app.connectUi._sendNotification(\'' + i + '\')"> notification to device.</div>',
      height: "70%",
      minHeight: 400,
      width: "50%",
      scrollable: {
        direction: 'vertical',
        directionLock: true
      },
      fn: function(okBtn) {
        if (Ext.get('selectedDevName').dom.value && Ext.get('selectedDevType').dom.value) {
          console.log(Ext.get('selectedDevName').dom.value);
          console.log(Ext.get('selectedDevType').dom.value);
          requestsCache[i].r({type: Ext.get('selectedDevType').dom.value, name: Ext.get('selectedDevName').dom.value});
          delete requestsCache[i];
        }

      }
    });
  };

  var processRequests = function() {
    console.log(Ext.Msg.isHidden());
    if (Ext.Msg.isHidden() !== null && !Ext.Msg.isHidden()) {
      return;
    }
    for (var i in requestsCache) {
      _showDialog(i);
    }
  };

  /* interface */
  return {
    //Queues control
    addQueue: addQueue,
    addQueues: addQueues,
    updateQueue: updateQueue,
    removeQueue: removeQueue,
    clearQueues: clearQueues,
    //Media control
    addMediaItem: addMediaItem,
    addMediaItems: addMediaItems,
    removeMediaItem: removeMediaItem,
    clearMediaItems: clearMediaItems,
    //Categories control
    addCategory: addCategory,
    addCategories: addCategories,
    removeCategory: removeCategory,
    clearCategories: clearCategories,
    //Source devices control
    addSourceDevice: addSourceDevice,
    updateSourceDevice: updateSourceDevice,
    addSourceDevices: addSourceDevices,
    removeSourceDevice: removeSourceDevice,
    clearSourceDevices: clearSourceDevices,
    //Target devices control
    addTargetDevice: addTargetDevice,
    addTargetDevices: addTargetDevices,
    removeTargetDevice: removeTargetDevice,
    clearTargetDevices: clearTargetDevices,
    //TODO actions control?
    addActionButton: addActionButton,
    addActionButtons: addActionButtons,
    removeActionButton: removeActionButton,
    clearActionButtons: clearActionButtons,
    //TODO find a smarter name
    remoteEvents: remoteEvents,
    //Media Player
    showMediaPlayer: showMediaPlayer,
    hideMediaPlayer: hideMediaPlayer,
    //TODO Deprecate?
    showModalVideo: showModalVideo,
    hideModalVideo: hideModalVideo,
    //TODO Deprecate?
    showVideoPreview: showVideoPreview,
    hideVideoPreview: hideVideoPreview,
    //TODO Deprecate?
    showModalAudio: showModalAudio,
    hideModalAudio: hideModalAudio,
    //TODO Deprecate?
    showAudioPreview: showAudioPreview,
    hideAudioPreview: hideAudioPreview,
    //Navigation
    browse: browse,
    //misc ui bindings
    requestDevNameAndType: requestDevNameAndType,
    _sendNotification: _sendNotification
  };
}
;

