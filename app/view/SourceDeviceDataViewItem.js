Ext.define('webinosTV.view.SourceDeviceDataViewItem', {
  extend: 'Ext.dataview.component.DataItem',
  requires: ['Ext.Container', 'Ext.Panel'],
  xtype: 'sourcedevlistitem',
  config: {
    deviceLabel: {
      xtype: 'container',
      layout: 'hbox',
      height: 100,
      items: [
        {//counter
          xtype: 'tilepanel',
          cls: 'tile-panel',
          iconCls: '',
          text: '',
          flex: 1,
          layout: {
            type: 'hbox',
            align: 'center',
            pack: 'start'
          },
          listeners: {
            tap: {
              element: 'element',
              fn: function() {
                var elem = this;
                var srcDevItem = elem.getParent().getParent();
//                console.log("Src dev q elem tap", srcDevItem);
                var srcDevList = srcDevItem.getDataview();
                var device = srcDevItem.getRecord();
                var browserMainView = Ext.getCmp('browserMainView');
                srcDevList.fireEvent('queueitemtapped', browserMainView, srcDevList, device);
              }
            }
          }
        },
        {//device
          xtype: 'tilepanel',
          cls: 'tile-panel',
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