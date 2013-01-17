Ext.define('webinosTV.view.SourceDeviceDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'sourcedevlistitem',
    config:{
      deviceLabel:true
    },

    applyDeviceLabel:function(config)
    {
      //TODO data handling here
      var iconClasses={
	'pc':'pc',
	'tv':'tv',
	'phone':'phone',
	'tablet':'tablet',
	'laptop':'laptop'
      };
      
      var deviceInfo = this.getRecord().data; //a count of media queued and device name + device type
      
      var itemContainer=Ext.create('Ext.Container',{
	layout:'hbox',
	height:100,
	flex:1,
	items:[
	  {
	    xtype:'tilepanel',
	    layout:{
	      type:'hbox',
	      align:'center',
	      pack:'start'
	    },
	    iconCls: deviceInfo.count ? 'list' : null,
	    text:deviceInfo.count ? deviceInfo.count : null
	  },
	  {xtype:'tilepanel',flex:1.5, iconCls : iconClasses[deviceInfo.type], text:deviceInfo.deviceName}
	]
      });
      return itemContainer;
    },

    updateDeviceLabel:function(newLabel,oldLabel)
    {
      if (oldLabel) {
	this.remove(oldLabel);
      }

      if (newLabel) {
	this.add(newLabel);
      }
    },

    select:function(){
      //getAt(1) returns this component container
      var deviceItem=this.getAt(1);

      deviceItem.getAt(0).setCls('tile-panel-pressed');
      deviceItem.getAt(1).setCls('tile-panel-pressed');
      setTimeout(function(){
	deviceItem.getAt(0).setCls('tile-panel-selected');
	deviceItem.getAt(1).setCls('tile-panel-selected');
      },300);
    },

    unselect:function(){
      //getAt(1) returns this component container
      var deviceItem=this.getAt(1);
      
      deviceItem.getAt(0).setCls('tile-panel');
      deviceItem.getAt(1).setCls('tile-panel');
    }
});