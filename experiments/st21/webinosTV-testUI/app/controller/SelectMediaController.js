Ext.define('webinosTV.controller.SelectMediaController', {
  extend: 'Ext.app.Controller',
  xtype: 'selmediactrl',
//   requires:[''],

  //TODO this controller should change shape depending on the selected media type
  config: {
    control:{
      mtype:
      {
	select:'mediaTypeSelected' //event = select, cb = mediaTypeSelected
      }
    },
    refs: {
      mplist: '#selectMedia',
      mtype: '#mediaTypeList'
    }
  },

  mediaTypeSelected:function(mediaTypeList, record, eOpts)
  {
    var mplist=this.getMplist();
//     console.log("selected",record,record.get('mediaTypeName'),record.get('type'));
    var mediaType=record.get('type');
    switch(mediaType)
    {
      case 'movies':
// 	console.log("selected movies");
	mplist.showVideos();
	break;
      case 'music':
// 	console.log("selected mp3");
	mplist.showMusic();
	break;
      case 'images':
// 	console.log("selected pictures");
	mplist.showImages();
	break;
      case 'channels':
// 	console.log("selected TV");
	mplist.showTV();
	break;
      case 'apps':
// 	console.log("selected Apps");
	mplist.showApps();
	break;
      case 'docs':
// 	console.log("selected Documents");
	mplist.showDocuments();
	break;
    }
  }
});