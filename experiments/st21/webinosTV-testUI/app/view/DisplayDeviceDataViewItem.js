Ext.define('webinosTV.view.DisplayDeviceDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'displaydevlistitem',
    config:{
      deviceLabel:true
    },

    applyDeviceLabel:function(config)
    {
      //TODO data handling here
      //associate a device type with an icon name
      var iconClasses={
	'pc':'pc',
	'tv':'tv',
	'phone':'phone',
	'tablet':'tablet',
	'laptop':'laptop'
      };

      var deviceInfo = this.getRecord().data; //a count of media queued and mediaType name + mediaType type

      var itemContainer=Ext.create('Ext.Container',{
	layout:'hbox',
	height:100,
	items:[
	  {xtype:'tilepanel', iconCls : iconClasses[deviceInfo.type], text:deviceInfo.deviceName}
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
      setTimeout(function(){
	deviceItem.getAt(0).setCls('tile-panel-selected');
      },300);
    },

    unselect:function(){
      //getAt(1) returns this component container
      var deviceItem=this.getAt(1);

      deviceItem.getAt(0).setCls('tile-panel');
    }
});