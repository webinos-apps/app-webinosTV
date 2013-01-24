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
	    src: 'http://beatlesalbumcovers.net/wp-content/uploads/the-beatles-abbey-road-album-cover-256x256.jpg',
	    height: 98,
	    width: 98,
	    padding:1,
	    margin:1,
	    flex:1
	  },
	  {
	    xtype: 'panel',
	    cls:'tile-text',
 	    html: 'Beatles - Abbey Road',
	    flex:3
	  }
	]
      },
      {
	xtype:'list',
	flex:9,
	defaultType: 'audiolistitem',
	useComponents:true,
	listeners:{
	  itemtap:function(s, index,target, record){
// 	    console.log("itemTap",s, index,target, record)
	    var t=record.get('title');
// 	    console.log(t)
 	    record.set('title',t.fontcolor('blue'));
	  }
	},
	cls:'playlist',
	margin:2,
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
	text: ('Videos').fontcolor('cyan').big()
    }]);
  },

  showImages:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('Images').fontcolor('lime').big()
    }]);
  },

  showTV:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('DVB-T').fontcolor('orange').big()
    }]);
  },

  showApps:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('webinos Apps').fontcolor('magenta').big()
    }]);
  },

  showDocuments:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('Documents').fontcolor('red').big()
    }]);
  }
  
});