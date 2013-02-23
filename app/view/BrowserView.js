Ext.define('webinosTV.view.BrowserView', {
  extend: 'Ext.Container',

  requires: [
    'Ext.Panel','Ext.Button','Ext.data.Store','Ext.Img','Ext.SegmentedButton'
  ],
  config:
  {
    id:'browserMainView',
    currentSourceDeviceQueue:null, //private attribute - see showSourceDeviceQueue
    width:'100%',
    height:'100%',
    cls: 'main-container',
    layout:
    {
      type: 'hbox', //Main component
      align: 'center',
      pack: 'center'
    },
    items:[
      {
	xtype:'container',
	flex:2.5,
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
	     { xtype: 'panel', html: 'Queue', padding:2, margin: 2, flex:1,style:'text-align:center;'}, //#0a
        { xtype: 'panel', html: 'Source Device',padding:2, margin: 2,flex:1.5,style:'text-align:center;'}//#0b
	    ]
	  },
	  {//Container #0 (#0a and #0b)
	    xtype:'tileslist',
	    id:'sourceDeviceList',
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
	flex:1.5,
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
	  disabled: true,
	  masked:true,
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
	flex:3,
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
      id:'mediaPlaylist',
	  cls:'phone-listview-indicator', //additional css class to highlight scrollbar
	  width:'100%',
	  height:'100%',
	  disabled:true,
	  masked:true
	}]
      },
      {
	xtype:'container',
	height:'100%',
	flex:1.5,
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
      id:'targetDevicesList',
	  disabled:true,
	  masked:true,
      mode:'MULTI',
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
 		  
	flex:1.5,
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
	id:'playQueueSegmBtn',
    disabled: true,
    masked:true,
 	width:'100%',
 	height:'100%',
	padding:1,
	layout:
	{
	  type: 'vbox'
	},
	items:[
	  {xtype:'tilepanel',cls:'tile-panel', iconCls : 'play', text:'Play Now'},
	  {xtype:'tilepanel',cls:'tile-panel', iconCls : 'queue', text:'Add to Queue'}
	]
      }]
      }
    ]
  },

  
  showSourceDeviceQueue:function(deviceID){ //TODO update panel if it is already showing (otherwise 2 pushes)
    var mainContainer=this;

    //TODO remove once layouts are ready
    function get_random_color() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.round(Math.random() * 15)];
      }
      return color;
    }

    var currentSourceDeviceID = mainContainer.getCurrentSourceDeviceQueue();
    switch(currentSourceDeviceID)
    {
      case null: //add
	{
	  
//   	  //WARNING: this is NOT the final stuff
	  mainContainer.insert(0,{
	    xtype:'container',
	    flex:2,
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
		    {  xtype: 'panel', html: 'Device Queue', padding:2, margin: 2}
		  ]
	      },
	      {
		xtype:'tilepanel',
        cls:'tile-panel',
		flex:9,
		text: ('Queue for '+deviceID+'<br>Here you\'ll see a single device queue...').fontcolor(get_random_color()).small()
	      }
	    ]
	  });
	  mainContainer.getAt(0).getAt(1).getAt(0).addCls('not-implemented-yet');
 	  mainContainer.setCurrentSourceDeviceQueue(deviceID);
	}
	break;
      case deviceID: //remove
	{
	  mainContainer.removeAt(0);
  	  mainContainer.setCurrentSourceDeviceQueue(null);
	}
	break;
      default: //update
	{
      //WARNING: this is NOT the final stuff
      mainContainer.getAt(0).getAt(1).setText(('Queue for '+deviceID+'<br>Here you\'ll see a single device queue...').fontcolor(get_random_color()).small());
	  mainContainer.setCurrentSourceDeviceQueue(deviceID);
	}
	break;
    }
  }
});
