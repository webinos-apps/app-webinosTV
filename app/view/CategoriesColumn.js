// Categories 
Ext.define('webinosTV.view.CategoriesColumn', {
  extend: 'Ext.Container',
  xtype:'categscol',
  config:{
//     height: '100%',
//     //    width:'90%',
//     flex: 1.5,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [{ //Headers  #1
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
            html: 'Categories',
            padding: 2,
            margin: 2 /*,flex:1.5*/
        } //#1
        ]
    }, { //Container #1 - Media Category
        xtype: 'tileslist',
        id: 'mediaCategoryList',
        disabled: true,
        masked: true,
        defaultType: 'mediacategorylistitem', //for media
        cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
        width: '100%',
        //      flex: 1.5,
        store: {
            fields: ['category', 'mediaCategoryName'],
            data: [{
                category: 'music',
                mediaCategoryName: 'Mp3 collection'
            }, {
                category: 'channels',
                mediaCategoryName: 'DVB-T'
            }, {
                category: 'movies',
                mediaCategoryName: 'Videos'
            }, {
                category: 'images',
                mediaCategoryName: 'Pictures'
            }, {
                category: 'apps',
                mediaCategoryName: 'webinos app store'
            }, {
                category: 'docs',
                mediaCategoryName: 'Documents'
            }]
        }
    }]
  }
});