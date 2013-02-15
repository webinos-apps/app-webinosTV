Ext.define('webinosTV.controller.SelectMediaController', {
  extend: 'Ext.app.Controller',
  xtype: 'selmediactrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control:{
      mcategory:
      {
        select:'mediaPLSelected', //event = select, cb = mediaCategorySelected
        deselect:'mediaPLDeselected'
      }
    },
    refs: {
      mplist: '#mediaPlaylist', //controlling
      targetDeVList: '#targetDevicesList' //controlled
    }
  },
  
  mediaPLDeselected:function(mediaPlaylist, record, eOpts){
    var targetDeVList=this.getTargetDeVList();
    targetDeVList.setMasked(true);
    targetDeVList.setDisabled(false);
  },

  mediaPLSelected:function(mediaPlaylist, record, eOpts)
  {
    var targetDeVList=this.getTargetDeVList();
    targetDeVList.setMasked(false);
    targetDeVList.setDisabled(true);
  }
});