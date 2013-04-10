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
    browserViewId: 'browserMainView', //TODO use columns!!!
    //columns: null, // ['sourceDeviceList', 'mediaCategoryList', 'mediaPlaylist', 'targetDevicesList', 'actionsList'],
    lastVisitedColumnId: null,
    leftRightIndex: -1,
    upDownIndex: -1
  },
  _columns: null,
  getColumns: function() {
    return this._columns;
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  applyBrowserViewId: function(bwId)
  {
    var browserView = Ext.getCmp(bwId);
    this._columns = browserView.getItems().keys.filter(function(key) {
      return key.search(/Column/g) > -1;
    });
    this._columns = ['queuecol-id'].concat(this._columns);
    return bwId;
  },
///Utility function
  getColumnsLength: function() {
    return this.getColumns().length;
  },
  _getColumn: function(columnId) {
    var _columnId;
    var failure = false;
    if (typeof columnId === 'string')
    {
      _columnId = columnId;
    }
    else if (typeof columnId === 'number')
    {
      _columnId = this.getColumns()[columnId];
    }
    else
    {
      failure = true;
    }
    if (failure)
    {
      return null;
    }
    else
    {
      return Ext.getCmp(_columnId);
    }
  },
  _getRecords: function(dataViewComponent, records) {
    var _records;
    var failure = false;
    if (!Ext.isArray(records))
    {
      _records = [records];
    }
    else
    {
      _records = records;
    }
    var modelClassName = dataViewComponent.getStore().getModel().$className;

    _records = _records.map(function(record) {
      if (record.isModel !== undefined) //is a record
      {
        return record;
      }
      else if (record.isModel === undefined && record.hasOwnProperty('id')) //is an object {id:...}
      {
        return Ext.create(modelClassName, record);
      }
      else if (typeof record === 'string' || typeof record === 'number') //assume all id are strings or number for webinosTV app
      {
        return Ext.create(modelClassName, {id: record});
      }
      else {
        return null;
      }
    }).filter(function(element) {
      return element !== null;
    });

    return _records;
  },
  /**
   * @param {string} action = select or deselect
   */
  _doSelectionOrDeselection: function(action, columnId, records) {
    var navi = this;
    var bw = Ext.get(navi.getBrowserViewId());
    var column = navi._getColumn(columnId);
    if (!column.getContentComponent().isDisabled())
    {
      var dataViewComponent = column.query('dataview')[0];
      if (dataViewComponent !== undefined) {
        var selection = navi._getRecords(dataViewComponent, records);
        console.log("Select At", columnId, selection);
        if (selection.length > 0)
          dataViewComponent[action](selection);
      }
      else {
        console.warn("Cannot perform " + action + " on column", column.getId(), "does not contain dataview components.");
      }
    }
    else {
      console.warn("Cannot perform " + action + " on column", column.getId(), "is disabled.");
    }

  },
  /**
   * select an item in a column
   * if a column is not valid or disabled (masked) do nothing
   * @param columnId a valid column id
   * @param recordId a valid record id
   */
  selectAt: function(columnId, records) {
    var navi = this;
    navi._doSelectionOrDeselection('select', columnId, records);
  },
  /**
   * deselect an item in a column
   * if a column is not valid or disabled (masked) do nothing
   * @param columnId a valid column id
   * @param recordId a valid record id
   */
  deselectAt: function(columnId, records) {
    var navi = this;
    navi._doSelectionOrDeselection('deselect', columnId, records);
  },
//  ///Utility function
//  incrementUpDownIndex: function(numberOfRows) {
//    var navi = this;
//    if (navi.getUpDownIndex() < numberOfRows)
//      navi.setUpDownIndex(navi.getUpDownIndex() + 1);
//    return navi.getUpDownIndex();
//  },
//  ///Utility function
//  decrementUpDownIndex: function() {
//    var navi = this;
//    if (navi.getUpDownIndex() > -1)
//      navi.setUpDownIndex(navi.getUpDownIndex() - 1);
//    return navi.getUpDownIndex();
//  },
//  ///Utility function
//  incrementLeftRightIndex: function() {
//    var navi = this;
//    if (navi.getLeftRightIndex() < navi.getColumnsLength())
//      navi.setLeftRightIndex(navi.getLeftRightIndex() + 1);
//    return navi.getLeftRightIndex();
//  },
//  ///Utility function
//  decrementLeftRightIndex: function() {
//    var navi = this;
//    if (navi.getLeftRightIndex() > -1)
//      navi.setLeftRightIndex(navi.getLeftRightIndex() - 1);
//    return navi.getLeftRightIndex();
//  },
//  startBrowsing: function(startCmpId) {
//    var navi = this;
//    var _startCmpIdIndex = startCmpId === undefined ? 0 : navi.getColumns().indexOf(startCmpId);
//    var _startCmpId = navi.getColumns()[_startCmpIdIndex];
//
//    var startCmp = Ext.getCmp(_startCmpId);
//    console.log("Started Ui Browsing", startCmp.getCls());
//    startCmp.setCls(["nav-selected", "phone-listview-indicator"]);
//    navi.setLastVisitedColumnId(_startCmpId);
//    navi.setLeftRightIndex(_startCmpIdIndex);
//  },
//  stopBrowsing: function() {
//    var navi = this;
//    var lvcId = navi.getLastVisitedColumnId();
//    if (lvcId)
//    {
//      var currCmp = Ext.getCmp(lvcId);
//      currCmp.removeCls("nav-selected");
//      navi.setLastVisitedColumnId(null);
//      navi.setLeftRightIndex(-1);
//      navi.setUpDownIndex(-1);
//      console.log("STOP Ui BROWSING");
//    }
//  },
//  //TODO check column is enabled
//  moveLeft: function() {
//    var navi = this;
//    var index = navi.getLeftRightIndex();
//    if (index > 0)
//    {
//      navi.clearBrowsing();
//      var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
//      currCmp.removeCls("nav-selected");
//
//      index = navi.decrementLeftRightIndex();
//      var nextCmp = Ext.getCmp(navi.getColumns()[index]);
//      nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
//      navi.setLastVisitedColumnId(navi.getColumns()[index]);
//      console.log("Move LEFT");
//    }
//  },
//  //TODO check column is enabled
//  moveRight: function() {
//    var navi = this;
//    var index = navi.getLeftRightIndex();
//    if (index < navi.getColumnsLength())
//    {
//      navi.clearBrowsing();
//      var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
//      currCmp.removeCls("nav-selected");
//
//      index = navi.incrementLeftRightIndex();
//
//      var nextCmp = Ext.getCmp(navi.getColumns()[index]);
//      nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
//      navi.setLastVisitedColumnId(navi.getColumns()[index]);
//      console.log("Move RIGHT");
//    }
//  },
//  //TODO check column is enabled
//  moveUp: function() {
//    var navi = this;
//    var lrIndex = navi.getLeftRightIndex();
//    var index = navi.getUpDownIndex() === -1 ? 0 : navi.getUpDownIndex();
//    var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
//    if (lrIndex < navi.getColumnsLength() && currColumnCmp)
//    {
//      var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
//      if (index < numberOfRows)
//      {
//        var currCmp = currColumnCmp.getItemAt(index);
//        currCmp.removeCls("nav-selected");
//        index = navi.decrementUpDownIndex();
//
//        if (index > -1)
//        {
//          var nextCmp = currColumnCmp.getItemAt(index);
//          nextCmp.addCls(["nav-selected"]);
//        }
//        console.log("Move UP to", index);
//      }
//    }
//  },
//  //TODO check column is enabled
//  moveDown: function() {
//    var navi = this;
//    var lrIndex = navi.getLeftRightIndex();
//    var index = navi.getUpDownIndex() === -1 ? 0 : navi.getUpDownIndex();
//    var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
//    if (lrIndex < navi.getColumnsLength() && currColumnCmp)
//    {
//      var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist') ? currColumnCmp.getStore().getCount() : 0; //TODO find a clean way to browse in columns 3 and 5
//      if (index < numberOfRows - 1)
//      {
//        if (index > -1)
//        {
//          var currCmp = currColumnCmp.getItemAt(index);
//          currCmp.removeCls("nav-selected");
//        }
//        index = navi.incrementUpDownIndex(numberOfRows);
//        var nextCmp = currColumnCmp.getItemAt(index);
//        nextCmp.addCls(["nav-selected"]);
//        console.log("Move DOWN to", index);
//      }
//    }
//  },
//  /**
//   * position on a column and optionally on one items
//   * @param columnId a valid column id
//   * @param recordId a valid record id - if it is an array, only the last element is considered
//   */
//  moveTo: function(columnId, recordId) {
//    var navi = this;//TODO fix behavior
//    var bw = Ext.get('browserView');
//    var index = navi.getColumns().indexOf(columnId);
//    if (index > -1)
//    {
//      console.log("GoTo", columnId, index);
//      navi.startBrowsing(columnId);
//      var destinationColumn = Ext.getCmp(columnId);
//      var isVisible = destinationColumn.getMasked().getHidden(); //false if the column is masked
//      if (isVisible)
//      {
//        //clean nav status
//        navi.clearBrowsing();
//        if (navi.getLastVisitedColumnId()) {
//          var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
//          currCmp.removeCls("nav-selected");
//        }
//
//        navi.setLastVisitedColumnId(columnId);
//        destinationColumn.addCls(["nav-selected", "phone-listview-indicator"]);
//        if (recordId && (destinationColumn.$className === "webinosTV.view.TilesDataView" || destinationColumn.id === 'mediaPlaylist'))
//        {
//          var destinationRowIndex = -1;
//          var _recordId;
//          if (recordId instanceof Array) //multiple
//          {
//            _recordId = recordId[recordId.length - 1];
//          }
//          else
//          {
//            _recordId = recordId;
//          }
//
//          var indexes = destinationColumn.getViewItems().filter(function(dataViewItem, index, array) {
////                 console.log("FILTH ",dataViewItem.get('record'),recordId)
//            return dataViewItem.get('record').internalId === recordId;
//          });
//          var viewItemIndex = destinationColumn.getItemIndex(indexes.pop());
//          if (typeof viewItemIndex === 'number') {
//            if (navi.getUpDownIndex() > -1)
//            {
//              var currItem = destinationColumn.getItemAt(navi.getUpDownIndex());
//              currItem.removeCls("nav-selected");
//            }
//            navi.setUpDownIndex(viewItemIndex);
//            var destinationItem = destinationColumn.getItemAt(navi.getUpDownIndex());
//            destinationItem.addCls(["nav-selected"]);
//          }
//        }
//      }
//    }
//    else {
//      console.warn("Invalid columnId", columnId);
//    }
//    return index;
//  },
//  ///clear orange boxes and reset navigation status indexes
//  clearBrowsing: function() {
//    var navi = this;
//    if (navi.getLastVisitedColumnId()) {
//      var currColumnCmp = Ext.getCmp(navi.getLastVisitedColumnId());
//      var index = navi.getUpDownIndex();
//      if (index > -1 && (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id === 'mediaPlaylist'))
//      {
//        var currCmp = currColumnCmp.getItemAt(index);
//        currCmp.removeCls("nav-selected");
//        navi.setUpDownIndex(-1);
//      }
//    }
//  },
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
  }

});