Ext.define('webinosTV.controller.SelectPlayModeController', {
  extend: 'Ext.app.Controller',
  xtype: 'playmodectrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control:{
      pqSegBtn:
      {
        select:'actionSelected'
      }
    },
    refs: {
      pqSegBtn: '#playQueueSegmBtn',
      tdevList: '#targetDevicesList'
    }
  },


  actionSelected:function(playQueueSegmBtn, record, eOpts)
  {
    var pqSegBtn=this.getPqSegBtn();
    var tdevList = this.getTdevList();
    alert("Play!");

  }

});