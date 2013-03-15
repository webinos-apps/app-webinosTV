Ext.define('webinosTV.controller.SelectSourceDeviceController', {
  extend: 'Ext.app.Controller',
  xtype: 'selsourcectrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    control: {
      sdevList:
        {
          select: 'sourceDeviceSelected', //event = select, cb = mediaCategorySelected
          deselect: 'sourceDeviceDeselected',
          queueitemtapped: 'toggleSourceDeviceQueueColumn'
        }
    },
    refs: {
//       mplist: '#selectMedia',
      srcDevColumn: '#sourceDevicesColumn',
      mcategory: '#mediaCategoryList',
      sdevList: '#sourceDeviceList',
      mtargetdevs: '#targetDevicesList',
      mactions: '#actionsList'
    }
  },
  sourceDeviceSelected: function(sourceDeviceList, device, eOpts)
  {
    //console.log("SRC SELECT");
    var mcategory = this.getMcategory();
    var srcDevColumn = this.getSrcDevColumn();
    var header = srcDevColumn.query('container[name=columnheadertext]')[0];
    if (header) {
      header.addCls('selected-column-header');
    }
    mcategory.setMasked(false);
    mcategory.setDisabled(false);
    mcategory.setDisableSelection(false);

    var deviceId = device.getDeviceId();

    //check whether the q column is shown
    var browserView = Ext.getCmp('browserMainView');
    if (browserView.getCurrentSourceDeviceQueue()) {
      if (deviceId !== browserView.getCurrentSourceDeviceQueue())
      {
        this.updateSourceDeviceQueueColumn(browserView, device, deviceId);
      }
    }
    webinosTV.app.connectEvents.notify("scanForFiles", {serviceAdr: deviceId});
  },
  sourceDeviceDeselected: function(sourceDeviceList, device, eOpts)
  {
//    console.log("SRC DESELECT");
    var mcategory = this.getMcategory();
    var srcDevColumn = this.getSrcDevColumn();
    var header = srcDevColumn.query('container[name=columnheadertext]')[0];
    if (header) {
      header.removeCls('selected-column-header');
    }
    var sdevList = this.getSdevList();
    var mtargetdevs = this.getMtargetdevs();
    var mactions = this.getMactions();

    var deviceId = device.getDeviceId();
    var browserView = Ext.getCmp('browserMainView');
    if (browserView.getCurrentSourceDeviceQueue() === deviceId) {
      this.hideSourceDeviceQueueColumn(browserView);
    }

//     console.log("Count",sdevList.getSelectionCount());
    if (sdevList.getSelectionCount() === 0)
    {
      mcategory.deselectAll(false);
      mcategory.setMasked(true);
      mcategory.setDisabled(true);
      mcategory.setDisableSelection(true);
      mtargetdevs.setMasked(true);
      mtargetdevs.setDisabled(false);
      mactions.setMasked(true);
      mactions.setDisabled(false);
    }
  },
  /**
   * @private
   * Toggle device queue column
   * @param {BrowserView} browserView application main view
   * @param {TilesDataView} soureceDeviceList the source devices list
   * @param {Device} record the record involved
   * @param {Object} eOpts event options

   */
  toggleSourceDeviceQueueColumn: function(browserView, sourceDeviceList, device, eOpts) {
    var deviceId = device.getDeviceId();
    var deviceSelected = sourceDeviceList.isSelected(device);
    var bvCurrDeviceId = browserView.getCurrentSourceDeviceQueue();

    //console.warn("Toggle Q combination: current", bvCurrDeviceId, "tapped", deviceId, deviceSelected);

    var ctrl = this;
    switch (bvCurrDeviceId)
    {
      case null: //SHOW
        {
          if (device.getCounter() !== 0) {
            if (deviceSelected) {
              sourceDeviceList.setDisableSelection(true); //otherwise gets deselected
            }
            else
            {
              sourceDeviceList.setDisableSelection(false); //otherwise gets deselected
            }
            ctrl.showSourceDeviceQueueColumn(browserView, device, deviceId);
          }
        }
        break;
      case deviceId: //HIDE
        {
          if (deviceSelected) {
            sourceDeviceList.setDisableSelection(false); //clean
          }//not selected should never happen
          ctrl.hideSourceDeviceQueueColumn(browserView);
        }
        break;
      default: //UPDATE
        {
          if (device.getCounter() !== 0)
          {
            if (!deviceSelected)
            {
              sourceDeviceList.setDisableSelection(false); //clean
            }//selected should never happen
            ctrl.updateSourceDeviceQueueColumn(browserView, device, deviceId);
          }
          else //hide
          {
            sourceDeviceList.setDisableSelection(false);
            ctrl.hideSourceDeviceQueueColumn(browserView);
          }
        }
    }
  },
  /**
   * @private
   * Shows the device queue column
   * @param {BrowserView} browserView application main view
   * @param {Device} device the record involved
   * @param {string} deviceId id

   */
  showSourceDeviceQueueColumn: function(browserView, device, deviceId) {
    //console.log("SHOW Q for", device.getName(), deviceId);
    browserView.setCurrentSourceDeviceQueue(deviceId);
    browserView.insert(0, {
      xtype: 'devqueuecol',
      id: 'queuecol-id',
      device: device
    });
  },
  /**
   * @private
   * Updates the device queue column
   * @param {BrowserView} browserView application main view
   * @param {Device} device the record involved
   * @param {string} deviceId id
   */
  updateSourceDeviceQueueColumn: function(browserView, device, deviceId) {
    // console.log("UPDATE Q for", device.getName(), deviceId);
    browserView.setCurrentSourceDeviceQueue(deviceId);
    var qCol = Ext.getCmp('queuecol-id');
    qCol.setDevice(device);
  },
  /**
   * @private
   * removes the device queue column
   * @param {BrowserView} browserView application main view
   */
  hideSourceDeviceQueueColumn: function(browserView) {
    //   console.log("HIDE ");
    browserView.setCurrentSourceDeviceQueue(null);
    var qc = Ext.getCmp('queuecol-id');
    qc.destroy();
  }
});