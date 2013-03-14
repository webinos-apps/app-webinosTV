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
          deselect: 'sourceDeviceDeselected'
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
  sourceDeviceSelected: function(sourceDeviceList, record, eOpts)
  {
    var mcategory = this.getMcategory();
//     console.log(mcategory.getDisabled());
    var srcDevColumn = this.getSrcDevColumn();
    srcDevColumn.getAt(0).addCls('selected-column-header');
//    console.log("srcDevColumn", srcDevColumn)

    mcategory.setMasked(false);
    mcategory.setDisabled(false);
    mcategory.setDisableSelection(false);
//     console.log("mcategory.getDisabled()",mcategory.getDisabled());
//    console.log(record);
    webinosTV.app.connectEvents.notify("scanForFiles", {serviceAdr: record.data.id});

  },
  sourceDeviceDeselected: function(sourceDeviceList, record, eOpts)
  {
    var mcategory = this.getMcategory();
    var srcDevColumn = this.getSrcDevColumn();
    srcDevColumn.getAt(0).removeCls('selected-column-header');

    var sdevList = this.getSdevList();
    var mtargetdevs = this.getMtargetdevs();
    var mactions = this.getMactions();
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
  }
});