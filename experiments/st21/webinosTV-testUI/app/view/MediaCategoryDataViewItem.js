Ext.define('webinosTV.view.MediaCategoryDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'mediacategorylistitem',
    config:{
      mediaLabel:true,
      selected:false
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
      var mediaCategoryInfo = this.getRecord().data; //a count of media queued and mediaCategory name + mediaCategory category

      var itemContainer=Ext.create('Ext.Container',{
	layout:'hbox',
	height:100,
	items:[
	  {xtype:'tilepanel', iconCls : iconClasses[mediaCategoryInfo.category], text:mediaCategoryInfo.mediaCategoryName}
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
      var mediaCategoryItem=this.getAt(1);

      mediaCategoryItem.getAt(0).setCls('tile-panel-pressed');
      setTimeout(function(){
	mediaCategoryItem.getAt(0).setCls('tile-panel-selected');
      },300);
      this.setSelected(true);
    },

    unselect:function(){
      //getAt(1) returns this component container
      var mediaCategoryItem=this.getAt(1);

      mediaCategoryItem.getAt(0).setCls('tile-panel');
      this.setSelected(false);
    }
});