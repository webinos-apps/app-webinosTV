Ext.define('webinosTV.view.PanelsGrid', {
  extend: 'Ext.Container',
//   xtype: 'pnlgrid',
  requires: [
    'Ext.Panel','Ext.Button','Ext.data.Store','Ext.Img','Ext.SegmentedButton'
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
	{ xtype: 'panel', html: 'Queue', padding:2, margin: 2, flex:1}, //#0a
	{ xtype: 'panel', html: 'Source Device',padding:2, margin: 2,flex:1.5},//#0b
	{ xtype: 'panel', html: 'Media Type',padding:2, margin: 2,flex:1.5}, //#1
	{ xtype: 'panel', html: 'Select Media',padding:2, margin: 2,flex:3}, //#2
	{ xtype: 'panel', html: 'Display Device',padding:2, margin: 2,flex:1.5}, //#3
	{ xtype: 'panel', html: 'Play Mode',padding:2, margin: 2,flex:1.5} //#4
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
	{//Container #0 (#0a and #0b)
	  xtype:'tileslist',
	  defaultType: 'sourcedevlistitem',//for source devices
	  flex: 2.5,
	  store:'tmpsrcdevstore-id'
	},
	{//Container #1 - Media type
	  xtype:'tileslist',
	  id:'mediaTypeList',
	  defaultType: 'medialistitem',//for media
	  flex: 1.5,
	  store: {
	    fields: ['type', 'mediaTypeName'],
	    data: [
	      {type: 'music',mediaTypeName:'Mp3 collection'},
	      {type: 'channels',mediaTypeName:'DVB-T'},
	      {type: 'movies',mediaTypeName:'Videos'},
	      {type: 'images',mediaTypeName:'Pictures'},
	      {type: 'apps',mediaTypeName:'webinos app store'},
	      {type: 'docs',mediaTypeName:'Documents'}
	    ]
	  }
	},
	{//Container #2 - playlist TODO: should change according with the media selected in #1
	  xtype: 'mediaplaylist',
	  flex:3
	},
	{ //Container #3 - Display devices
	  xtype:'tileslist',
	  defaultType: 'displaydevlistitem',//for display devices
	  flex: 1.5,
	  store: 'tmpdispdevstore-id'
	},
	{//Container #4 - Actions
	  xtype: 'customsegbutton',
	  flex:1.5,
	  padding:1,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:[
	    {xtype:'tilepanel', iconCls : 'play', text:'Play Now'},
	    {xtype:'tilepanel', iconCls : 'queue', text:'Add to Queue'}
	  ]
	}
      ]
    }
    ]
  }
});
