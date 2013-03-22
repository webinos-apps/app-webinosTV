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
  actionSelected: function(actionList, record, eOpts)
  {
    var controller = this;
    var action = record.get('action')["selected"];
//    console.log("SEL record", record);
    if (action) {
      controller[action](controller.gatherInformations());
    }
  },
  actionDeSelected: function(actionList, record, eOpts)
  {
    var controller = this;
//    console.log("DES record", record);
    var action = record.get('action')["deselected"];
    if (action) {
      controller[action](controller.gatherInformations());
    }
  },
  play: function(data) {
//we should not refer to fileNames, but to media IDs
    //may be moving to mediaplayer is better
    webinosTV.app.connectEvents.notify("playFiles", {source: data.srcIds, targets: data.targetDevices, media: data.mediaItems/*files: fileNames*/});
  },
  pause: function(data) {
    //may be moving to mediaplayer is better
    webinosTV.app.connectEvents.notify("stopFiles", {});
  },
  addToDeviceQueues: function(data) {
    webinosTV.app.connectUi.getQueuesManager().addToDevicesQueue(data.mediaItems, data.targetDevices);
//    console.log("added", data.mediaItems, "to the queues of following devices", data.targetDevices);
  },
  gatherInformations: function() {
    //get files to be played
    var selectedMedia = Ext.getCmp('mediaSelectionColumn').getSelection();
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


});