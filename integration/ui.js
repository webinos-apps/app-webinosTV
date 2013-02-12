var run_ui_connect = function(){

if(typeof webinosTV==="undefined"){
	console.log("error: UI not ready.");
}

webinosTV.updateui = (function(){



  var addTargetDevice = function(id,type,counter,name){
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.add({"id": id, "type": type, "counter": counter,"deviceName":name});
  };
  
  var clearTargetDevices = function(){
    var store = Ext.StoreMgr.get('tmpdispdevstore-id');
    store.clearData();
  };


  return {
    addTargetDevice:addTargetDevice,
    clearTargetDevices:clearTargetDevices
  };
})();


};

