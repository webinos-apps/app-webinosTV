Ext.define('webinosTV.view.DefaultTilePanel', {
  extend: 'Ext.Panel',
  xtype: 'tilepanel',
//   requires: [
//     'Ext.img'
//   ],
  config:
  {
    cls:'tile-panel',
    padding:2,
    margin: 2,
    flex:1,
    iconCls:null,
    text:null,
    index:-1,
    layout:{
      type:'vbox',
      align:'center',
      pack:'center'
    }
  },

  initialize:function(){
    var tile=this;
    var tileText=tile.getText();
    var tileIconCls=tile.getIconCls();
    
    if(tileText!==null)
    {
      tile.add({
	xtype:'panel',
	cls:'tile-text',
	html:tileText
      });
    }
    
    if(tileIconCls!==null)
    {
      tile.add({
	xtype:'panel',
	cls:'tile-icon-'+tileIconCls
      });
    }
  },
  
  select:function(){
    var panel=this;
    panel.setCls('tile-panel-pressed');
    setTimeout(function(){
      panel.setCls('tile-panel-selected');
    },300);
  },

  unselect:function(){
    var panel=this;
    panel.setCls('tile-panel');
  }
});