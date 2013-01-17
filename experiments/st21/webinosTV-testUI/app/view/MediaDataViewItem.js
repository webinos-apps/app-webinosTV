Ext.define('webinosTV.view.MediaDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'medialistitem',
    config:{
      mediaLabel:true
    },

    applyMediaLabel:function(config)
    {
      //TODO data handling here
      var iconClasses={//associate a mediaType type with an icon name
	'movies':'videos',
	'music':'music',
	'images':'images',
	'channels':'tv',//TODO find a suitable icon
	'apps':'webinos',//TODO find a suitable icon
	'docs':'docs'
      };
      var mediaTypeInfo = this.getRecord().data; //a count of media queued and mediaType name + mediaType type

      var itemContainer=Ext.create('Ext.Container',{
	layout:'hbox',
	height:100,
	items:[
	  {xtype:'tilepanel', iconCls : iconClasses[mediaTypeInfo.type], text:mediaTypeInfo.mediaTypeName}
	]
      });
      return itemContainer;
    },

    updateMediaLabel:function(newLabel,oldLabel)
    {
      if (oldLabel) {
	this.remove(oldLabel);
      }

      if (newLabel) {
	this.add(newLabel);
      }
    },

    select:function(){
      //getAt(1) returns this component container
      var mediaTypeItem=this.getAt(1);

      mediaTypeItem.getAt(0).setCls('tile-panel-pressed');
      setTimeout(function(){
	mediaTypeItem.getAt(0).setCls('tile-panel-selected');
      },300);
    },

    unselect:function(){
      //getAt(1) returns this component container
      var mediaTypeItem=this.getAt(1);

      mediaTypeItem.getAt(0).setCls('tile-panel');
    }
});