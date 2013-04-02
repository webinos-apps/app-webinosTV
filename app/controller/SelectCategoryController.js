Ext.define('webinosTV.controller.SelectCategoryController', {
  extend: 'Ext.app.Controller',
  xtype: 'selcategctrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media category
  config: {
    control: {
      categoriesColumn:
        {
          colselect: 'showMediaForSelectedCategory',
          coldeselect: 'setEmptyContent'
        }
    },
    refs: {
      categoriesColumn: '#categoriesColumn',
      selectMediaColumn: '#mediaSelectionColumn'
    }
  },
  showMediaForSelectedCategory: function(categoryColumn, mediaCategoryList, record, eOpts)
  {
    // console.warn("showMediaForSelectedCategory");
    var selectMediaColumn = this.getSelectMediaColumn();

    var mediaCategory = record.get('category');
    switch (mediaCategory)
    {
      case 'video':
//  console.log("selected movies");
        selectMediaColumn.showVideos();
        break;
      case 'audio':
//  console.log("selected mp3");
        selectMediaColumn.showMusic();
        break;
      case 'image':
//  console.log("selected pictures");
        selectMediaColumn.showImages();
        break;
      case 'tvchannel':
//  console.log("selected TV");
        selectMediaColumn.showTV();
        break;
      case 'app':
//  console.log("selected Apps");
        selectMediaColumn.showApps();
        break;
      case 'doc':
//  console.log("selected Documents");
        selectMediaColumn.showDocuments();
        break;
    }
//     mplist.setMasked(false);
//     mplist.setDisabled(true);
    return false;
  },
  setEmptyContent: function() {
    var selectMediaColumn = this.getSelectMediaColumn();
    selectMediaColumn.setEmptyContent();
    return false;
  }

});