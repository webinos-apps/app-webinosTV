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
    var actionColumnList = Ext.getCmp('actionsList');
    actionColumnList.addNewRecord({id: id, icon: icon, text: text, action: actionCB});
  },
  addActionButtons: function() {
  },
  removeActionButton: function() {
  },
  clearActionButtons: function() {
  }
});