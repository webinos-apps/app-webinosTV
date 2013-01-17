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
	{//Container #0 (#0a and #0b)
	  xtype:'tileslist',
	  defaultType: 'sourcedevlistitem',//for source devices
	  flex: 2.5,
	  store: {
	    fields: ['count', 'type', 'deviceName'],
	    data: [
	      {type: 'pc',  count: 100,deviceName:'My PC'},
	      {type: 'tv',   count: 2,deviceName:'Living Room TV'},
	      {type: 'phone', count: 0,deviceName:'My Phone'},
	      {type: 'tablet', count: 24,deviceName:'Ralph\'s tablet'},
	      {type: 'laptop', count: 24,deviceName:'Mike\'s laptop'},
	      {type: 'tablet', count: 4,deviceName:'My Tablet'},
	      {type: 'tv',   count: 6,deviceName:'Kitchen TV'}
	    ]
	  }
	},
	{//Container #1 - Media type
	  xtype:'tileslist',
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
	  xtype: 'container',
// 	  flex:3,
	  layout:
	  {
	    type: 'vbox'
	  },
	  items:
	  [
	    {
	      xtype:'container',
	      layout: 'hbox',
   	      margin:2,
// 	      flex:1,
	      height:100,
	      cls:'tile-panel',
	      items:
	      [
		{
		  xtype:'img',
		  src: 'http://beatlesalbumcovers.net/wp-content/uploads/the-beatles-abbey-road-album-cover-256x256.jpg',
		  padding:1,
		  flex:1
		},
		{xtype: 'panel',  html: 'Beatles - Abbey Road',flex:3}
	      ]
	    },
	    {
	      xtype:'list',
	      cls:'playlist',
// 	      flex:5,
	      height:'100%',
	      margin:2,
	      pressedCls:300,
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
		{ title: 'Sun King' },
		{ title: 'Mean Mr. Mustard' },
		{ title: 'Polythene Pam ' },
		{ title: 'She Came In Through the Bathroom Window' },
   		{ title: 'Golden Slumbers' },
		{ title: 'Carry That Weight' },
		{ title: 'The End' },
		{ title: 'Her Majesty' }
	      ]
	    }
	  ]
	},
	{ //Container #3 - Display devices
	  xtype:'tileslist',
	  defaultType: 'displaydevlistitem',//for display devices
// 	  flex: 1.5,
	  store: {
	    fields: ['type', 'deviceName'],
	    data: [
	      {type: 'pc', deviceName:'My PC'},
	      {type: 'tv',  deviceName:'Living Room TV'},
	      {type: 'phone',deviceName:'My Phone'},
// 	      {type: 'tablet', deviceName:'Ralph\'s tablet'},
// 	      {type: 'laptop',deviceName:'Mike\'s laptop'},
	      {type: 'tablet',deviceName:'My Tablet'},
	      {type: 'tv',  deviceName:'Kitchen TV'}
	    ]
	  }
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