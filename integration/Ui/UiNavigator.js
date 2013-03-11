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
  startBrowsing: function(startCmpId) {
    var navi = this;
    var _startCmpId = startCmpId ? startCmpId : navi.getColumns()[0];
    var startCmp = Ext.getCmp(_startCmpId);
    console.log("Started Ui Browsing", startCmp.getCls());
    startCmp.setCls(["nav-selected", "phone-listview-indicator"]);
    navi.setLastVisitedColumnId(_startCmpId);
    navi.setLeftRightIndex(navi.getLeftRightIndex() + 1);
  },
  stopBrowsing: function() {
    var navi = this;
    var lvcId = navi.getLastVisitedColumnId();
    console.log("lvcId", lvcId)
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
  moveLeft: function() {
    var navi = this;
    var index = navi.getLeftRightIndex();
    if (index > 0)
    {
      navi.clearBrowsing();
      var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
      currCmp.removeCls("nav-selected");

      navi.setLeftRightIndex(navi.getLeftRightIndex() - 1);
      index = navi.getLeftRightIndex();
      var nextCmp = Ext.getCmp(navi.getColumns()[index]);
      nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
      navi.setLastVisitedColumnId(navi.getColumns()[index]);
      console.log("Move LEFT");
    }
  },
  moveRight: function() {
    var navi = this;
    var index = navi.getLeftRightIndex();
    if (index < navi.getColumns().length)
    {
      navi.clearBrowsing();
      var currCmp = Ext.getCmp(navi.getLastVisitedColumnId());
      currCmp.removeCls("nav-selected");

      navi.setLeftRightIndex(navi.getLeftRightIndex() + 1);
      index = navi.getLeftRightIndex();
      var nextCmp = Ext.getCmp(navi.getColumns()[index]);
      nextCmp.addCls(["nav-selected", "phone-listview-indicator"]);
      navi.setLastVisitedColumnId(navi.getColumns()[index]);
      console.log("Move RIGHT");
    }
  },
  moveUp: function() {
  },
  moveDown: function() {
  },
  /**
   * position on a column and optionally on one items
   * @param columnId a valid column id
   * @param recordId a valid record id - if it is an array, only the last element is considered
   */
  moveTo: function(columnId, recordId) {
  },
  clearBrowsing: function() {
  },
  toggleSelectCurrentItem: function() {
  },
  deselectCurrentItem: function() {
  },
  /**
   * select an item in a column
   * if a column is not valid or disabled (masked) do nothing
   * @param columnId a valid column id
   * @param recordId a valid record id
   */
  selectAt: function(columnId, recordId) {
  },
  /**
   * deselect an item in a column
   * if a column is not valid or disabled (masked) do nothing
   * @param columnId a valid column id
   * @param recordId a valid record id
   */
  deselectAt: function(columnId, recordId) {
  }
});