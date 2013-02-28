Ext.define('webinosTV.view.ActionControlsColumn', {
  extend: 'Ext.Container',
  xtype:'actctrlscol',
  id:'actionscolumn',
  config:{
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    items: [{ //Headers  #4
      xtype: 'container',
      width: '100%',
      cls: 'title-container',
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [{
        xtype: 'panel',
        html: 'Play Mode',
        padding: 2,
        margin: 2 /*,flex:1.5*/
      } //#4
      ]
    },
    { //Container #4 - Actions
      xtype: 'tileslist',
      id: 'actionsList',
//         disabled: true,
        masked: true,
        mode: 'SINGLE',
        defaultType: 'actctrllistitem', //for display devices
        cls: ['phone-listview-indicator','actionslist'], //additional css class to highlight scrollbar
        width: '100%',
        height: '100%',
        store: {
          storeId:'actionsstore-id',
          fields: ['id','icon', 'text','action'],
          data: [{
            id:1,
            icon: 'play',
            text: 'Play Now',
            action:function(){alert("Play it!");}
          },
          {
            id:2,
            icon: 'queue',
            text: 'Add to Queue',
            action:function(){alert("Add to Q");}
          }
          ],
          autoLoad: true 
        },
        loadingText: "Loading actions...",
        scrollable:false,
        //eg addNewRecord({id:3,icon:'tv',text:'watch',action:function(){alert("Video killed radio all stars");}})
        addNewRecord:function(recordObject){ //TODO reject objects with no id or increment biggest id
          var store=Ext.StoreManager.get('actionsstore-id');
          store.add(recordObject);
          this.refresh(); //seems not to get updated otherwise :( TODO maybe with dedicated model+store works
        }
    }]
    }

});