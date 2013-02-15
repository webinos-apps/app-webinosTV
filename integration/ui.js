// var run_ui_connect = 
function run_ui_connect(){

// if(typeof webinosTV==="undefined"){
// 	console.log("error: UI not ready.");
// }
// 
// webinosTV.updateui = (function(){


   var addQueue = function(){};
   var updateQueue = function(){};
   var addQueues = function(){};
   var removeQueue = function(){};
   var clearQueues = function(){};

   var addFileItem = function(){};
   var addFileItems = function(){};
   var removeFileItem = function(){};
   var clearFileItems = function(){};

   var addCategory = function(){};
   var addCategories = function(){};
   var removeCategory = function(){};
   var clearCategories = function(){};

   var addSourceDevice= function(id,type,counter,name){
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.add({"id": id, "type": type, "counter": counter,"deviceName":name});
   };
   var updateSourceDevice= function(id,counter){
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    //TODO: update the model, to reflect counter change
   };
   var addSourceDevices=function(devices){
      for(var i in devices){
        if(device[i].id && device[i].type && device[i].name ){
          addTargetDevice(device[i].id,device[i].type,device[i].counter,device[i].name);
        }
      }
   };
   var removeSourceDevice=function(id){
        var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
        store.remove(Ext.create('webinosTV.model.Device',{id:id}));
   };
   var clearSourceDevices = function(){
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.clearData();
   };

   var addTargetDevice= function(id,type,counter,name){
    var store = Ext.StoreMgr.get('tmpsrcdevstore-id');
    store.add({"id": id, "type": type, "counter": counter,"deviceName":name});
   };
   var addTargetDevices=function(devices){
      for(var i in devices){
        if(device[i].id && device[i].type && device[i].name ){
          addTargetDevice(device[i].id,device[i].type,device[i].counter,device[i].name);
        }
      }
   };
   var removeTargetDevice=function(id){
        var store = Ext.StoreMgr.get('tmpdispdevstore-id');
        store.remove(Ext.create('webinosTV.model.Device',{id:id}));
   };
   var clearTargetDevices = function(){
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.clearData();
   };

  //Navigation
  var addTargetDevice = function(id,type,counter,name){
        var store = Ext.StoreMgr.get('tmpdispdevstore-id');
        store.add({"id": id, "type": type, "counter": counter,"deviceName":name});
      };
      
      var clearTargetDevices = function(){
        var store = Ext.StoreMgr.get('tmpdispdevstore-id');
        store.clearData();
      };
      
  var browse={
      browserView:'browserMainView',
      columns:['sourceDeviceList','mediaCategoryList','mediaPlaylist','targetDevicesList','playQueueSegmBtn'],
      lastVisitedColumnId:null,
      leftRightIndex:-1,
      upDownIndex:-1,
      startBrowsing:function(){
        var bw=Ext.get('browserView');
        var startCmp=Ext.getCmp(this.columns[0]);
        console.log("Started ok",startCmp.getCls());
        startCmp.setCls(["nav-selected","phone-listview-indicator"]);
        this.lastVisitedColumnId=this.columns[0];
        this.leftRightIndex++;
      },
      stopBrowsing:function(){
        if(this.lastVisitedColumnId)
        {
          var currCmp=Ext.getCmp(this.lastVisitedColumnId);
          currCmp.removeCls("nav-selected");

          this.lastVisitedColumnId=null;
          this.leftRightIndex=-1;
          this.upDownIndex=-1;
          console.log("STOP BROWSING");
        }
      },
      moveLeft:function(){
        var index=this.leftRightIndex;
        if(index>0)
        {
          this.cleanRowsNavigation();
          var currCmp=Ext.getCmp(this.lastVisitedColumnId);
          currCmp.removeCls("nav-selected");
          
          this.leftRightIndex--;
          index=this.leftRightIndex;
          var nextCmp=Ext.getCmp(this.columns[index]);
          nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
          this.lastVisitedColumnId=this.columns[index];
          console.log("Move LEFT");
        }
      },
      moveRight:function(){
        var index=this.leftRightIndex;
        if(index<this.columns.length)
        {
          this.cleanRowsNavigation();
          var currCmp=Ext.getCmp(this.lastVisitedColumnId);
          currCmp.removeCls("nav-selected");

          this.leftRightIndex++;
          index=this.leftRightIndex;
          var nextCmp=Ext.getCmp(this.columns[index]);
          nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
          this.lastVisitedColumnId=this.columns[index];
          console.log("Move RIGHT");
        }
      },
      moveUp:function(){
        var lrIndex=this.leftRightIndex;
        var index=this.upDownIndex===-1 ? 0 :this.upDownIndex;
        if(lrIndex<this.columns.length)
        {
          var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
          var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView") ? currColumnCmp.getStore().getCount():0; //TODO find a clean way to browse in columns 3 and 5
          if(index < numberOfRows)
          {
            var currCmp=currColumnCmp.getItemAt(index);
            currCmp.removeCls("nav-selected");
            this.upDownIndex--;
            index=this.upDownIndex;
            if(index>-1)
            {
              var nextCmp=currColumnCmp.getItemAt(index);
              nextCmp.addCls(["nav-selected"]);
            }
            console.log("Move UP to",index);
          }
        }
      },
      moveDown:function(){
        var lrIndex=this.leftRightIndex;
        var index=this.upDownIndex===-1 ? 0 :this.upDownIndex;
        if(lrIndex<this.columns.length)
        {
          var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
          var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView") ? currColumnCmp.getStore().getCount():0; //TODO find a clean way to browse in columns 3 and 5
          if(index < numberOfRows-1)
          {
            if(index>-1)
            {
              var currCmp=currColumnCmp.getItemAt(index);
              currCmp.removeCls("nav-selected");
            }
            this.upDownIndex++;
            index=this.upDownIndex;
            var nextCmp=currColumnCmp.getItemAt(index);
            nextCmp.addCls(["nav-selected"]);
            console.log("Move DOWN to",index);
          }
        }
      },//remove border from rows components
      cleanRowsNavigation:function(){
        var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
        var index=this.upDownIndex;
        if(index>-1 && currColumnCmp.$className === "webinosTV.view.TilesDataView")
        {
          var currCmp=currColumnCmp.getItemAt(index);
          currCmp.removeCls("nav-selected");
          this.upDownIndex=-1;
        }
      }
  };

  //TODO: move somewhere else, respecting the architecture
  //TODO: keys shall be bound only for the PC profile
  var bindKey=function(evt)
  {
    var key = evt.keyCode;
    switch(key){
      case 37://left arrow key
        browse.moveLeft();
        break;
      case 40://down arrow key
        browse.moveDown();
        break;
      case 39://right arrow key
        browse.moveRight();
        break;
      case 38://up arrow key
        browse.moveUp();
        break;
      case 13://return
        browse.startBrowsing()
        break;
      case 32://space
        browse.stopBrowsing()
        break;
//           case 83://s key TODO also S
//             browse.toggleSelect() //TODO select and deselect or toggle?
//             break;
      default:
        console.log("Unhandled key",key);
    }
  };
  document.onkeydown = bindKey;

  
  var remoteEvents={
    //WARNING these 2 are dom events, not component events and therefore should
    //be better matched with some component methods!
    //if the method does not yet exist, better implement it than rely
    //on html id!!!
    //singletap( event, node, options, eOpts )
//     elementtap:function(){
//       
//     },
//     //doubletap( event, node, options, eOpts )
//     elementdoubletap:function(){
//       
//     },
    
    //TODO map also itemswipe( dataView, index, target, record, e, eOpts ) ? we need to implement listeners as well!
    itemdoubletap:function(dataViewID,index){
      var dataView=Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap',dataView,index);
    },
    itemsingletap:function(dataViewID,index){
      var dataView=Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap',dataView,index);
    },
    //itemtap( dataView, index, target, record, e, eOpts )
    itemtap:function(dataViewID,index){
      var dataView=Ext.getCmp(dataViewID);
      dataView.fireEvent('itemtap',dataView,index);
    },
    //record is a way of mapping through Model id: e.g. record could be Ext.create('webinosTV.model.Device',{id:12})
    //but can be also a number as for itemtap
    select:function(dataViewID,record){
      var dataView=Ext.getCmp(dataViewID);
      dataView.fireEvent('select',dataView,record);
    },
    deselect:function(dataViewID,record){
      var dataView=Ext.getCmp(dataViewID);
      dataView.fireEvent('deselect',dataView,record);
    }
  };

  /* interface */
  return {

    addQueue:addQueue,
    addQueues:addQueues,
    updateQueue:updateQueue,
    removeQueue:removeQueue,
    clearQueues:clearQueues,

    addFileItem:addFileItem,
    addFileItems:addFileItems,
    removeFileItem:removeFileItem,
    clearFileItems:clearFileItems,

    addCategory:addCategory,
    addCategories:addCategories,
    removeCategory:removeCategory,
    clearCategories:clearCategories,

    addSourceDevice:addSourceDevice,
    updateSourceDevice:updateSourceDevice,
    addSourceDevices:addSourceDevices,
    removeSourceDevice:removeSourceDevice,
    clearSourceDevices:clearSourceDevices,

    addTargetDevice:addTargetDevice,
    addTargetDevices:addTargetDevices,
    removeTargetDevice:removeTargetDevice,
    clearTargetDevices:clearTargetDevices,
    
    //TODO find a smarter name
    remoteEvents:remoteEvents,

    browse:browse
  };
// })();


};

