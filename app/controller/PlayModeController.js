Ext.define('webinosTV.controller.PlayModeController', {
  extend: 'Ext.app.Controller',
  xtype: 'playmodectrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control:{
      mcategory:
      {
        select:'targetDevSelected', //event = select, cb = mediaCategorySelected
        deselect:'targetDevDeselected'
      }
    },
    refs: {
      pqSegBtn: '#mediaPlaylist', //controlling
      targetDeVList: '#targetDevicesList' //controlled
    }
  },
  
  targetDevDeselected:function(targetDeVList, record, eOpts){
    var pqSegBtn=this.getPqSegBtn();
    if(targetDeVList.getSelectionCount()===0)
    {
      pqSegBtn.setMasked(true);
      pqSegBtn.setDisabled(false);
    }
  },

  targetDevSelected:function(targetDeVList, record, eOpts)
  {
    var pqSegBtn=this.getPqSegBtn();
    pqSegBtn.setMasked(false);
    pqSegBtn.setDisabled(true);
  }

});