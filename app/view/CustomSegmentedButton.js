Ext.define('webinosTV.view.CustomSegmentedButton', {
  extend: 'Ext.Container',
  xtype: 'customsegbutton',
  requires: [
    'Ext.Panel'
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
  }
});