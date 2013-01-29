//TODO drop me
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
// 	    title: 'IS '+(function(){
// 	      var device='';
// 	      device += Ext.os.is.Phone? 'phone':'';
// 	      device += Ext.os.is.Tablet? 'tablet':'';
// 	      device += Ext.os.is.Desktop? 'PC':'';
// 
// 	      return device;
// 	    })()
 	    title: 'webinosTV ST2.1 UI test: panels grid'
	  }
// 	  {
// 	    xtype: 'pnlgrid'
// 	  }
	]
      }
    ]
  },

  initialize:function(){
    this.getTabBar().add(Ext.create('webinosTV.view.PanelsGrid'));
  }
});
