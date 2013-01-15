Ext.define('webinosTV.view.DefaultTilePanel', {
  extend: 'Ext.Panel',
  xtype: 'tilepanel',
//   requires: [
// 
//   ],
  config:
  {
    cls:'tile-panel',
    padding:2,
    margin: 2,
    listeners:{
      tap :{
	element : 'element',
	fn:function(event, htmlTarget,options,eOpts) {
	  var panel=this;
	  panel.setCls('tile-panel-pressed');
	  setTimeout(function(){
	    panel.setCls('tile-panel-selected');//TODO remove selected from the others!
	  },300);
	}
      }
    }
  }
});