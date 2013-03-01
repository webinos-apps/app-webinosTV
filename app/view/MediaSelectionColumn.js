// Categories 
Ext.define('webinosTV.view.MediaSelectionColumn', {
  extend: 'Ext.Container',
  xtype:'mediaselcol',
  config:{
//     height: '100%',
//     flex: 3,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [{ //Headers  #2
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
            html: 'Select Media',
            padding: 2,
            margin: 2 /*,flex:1.5*/
        } //#2
        ]
    }, { //Container #2 - playlist TODO: should change according with the media selected in #1
        xtype: 'mediaplaylist',
        id: 'mediaPlaylist',
        cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
        width: '100%',
        height: '100%',
        disabled: true,
        masked: true,
        mode: 'MULTI'
    }]
  }
  
});