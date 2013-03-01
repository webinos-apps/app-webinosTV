Ext.define('webinosTV.controller.SelectCategoryController', {
  extend: 'Ext.app.Controller',
  xtype: 'selcategctrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    control:{
      mcategory:
      {
        select:'mediaCategorySelected', //event = select, cb = mediaCategorySelected
        deselect:'mediaCategoryDeselected'
      }
    },
    refs: {
      smColumn:'#mediaSelectionColumn',
      mplist: '#mediaPlaylist',
      mcategory: '#mediaCategoryList',
      mtargetdevs: '#targetDevicesList',
      mactions: '#actionsList'
    }
  },
  
  mediaCategoryDeselected:function(mediaCategoryList, record, eOpts){
//     var mplist=this.getMplist();
    var smColumn=this.getSmColumn();
    var mtargetdevs=this.getMtargetdevs();
    var mactions=this.getMactions();
//     mplist.setItems({
//       xtype:'tilepanel',
//       cls:['tile-panel'],
//       text: 'please select a media type...'
//     });
//     mplist.setMasked(true);
//     mplist.setDisabled(false);
    smColumn.setEmptyContent();
    smColumn.setContentMasked(true);
    mtargetdevs.setMasked(true);
    mtargetdevs.setDisabled(false);
    mtargetdevs.deselectAll();
    mactions.setMasked(true);
    mactions.setDisabled(false);
  },

  mediaCategorySelected:function(mediaCategoryList, record, eOpts)
  {
//     var mplist=this.getMplist();
    var smColumn=this.getSmColumn();

//     console.log("mediaCategorySelected",mplist)
//     var mcategoryList=this.getMcategory();
//     console.log("mediaCategorySelected",mcategoryList.getSelectionCount(),record)
//      console.log("selected",record,record.get('mediaCategoryName'),record.get('category'));
    var mediaCategory=record.get('category');
    switch(mediaCategory)
    {
      case 'movies':
//  console.log("selected movies");
    smColumn.showVideos();
    break;
      case 'music':
//  console.log("selected mp3");
    smColumn.showMusic();
    break;
      case 'images':
//  console.log("selected pictures");
    smColumn.showImages();
    break;
      case 'channels':
//  console.log("selected TV");
    smColumn.showTV();
    break;
      case 'apps':
//  console.log("selected Apps");
    smColumn.showApps();
    break;
      case 'docs':
//  console.log("selected Documents");
    smColumn.showDocuments();
    break;
    }
//     mplist.setMasked(false);
//     mplist.setDisabled(true);
  }
});