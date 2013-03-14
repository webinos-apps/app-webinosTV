Ext.define('webinosTV.model.Device', {
  extend: 'Ext.data.Model',
  alternateClassName: ['webinosDevice'],
  config: {
    fields: ['id', 'type', 'deviceName', 'queue']
  },
  getCounter: function() {
    var q = this.get('queue');
    if (Object.prototype.toString.call(q) === '[object Array]')
      return this.get('queue').length;
    else
      return null;
  }
});