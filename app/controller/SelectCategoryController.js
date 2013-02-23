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
      mplist: '#mediaPlaylist',
      mcategory: '#mediaCategoryList'
    }
  },
  
  mediaCategoryDeselected:function(mediaCategoryList, record, eOpts){
    var mplist=this.getMplist();
    mplist.setItems({
      xtype:'tilepanel',
      cls:['tile-panel'],
      text: 'please select a media type...'
    });
    mplist.setMasked(true);
    mplist.setDisabled(false);
  },

  mediaCategorySelected:function(mediaCategoryList, record, eOpts)
  {
    var mplist=this.getMplist();
//     console.log("mediaCategorySelected",mplist)
//     var mcategoryList=this.getMcategory();
//     console.log("mediaCategorySelected",mcategoryList.getSelectionCount(),record)
//      console.log("selected",record,record.get('mediaCategoryName'),record.get('category'));
    var mediaCategory=record.get('category');
    switch(mediaCategory)
    {
      case 'movies':
//  console.log("selected movies");
    mplist.showVideos();
    break;
      case 'music':
//  console.log("selected mp3");
    mplist.showMusic();
    break;
      case 'images':
//  console.log("selected pictures");
    mplist.showImages();
    break;
      case 'channels':
//  console.log("selected TV");
    mplist.showTV();
    break;
      case 'apps':
//  console.log("selected Apps");
    mplist.showApps();
    break;
      case 'docs':
//  console.log("selected Documents");
    mplist.showDocuments();
    break;
    }
    mplist.setMasked(false);
    mplist.setDisabled(true);
  }
});