/**
 * @class SelectSourceDeviceController
 * This is the controller for the SourceDeviceColumn. It implements a FSM
 * to control the device queue column show/update/hide behavior
 */
Ext.define('webinosTV.controller.largescreen.SelectSourceDeviceController', {
  extend: 'Ext.app.Controller',
  xtype: 'selsourcectrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    qCtrlStatus: 0,
    control: {
      srcDevColumn:
        {
          colselect: 'sourceDeviceSelected',
          itemtap: 'sourceDeviceItemTapped',
          itemsremoved: 'resetFSM'
        }
    },
    refs: {
      srcDevColumn: '#sourceDevicesColumn',
      browserView: '#browserMainView',
      queueColumnView: '#queuecol-id'
    }
  },
  /**
   * @private
   * Actions performed after the device is selected
   * @param {ColumnView} sourceDeviceColumn the source devices columb (list+header)
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   * @param {Object} eOpts event options
   */
  sourceDeviceSelected: function(sourceDeviceColumn, sourceDeviceList, device, eOpts)
  {
//    console.log("SRC DEV ColSELECT");
    var deviceId = device.getDeviceId();
    webinosTV.app.connectEvents.notify("scanForFiles", {serviceAdr: deviceId});
  },
  /**
   * @private
   * Handler for the SourceDevicesDataView itemtap event
   * Uses some DOM black magic to distinguish which list panel was tapped
   * then triggers the FSM
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Number} index the selected item index
   * @param {SourceDeviceDataViewItem} sourceDeviceDataviewItem the selected source device item
   * @param {Device} device the involved device
   * @param {Ext.event} event details
   * @param {Object} eOpts event options
   */
  sourceDeviceItemTapped: function(sourceDeviceList, index, sourceDeviceDataviewItem, device, event, eOpts) {
    //console.log("ItemSingleTap: sourceDeviceList:", sourceDeviceList.$className, sourceDeviceList.getId());
    //console.log("Target =", sourceDeviceDataviewItem, sourceDeviceDataviewItem.getId(), sourceDeviceDataviewItem.$className, "--- index=", index);
    //console.log("Device name =", device.getName(), " queue length =", device.getCounter());

    //DOM Black magic
    var qPanelEl = Ext.get(event.target.id).up('.queuepanel');
//    var dPanelEl = Ext.get(event.target.id).up('.devicepanel');
    //var panelElem = qPanelEl === null ? dPanelEl : qPanelEl;
    var tapType = qPanelEl === null ? 'D' : 'Q';

    //console.log(/*"DOM ELEM touched:", panelElem,*/"itemsingletap: tap type is", tapType, "STATUS", this.getQCtrlStatus());
    this._gotoNextStatus(tapType, sourceDeviceList, device);
    return false;
  },
  /**
   *
   */
  resetFSM: function(store, devices, indices, eOpts) {
//    console.warn("Devices removed", devices);
    var controller = this;
    if (controller.getQCtrlStatus() !== 0) {
      var sourceDeviceList = controller.getSrcDevColumn().query('#sourceDeviceList')[0];
      for (var i = 0; i < devices.length; i++) {
//        console.log("DV", devices[i].getId(), "is sel", sourceDeviceList.isSelected(devices[i]));
        if (sourceDeviceList.isSelected(devices[i])) //if it is in current selection
        {
          controller._hideDeviceQueueColumn();
          controller._setStatus0(sourceDeviceList);
        }
      }
    }
    return false;
  },
  /**
   * @private
   * Go to next status of this controller FSM
   * @param {string} tapEventType is 'Q' if originated from the Q panel, 'D' else
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   */
  _gotoNextStatus: function(tapEventType, sourceDeviceList, device) {
    var controller = this;
    var currentStatus = controller.getQCtrlStatus();
    var queueColumn = controller.getQueueColumnView();
    var currentDeviceId = queueColumn.getDevice() === null ? -1 : queueColumn.getDevice().getId();

    switch (currentStatus) {
      case 0:
        if (tapEventType === 'Q' && device.getCounter() > 0) {
          //Goto 2
          controller._setStatus2(sourceDeviceList, device);
        }
        else {
          //Goto 1
          controller._setStatus1(sourceDeviceList/*, device*/);
        }
        break;
      case 1:
        if (tapEventType === 'Q' && device.getCounter() > 0) {
          //Goto 2
          controller._setStatus2(sourceDeviceList, device);
        }
        else {
          //Goto 0
          controller._setStatus0(sourceDeviceList/*, device*/);
        }
        break;
      case 2:
        //Same device ID or counter ===0 -         if (tapEventType === 'Q' && (device.getId() === currentDevice.getId() || device.getCounter() === 0))
        if (device.getCounter() === 0 || (device.getCounter() > 0 && tapEventType === 'Q' && device.getId() === currentDeviceId)) {
          //Goto 3
          controller._setStatus3(sourceDeviceList/*, device*/);
        }
        else {
          //STAY in 2 (probably updating)
          controller._setStatus2(sourceDeviceList, device);
        }
        break;
      case 3:
        if (tapEventType === 'Q' && device.getCounter() > 0) {
          //Goto 2
          controller._setStatus2(sourceDeviceList, device);
        }
        else {
          //Goto 0
          controller._setStatus0(sourceDeviceList/*, device*/);
        }
        break;
    }
//    console.log("NextStatus", controller.getQCtrlStatus(), "\n------------------------------------------------------------------------------------------------\n");
  },
  /**
   * @private
   * sets status 0 of the FSM
   * item is deselected, deselection is allowed, queue columns is hidden
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   */
  _setStatus0: function(sourceDeviceList/*, device*/) {
    sourceDeviceList.setAllowDeselect(true);
//    sourceDeviceList.setWillAllowDeselection(false);
//    sourceDeviceList.setShowingDeviceQueueColumn(false);
    this.setQCtrlStatus(0);
  },
  /**
   * @private
   * sets status 1 of the FSM
   * item is selected, deselection is allowed, queue columns is hidden
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   */
  _setStatus1: function(sourceDeviceList/*, device*/) {
    sourceDeviceList.setAllowDeselect(true);
//    sourceDeviceList.setWillAllowDeselection(false);
//    sourceDeviceList.setShowingDeviceQueueColumn(false);
    this.setQCtrlStatus(1);
  },
  /**
   * @private
   * sets status 2 of the FSM
   *  item is selected, deselection is allowed, queue columns is shown
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   */
  _setStatus2: function(sourceDeviceList, device) {
    sourceDeviceList.setAllowDeselect(false);
//    sourceDeviceList.setWillAllowDeselection(false);
//    sourceDeviceList.setShowingDeviceQueueColumn(true);
    this._showDeviceQueueColumn(sourceDeviceList, device);
    this.setQCtrlStatus(2);
  },
  /**
   * @private
   * sets status 3 of the FSM
   * item is selected, deselection is allowed, queue columns is hidden
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   */
  _setStatus3: function(sourceDeviceList/*, device*/) {
    sourceDeviceList.setAllowDeselect(false);
//    sourceDeviceList.setWillAllowDeselection(true);
//    sourceDeviceList.setShowingDeviceQueueColumn(false);
    this._hideDeviceQueueColumn();
    this.setQCtrlStatus(3);
  },
  /**
   * Shows or updates the device queue column
   * @param {SourceDevicesDataView} sourceDeviceList the source devices list
   * @param {Device} device the involved device
   */
  _showDeviceQueueColumn: function(sourceDeviceList, device) {
    var queueColumn = this.getQueueColumnView();
    //SHOW
    if (queueColumn.getHidden() === true)
    {
      queueColumn.setDevice(device);
      queueColumn.setHidden(false);
    }
    else//Update or do nothing
    {
      var currentDeviceId = queueColumn.getDevice() === null ? -1 : queueColumn.getDevice().getId();
      if (device.getId() !== currentDeviceId) {
        queueColumn.setDevice(device);
      }
    }
  },
  /**
   * Hides the device queue column
   */
  _hideDeviceQueueColumn: function() {
    var queueColumn = this.getQueueColumnView();
    queueColumn.setDevice(null);// in the hide handler
    queueColumn.setHidden(true);
  }
});