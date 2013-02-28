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
        disabled: true,
        masked: true,
        mode: 'SINGLE',
        defaultType: 'actctrllistitem', //for display devices
        cls: ['phone-listview-indicator','actionslist'], //additional css class to highlight scrollbar
        width: '100%',
        height: '100%',
        store: {
          fields: ['icon', 'text','action'],
          data: [{
            icon: 'play',
            text: 'Play Now',
            action:function(){alert("Play it!");}
          },
          {
            icon: 'queue',
            text: 'Add to Queue',
            action:function(){alert("Add to Q");}
          }]
        },
        loadingText: "Loading actions...",
        scrollable:false
    }]
    }
//     { //Container #4 - Actions
//       xtype: 'customsegbutton',
//       id: 'playQueueSegmBtn',
//       disabled: true,
//       masked: true,
//       width: '100%',
//       height: '100%',
//       padding: 1,
//       layout: {
//         type: 'vbox'
//       },
//       items: [{
//         xtype: 'tilepanel',
//         cls: 'tile-panel',
//         iconCls: 'play',
//         text: 'Play Now'
//       }, {
//         xtype: 'tilepanel',
//         cls: 'tile-panel',
//         iconCls: 'queue',
//         text: 'Add to Queue'
//       }]
//     }
//     ]
//   }
});