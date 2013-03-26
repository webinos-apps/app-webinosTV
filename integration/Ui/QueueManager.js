/**
 * Manages webinosTV ...
 *
 * ## Notes
 *
 * - Handles the instantiation of the mediaplayer
 *
 */
Ext.define('integration.Ui.QueueManager', {
  mixins: ['Ext.mixin.Observable'],
//  config: {
//  },
//  // We need to initialize the config options when the class is instantiated
//  constructor: function(config) {
//    this.initConfig(config);
//  },
  /**
   * Get queues of the devices with deviceIds
   * Example:
   *    var qm=webinosTV.app.connectUi.getQueuesManager();
   *    qm.getDevicesQueues(["1","5"]);
   *
   * @param {Number/Array} deviceIds array or single deviceId target
   * @return {Object} queues map deviceId:queue of Media objects
   */
  getDevicesQueues: function(deviceIds) {
    if (!Ext.isArray(deviceIds)) {
      deviceIds = Array.prototype.slice.call(deviceIds, 0);
    }
    var queues = {};
    var devManager = webinosTV.app.connectUi.getSourceDevicesManager();
    for (var i = 0; i < deviceIds.length; i++)
    {
      var device = devManager.getDevice(deviceIds[i]);
      if (device) {
        queues[deviceIds[i]] = device.getMediaItemsQueue();
      }
    }
    console.log("getDevicesQueues", queues, deviceIds);
    return queues;
  },
  /**
   * Add mediaIds to the queues of the devices with deviceIds
   * @param {Number/Array} mediaIds array or single mediaId to be added
   * @param {Number/Array} deviceIds array or single deviceId target
   */
  addToDevicesQueue: function(mediaIds, deviceIds) {
    if (!Ext.isArray(deviceIds)) {
      deviceIds = Array.prototype.slice.call(deviceIds, 0);
    }
    var devManager = webinosTV.app.connectUi.getSourceDevicesManager();
    for (var i = 0; i < deviceIds.length; i++)
    {
      var device = devManager.getDevice(deviceIds[i]);
      if (device) {
        device.addToQueue(mediaIds);
      }
    }
    this._refreshDeviceQueueView();
  },
  /**
   * Add mediaIds to the queues of the devices with deviceIds
   * @param {Number} position position
   * @param {Number} newMediaId new value of the mediaId to be updated
   * @param {Number} deviceId id of the device to be updated
   */
  updateDeviceQueue: function(position, newMediaId, deviceId) {
    var devManager = webinosTV.app.connectUi.getSourceDevicesManager();
    var device = devManager.getDevice(deviceId);
    if (device) {
      device.addToQueue(newMediaId);
    }
    this._refreshDeviceQueueView();
  },
  /**
   * Add mediaIds to the queues of the devices with deviceIds
   * @param {String/Array} mediaIds array or single mediaId to be added
   * @param {String/Array} deviceIds array or single deviceId target
   *  if 'all' is passed, then the mediaIds are removed from all the queues of all devices
   */
  removeFromDevicesQueue: function(mediaIds, deviceIds) {
    if (deviceIds === 'all') {
      deviceIds = Ext.getStore("devicesstore-id").getData().keys;
    }
    else if (deviceIds !== 'all' && !Ext.isArray(deviceIds)) {
      deviceIds = Array.prototype.slice.call(deviceIds, 0);
    }
    var devManager = webinosTV.app.connectUi.getSourceDevicesManager();
    for (var i = 0; i < deviceIds.length; i++)
    {
      var device = devManager.getDevice(deviceIds[i]);
      if (device) {
        device.removeFromQueue(mediaIds);
      }
    }
    this._refreshDeviceQueueView();
  },
  /**
   * Add mediaIds to the queues of the devices with deviceIds
   * @param {Number/Array} mediaIds array or single mediaId to be added
   * @param {Number/Array} deviceIds array or single deviceId target
   */
  clearDevicesQueue: function(deviceIds) {
    if (!Ext.isArray(deviceIds)) {
      deviceIds = Array.prototype.slice.call(deviceIds, 0);
    }
    var devManager = webinosTV.app.connectUi.getSourceDevicesManager();
    for (var i = 0; i < deviceIds.length; i++)
    {
      var device = devManager.getDevice(deviceIds[i]);
      if (device) {
        device.clearQueue();
      }
    }
    this._refreshDeviceQueueView();
  },
  _refreshDeviceQueueView: function() {
    var qcolumn = Ext.getCmp('queuecol-id');
    if (!qcolumn.getHidden())
      qcolumn.updatePlaylist();
    var srcDevList = Ext.getCmp('sourceDeviceList');
    srcDevList.refresh();
  }

});