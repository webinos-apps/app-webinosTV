Ext.define('integration.EventsConnector', {
//  requires: [
//  ],
  mixins: ['Ext.mixin.Observable'], //can fire or listen to events
  alternateClassName: ['EventsConnector'],
  config: {
  },
  _callbackRegistry: {},
  constructor: function(config) {
    this.initConfig(config); // We need to initialize the config options when the class is instantiated
  },
  addEventListener: function(type, cb) {
    var ec = this;
    if (!ec._callbackRegistry[type]) {
      ec._callbackRegistry[type] = {};
    }
    var listenerId = Math.random + Date.now();
    ec._callbackRegistry[type][listenerId] = cb;
    return listenerId;
  },
  removeEventListener: function(type, listenerId) {
    var ec = this;
    if (!ec._callbackRegistry[type]) {
      return;
    }
    delete ec._callbackRegistry[type][listenerId];
  },
  notify: function(type, valueObject) {
    var ec = this;
    if (!ec._callbackRegistry[type]) {
      return;
    }
    for (var i in ec._callbackRegistry[type]) {
      if (ec._callbackRegistry[type].hasOwnProperty(i)) {
        ec._callbackRegistry[type][i](valueObject);
      }
    }
    ;
  }
});