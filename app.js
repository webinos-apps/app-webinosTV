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
