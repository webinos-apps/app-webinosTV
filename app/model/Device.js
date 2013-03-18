Ext.define('webinosTV.model.Device', {
  extend: 'Ext.data.Model',
  alternateClassName: ['webinosDevice'],
  config: {
    fields: [
      'id', //unique device id
      'type', //device type: 'pc', 'tv', 'tablet', 'phone', 'laptop']
      'deviceName', //device name - label displayed -TODO handle name clash by adding '-n'
      'queue' //queue = list of mediItems id
    ],
    validations: [
      {type: 'presence', field: 'id'},
      {type: 'presence', field: 'deviceName'},
      {type: 'presence', field: 'type'},
      {type: 'inclusion', field: 'type', list: ['pc', 'tv', 'tablet', 'phone', 'laptop']}
    ]
  },
  getDeviceId: function() {
    return this.get('id');
  },
  getName: function() {
    return this.get('deviceName');
  },
  /**
   * Get count of item in this device queue
   */
  getCounter: function() {
    var q = this.get('queue');
    if (Ext.isArray(q))
      return this.get('queue').length;
    else
      return null;
  },
  //Get queue as an array of references
  getQueue: function() {
    var q = this.get('queue');
    return q;
  },
  //Get queue as an array of Media models
  getMediaItemsQueue: function() {
    var q = this.get('queue');
    var allData = Ext.getStore('mediastore-id').getData().items;

//Get only elements that are referenced by this device
    var mediaItems = allData.filter(function(item) {
      return q.indexOf(item.getId()) !== -1;
    });
    return mediaItems;
  },
  /**
   * Add one or more mediaIds to the device queue
   * @param {Number/Array} mediaIds one or more mediaIds
   * @return {Number} queue lenght
   */
  addToQueue: function(mediaIds) {
    if (!Ext.isArray(mediaIds)) {
      mediaIds = Array.prototype.slice.call(arguments);
    }
    return this.queueAt(this.get('queue').length, mediaIds);
  },
  /**
   * insert one or more mediaIds to the device queue at given index
   * @param {Number} index index where to insert the mediaId(s)
   * @param {Number/Array} mediaIds one or more mediaIds
   * @return {Number} queue lenght
   */
  queueAt: function(index, mediaIds) {
    if (!Ext.isArray(mediaIds)) {
      mediaIds = Array.prototype.slice.call(arguments, 1);
    }

    var q = this.get('queue');
    //filter out media that are already there
    var _mediaIds = mediaIds.filter(function(m) {
      return q.indexOf(m) === -1;
    });

    for (var i = 0; i < _mediaIds.length; i++)
    {
      q.splice(index, 0, _mediaIds[i]);
    }
    return q.length;
  },
  /**
   * asserts whether given mediaId is in queue
   * @param {Number} mediaId media Id to check
   * @return {Boolean} is in queue
   */
  isInQueue: function(mediaId) {
    var q = this.get('queue');
    return q.indexOf(mediaId) !== -1;
  },
  /**
   * Get media id at given position
   * @param {Number} index index of the id
   */
  getQueueItemAt: function(index) {
    var q = this.get('queue');
    return q[index];
  },
  /**
   * Update media id at given position
   * If
   * @param {Number} position index of the id be updated
   * @param {Number} newMediaId newValue
   */
  updateQueueItemAt: function(position, newMediaId) {
    var q = this.get('queue');

    var oldValue = q[position];
    if (oldValue)
    {
      q[position] = newMediaId;
    }
    return oldValue;
  },
  /**
   * Removes one or more media Ids
   * @param {Number/[Number]} mediaIds media Id(s) to be removed
   *
   */
  removeFromQueue: function(mediaIds) {
    if (!Ext.isArray(mediaIds)) {
      mediaIds = Array.prototype.slice.call(arguments, 1);
    }

    var q = this.get('queue');

    for (var i = 0; i < mediaIds.length; i++)
    {
      var index = q.indexOf(mediaIds);
      if (index !== -1)
        q.splice(index, 1);
    }
    return q.length;
  },
  /**
   * Removes media id at given position
   * @param {Number} index index of the id be removed
   */
  removeFromQueueAt: function(index) {
    var q = this.get('queue');
    var removable = q[index];
    if (removable)
    {
      q.splice(index, 1);
    }
    return removable;
  },
  /**
   * Deletes all id from this device queue
   */
  clearQueue: function() {
    return this.set('queue', []);
  }
});