var run_ui_connect = function(){

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
  var moveLeft=function(){
//     var bw=Ext.get('browserView');
//     /*console.log("MoveLeft"*/,this);
    var index=this.leftRightIndex;
    if(index>0)
    {
      var currCmp=Ext.getCmp(this.lastVisitedColumnId);
      currCmp.removeCls("nav-selected");
      
      this.leftRightIndex--;
      var nextCmp=Ext.getCmp(this.columns[index]);
      nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
      this.lastVisitedColumnId=this.columns[index];
      console.log("MoveLeft")
    }
  };
  
  var moveRight=function(){
//     var bw=Ext.get('browserView');
//     console.log("MoveRight");
    var index=this.leftRightIndex;
    if(index<this.columns.length)
    {
      var currCmp=Ext.getCmp(this.lastVisitedColumnId);
      currCmp.removeCls("nav-selected");

      this.leftRightIndex++;
      var nextCmp=Ext.getCmp(this.columns[index]);
      nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
      this.lastVisitedColumnId=this.columns[index];
      console.log("MoveRight");
    }
  };
  
  var moveUp=function(){
    var bw=Ext.get('browserView');
    console.log("MU",this);
  };
  
  var moveDown=function(){
    var bw=Ext.get('browserView');
    console.log("MD",this);
   
  };
  
  var startBrowsing=function(){
    var bw=Ext.get('browserView');
    var startCmp=Ext.getCmp(this.columns[0]);
    console.log("Started ok",startCmp.getCls());
    startCmp.setCls(["nav-selected","phone-listview-indicator"]);
    this.lastVisitedColumnId=this.columns[0];
    this.leftRightIndex++;
  };

  var browse = {
      browserView:'browserMainView',
      columns:['sourceDeviceList','mediaCategoryList','mediaPlaylist','targetDevicesList','playQueueSegmBtn'],
      lastVisitedColumnId:null,
      leftRightIndex:-1,
      upDownIndex:-1,
      start:startBrowsing,
      moveLeft:moveLeft,
      moveRight:moveRight,
      moveUp:moveUp,
      moveDown:moveDown
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

    browse:browse
  };
// })();


};

