Ext.define('webinosTV.view.Main', {
  extend: 'Ext.tab.Panel',
  xtype: 'main',
  requires: [
    'Ext.TitleBar',
    'Ext.Button'
  ],
  config: {
    tabBarPosition: 'bottom',
    items:[
      {
	title:'Tiles test',
	iconCls: 'hot', //TODO Use another icon,
//  	styleHtmlContent: true,
// 	scrollable: true,
	items: [
	  {
	    docked: 'top',
	    xtype: 'titlebar',
	    title: 'webinosTV ST2.1 UI test: panels grid'
	  },
	  {
	    xtype: 'pnlgrid'
	  }
	]
      },
      {
	title:'Tiles test 2',
	iconCls: 'lab', //TODO Use another icon,
// 	styleHtmlContent: true,
// 	scrollable: true,
	items: [
	  {
	    docked: 'top',
	    xtype: 'titlebar',
	    title: 'webinosTV ST2.1 UI test: buttons grid'
	  },
	  {
	    xtype: 'btngrid'
	  }
	]
      }
    ]
  }
});
