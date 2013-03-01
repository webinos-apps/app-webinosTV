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
//     console.log("mediaPLDeselected")
    var mplaylist=this.getMplaylist();
    var targetDevList=this.getTargetDevList();
    if(mplaylist.getSelectionCount()===0)
    {
      targetDevList.setMasked(true);
      targetDevList.setDisabled(true);
      targetDevList.setDisableSelection(true);
    }
  },

  mediaPLSelected:function(mediaPlaylist, record, eOpts)
  {
//     console.log("mediaSelected")
    var targetDevList=this.getTargetDevList();
    targetDevList.setMasked(false);
    targetDevList.setDisabled(false);
    targetDevList.setDisableSelection(false);
  }
});