Ext.define('webinosTV.view.DefaultTilePanel', {
  extend: 'Ext.Panel',
  xtype: 'tilepanel',
  config:
    {
      cls: 'default-tile',
      flex: 1,
      iconCls: null,
      textCls: null, //additional CSS for text
      text: null,
      index: -1,
      layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
      }
    },
  applyText: function(text) {
    var tile = this;
    var _text = '';
    var tcls = ['tile-text'];
    if (text !== null && text !== undefined && ('' + text).length > 0) {
      _text = text;
    }

    var q = tile.query('panel[name=text]');
    if (q.length === 0) {
      tile.add({
        name: 'text',
        xtype: 'panel',
        cls: tcls,
        html: _text
      });
    }
    else
    {
      q[0].setHtml(_text);
    }
    return _text;
  },
  applyIconCls: function(iconCls) {
    var tile = this;
    var q = tile.query('panel[name=icon]');
    if (q.length === 0) {
      tile.insert(0, {//always first
        name: 'icon',
        xtype: 'panel',
        cls: 'tile-icon-' + iconCls
      });
    }
    else
    {
      q[0].setCls('tile-icon-' + iconCls);
    }
    return iconCls;
  }
//  applyText: function(newText) {
////     console.log("applyText",newText)
//    var tile = this;
//    var oldText = tile.getText();
//    var position = tile.getIconCls() ? 1 : 0;
//
//    if (oldText !== newText)
//    {
//      if (oldText === null) //set
//      {
//        var tcls = ['tile-text'];
//        if (tile.getTextCls())
//          tcls = tcls.concat(tile.getTextCls());
//        tile.insert(position, {
//          xtype: 'panel',
//          cls: tcls,
//          html: newText
//        });
//      }
//      else //update
//      {
//        tile.getAt(position).setHtml(newText);
//      }
//    }
//    return newText;
//  },
//  applyIconCls: function(newCls) {
////     console.log("applyIconCls",newCls)
//    var tile = this;
//    var oldIconCls = tile.getIconCls();
//    if (oldIconCls !== newCls)
//    {
//      if (oldIconCls === null) //set
//      {
//        tile.insert(0, {//always first
//          xtype: 'panel',
//          cls: 'tile-icon-' + newCls
//        });
//      }
//      else //update
//      {
//        tile.getAt(0).setCls('tile-icon-' + newCls);
//      }
//    }
//    return newCls;
//  }
});