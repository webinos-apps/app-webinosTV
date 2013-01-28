Ext.define('webinosTV.view.SourceDeviceDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'sourcedevlistitem',
    config:{
      deviceLabel:true,
      selected:false
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
	items:[
	  {
	    xtype:'tilepanel',
	    flex:1,
	    layout:{
	      type:'hbox',
	      align:'center',
	      pack:'start'
	    },
	    iconCls: deviceInfo.counter ? 'list' : null,
	    text:deviceInfo.counter ? deviceInfo.counter : null,
	    listeners:{
	      tap:{
		element:'element',
		scope:this,
		fn:function(){this.showDeviceQueue();}
	      }
	    }
	  },
	  {
	    xtype:'tilepanel',
	    flex:1.5,
	    iconCls : iconClasses[deviceInfo.type],
	    text:deviceInfo.deviceName
	  }
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

      deviceItem.getAt(0).select();
      deviceItem.getAt(1).select();
      this.setSelected(true);
    },

    unselect:function(){
      //getAt(1) returns this component container
      var deviceItem=this.getAt(1);
      
      deviceItem.getAt(0).unselect();
      deviceItem.getAt(1).unselect();
      this.setSelected(false);
    },

    showDeviceQueue:function(){
      var deviceInfo=this.getRecord().data;
      if(deviceInfo.counter)
      {
	var browserMainView = Ext.getCmp('browserMainView');
	var deviceID= deviceInfo.deviceName; //WARNING we need some device (unique) ID!!!
	browserMainView.showSourceDeviceQueue(deviceID);
      }
    }
});