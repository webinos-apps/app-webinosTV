Ext.define('webinosTV.view.MediaCategoryDataViewItem', {
  extend: 'Ext.dataview.component.DataItem',
  requires: ['Ext.Container', 'Ext.Panel'],
  xtype: 'mediacategorylistitem',
  config: {
    mediaLabel: {
      xtype: 'container',
      layout: 'hbox',
      height: 100,
      items: [
        {
          xtype: 'tilepanel',
          iconCls: '', // iconClasses[mediaCategoryInfo.category],
          text: ''//,mediaCategoryInfo.mediaCategoryName}
        }
      ]
    }
  },
  applyMediaLabel: function(config)
  {
    return Ext.factory(config, webinosTV.view.DefaultTilePanel, this.getMediaLabel())
  },
  updateRecord: function(newRecord)
  {
    var dataItem = this;
    if (!newRecord) {
      return;
    }

    var iconClasses = {//associate a mediaType type with an icon name
      'video': 'video',
      'audio': 'audio',
      'image': 'image',
      'tvchannel': 'tvchannel', //TODO fix not displayed
      'app': 'webinos', //TODO find a suitable SVG icon
      'doc': 'doc'
    };

    dataItem._record = newRecord;

    var category = newRecord.get('category');
    var categoryIconCls = category ? iconClasses[category] : null;
    var categoryName = newRecord.get('mediaCategoryName');
    var categoryText = categoryName ? categoryName : null
    var tile = dataItem.getMediaLabel().getAt(0);
    tile.setIconCls(categoryIconCls);
    tile.setText(categoryText);
  },
  updateMediaLabel: function(newLabel, oldLabel)
  {
    if (oldLabel) {
      this.remove(oldLabel);
    }

    if (newLabel) {
      this.add(newLabel);
    }
  }

});