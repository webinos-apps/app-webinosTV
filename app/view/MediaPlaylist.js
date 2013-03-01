/**
 * Generic class that shows a playlist
 * 
 */
Ext.define('webinosTV.view.MediaPlaylist', {
  extend: 'Ext.DataView',
  xtype: 'mediaplaylist',
  config:{
    mode:"MULTI",
    scrollable:{
      direction: 'vertical',
      directionLock: true
    },
    useComponents:true,
    cls:'playlist',
    itemCls:'playlist-item',
    selectedCls:'playlist-item-selected',
    pressedCls:'playlist-item-pressed',
    pressedDelay:300
  }
});