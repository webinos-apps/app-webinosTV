/**
 * Manages webinosTV devices stores
 *
 * ## Notes
 *
 * - Handles the update of devices data
 *
 */
Ext.define('integration.Ui.DeviceManager', {
  mixins: ['Ext.mixin.Observable'],
  config: {
    devicesSID: ''
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  },
  getDevice: function(deviceId) {
    var storeId = this.getDevicesSID();
    var store = Ext.StoreMgr.get(storeId);
    return store.getById(deviceId);
  },
  addDevice: function(id, type, counter, name) {
    var storeId = this.getDevicesSID();
    var store = Ext.StoreMgr.get(storeId);
    store.add({"id": id, "type": type, "counter": counter, "deviceName": name});
  },
  addDevices: function(devices) {
    var dmgr = this;
    for (var i in devices) {
      if (devices[i].id && devices[i].type && devices[i].name) {
        dmgr.addTargetDevice(devices[i].id, devices[i].type, devices[i].counter, devices[i].name);
      }
    }
  },
  updateDevice: function(id, counter) {
    var storeId = this.getDevicesSID();
    var store = Ext.StoreMgr.get(storeId);
    //TODO: update the model, to reflect counter change
  },
  removeDevice: function(id) {
    var storeId = this.getDevicesSID();
    var store = Ext.StoreMgr.get(storeId);
    store.remove(Ext.create('webinosTV.model.Device', {id: id}));
  },
  clearAll: function() {
    var storeId = this.getDevicesSID();
    var store = Ext.StoreMgr.get(storeId);
    store.clearData();
  }
});