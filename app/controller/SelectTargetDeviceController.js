Ext.define('webinosTV.controller.SelectTargetDeviceController', {
  extend: 'Ext.app.Controller',
  xtype: 'seltargetctrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    control: {
      tdevList:
        {
          select: 'targetDeviceSelected', //event = select, cb = mediaCategorySelected
          deselect: 'targetDeviceDeselected'
        }
    },
    refs: {
      targetDevColumn: '#targetDevicesColumn',
//       mplist: '#selectMedia',
      mActions: '#actionsList',
      tdevList: '#targetDevicesList'
    }
  },
  targetDeviceSelected: function(targetDeviceList, record, eOpts)
  {
    var selectedColumn = this.getTargetDevColumn();
    selectedColumn.getAt(0).addCls('selected-column-header');
    var mbtns = this.getMActions();
//     console.log(mcategory.getDisabled());
    mbtns.setMasked(false);
    mbtns.setDisabled(false);

//     console.log("mcategory.getDisabled()",mcategory.getDisabled());

  },
  targetDeviceDeselected: function(targetDeviceList, record, eOpts)
  {
    var selectedColumn = this.getTargetDevColumn();

    var mActions = this.getMActions();
//     console.log(mcategory.getDisabled());



    //unselect actions if no target dev is selected
    var tdevList = this.getTdevList();
//     console.log(tdevList.innerItems[1].dataview.getSelectionCount());
    if (tdevList.innerItems[1].dataview.getSelectionCount() === 0) {
      selectedColumn.getAt(0).removeCls('selected-column-header');
      mActions.setMasked(true);
      mActions.setDisabled(true);
      mActions.deselectAll();
//       mActions.innerItems.forEach(function(i){
//       i.unselect()});
    }



  }
});