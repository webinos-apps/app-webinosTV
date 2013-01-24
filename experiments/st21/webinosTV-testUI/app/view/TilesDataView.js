/**
 * This class represents a single list of tile items
 * The DataViewItem type will be passed when instanciating
 * the class (or in its config file)
 */
Ext.define('webinosTV.view.TilesDataView',{
  extend: 'Ext.DataView',
  xtype: 'tileslist',
  config:{
    useComponents:true,
    allowMultipleSelection:false,
    height:'100%',
    indexSelected:-1,
//     defaultType: 'devicelistitem',
    loadingText: 'Loading list...',
    emptyText: '<div>'+('No items found!').fontcolor('cyan')+'</div>',
    scrollable:{
      direction: 'vertical',
      directionLock: true
    },
    listeners:{
      itemsingletap:{
	fn:function(tileList, index, listItem, record, e, eOpts){
	  if(tileList.getAllowMultipleSelection())
	  {
	    listItem.getSelected() ? listItem.unselect() : listItem.select();
	  }
	  else //select only one at time
	  {
	    var previousIndex=tileList.getIndexSelected();
	    if(previousIndex>-1)
	    {
	      //getAt(1) returns this component container
	      tileList.getAt(1).getAt(previousIndex).unselect();
	    }
	      tileList.setIndexSelected(index);
	      listItem.select();
	  }
	}
      },
      //double tap selects only tapped item and deselects the others (if allowMultipleSelection is true)
      itemdoubletap:{
	fn:function(tileList, index, listItem, record, e, eOpts){
	  if(tileList.getAllowMultipleSelection())
	  {
 	    tileList.getAt(1).getItems().items.forEach(function(titleListItem,itemIndex){
	      itemIndex===index? titleListItem.select():titleListItem.unselect();
	    });
	  }
	}
      }
    }
  }
});