Ext.define('webinosTV.view.TilesDataView',{
  extend: 'Ext.DataView',
  xtype: 'tileslist',
  config:{
    useComponents:true,
    height:'100%',
    indexSelected:-1,
//     defaultType: 'devicelistitem',
    loadingText: 'Loading device list...',
    emptyText: '<div>'+('No device found!').fontcolor('cyan')+'</div>',
    scrollable:{
      direction: 'vertical',
      directionLock: true
    },
    listeners:{
      itemtap:{
	fn:function(deviceList, index, deviceItem, record, e, eOpts){
	  var previousIndex=deviceList.getIndexSelected();
	  if(previousIndex>-1)
	  {
	    //getAt(1) returns this component container
  	    deviceList.getAt(1).getAt(previousIndex).unselect();
	  }
	    deviceList.setIndexSelected(index);
	    deviceItem.select();
	}
      }
    }
  }
});