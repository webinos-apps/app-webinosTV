Ext.define('webinosTV.view.PanelsGrid', {
  extend: 'Ext.Container',
  xtype: 'pnlgrid',
  requires: [
    'Ext.Panel','Ext.Button','Ext.List','Ext.data.Store','Ext.Img'
  ],
  config:
  {
    width:'100%',
    height:'100%',
    style: 'background-color: #000029;',
    layout:
    {
      type: 'vbox', //Main component
//       align: 'center',
      pack: 'center'
    },
    items:
    [
      {
 	xtype: 'container', //Headers component (upper part)
	style: 'background-color: #5E99CC;',
	margin:2,
	flex:1, // 1/10 of the height
	width:'100%',
	layout:
	{
	  type: 'hbox',
 	  align: 'center',
 	  pack: 'center'
	},
	items:[
	{ xtype: 'panel', html: 'Queue', padding:2, margin: 2, flex:1}, //#0
	{ xtype: 'panel', html: 'Source Device',padding:2, margin: 2,flex:1.5},//#1
	{ xtype: 'panel', html: 'Media Type',padding:2, margin: 2,flex:1.5}, //#2
	{ xtype: 'panel', html: 'Select Media',padding:2, margin: 2,flex:3}, //#3
	{ xtype: 'panel', html: 'Play Mode',padding:2, margin: 2,flex:1.5}, //#4
	{ xtype: 'panel', html: 'Display Device',padding:2, margin: 2,flex:1.5} //#5
	]
      },
      {
 	xtype: 'container', //Items component (bottom part)
	flex:9, // 1/10 of the height
	width:'100%',
	layout:
	{
	  type: 'hbox'
	},
	items:
	[
	{
	  xtype: 'container',//#0
	  flex:1,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    { xtype: 'panel',cls:'tile-panel', html: '', margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: '', margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: '21', margin: 2 ,iconCls:'list',iconAlign:'left',iconMask:true,flex:1},//TODO icon
	    { xtype: 'panel',cls:'tile-panel', html: '', margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: '', margin: 2 ,flex:1}
	  ]
	},
	{
	  xtype: 'container',//#1
	  flex:1.5,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    { xtype: 'panel',cls:'tile-panel', html: 'My phone',iconCls: 'phone2',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}, //TODO list
	    { xtype: 'panel',cls:'tile-panel', html: 'My PC',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'Living Room',iconCls: 'tv',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'Ralph\'s Tablet',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},//TODO laptop,tablet
	    { xtype: 'panel',cls:'tile-panel', html: 'My Laptop',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}
	  ]
	},
	{
	  xtype: 'container',//#2
	  flex:1.5,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    { xtype: 'panel',cls:'tile-panel', html: 'Movies',iconCls: 'video',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},//TODO movies
	    { xtype: 'panel',cls:'tile-panel', html: 'Music',iconCls: 'music1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'Images', iconCls: 'photos2',iconAlign:'top',iconMask:true,margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'Channels', iconCls: 'tv',iconAlign:'top',iconMask:true,margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'Documents',iconCls: 'doc2',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}
	  ]
	},
	{
	  xtype: 'container',//#3
	  flex:3,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    {
	      xtype:'container',
	      layout: 'hbox',
	      flex:1,
	      cls:'tile-panel',
	      items:
	      [
		{
		  xtype:'img',
		  src: 'http://beatlesalbumcovers.net/wp-content/uploads/the-beatles-abbey-road-album-cover-256x256.jpg',
		  padding:1,
		  flex:1
		},
		{xtype: 'panel',  html: 'Beatles - Abbey Road',flex:3},
	      ]
	    },
// 	    {xtype: 'panel', cls:'tile-panel', html: 'Playlist',flex:1},
	    {
	      xtype:'list',
	      cls:'playlist',
	      flex:5,
// 	      fullscreen: true,
	      itemTpl: '{title}',
	      data: [
		{ title: 'Come Together' },
		{ title: 'Something' },
		{ title: 'Maxwell\'s Silver Hammer ' },
		{ title: 'Oh! Darling' },
		{ title: 'Octopus\'s Garden' },
		{ title: 'I Want You (She\'s So Heavy)' },
		{ title: 'Here Comes the Sun' },
		{ title: 'Because' },
		{ title: 'You Never Give Me Your Money' },
		{ title: 'Sun King' }
	      ]
	    }
	  ]
	},
	{
	  xtype: 'container',//#4
	  flex:1.5,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    { xtype: 'panel',cls:'tile-panel', html: 'Play Now',iconCls: 'play2',iconAlign:'top',iconMask:true, margin: 2,flex:1 },
	    { xtype: 'panel',cls:'tile-panel', html: 'Add to Queue',iconCls: 'add_black',iconAlign:'top',iconMask:true, margin: 2,flex:1 }
	  ]
	},
	{
	  xtype: 'container',//#5
	  flex:1.5,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    { xtype: 'panel',cls:'tile-panel', html: 'My phone',iconCls: 'phone2',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}, //TODO list
	    { xtype: 'panel',cls:'tile-panel', html: 'Living Room',iconCls: 'tv',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'Ralph\'s Tablet',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: 'My Laptop',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'panel',cls:'tile-panel', html: '', margin: 2 ,flex:1}
	  ]
	}
      ]
    }
    ]
  }
});
