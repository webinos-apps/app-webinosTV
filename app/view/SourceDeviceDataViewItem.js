Ext.define('webinosTV.view.SourceDeviceDataViewItem', {
  extend: 'Ext.dataview.component.DataItem',
  requires: ['Ext.Container', 'Ext.Panel'],
  xtype: 'sourcedevlistitem',
  config: {
    bubbleEvents: ['queuepanelstatuschange'],
    tapped: false,
    deviceLabel: {
      xtype: 'container',
      layout: 'hbox',
      height: 100,
      items: [
        {//counter
          //name: 'queuepanel',
          xtype: 'tilepanel',
          cls: ['tile-panel', 'webinostv-panel', 'queuepanel'], //queuepanel is a fake css class used for item selection
          iconCls: '',
          text: '',
          flex: 1,
          layout: {
            type: 'hbox',
            align: 'center',
            pack: 'start'
          }
        },
        {//device
//          name: 'devicepanel',
          xtype: 'tilepanel',
          cls: ['tile-panel', 'webinostv-panel', 'devicepanel'],
          iconCls: '',
          text: '',
          flex: 1.5
        }
      ]}
  },
  applyDeviceLabel: function(config)
  {
    return Ext.factory(config, webinosTV.view.DefaultTilePanel, this.getDeviceLabel());
  },
  updateRecord: function(newRecord)
  {
    var dataItem = this;
    if (!newRecord) {
      return;
    }

    dataItem._record = newRecord;
    //counter
    var counterIconCls = null;
    var counterText = null;
    if (newRecord.getCounter)
    {
      counterText = newRecord.getCounter();
      if (counterText > 0)
      {
        counterIconCls = 'list';
      }
      else
      {
        counterText = null;
      }
    }
//    console.log("src dev item", counterText, counterIconCls, newRecord.getCounter())
    dataItem.getDeviceLabel().getAt(0).setIconCls(counterIconCls);
    dataItem.getDeviceLabel().getAt(0).setText(counterText);
    //device
    dataItem.getDeviceLabel().getAt(1).setIconCls(newRecord.get('type'));
    dataItem.getDeviceLabel().getAt(1).setText(newRecord.get('deviceName'));
  },
  updateDeviceLabel: function(newLabel, oldLabel)
  {
    if (oldLabel) {
      this.remove(oldLabel);
    }

    if (newLabel) {
      this.add(newLabel);
    }
  }
});