Ext.define('webinosTV.view.MediaPlaylist', {
  extend: 'Ext.Container',
  xtype: 'mediaplaylist',
  requires:['Ext.List'],

  //TODO this controller should change shape depending on the selected media type
  config:
  {
    id:'selectMedia',
    layout:
    {
      type: 'vbox'
    },
    items:
    [
      {
	xtype:'tilepanel',
    cls:'tile-panel',
	text: 'please select a media type...'
      }
    ]
  },

  showMusic:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'container',
	layout: {
	  type:'hbox',
	  pack:'center',
	  align:'center'
	},
	margin:2,
	flex:2,
// 	height:100,
	cls:'tile-panel',
	items:
	[
	  {
	    xtype:'img',
	    src: './resources/images/cover.png',
	    height:'70%',
	    width: '70%',
	    padding:1,
	    margin:1,
	    flex:2,
	    zIndex:1000
	  },
	  {
	    xtype: 'panel',
	    cls:['tile-text'],
	    items:[{
	      xtype:'panel',
	      cls:'sliding-text',
	      html:'Artist - Album'
// 	      html:'extremely long text may appear here and should never flow oustide its parent container'
	    }],
	    flex:3
	  }
	]
      },
      {
// 	xtype:'list',
	xtype:'dataview',
	flex:9,
	margin:2,
	scrollable:{
	  direction: 'vertical',
	  directionLock: true
	},
	defaultType: 'audiolistitem',
	useComponents:true,
	listeners:{
	  itemtap:{
	    fn:function(pl, index,target, record){
	      target.getSelected()? target.unselect():target.select();
	    }
	  },
	  resize:{
	    fn:function(elem){
	      var pl = this;
	      var items= pl.getInnerItems()[0].innerItems;
// 	      console.log("<<<<<<<<<RESIZE")
	      items.forEach(function(audioListItem){
		audioListItem.checkTextOverflow()
	      })

	    }
	  }
	},
	cls:'playlist',
// 	margin:2,
	pressedCls:300,
//   	itemTpl: '{title}',
	store: 'tmpmusicstore-id'
      }
    ]);
  },

  showVideos:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
    cls:['tile-panel'],
    textCls:'not-implemented-yet',
	text: ('Videos').fontcolor('cyan').big()
    }]);
  },

  showImages:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
    cls:['tile-panel'],
    textCls:'not-implemented-yet',
	text: ('Images').fontcolor('lime').big()
    }]);
  },

  showTV:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
    cls:['tile-panel'],
    textCls:'not-implemented-yet',
	text: ('DVB-T').fontcolor('orange').big()
    }]);
  },

  showApps:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
    cls:['tile-panel'],
    textCls:'not-implemented-yet',
	text: ('webinos Apps').fontcolor('magenta').big()
    }]);
  },

  showDocuments:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
    cls:['tile-panel'],
    textCls:'not-implemented-yet',
	text: ('Documents').fontcolor('red').big()
    }]);
  }
});