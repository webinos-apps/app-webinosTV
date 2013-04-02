/**
 * Manages webinosTV browsing and selection
 *
 * ## Notes
 *
 * - Handles the instantiation of the mediaplayer
 *
 */
Ext.define('integration.Ui.UiNavigator', {
  mixins: ['Ext.mixin.Observable'],
  config: {
    browserView: 'browserMainView', //TODO use columns!!!
    columns: ['sourceDeviceList', 'mediaCategoryList', 'mediaPlaylist', 'targetDevicesList', 'actionsList'],
    lastVisitedColumnId: null,
    leftRightIndex: -1,
    upDownIndex: -1
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  ///Utility function
  getColumnsLength: function() {
    return this.getColumns().length;
  },
  ///Utility function
  incrementUpDownIndex: function(numberOfRows) {
    var navi = this;
    if (navi.getUpDownIndex() < numberOfRows)
      navi.setUpDownIndex(navi.getUpDownIndex() + 1);
    return navi.getUpDownIndex();
  },
  ///Utility function
  decrementUpDownIndex: function() {
    var navi = this;
    if (navi.getUpDownIndex() > -1)
      navi.setUpDownIndex(navi.getUpDownIndex() - 1);
    return navi.getUpDownIndex();
  },
  ///Utility function
  incrementLeftRightIndex: function() {
    var navi = this;
    if (navi.getLeftRightIndex() < navi.getColumnsLength())
      navi.setLeftRightIndex(navi.getLeftRightIndex() + 1);
    return navi.getLeftRightIndex();
  },
  ///Utility function
  decrementLeftRightIndex: function() {
    var navi = this;
    if (navi.getLeftRightIndex() > -1)
      navi.setLeftRightIndex(navi.getLeftRightIndex() - 1);
    return navi.getLeftRightIndex();
  },
  startBrowsing: function(startCmpId) {
    var navi = this;
    var _startCmpIdIndex = startCmpId === undefined ? 0 : navi.getColumns().indexOf(startCmpId);
    var _startCmpId = navi.getColumns()[_startCmpIdIndex];

    var startCmp = Ext.getCmp(_startCmpId);
    console.log("Started Ui Browsing", startCmp.getCls());
    startCmp.setCls(["nav-selected", "phone-listview-indicator"]);
    navi.setLastVisitedColumnId(_startCmpId);
    navi.setLeftRightIndex(_startCmpIdIndex);
  },
  stopBrowsing: function() {
    var navi = this;
    var lvcId = navi.getLastVisitedColumnId();
    if (lvcId)
    {
      var currCmp = Ext.getCmp(lvcId);
      currCmp.removeCls("nav-selected");
      navi.setLastVisitedColumnId(null);
      navi.setLeftRightIndex(-1);
      navi.setUpDownIndex(-1);
      console.log("STOP Ui BROWSING");
    }
  },
  //TODO check column is enabled
  moveLeft: function() {
    var navi = this;
    var index = navi.getLeftRightIndex();
    if (index > 0)
    {
      navi.clearBrowsing();
      var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
      currCmp.removeCls("nav-selected");

      index = navi.decrementLeftRightIndex();
      var nextCmp = Ext.getCmp(navi.getColumns()[index]);
      nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
      navi.setLastVisitedColumnId(navi.getColumns()[index]);
      console.log("Move LEFT");
    }
  },
  //TODO check column is enabled
  moveRight: function() {
    var navi = this;
    var index = navi.getLeftRightIndex();
    if (index < navi.getColumnsLength())
    {
      navi.clearBrowsing();
      var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
      currCmp.removeCls("nav-selected");

      index = navi.incrementLeftRightIndex();

      var nextCmp = Ext.getCmp(navi.getColumns()[index]);
      nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
      navi.setLastVisitedColumnId(navi.getColumns()[index]);
      console.log("Move RIGHT");
    }
  },
  //TODO check column is enabled
  moveUp: function() {
    var navi = this;
    var lrIndex = navi.getLeftRightIndex();
    var index = navi.getUpDownIndex() === -1 ? 0 : navi.getUpDownIndex();
    var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
    if (lrIndex < navi.getColumnsLength() && currColumnCmp)
    {
      var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
      if (index < numberOfRows)
      {
        var currCmp = currColumnCmp.getItemAt(index);
        currCmp.removeCls("nav-selected");
        index = navi.decrementUpDownIndex();

        if (index > -1)
        {
          var nextCmp = currColumnCmp.getItemAt(index);
          nextCmp.addCls(["nav-selected"]);
        }
        console.log("Move UP to", index);
      }
    }
  },
  //TODO check column is enabled
  moveDown: function() {
    var navi = this;
    var lrIndex = navi.getLeftRightIndex();
    var index = navi.getUpDownIndex() === -1 ? 0 : navi.getUpDownIndex();
    var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
    if (lrIndex < navi.getColumnsLength() && currColumnCmp)
    {
      var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
      if (index < numberOfRows - 1)
      {
        if (index > -1)
        {
          var currCmp = currColumnCmp.getItemAt(index);
          currCmp.removeCls("nav-selected");
        }
        index = navi.incrementUpDownIndex(numberOfRows);
        var nextCmp = currColumnCmp.getItemAt(index);
        nextCmp.addCls(["nav-selected"]);
        console.log("Move DOWN to", index);
      }
    }
  },
  /**
   * position on a column and optionally on one items
   * @param columnId a valid column id
   * @param recordId a valid record id - if it is an array, only the last element is considered
   */
  moveTo: function(columnId, recordId) {
    var navi = this;//TODO fix behavior
    var bw = Ext.get('browserView');
    var index = navi.getColumns().indexOf(columnId);
    if (index > -1)
    {
      console.log("GoTo", columnId, index);
      navi.startBrowsing(columnId);
      var destinationColumn = Ext.getCmp(columnId);
      var isVisible = destinationColumn.getMasked().getHidden(); //false if the column is masked
      if (isVisible)
      {
        //clean nav status
        navi.clearBrowsing();
        if (navi.getLastVisitedColumnId()) {
          var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
          currCmp.removeCls("nav-selected");
        }

        navi.setLastVisitedColumnId(columnId);
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
            if (navi.getUpDownIndex() > -1)
            {
              var currItem = destinationColumn.getItemAt(navi.getUpDownIndex());
              currItem.removeCls("nav-selected");
            }
            navi.setUpDownIndex(viewItemIndex);
            var destinationItem = destinationColumn.getItemAt(navi.getUpDownIndex());
            destinationItem.addCls(["nav-selected"]);
          }
        }
      }
    }
    else {
      console.warn("Invalid columnId", columnId);
    }
    return index;
  },
  ///clear orange boxes and reset navigation status indexes
  clearBrowsing: function() {
    var navi = this;
    if (navi.getLastVisitedColumnId()) {
      var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
      var index = navi.getUpDownIndex();
      if (index > -1 && (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist'))
      {
        var currCmp = currColumnCmp.getItemAt(index);
        currCmp.removeCls("nav-selected");
        navi.setUpDownIndex(-1);
      }
    }
  },
  toggleSelectCurrentItem: function() {
    var navi = this;
    var lrIndex = navi.getLeftRightIndex();
    var index = navi.getUpDownIndex() === -1 ? 0 : navi.getUpDownIndex();
    if (lrIndex < navi.getColumnsLength())
    {
      var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
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
  deselectCurrentItem: function() {
    var navi = this;
    var lrIndex = navi.getLeftRightIndex();
    var index = navi.getUpDownIndex() === -1 ? 0 : navi.getUpDownIndex();
    if (lrIndex < navi.getColumnsLength())
    {
      var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
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
  },
  /**
   * select an item in a column
   * if a column is not valid or disabled (masked) do nothing
   * @param columnId a valid column id
   * @param recordId a valid record id
   */
  selectAt: function(columnId, recordId) {
    var navi = this;
    var bw = Ext.get('browserView');
    var index = navi.getColumns().indexOf(columnId);
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
   * deselect an item in a column
   * if a column is not valid or disabled (masked) do nothing
   * @param columnId a valid column id
   * @param recordId a valid record id
   */
  deselectAt: function(columnId, recordId) {
    var navi = this;
    var bw = Ext.get('browserView');
    var index = navi.getColumns().indexOf(columnId);
    console.log("DESelect At", columnId, index);
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
  }
});