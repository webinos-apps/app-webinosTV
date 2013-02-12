Ext.define('webinosTV.view.DefaultTilePanel', {
  extend: 'Ext.Panel',
  xtype: 'tilepanel',
//   requires: [
//     'Ext.img'
//   ],
  config:
  {
    cls:'default-tile',
//     cls:'tile-panel',
//     padding:2,
//     margin: 2,
    flex:1,
    iconCls:null,
    textCls:null, //additional CSS for text
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
//     console.log("applyText",newText)
    var tile=this;
    var oldText=tile.getText();
    var position = tile.getIconCls() ? 1:0;

    if(oldText!==newText)
    {
      if(oldText===null) //set
      {
        var tcls = ['tile-text'];
        if(tile.getTextCls())
          tcls=tcls.concat(tile.getTextCls());
        tile.insert(position,{
          xtype:'panel',
          cls:tcls,
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
  
  updateText:function(newText,oldText){
//     console.log("updateText",this,this._text)
    this._text=newText;
  },

  applyIconCls:function(newCls){
//     console.log("applyIconCls",newCls)
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
        tile.getAt(0).setCls('tile-icon-'+newCls);
      }
    }
    return newCls;
  },

  updateIconCls:function(newIconCls,oldIconCls){
//     console.log("updateIconCls",this,this._iconCls)
    this._iconCls=newIconCls;
  }  
});