Ext.define('webinosTV.view.SourceDevicesDataView', {
  extend: 'webinosTV.view.TilesDataView',
  xtype: 'srctileslist',
  config: {
    ///a custom flag, indicating whether the device q column is currently shown or not (same as device q column getHidden() )
    //showingDeviceQueueColumn: false,
    ///a custom flag, indicating whether deselection will be allowed by next tap event
    // willAllowDeselection: false,
    ///see dataview documentation
    allowDeselect: true,
    defaultType: 'sourcedevlistitem', //for source devices
    itemCls: 'multi-tile-panel',
    selectedCls: 'multi-tile-panel-selected',
    pressedCls: 'multi-tile-panel-pressed',
    cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
    store: 'devicesstore-id',
    //WARNING don't use itemsingletap because it's fired after select/deselect
    bubbleEvents: ['selectionchange', 'select', 'deselect', 'itemtap', 'itemsremoved']
  },
  onStoreRemove: function(store, records, indices) {
    // console.log("Removed records from store!");
    this.fireEvent('itemsremoved', this, records, indices);
    this.deselect(records);
    this.callParent(arguments);
  }
  ////,
//  applyShowingDeviceQueueColumn: function(value) {
//    return value;
//  },
//  updateShowingDeviceQueueColumn: function(newValue, oldValue)
//  {
//    if (Ext.isBoolean(newValue))
//      this.setShowingDeviceQueueColumn(newValue);
//
//    if (Ext.isDefined(oldValue)) {
//      var srcDevColumn = Ext.getCmp('sourceDevicesColumn');
//      var srcDevList = this;
//      //console.warn("updateTapped", newValue, oldValue, this.getTapped());
//      var device = srcDevList.getSelection().length === 0 ? null : srcDevList.getSelection()[0];
//      //srcDevList.setAllowDeselect(oldValue);
//      if (device)
//        srcDevList.fireEvent('queuepanelstatuschange', srcDevList, device, newValue);//, oldValue);
//    }
//  }
});