Ext.define('webinosTV.view.ButtonsGrid', {
  extend: 'Ext.Container',
  xtype: 'btngrid',
  requires: [
    'Ext.Panel','Ext.Button'
  ],
  config:
  {
    width:'100%',
    height:'100%',
    cls: 'main-container',
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
	cls:'title-container',
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
	cls: 'main-container',
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
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: '', margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: '', margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: '21', margin: 2 ,iconCls:'list',iconAlign:'left',iconMask:true,flex:1},//TODO icon
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: '', margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: '', margin: 2 ,flex:1}
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
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'My phone',iconCls: 'phone2',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}, //TODO list
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'My PC',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Living Room',iconCls: 'tv',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Ralph\'s Tablet',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},//TODO laptop,tablet
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'My Laptop',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}
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
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Movies',iconCls: 'video',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},//TODO movies
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Music',iconCls: 'music1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Images', iconCls: 'photos2',iconAlign:'top',iconMask:true,margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Channels', iconCls: 'tv',iconAlign:'top',iconMask:true,margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Documents',iconCls: 'doc2',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}
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
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Playlist',iconCls: 'list',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}//TODO playlist
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
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Play Now',iconCls: 'play2',iconAlign:'top',iconMask:true, margin: 2,flex:1 },
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Add to Queue',iconCls: 'add_black',iconAlign:'top',iconMask:true, margin: 2,flex:1 }
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
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'My phone',iconCls: 'phone2',iconAlign:'top',iconMask:true, margin: 2 ,flex:1}, //TODO list
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Living Room',iconCls: 'tv',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'Ralph\'s Tablet',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: 'My Laptop',iconCls: 'monitor1',iconAlign:'top',iconMask:true, margin: 2 ,flex:1},
	    { xtype: 'button',cls:'tile-btn',ui: 'tile', text: '', margin: 2 ,flex:1}
	  ]
	}
      ]
    }
    ]
  }
});
