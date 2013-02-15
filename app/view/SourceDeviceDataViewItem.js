Ext.define('webinosTV.view.SourceDeviceDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'sourcedevlistitem',
    
    config:{
      deviceLabel:{
        xtype:'container',
        layout:'hbox',
        height:100,
        items:[
          {//counter
            xtype:'tilepanel', 
            iconCls : '', 
            text:'',
            flex:1,
            layout:{
              type:'hbox',
              align:'center',
              pack:'start'
            },
            listeners:{
              tap:{
                element:'element',
//                 scope:this,
                fn:function(){
                  console.log("onTap",this.getParent())
                  this.getParent().getParent().showDeviceQueue();
                }
              }
            }
          },
          {//device
            xtype:'tilepanel', 
            iconCls : '', 
            text:'',
            flex:1.5
          }
        ]}
    },

    applyDeviceLabel:function(config)
    {
      return Ext.factory(config,webinosTV.view.DefaultTilePanel,this.getDeviceLabel())
    },
    
    updateRecord:function(newRecord)
    {
      var dataItem = this;
      if (!newRecord) {
        return;
      }
      
      dataItem._record = newRecord;

      //counter
      var counterIconCls=newRecord.get('counter') ? 'list' : null;
      var counterText=newRecord.get('counter') ? newRecord.get('counter') : null
      dataItem.getDeviceLabel().getAt(0).setIconCls(counterIconCls);
      dataItem.getDeviceLabel().getAt(0).setText(counterText);

      //device
      dataItem.getDeviceLabel().getAt(1).setIconCls(newRecord.get('type'));
      dataItem.getDeviceLabel().getAt(1).setText(newRecord.get('deviceName'));
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
    
    showDeviceQueue:function(){
      var deviceInfo=this.getRecord().data;
      var browserMainView = Ext.getCmp('browserMainView');
      var deviceID= deviceInfo.deviceName; //WARNING we need some device (unique) ID!!!
      browserMainView.showSourceDeviceQueue(deviceID);
    }
});