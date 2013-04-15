Ext.define('webinosTV.view.DefaultTilePanel', {
  extend: 'Ext.Panel',
  xtype: 'tilepanel',
  config:
    {
      cls: ['default-tile', 'webinostv-panel'],
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
        cls: ['tile-icon-' + iconCls, 'tile-icon']
      });
    }
    else
    {
      q[0].setCls(['tile-icon-' + iconCls, 'tile-icon']);
    }
    return iconCls;
  }

});