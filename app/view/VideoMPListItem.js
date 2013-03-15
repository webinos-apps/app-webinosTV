Ext.define('webinosTV.view.VideoMPListItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'videolistitem',
  config: {
    audioLabel: {
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
        },
        {
          xtype: 'panel',
          docked: 'right',
          width: '10%',
          cls: 'playlist-disclosure',
          html: (' + ').bold() //TODO on tap -> add to queue
        }
      ]
    }
  },
  applyAudioLabel: function(config)
  {
    return Ext.factory(config, webinosTV.view.DefaultTilePanel, this.getAudioLabel())
  },
  updateRecord: function(newRecord)
  {
    var dataItem = this;
    if (!newRecord) {
      return;
    }

    dataItem._record = newRecord;
    var title = newRecord.get('title');
    dataItem.getAudioLabel().getAt(0).setHtml(title);
  },
  updateAudioLabel: function(newLabel, oldLabel)
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