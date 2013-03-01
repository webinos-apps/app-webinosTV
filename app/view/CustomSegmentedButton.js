Ext.define('webinosTV.view.CustomSegmentedButton', {
  extend: 'Ext.Container',
  xtype: 'customsegbutton',
  requires: [
    'Ext.Panel', 'Ext.Video'
  ],
  config:
  {
    currentItem:-1,
    previousItem:-1
  },

  initialize:function(){
    var segButton=this;
    segButton.innerItems.forEach(function(element,index){
      element.setIndex(index);
      element.setListeners(
      {
	tap :{
	  element : 'element',
	  fn:function(event, htmlTarget,options,eOpts) {
	    var panel=this;
	    panel.parent.selectChild(panel.getIndex());
	  }
	}
      });
    });
  },

  selectChild:function(index){
    var segButton=this;
    segButton.setPreviousItem(segButton.getCurrentItem());
    segButton.setCurrentItem(index);
    var prevIndex=segButton.getPreviousItem();
    if(prevIndex>-1)
    {
      segButton.getAt(prevIndex).unselect();
    }
    segButton.getAt(index).select();
    //FIXME: move to controller 
    //alert(index);

    //get files to be played
    var files = Ext.getCmp('mediaPlaylist');
    var fileNames = [];
    files.items.items[2].innerItems[0].dataview.getSelection().forEach(function(e){
      fileNames.push(e.data.file);
    });
    console.log(fileNames);


    //get selected target devices
    var tar = Ext.getCmp('targetDevicesList');
    var targetIds = [];
    tar.getSelection().forEach(function(e){targetIds.push(e.data.id);});
    console.log(targetIds);

    for (var i = 0; targetIds.length > i ; i++) {
     // targetIds
    };
  
  

  }
});

