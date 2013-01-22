Ext.define('webinosTV.view.phone.PanelsGrid', {
  extend: 'webinosTV.view.PanelsGrid',
//   xtype: 'crslgrid',
    xtype: 'phone-pnlgrid',
//     xtype: 'pnlgrid',


  requires: [
    'Ext.Carousel','Ext.Panel','Ext.Button','Ext.List','Ext.data.Store','Ext.Img','Ext.SegmentedButton'
  ],
  config:
  {
    width:'100%',
    height:'100%',
    cls: 'main-container',
//     style:'background-color:red;',
    layout:
    {
      type: 'vbox', //Main component
      align: 'center',
      pack: 'center'
    },
    items:
    [
    {
      width:'99%',
      height:'99%',
//       styleHtmlContent: true,
      xtype:'carousel',
	items:
	[
	{
	  xtype:'container',
	  height:'100%',
	  layout:{
	    type: 'vbox',
	    align: 'center',
	    pack: 'center'
	  },
	  items:[
	    { //Headers  #0 (#0a and #0b)
	      xtype:'container',
	      width:'100%',
	      cls:'title-container',
	      layout:{
		type: 'hbox',
		align: 'center',
		pack: 'center'
	      },
	      items:[
		{ xtype: 'panel', html: 'Queue', padding:2, margin: 2, flex:1}, //#0a
		{ xtype: 'panel', html: 'Source Device',padding:2, margin: 2,flex:1.5},//#0b
	      ]
	    },
	    {//Container #0 (#0a and #0b)
	      xtype:'tileslist',
	      defaultType: 'sourcedevlistitem',//for source devices
	      width:'100%',
	      store:'tmpsrcdevstore-id'
	    }
	  ]
	},
	{
	  xtype:'container',
	  height:'100%',
	  layout:{
	    type: 'vbox',
	    align: 'center',
	    pack: 'center'
	  },
	  items:[
	  { //Headers  #1
	    xtype:'container',
	    width:'100%',
	    cls:'title-container',
	    layout:{
	      type: 'hbox',
	      align: 'center',
	      pack: 'center'
	    },
	    items:[
	      { xtype: 'panel', html: 'Media Type',padding:2, margin: 2/*,flex:1.5*/},//#1
	    ]
	  },
	  {//Container #1 - Media type
	    xtype:'tileslist',
	    id:'mediaTypeList',
	    defaultType: 'medialistitem',//for media
	    width:'100%',
// 	    flex: 1.5,
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
	  }]
	},
	{
	  xtype:'container',
	  height:'100%',
	  layout:{
	    type: 'vbox',
	    align: 'center',
	    pack: 'center'
	  },
	  items:[
	  { //Headers  #2
	    xtype:'container',
	    width:'100%',
	    cls:'title-container',
	    layout:{
	      type: 'hbox',
	      align: 'center',
	      pack: 'center'
	    },
	    items:[
	      { xtype: 'panel', html: 'Select Media',padding:2, margin: 2/*,flex:1.5*/},//#1
	    ]
	  },
	  {//Container #2 - playlist TODO: should change according with the media selected in #1
	    xtype: 'mediaplaylist',
	    width:'100%',
 	    height:'100%'
	  }]
	},
	{
	  xtype:'container',
	  height:'100%',
	  layout:{
	    type: 'vbox',
	    align: 'center',
	    pack: 'center'
	  },
	  items:[
	  { //Headers  #3
	    xtype:'container',
	    width:'100%',
	    cls:'title-container',
	    layout:{
	      type: 'hbox',
	      align: 'center',
	      pack: 'center'
	    },
	    items:[
	      { xtype: 'panel', html: 'Display Device',padding:2, margin: 2/*,flex:1.5*/},//#1
	    ]
	  },
	  { //Container #3 - Display devices
	    xtype:'tileslist',
	    defaultType: 'displaydevlistitem',//for display devices
	    width:'100%',
	    height:'100%',
	    store: 'tmpdispdevstore-id'
	  }]
	},
	{
	  xtype:'container',
	  height:'100%',
	  layout:{
	    type: 'vbox',
	    align: 'center',
	    pack: 'center'
	  },
	  items:[
	  { //Headers  #4
	    xtype:'container',
	    width:'100%',
	    cls:'title-container',
	    layout:{
	      type: 'hbox',
	      align: 'center',
	      pack: 'center'
	    },
	    items:[
	      { xtype: 'panel', html: 'Play Mode',padding:2, margin: 2/*,flex:1.5*/},//#1
	    ]
	  },
	{//Container #4 - Actions
	  xtype: 'customsegbutton',
	  width:'100%',
	  height:'100%',
	  padding:1,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:[
	    {xtype:'tilepanel', iconCls : 'play', text:'Play Now'},
	    {xtype:'tilepanel', iconCls : 'queue', text:'Add to Queue'}
	  ]
	}]
	}
      ]
    }
    ]	
  }
});