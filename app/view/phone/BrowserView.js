Ext.define('webinosTV.view.phone.BrowserView', {
  extend: 'webinosTV.view.BrowserView',
  xtype: 'phone-browserview',

  requires: [
    'Ext.Carousel','Ext.Panel','Ext.Button','Ext.List','Ext.data.Store','Ext.Img','Ext.SegmentedButton'
  ],
  config:
  {
    fullscreen:true,
    id:'browserMainView',
    currentSourceDeviceQueue:null, //private attribute - see showSourceDeviceQueue
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
      ui:'csc-indicator',
      items:[
	{
	  xtype:'container',
 	  width:'100%',
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
		{ xtype: 'panel', html: 'Source Device',padding:2, margin: 2,flex:1.5}//#0b
	      ]
	    },
	    {//Container #0 (#0a and #0b)
	      xtype:'tileslist',
	      defaultType: 'sourcedevlistitem',//for source devices
	      cls:'phone-listview-indicator', //additional css class to highlight scrollbar
	      width:'100%',
	      store:'tmpsrcdevstore-id'
	    }
	  ]
	},
	{
	  xtype:'container',
	  height:'100%',
// 	  width:'90%',
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
	      { xtype: 'panel', html: 'Categories',padding:2, margin: 2/*,flex:1.5*/}//#1
	    ]
	  },
	  {//Container #1 - Media Category
	    xtype:'tileslist',
	    id:'mediaCategoryList',
	    defaultType: 'mediacategorylistitem',//for media
	    cls:'phone-listview-indicator', //additional css class to highlight scrollbar
	    width:'100%',
// 	    flex: 1.5,
	    store: {
	      fields: ['category', 'mediaCategoryName'],
	      data: [
		{category: 'music',mediaCategoryName:'Mp3 collection'},
		{category: 'channels',mediaCategoryName:'DVB-T'},
		{category: 'movies',mediaCategoryName:'Videos'},
		{category: 'images',mediaCategoryName:'Pictures'},
		{category: 'apps',mediaCategoryName:'webinos app store'},
		{category: 'docs',mediaCategoryName:'Documents'}
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
	      { xtype: 'panel', html: 'Select Media',padding:2, margin: 2/*,flex:1.5*/}//#2
	    ]
	  },
	  {//Container #2 - playlist TODO: should change according with the media selected in #1
	    xtype: 'mediaplaylist',
	    cls:'phone-listview-indicator', //additional css class to highlight scrollbar
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
	      { xtype: 'panel', html: 'Target Device',padding:2, margin: 2/*,flex:1.5*/}//#3
	    ]
	  },
	  { //Container #3 - Display devices
	    xtype:'tileslist',
	    allowMultipleSelection:true,
	    defaultType: 'targetdevlistitem',//for display devices
	    cls:'phone-listview-indicator', //additional css class to highlight scrollbar
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
	      { xtype: 'panel', html: 'Play Mode',padding:2, margin: 2/*,flex:1.5*/}//#4
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