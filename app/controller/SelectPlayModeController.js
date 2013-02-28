Ext.define('webinosTV.controller.SelectPlayModeController', {
  extend: 'Ext.app.Controller',
  xtype: 'playmodectrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control:{
      actionList:
      {
        select:'actionSelected'
      }
    },
    refs: {
      actionList: '#actionsList',
      tdevList: '#targetDevicesList'
    }
  },


  actionSelected:function(actionList, record, eOpts)
  {
    record.get('action')();
//     var pqSegBtn=this.getPqSegBtn();
//     var tdevList = this.getTdevList();
//     alert("Play!");

  }

});