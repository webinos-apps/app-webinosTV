Ext.define('integration.Ui', {
  requires: [
    'integration.Ui.MediaPlayerManager',
    'integration.Ui.DeviceManager',
    'integration.Ui.UiNavigator'
  ],
  mixins: ['Ext.mixin.Observable'], //can fire or listen to events
  alternateClassName: ['Ui', 'WebinosUi'],
  config: {
    mediaPlayerManager: null, //; Ext.create('integration.Ui.MediaPlayerManager', {}),
    sourceDevicesManager: null, // Ext.create('integration.Ui.DeviceManager', {devicesSID: 'tmpsrcdevstore-id'}),
    targetDevicesManager: null, // Ext.create('integration.Ui.DeviceManager', {devicesSID: 'tmpdispdevstore-id'}),
    uiNavigator: null /*,
     mediaCategoriesManager: Ext.create('integration.Ui.MediaCategoriesManager', {}),
     queuesManager: Ext.create('integration.Ui.QueueManager', {}),
     actionsManager: Ext.create('integration.Ui.ActionsManager', {})*/
  },
  constructor: function(config) {
    console.warn("CFG", config);
    var cfg = {
      mediaPlayerManager: Ext.create('integration.Ui.MediaPlayerManager', {}),
      sourceDevicesManager: Ext.create('integration.Ui.DeviceManager', {devicesSID: 'tmpsrcdevstore-id'}),
      targetDevicesManager: Ext.create('integration.Ui.DeviceManager', {devicesSID: 'tmpdispdevstore-id'}),
      uiNavigator: Ext.create('integration.Ui.UiNavigator', {})
        /*,
         mediaCategoriesManager: Ext.create('integration.Ui.MediaCategoriesManager', {}),
         queuesManager: Ext.create('integration.Ui.QueueManager', {}),
         actionsManager: Ext.create('integration.Ui.ActionsManager', {})*/
    };
    this.initConfig(cfg);  // We need to initialize the config options when the class is instantiated
  },
  _bindKey: function(kbEvt) {
    var ui = this;
    var key = kbEvt.keyCode;
    switch (key) {
      case 37://left arrow key
        ui.getUiNavigator().moveLeft();
        break;
      case 40://down arrow key
        ui.getUiNavigator().moveDown();
        break;
      case 39://right arrow key
        ui.getUiNavigator().moveRight();
        break;
      case 38://up arrow key
        ui.getUiNavigator().moveUp();
        break;
      case 13://return
        ui.getUiNavigator().startBrowsing();
        break;
      case 32://space
        ui.getUiNavigator().stopBrowsing();
        break;
      case 83://s key
        ui.getUiNavigator().toggleSelectItem();
        break;
      case 68://d key
        ui.getUiNavigator().deselectItem();
        break;
      default:
        console.log("Unhandled key", key);
    }
  },
  enableKeyboardNavigation: function() {
    var ui = this;
    document.onkeydown = function(event) {
      ui._bindKey(event);
    };
  }

});