//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'webinosTV': 'app'
});
//</debug>

Ext.application({
    name: 'webinosTV',

    requires: [
      'Ext.MessageBox'
    ],

    viewport: {
      autoMaximize: false
    },

    views: ['BrowserView','TilesDataView','SourceDeviceDataViewItem','MediaCategoryDataViewItem','DefaultTilePanel','TargetDeviceDataViewItem','CustomSegmentedButton','MediaPlaylist','AudioMPListItem'],

    models:['Device','Media'],

    stores:['TempMusicStore','TempSourceDevsStore','TempDisplayDevsStore'],

    controllers:['PlayModeController','SelectCategoryController','SelectMediaController','SelectSourceDeviceController'],

    profiles:['Phone','LargeScreen'],
    
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
      // Destroy the #appLoadingIndicator element
      Ext.fly('appLoadingIndicator').destroy();

      // Initialize the stores
      var tmpMusicStore=Ext.create('webinosTV.store.TempMusicStore');

//       //connect interface with ui
//       webinosTV.app.connectUi=run_ui_connect();
    },
    
    //connect interface with ui
    connectUi:function(){

      var addTargetDevice = function(id,type,counter,name){
        var store = Ext.StoreMgr.get('tmpdispdevstore-id');
        store.add({"id": id, "type": type, "counter": counter,"deviceName":name});
      };
      
      var clearTargetDevices = function(){
        var store = Ext.StoreMgr.get('tmpdispdevstore-id');
        store.clearData();
      };

      //Navigation
//       var moveLeft=function(){
//         var index=this.leftRightIndex;
//         if(index>0)
//         {
//           var currCmp=Ext.getCmp(this.lastVisitedColumnId);
//           currCmp.removeCls("nav-selected");
//           
//           this.leftRightIndex--;
//           index=this.leftRightIndex;
//           var nextCmp=Ext.getCmp(this.columns[index]);
//           nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
//           this.lastVisitedColumnId=this.columns[index];
//           console.log("MoveLeft")
//         }
//       };
      
//       var moveRight=function(){
//         var index=this.leftRightIndex;
//         if(index<this.columns.length)
//         {
//           console.log(index,this.lastVisitedColumnId)
//           var currCmp=Ext.getCmp(this.lastVisitedColumnId);
//           currCmp.removeCls("nav-selected");
// 
//           this.leftRightIndex++;
//           index=this.leftRightIndex;
//           var nextCmp=Ext.getCmp(this.columns[index]);
//           nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
//           this.lastVisitedColumnId=this.columns[index];
//           console.log("MoveRight");
//         }
//       };
  
      var moveUp=function(){
        var bw=Ext.get('browserView');
        console.log("MU",this);
      };
      
      var moveDown=function(){
        var bw=Ext.get('browserView');
        console.log("MD",this);
      
      };
      
//       var startBrowsing=function(){
//         var bw=Ext.get('browserView');
//         var startCmp=Ext.getCmp(this.columns[0]);
//         console.log("Started ok",startCmp.getCls());
//         startCmp.setCls(["nav-selected","phone-listview-indicator"]);
//         this.lastVisitedColumnId=this.columns[0];
//         this.leftRightIndex++;
//       };
      
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
          moveLeft:function(){
            var index=this.leftRightIndex;
            if(index>0)
            {
              var currCmp=Ext.getCmp(this.lastVisitedColumnId);
              currCmp.removeCls("nav-selected");
              
              this.leftRightIndex--;
              index=this.leftRightIndex;
              var nextCmp=Ext.getCmp(this.columns[index]);
              nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
              this.lastVisitedColumnId=this.columns[index];
              console.log("MoveLeft")
            }
          },
          moveRight:function(){
            var index=this.leftRightIndex;
            if(index<this.columns.length)
            {
              console.log(index,this.lastVisitedColumnId)
              var currCmp=Ext.getCmp(this.lastVisitedColumnId);
              currCmp.removeCls("nav-selected");

              this.leftRightIndex++;
              index=this.leftRightIndex;
              var nextCmp=Ext.getCmp(this.columns[index]);
              nextCmp.setCls(["nav-selected","phone-listview-indicator"]);
              this.lastVisitedColumnId=this.columns[index];
              console.log("MoveRight");
            }
          },
          moveUp:moveUp,
          moveDown:moveDown
      };

      var bindKey=function(evt)
      {
        var key = evt.keyCode;
        switch(key){
          case 97://a
            browse.moveLeft();
            break;
          case 115://s
            browse.moveDown();
            break;
          case 100://d
            browse.moveRight();
            break;
          case 119://w
            browse.moveUp();
            break;
          case 13://return
            browse.startBrowsing()
            break;
          case 32://space
            //browse.stopBrowsing()
            break;
          default:
            console.log("Unhandled key",key);
        }
      };
      document.onkeypress = bindKey;
      
      return {
        addTargetDevice:addTargetDevice,
        clearTargetDevices:clearTargetDevices,
        browse:browse
  };
// })();


},


    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    addDisplayDevices:function(deviceItems){
      var dispDevStore=Ext.getStore('tmpdispdevstore-id');
      dispDevStore.add(deviceItems);
    },

    addSourceDevices:function(deviceItems){
      var srcDevStore=Ext.getStore('tmpsrcdevstore-id');
      srcDevStore.add(deviceItems);
    }
});
