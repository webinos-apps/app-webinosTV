Ext.define('webinosTV.controller.SelectMediaController', {
  extend: 'Ext.app.Controller',
  xtype: 'selmediactrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control:{
      mplaylist:
      {
        select:'mediaPLSelected', //event = select, cb = mediaCategorySelected
        deselect:'mediaPLDeselected'
      }
    },
    refs: {
      mplaylist: '#mediaPlaylist', //controlling
      targetDevList: '#targetDevicesList' //controlled
    }
  },
  
  mediaPLDeselected:function(mediaPlaylist, record, eOpts){
    var targetDevList=this.getTargetDevList();
    targetDevList.setMasked(true);
    targetDevList.setDisabled(true);
     targetDevList.setDisableSelection(true);
  },

  mediaPLSelected:function(mediaPlaylist, record, eOpts)
  {
    var targetDevList=this.getTargetDevList();
    targetDevList.setMasked(false);
    targetDevList.setDisabled(false);
    targetDevList.setDisableSelection(false);
  }
});