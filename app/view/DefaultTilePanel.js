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

  select:function(){
    var tile=this;
    tile.setCls('tile-panel-pressed');
    setTimeout(function(){
      tile.setCls('tile-panel-selected');
    },300);
  },

  unselect:function(){
    var tile=this;
    tile.setCls('tile-panel');
  },

  //Override setters
  applyText:function(newText){
    var tile=this;
    var oldText=tile.getText();
    var position = tile.getIconCls() ? 1:0;

    if(oldText!==newText)
    {
      if(oldText===null) //set
      {
	tile.insert(position,{
	  xtype:'panel',
	  cls:'tile-text',
	  html:newText
	});
      }
      else //update
      {
	tile.getAt(position).setHtml(newText);
      }
    }
    return newText;
  },

  applyIconCls:function(newCls){
    var tile=this;
    var oldIconCls=tile.getIconCls();
    if(oldIconCls!==newCls)
    {
      if(oldIconCls===null) //set
      {
	tile.insert(0,{ //always first
	  xtype:'panel',
	  cls:'tile-icon-'+newCls
	});
      }
      else //update
      {
	tile.getAt(0).setCls(newCls);
      }
    }
    return newCls;
  }

  
});