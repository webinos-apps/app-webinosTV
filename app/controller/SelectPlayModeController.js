Ext.define('webinosTV.controller.SelectPlayModeController', {
  extend: 'Ext.app.Controller',
  xtype: 'playmodectrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control: {
      actionList:
        {
          select: 'actionSelected',
          deselect: 'actionDeSelected'
        }
    },
    refs: {
      actionList: '#actionsList'
    }
  },
  actionSelected: function(actionList, actionrecord, eOpts)
  {
    var controller = this;
    var action = actionrecord.get('action')["selected"];
//    console.log("SEL record", record);
    if (action) {
      controller[action](controller.gatherInformations());
    }
  },
  actionDeSelected: function(actionList, actionrecord, eOpts)
  {
    var controller = this;
//    console.log("DES record", record);
    var action = actionrecord.get('action')["deselected"];
    if (action) {
      controller[action](controller.gatherInformations());
    }
  },
  play: function(data) {
//we should not refer to fileNames, but to media IDs
    //may be moving to mediaplayer is better
    var media = webinosTV.app.connectUi.getMediaItemsManager().getMediaById(data.mediaItems);//[0];
    //   console.log("selected media", media);
    //TODO this should not fire here and should be fired only if the selected device is the current device
//    webinosTV.app.connectUi.getMediaPlayerManager().showMediaPlayer({
//      mode: 'modal',
//      mediaType: media.get('type'),
//      url: media.get('name'),
//      posterUrl: undefined //sh
//    });
    webinosTV.app.connectEvents.notify("playFiles", {source: data.srcIds, targets: data.targetDevices, media: data.mediaItems/*files: fileNames*/});
  },
  pause: function(data) {
    //may be moving to mediaplayer is better
    //console.warn("Data", data)
    //Data are null if deselection occurs by chaining
    if (data !== null) {
      var media = webinosTV.app.connectUi.getMediaItemsManager().getMediaById(data.mediaItems);
      //console.log("DEselected media", media);
      webinosTV.app.connectEvents.notify("stopFiles", {source: data.srcIds, targets: data.targetDevices, media: data.mediaItems});
    }
  },
  addToDeviceQueues: function(data) {
    webinosTV.app.connectUi.getQueuesManager().addToDevicesQueue(data.mediaItems, data.targetDevices);
//    console.log("added", data.mediaItems, "to the queues of following devices", data.targetDevices);
  },
  gatherInformations: function() {
    //get files to be played
    var selectedMediaColumn = Ext.getCmp('mediaSelectionColumn');

    if (selectedMediaColumn.getSelectionCount() > 0) {
      var selectedMedia = selectedMediaColumn.getSelection();

      var fileIds = new Array(selectedMedia.length);
      for (var i = 0; i < fileIds.length; i++)
      {
        fileIds[i] = selectedMedia[i].internalId; //true data id
      }
      //    console.log("Selected media ids", fileIds);


      //get selected target devices
      var selectedTargetDevices = Ext.getCmp('targetDevicesList').getSelection();
      var targetIds = new Array(selectedTargetDevices.length);
      for (var i = 0; i < targetIds.length; i++)
      {
        targetIds[i] = selectedTargetDevices[i].internalId;
      }
      //    console.log("Selected targets", targetIds);


      //get selected source device
      var selectedSrcDevices = Ext.getCmp('sourceDeviceList').getSelection();
      var srcIds = new Array(selectedSrcDevices.length);
      for (var i = 0; i < srcIds.length; i++)
      {
        srcIds[i] = selectedSrcDevices[i].internalId;
      }
      //    console.log("Selected source device", srcIds);

      return {
        mediaItems: fileIds,
        targetDevices: targetIds,
        sourceDevices: srcIds
      };
    }
    else { //deselection
      return null;
    }
  }


});