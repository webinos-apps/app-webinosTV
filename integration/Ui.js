Ext.define('integration.Ui', {
  requires: [
    'integration.Ui.MediaPlayerManager',
    'integration.Ui.DeviceManager',
    'integration.Ui.UiNavigator',
    'integration.Ui.MediaItemsManager',
    'integration.Ui.QueueManager'
      //'integration.Ui.MediaCategoriesManager',
//    'integration.Ui.ActionsManager'
  ],
  mixins: ['Ext.mixin.Observable'], //can fire or listen to events
  alternateClassName: ['Ui', 'WebinosUi'],
  config: {
    mediaPlayerManager: null,
    sourceDevicesManager: null,
    targetDevicesManager: null,
    uiNavigator: null,
    mediaItemsManager: null,
    queuesManager: null/*
     mediaCategoriesManager: null,

     actionsManager: null*/
  },
  constructor: function(config) {
//    console.warn("CFG", config);
    var cfg = {
      mediaPlayerManager: Ext.create('integration.Ui.MediaPlayerManager', {}),
      sourceDevicesManager: Ext.create('integration.Ui.DeviceManager', {devicesSID: 'devicesstore-id'}),
      //targetDevicesManager: Ext.create('integration.Ui.DeviceManager', {devicesSID: 'devicesstore-id'}), //TODO drop??
      uiNavigator: Ext.create('integration.Ui.UiNavigator', {}),
      mediaItemsManager: Ext.create('integration.Ui.MediaItemsManager', {mediaStoreId: 'mediastore-id'}),
      queuesManager: Ext.create('integration.Ui.QueueManager', {})
        /*,
         mediaCategoriesManager: Ext.create('integration.Ui.MediaCategoriesManager', {}),

         actionsManager: Ext.create('integration.Ui.ActionsManager', {})*/
    };
    this.initConfig(cfg);  // We need to initialize the config options when the class is instantiated
  },
  _bindKey: function(kbEvt) {
    var ui = this;
    var key = kbEvt.keyCode;
    switch (key) {
      case 37://left arrow key
        ui.getUiNavigator().moveLeft();
        break;
      case 40://down arrow key
        ui.getUiNavigator().moveDown();
        break;
      case 39://right arrow key
        ui.getUiNavigator().moveRight();
        break;
      case 38://up arrow key
        ui.getUiNavigator().moveUp();
        break;
      case 13://return
        ui.getUiNavigator().startBrowsing();
        break;
      case 32://space
        ui.getUiNavigator().stopBrowsing();
        break;
      case 83://s key
        ui.getUiNavigator().toggleSelectItem();
        break;
      case 68://d key
        ui.getUiNavigator().deselectItem();
        break;
      default:
        console.warn("Unhandled key", key);
    }
  },
  //Binds keyboard events
  enableKeyboardNavigation: function() {
    var ui = this;
    document.onkeydown = function(event) {
      ui._bindKey(event);
    };
  },
  requestsCache: {}, //outside of config, no getters and setters
  requestDevNameAndType: function(serviceAdr, notifyCB, resultCB) {
    var ui = this;
    if (!ui.requestsCache[serviceAdr]) {
      ui.requestsCache[serviceAdr] = {n: notifyCB, r: resultCB};
    }
    ui.processRequests();
  },
  processRequests: function() {
    var ui = this;
    console.log(Ext.Msg.isHidden());
    if (Ext.Msg.isHidden() !== null && !Ext.Msg.isHidden()) {
      return;
    }
    for (var i in ui.requestsCache) {
      ui._showDialog(i);
    }
  },
  _sendNotification: function(adr) {
    var ui = this;
    if (ui.requestsCache[adr]) {
      console.log(12);
      ui.requestsCache[adr].n();
    }
  },
  _showDialog: function(i) {
    var ui = this;
    Ext.Msg.show({
      title: 'New device detected!',
      html: '<div style="text-align:center; width:100%;">Choose a name <input id="selectedDevName" style="color:black;text-align:center;" type="text" /><br/>and select the type<br/><select style="color:black;text-align:center;"  id="selectedDevType"><option name="phone">phone</option><option name="tablet">tablet</option><option name="pc">pc</option><option name="tv">tv</option><<option name="laptop">laptop</option></select> <br/>Hint: For eased assignment <input type="button" style="color:black;" value="Send" onclick="webinosTV.app.connectUi._sendNotification(\'' + i + '\')"> notification to device.</div>',
      height: "70%",
      minHeight: 400,
      width: "50%",
      scrollable: {
        direction: 'vertical',
        directionLock: true
      },
      fn: function(okBtn) {
        if (Ext.get('selectedDevName').dom.value && Ext.get('selectedDevType').dom.value) {
          console.log(Ext.get('selectedDevName').dom.value);
          console.log(Ext.get('selectedDevType').dom.value);
          ui.requestsCache[i].r({type: Ext.get('selectedDevType').dom.value, name: Ext.get('selectedDevName').dom.value});
          delete ui.requestsCache[i];
        }

      }
    });
  },
  remoteEventsHandler: {
    //WARNING these 2 are dom events, not component events and therefore should
    //be better matched with some component methods!
    //if the method does not yet exist, better implement it than rely
    //on html id!!!
    //singletap( event, node, options, eOpts )
//     elementtap:function(){
//
//     },
//     //doubletap( event, node, options, eOpts )
//     elementdoubletap:function(){
//
//     },

    //TODO map also itemswipe( dataView, index, target, record, e, eOpts ) ? we need to implement listeners as well!
    itemdoubletap: function(dataViewID, index) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap', dataView, index);
    },
    itemsingletap: function(dataViewID, index) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap', dataView, index);
    },
    //itemtap( dataView, index, target, record, e, eOpts )
    itemtap: function(dataViewID, index) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap', dataView, index);
    },
    //record is a way of mapping through Model id: e.g. record could be Ext.create('webinosTV.model.Device',{id:12})
    //but can be also a number as for itemtap
    select: function(dataViewID, record) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('select', dataView, record);
    },
    deselect: function(dataViewID, record) {
      var dataView = Ext.getCmp(dataViewID);
      dataView.fireEvent('deselect', dataView, record);
    }
  }
});