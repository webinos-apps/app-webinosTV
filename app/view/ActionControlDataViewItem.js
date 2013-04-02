Ext.define('webinosTV.view.ActionControlDataViewItem', {
  extend: 'Ext.dataview.component.DataItem',
  requires: ['Ext.Container', 'Ext.Panel'],
  xtype: 'actctrllistitem',
  config: {
    layout: 'hbox',
//       height:'100%',
    actionLabel: {
      xtype: 'tilepanel',
      iconCls: '',
      text: ''
    }
  },
  applyActionLabel: function(config)
  {
    return Ext.factory(config, webinosTV.view.DefaultTilePanel, this.getActionLabel());
  },
  updateRecord: function(newRecord)
  {
    var dataItem = this;
    if (!newRecord) {
      return;
    }
    var height = 100 / newRecord.stores[0].getCount() + '%'; //adapt size to number of records
    dataItem.setHeight(height);
    dataItem._record = newRecord;
    dataItem.getActionLabel().setIconCls(newRecord.get('icon'));
    dataItem.getActionLabel().setText(newRecord.get('text'));
//       var action=newRecord.get('action');
//       action()
  },
  updateActionLabel: function(newLabel, oldLabel)
  {
    if (oldLabel) {
      this.remove(oldLabel);
    }

    if (newLabel) {
      this.add(newLabel);
    }
  }
});