// var run_ui_connect = 
function run_ui_connect(){

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
   
  //example: addActionButton(3,'tv','Watch',function(){alert("Video killed radio all stars");}})
  var addActionButton = function(id,icon, text,actionCB){
    var actionColumnList=Ext.getCmp('actionsList');
    actionColumnList.addNewRecord({id:id,icon:icon, text:text,action:actionCB});
  };
  var addActionButtons = function(){};
  var removeActionButton = function(){};
  var clearActionButtons = function(){};

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
   
  //Play Media
  var showModalVideo=function(/*url,posterUrl*/){
    var videoPlayer = Ext.create('webinosTV.view.VideoPlayerView'/*,{url:url,posterUrl:posterUrl}*/);
    Ext.Viewport.add(videoPlayer);
    return videoPlayer;
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
      browserView:'browserMainView',//TODO use columns!!!
      columns:['sourceDeviceList','mediaCategoryList','mediaPlaylist','targetDevicesList','actionsList'],
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
          nextCmp.addCls(["nav-selected","phone-listview-indicator"]);
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
          nextCmp.addCls(["nav-selected","phone-listview-indicator"]);
          this.lastVisitedColumnId=this.columns[index];
          console.log("Move RIGHT");
        }
      },
      moveUp:function(){
        var lrIndex=this.leftRightIndex;
        var index=this.upDownIndex===-1 ? 0 :this.upDownIndex;
        var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
        if(lrIndex<this.columns.length && currColumnCmp)
        {
          var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id==='mediaPlaylist') ? currColumnCmp.getStore().getCount():0; //TODO find a clean way to browse in columns 3 and 5
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
        var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
        if(lrIndex<this.columns.length && currColumnCmp)
        {
          var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id==='mediaPlaylist') ? currColumnCmp.getStore().getCount():0; //TODO find a clean way to browse in columns 3 and 5
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
        if(this.lastVisitedColumnId){
          var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
          var index=this.upDownIndex;
          if(index>-1 && (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id==='mediaPlaylist'))
          {
            var currCmp=currColumnCmp.getItemAt(index);
            currCmp.removeCls("nav-selected");
            this.upDownIndex=-1;
          }
        }
      },
      //toggle item selected/deselected
      toggleSelectItem:function(){
        var lrIndex=this.leftRightIndex;
        var index=this.upDownIndex===-1 ? 0 :this.upDownIndex;
        if(lrIndex<this.columns.length)
        {
          var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
          var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id==='mediaPlaylist') ? currColumnCmp.getStore().getCount():0; //TODO find a clean way to browse in columns 3 and 5
          var isVisible=currColumnCmp.getMasked().getHidden(); //false if the column is masked
          if(index < numberOfRows && isVisible)
          {
            if(index>-1)
            {
              var currCmp=currColumnCmp.getItemAt(index);
              var record=currCmp.getRecord();
              var isSelected=currColumnCmp.isSelected(record);
              if(isSelected)
              {
                currColumnCmp.deselect(record);
              }
              else
              {
                currColumnCmp.select(record,true);
              }
            }
          }
        }
      },
      /**
       * position on a column and optionally on one items
       * @param columnId a valid column id
       * @param recordId a valid record id - if it is an array, only the last element is considered
       */
      moveTo:function(columnId,recordId){
        var bw=Ext.get('browserView');
        var index = this.columns.indexOf(columnId);
        console.log("GoTo",columnId,index);
        if(index>-1)
        {
          var destinationColumn=Ext.getCmp(columnId);
          var isVisible=destinationColumn.getMasked().getHidden(); //false if the column is masked
          if(isVisible)
          {
            //clean nav status
            this.cleanRowsNavigation();
            if(this.lastVisitedColumnId){
              var currCmp=Ext.getCmp(this.lastVisitedColumnId);
              currCmp.removeCls("nav-selected");
            }

            this.lastVisitedColumnId=columnId;
            destinationColumn.addCls(["nav-selected","phone-listview-indicator"]);
            if(recordId && (destinationColumn.$className==="webinosTV.view.TilesDataView" || destinationColumn.id==='mediaPlaylist'))
            {
              var destinationRowIndex=-1;
              var _recordId;
              if(recordId instanceof Array) //multiple
              {
                _recordId=recordId[recordId.length-1];
              }
              else
              {
                _recordId=recordId;
              }
              
              var indexes=destinationColumn.getViewItems().filter(function(dataViewItem,index,array){
//                 console.log("FILTH ",dataViewItem.get('record'),recordId)
                return dataViewItem.get('record').internalId===recordId;
              });
              var viewItemIndex = destinationColumn.getItemIndex(indexes.pop());
              if(typeof viewItemIndex === 'number'){
                if(this.upDownIndex>-1)
                {
                  var currItem=destinationColumn.getItemAt(this.upDownIndex);
                  currItem.removeCls("nav-selected");
                }
                this.upDownIndex=viewItemIndex;
                var destinationItem=destinationColumn.getItemAt(this.upDownIndex);
                destinationItem.addCls(["nav-selected"]);
              }
            }
          }
        }
      },
      /**
       * select an item in a column
       * if a column is not valid or disabled (masked) do nothing
       * @param columnId a valid column id
       * @param recordId a valid record id
       */
      selectAt:function(columnId,recordId){
        var bw=Ext.get('browserView');
        var index = this.columns.indexOf(columnId);
        console.log("Select At",columnId,index);
        if(recordId && index>-1)
        {
          var destinationColumn=Ext.getCmp(columnId);
          var isVisible=destinationColumn.getMasked().getHidden(); //false if the column is masked
          if(isVisible)
          {
            if(destinationColumn.$className==="webinosTV.view.TilesDataView" || destinationColumn.id==='mediaPlaylist')
            {
              var modelClassName= destinationColumn.getStore().getModel().$className;
              console.log("modelClassName",modelClassName)
              var selection;
              if(recordId instanceof Array) //multiple
              {
                var length=recordId.length;
                selection= new Array(length);
                for (var i=0; i<length; i++)
                {
                  selection[i]=Ext.create(modelClassName,{id:recordId[i]});
                }
              }
              else //single
              {
                selection=Ext.create(modelClassName,{id:recordId});
              }
              destinationColumn.select(selection);
            }
            else {console.log("$CLASSNAME",destinationColumn.$className);}
          }
          else {console.log("Not vis");}
        }
        else {console.log("RecordID",recordId,"index",index);}
      },
      /**
       * select an item in a column
       * if a column is not valid or disabled (masked) do nothing
       * @param columnId a valid column id
       * @param recordId a valid record id
       */
      deselectAt:function(columnId,recordId){
        var bw=Ext.get('browserView');
        var index = this.columns.indexOf(columnId);
        console.log("DEselect At",columnId,index);
        if(recordId && index>-1)
        {
          var destinationColumn=Ext.getCmp(columnId);
          var isVisible=destinationColumn.getMasked().getHidden(); //false if the column is masked
          if(isVisible)
          {
            if(destinationColumn.$className==="webinosTV.view.TilesDataView" || destinationColumn.id==='mediaPlaylist')
            {
              var modelClassName= destinationColumn.getStore().getModel().$className;
              var selection;
              if(recordId instanceof Array) //multiple
              {
                var length=recordId.length;
                selection= new Array(length);
                for (var i=0; i<length; i++)
                {
                  selection[i]=Ext.create(modelClassName,{id:recordId[i]});
                }
              }
              else //single
              {
                selection=Ext.create(modelClassName,{id:recordId});
              }
              destinationColumn.deselect(selection);
            }
          }
        }
      },
      //deselected item
      deselectItem:function(){
        var lrIndex=this.leftRightIndex;
        var index=this.upDownIndex===-1 ? 0 :this.upDownIndex;
        if(lrIndex<this.columns.length)
        {
          var currColumnCmp=Ext.getCmp(this.lastVisitedColumnId);
          var numberOfRows = (currColumnCmp.$className === "webinosTV.view.TilesDataView" || currColumnCmp.id==='mediaPlaylist') ? currColumnCmp.getStore().getCount():0; //TODO find a clean way to browse in columns 3 and 5
          var isVisible=currColumnCmp.getMasked().getHidden(); //false if the column is masked
          if(index < numberOfRows && isVisible)
          {
            if(index>-1)
            {
              var currCmp=currColumnCmp.getItemAt(index);
              var record=currCmp.getRecord();
              var isSelected=currColumnCmp.isSelected(record);
              if(isSelected)
              {
                currColumnCmp.deselect(record);
              }
            }
          }
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
      case 83://s key
        browse.toggleSelectItem()
        break;
      case 68://d key
        browse.deselectItem()
        break;
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

    //Queues control
    addQueue:addQueue,
    addQueues:addQueues,
    updateQueue:updateQueue,
    removeQueue:removeQueue,
    clearQueues:clearQueues,

    //Media control
    addFileItem:addFileItem,
    addFileItems:addFileItems,
    removeFileItem:removeFileItem,
    clearFileItems:clearFileItems,

    //Categories control
    addCategory:addCategory,
    addCategories:addCategories,
    removeCategory:removeCategory,
    clearCategories:clearCategories,

    //Source devices control
    addSourceDevice:addSourceDevice,
    updateSourceDevice:updateSourceDevice,
    addSourceDevices:addSourceDevices,
    removeSourceDevice:removeSourceDevice,
    clearSourceDevices:clearSourceDevices,

    //Target devices control
    addTargetDevice:addTargetDevice,
    addTargetDevices:addTargetDevices,
    removeTargetDevice:removeTargetDevice,
    clearTargetDevices:clearTargetDevices,
    
    //TODO actions control?
    addActionButton:addActionButton,
    addActionButtons:addActionButtons,
    removeActionButton:removeActionButton,
    clearActionButtons:clearActionButtons,

    
    //TODO find a smarter name
    remoteEvents:remoteEvents,
    
    showModalVideo:showModalVideo,

    //Navigation
    browse:browse
  };
};

