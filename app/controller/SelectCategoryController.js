Ext.define('webinosTV.controller.SelectCategoryController', {
  extend: 'Ext.app.Controller',
  xtype: 'selcategctrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    control: {
      mcategory:
        {
          select: 'mediaCategorySelected', //event = select, cb = mediaCategorySelected
          deselect: 'mediaCategoryDeselected'
        }
    },
    refs: {
      categColumn: '#categoriesColumn',
      smColumn: '#mediaSelectionColumn',
      mplist: '#mediaPlaylist',
      mcategory: '#mediaCategoryList',
      mtargetdevs: '#targetDevicesList',
      mactions: '#actionsList'
    }
  },
  mediaCategoryDeselected: function(mediaCategoryList, record, eOpts) {

//     var mplist=this.getMplist();
    var selectedColumn = this.getCategColumn();
    var header = selectedColumn.query('panel[name=columnheadertext]')[0];
    if (header) {
      header.removeCls('selected-column-header');
    }
    var smColumn = this.getSmColumn();
    var mtargetdevs = this.getMtargetdevs();
    var mactions = this.getMactions();

    smColumn.setEmptyContent();
    smColumn.setContentMasked(true);
    mtargetdevs.setMasked(true);
    mtargetdevs.setDisabled(false);
    mtargetdevs.deselectAll();
    mactions.setMasked(true);
    mactions.setDisabled(false);
  },
  mediaCategorySelected: function(mediaCategoryList, record, eOpts)
  {
    var selectedColumn = this.getCategColumn();
    var header = selectedColumn.query('panel[name=columnheadertext]')[0];
    if (header) {
      header.addCls('selected-column-header');
    }
    var smColumn = this.getSmColumn();

    var mediaCategory = record.get('category');
    switch (mediaCategory)
    {
      case 'video':
//  console.log("selected movies");
        smColumn.showVideos();
        break;
      case 'audio':
//  console.log("selected mp3");
        smColumn.showMusic();
        break;
      case 'image':
//  console.log("selected pictures");
        smColumn.showImages();
        break;
      case 'tvchannel':
//  console.log("selected TV");
        smColumn.showTV();
        break;
      case 'app':
//  console.log("selected Apps");
        smColumn.showApps();
        break;
      case 'doc':
//  console.log("selected Documents");
        smColumn.showDocuments();
        break;
    }
//     mplist.setMasked(false);
//     mplist.setDisabled(true);
  }
});