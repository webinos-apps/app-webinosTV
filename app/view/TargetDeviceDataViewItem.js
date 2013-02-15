Ext.define('webinosTV.view.TargetDeviceDataViewItem', {
    extend: 'Ext.dataview.component.DataItem',
    requires: ['Ext.Container','Ext.Panel'],
    xtype: 'targetdevlistitem',
    config:{
      layout:'hbox',
      height:100,
      deviceLabel:{xtype:'tilepanel', iconCls : '', text:''}
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
      dataItem.getDeviceLabel().setIconCls(newRecord.get('type'));
      dataItem.getDeviceLabel().setText(newRecord.get('deviceName'));
    },

    updateDeviceLabel:function(newLabel,oldLabel)
    {
      if (oldLabel) {
        this.remove(oldLabel);
      }

      if (newLabel) {
        this.add(newLabel);
      }
    }
});