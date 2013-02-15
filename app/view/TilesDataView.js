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
//     allowMultipleSelection:false, //See Mode
    height:'100%',
//     indexSelected:-1, //useless
//     defaultType: 'devicelistitem',
    loadingText: 'Loading list...',
    emptyText: '<div>'+('No items found!').fontcolor('cyan')+'</div>',
    scrollable:{
      direction: 'vertical',
      directionLock: true
    },
    mode:'SINGLE',
    allowDeselect: true,
    itemCls:'tile-panel',
    selectedCls:'tile-panel-selected',
    pressedDelay:300,
    pressedCls:'tile-panel-pressed',
    listeners:{
      itemdoubletap:{
        fn:function(tileList, index, listItem, record, e, eOpts){
          if(tileList.getMode()==='MULTI'){
//             tileList.deselectAll();
            tileList.select(index);
          }
        }
      }
    }
/*    listeners:{
      itemsingletap:{
        fn:this.onItemSingleTap,
        scope: this
          },
          //double tap selects only tapped item and deselects the others (if allowMultipleSelection is true)
      itemdoubletap:{
        fn:function(tileList, index, listItem, record, e, eOpts){
//           if(tileList.getAllowMultipleSelection())
//           {
//             tileList.getAt(1).getItems().items.forEach(function(titleListItem,itemIndex){
//               itemIndex===index? titleListItem.select():titleListItem.unselect();
//             });
//             tileList.deselectAll();
//           }
        }
      }
    }*/
  },
  
//   select: function(records, keepExisting, suppressEvent) {
// /*    
//     var me = this,
//       record;
// var r =me.getSelection()
// if(r.length)
//   console.log(r[0].select)
//     if (me.getDisableSelection()) {
//       return;
//     }
// 
//     if (typeof records === "number") {
//       records = [me.getStore().getAt(records)];
//     }
// 
//     if (!records) {
//       return;
//     }*/
// 
//     if (me.getMode() == "SINGLE" && records) {
//       record = records.length ? records[0] : records;
//       me.doSingleSelect(record, suppressEvent);
//     } else {
//       me.doMultiSelect(records, keepExisting, suppressEvent);
//     }
//   },
//   
//   deselect:function(records, suppressEvent){
//     var tileList=this;
// //     tileList.superclass.deselect(records, suppressEvent);
//     console.log("DESelected")
//   },

//   onItemSingleTap:function(tl, listItem,index/* , record, e, eOpts*/){
//     var tileList=this;
// //     console.log(this.superclass)
//   }
  
});