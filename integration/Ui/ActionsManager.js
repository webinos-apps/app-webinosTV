/**
 * Manages webinosTV ...
 *
 * ## Notes
 *
 * - Handles the ...
 *
 */
Ext.define('integration.Ui.ActionsManager', {
  mixins: ['Ext.mixin.Observable'],
  config: {
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  //example: addActionButton(3,'tv','Watch',function(){alert("Video killed radio all stars");}})
  addActionButton: function(id, icon, text, actionCB) {
    //var actionColumnList = Ext.getCmp('actionsList');
    //actionColumnList.addNewRecord({id: id, icon: icon, text: text, action: actionCB});
//      addNewRecord: function(recordObject) { //TODO reject objects with no id or increment biggest id
    var store = Ext.StoreManager.get('actionsstore-id');
    store.add({id: id, icon: icon, text: text, action: actionCB});
    this.refresh(); //seems not to get updated otherwise :( TODO maybe with dedicated model+store works

  },
  addActionButtons: function() {
  },
  removeActionButton: function() {
  },
  clearActionButtons: function() {
  }
});