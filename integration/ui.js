var run_ui_connect = function(){

// if(typeof webinosTV==="undefined"){
// 	console.log("error: UI not ready.");
// }
// 
// webinosTV.updateui = (function(){



  var addTargetDevice = function(id,type,counter,name){
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.add({"id": id, "type": type, "counter": counter,"deviceName":name});
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

  return {
    addTargetDevice:addTargetDevice,
    clearTargetDevices:clearTargetDevices,
    browse:{
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
    }
  };
// })();


};

