Ext.define('webinosTV.view.DeviceDataView',{
  extend: 'Ext.DataView',
  xtype: 'devicelist',
  config:{
    useComponents:true,
    defaultType: 'devicelistitem',
    loadingText: 'Loading device list...',
    emptyText: '<div>'+('No device found!').fontcolor('cyan')+'</div>',
    scrollable:{
      direction: 'vertical',
      directionLock: true
    }
  }
});