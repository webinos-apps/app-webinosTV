Ext.define('webinosTV.controller.SelectSourceDeviceController', {
  extend: 'Ext.app.Controller',
  xtype: 'selsourcectrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    control:{
      sdevList:
      {
        select:'sourceDeviceSelected', //event = select, cb = mediaCategorySelected
        deselect:'sourceDeviceDeselected'
      }
    },
    refs: {
//       mplist: '#selectMedia',
      mcategory: '#mediaCategoryList',
      sdevList: '#sourceDeviceList'
    }
  },

  sourceDeviceSelected:function(sourceDeviceList, record, eOpts)
  {
    var mcategory=this.getMcategory();
//     console.log(mcategory.getDisabled());
    mcategory.setMasked(false);
    mcategory.setDisabled(false);
    mcategory.setDisableSelection(false);
//     console.log("mcategory.getDisabled()",mcategory.getDisabled());
    
  },
  
  sourceDeviceDeselected:function(sourceDeviceList, record, eOpts)
  {
    var mcategory=this.getMcategory();
    var sdevList=this.getSdevList();
//     console.log("Count",sdevList.getSelectionCount());
    if(sdevList.getSelectionCount()==0)
    {
      mcategory.deselectAll(false);
      mcategory.setMasked(true);
      mcategory.setDisabled(true);
      mcategory.setDisableSelection(true);
    }
  }
});