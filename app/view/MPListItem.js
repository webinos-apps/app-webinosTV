/**
 * Generic Media Playlist item
 *
 */
Ext.define('webinosTV.view.MPListItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'mplistitem',
  config: {
    mediaLabel: {
      xtype: 'container',
      layout: 'hbox',
      margin: 0,
      padding: 4,
      flex: 9,
      items: [
        {
          xtype: 'panel',
          margin: 2,
          html: ''
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

    dataItem._record = newRecord;
    var title = newRecord.get('title');
    dataItem.getMediaLabel().getAt(0).setHtml(title);
  },
  updateMediaLabel: function(newLabel, oldLabel)
  {
    if (oldLabel) {
      this.remove(oldLabel);
    }

    if (newLabel) {
      this.add(newLabel);
    }
  },
  checkTextOverflow: function() {
    var slidingCls = 'sliding-text';
    var textPanel = this.getAudioLabel().getAt(0); //TODO a smarter way to get this
    var hasOverflow = (this.element.dom.clientWidth - this.element.dom.scrollWidth) !== 0;
    var hasSlidingCls = false;
    if (textPanel.getCls() !== null)
    {
      hasSlidingCls = textPanel.getCls().indexOf(slidingCls) !== -1;
    }

    if (hasOverflow)
    {
      if (!hasSlidingCls)
      {
//  console.log("ADD cls - "+this.getIndex(),hasSlidingCls);
        textPanel.addCls(slidingCls);
      }
    }
    else
    {
      if (hasSlidingCls)
      {
//  console.log("REMOVE cls - "+this.getIndex(),hasSlidingCls);
        textPanel.removeCls(slidingCls);
      }
    }
  }

});