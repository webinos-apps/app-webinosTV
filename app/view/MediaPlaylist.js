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
	    height:'90%',
	    width: '90%',
	    padding:1,
	    margin:1,
	    flex:1,
	    zIndex:1000
	  },
	  {
	    xtype: 'panel',
	    cls:['tile-text'],
	    items:[{
	      xtype:'panel',
	      cls:'sliding-text',
	      html:'Beatles - Abbey Road'
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
	text: ('Videos').fontcolor('cyan').big()
    }]);
    console.log(mediaPL);
    mediaPL.items.items[0].addCls('not-implemented-yet');
  },

  showImages:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('Images').fontcolor('lime').big()
    }]);
    mediaPL.items.items[0].addCls('not-implemented-yet');
  },

  showTV:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('DVB-T').fontcolor('orange').big()
    }]);
    mediaPL.items.items[0].addCls('not-implemented-yet');
  },

  showApps:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('webinos Apps').fontcolor('magenta').big()
    }]);
    mediaPL.items.items[0].addCls('not-implemented-yet');
  },

  showDocuments:function(){
    var mediaPL=this;
    mediaPL.setItems([
      {
	xtype:'tilepanel',
	text: ('Documents').fontcolor('red').big()
    }]);
    mediaPL.items.items[0].addCls('not-implemented-yet');
  }
});