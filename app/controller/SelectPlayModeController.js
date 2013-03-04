Ext.define('webinosTV.controller.SelectPlayModeController', {
  extend: 'Ext.app.Controller',
  xtype: 'playmodectrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control:{
      actionList:
      {
        select:'actionSelected',
        deselect:'actionDeSelected'
      }
    },
    refs: {
      actionList: '#actionsList',
      tdevList: '#targetDevicesList'
    }
  },


  actionSelected:function(actionList, record, eOpts)
  {
    record.get('action')("play");
  },
  actionDeSelected:function(actionList, record, eOpts)
  {
    record.get('action')("stop");
  }

});