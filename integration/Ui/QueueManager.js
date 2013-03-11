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
  config: {
  },
  // We need to initialize the config options when the class is instantiated
  constructor: function(config) {
    this.initConfig(config);
  }
});