// Categories
Ext.define('webinosTV.view.MediaSelectionColumn', {
  extend: 'webinosTV.view.ColumnView',
  xtype: 'mediaselcol',
  config: {
    headerComponent: {//Headers  #2
      xtype: 'container',
      width: '100%',
      role: 'columnheader',
      cls: ['title-container', 'col-title'], //used for selection only
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      items: [{
          xtype: 'panel',
          name: 'columnheadertext',
          html: 'Select Media',
          padding: 2,
          margin: 2 /*,flex:1.5*/
        } //#2
      ]
    },
    contentComponent: {
      //Container #2 - playlist with header
      id: 'mediaPlaylist',
      xtype: 'container',
//      name: 'mediaContent',
      role: 'columncontent',
      cls: 'phone-listview-indicator', //additional css class to highlight scrollbar
      width: '100%',
      height: '100%',
      masked: true,
      layout:
        {
          type: 'vbox'
        },
      items:
        [
          //Default items
          {//Header Panel
            name: 'mediaHeader',
            flex: 2,
            xtype: 'tilepanel',
            cls: 'tile-panel',
            text: 'No media category selected'
          },
          {//Content Panel
            name: 'mediaContent',
            flex: 9,
            xtype: 'tilepanel',
            cls: 'tile-panel',
            text: 'please select a media type...'
          }
        ]
    }

  },
  //mimic dataview methods by using wrappers on the inner dataview
  getStore: function() {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.getStore();
    else
      return null;
  },
  getItemAt: function(index) {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.getItemAt(index);
    else
      return null;
  },
  isSelected: function(record) {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.isSelected(record);
    else
      return null;
  },
  select: function(record) {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.select(record);
    else
      return null;
  },
  deselect: function(record, flag) {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.deselect(record, flag);
    else
      return null;
  },
  deselectAll: function(record, flag) {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.deselectAll();
    else
      return null;
  },
  getSelection: function() {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.getSelection();
    else
      return null;
  },
  getSelectionCount: function() {
    var dv = this.query('dataview')[0];
    if (dv)
      return dv.getSelectionCount();
    else
      return null;
  },
  //resets defaults
  setEmptyContent: function() {
//    var queryPlaylist = this.query('mediaplaylist');
    //by deselecting, the deselect event gets fired
//    queryPlaylist.forEach(function(pl) {
//      pl.deselectAll();
//    });

    this.getContentComponent().setItems(
      [
        //Default items
        {//Header Panel
          flex: 2,
          name: 'mediaHeader',
          xtype: 'tilepanel',
          cls: 'tile-panel',
          text: 'No media category selected'
        },
        {//Content Panel
          flex: 9,
          name: 'mediaContent',
          xtype: 'tilepanel',
          cls: 'tile-panel',
          text: 'please select a media type...'
        }
      ]
      );
  },
  showMusic: function() {
    this.getContentComponent().setItems([
      {
        xtype: 'container',
        name: 'mediaHeader',
        layout: {
          type: 'hbox',
          pack: 'center',
          align: 'center'
        },
        flex: 2,
        cls: 'tile-panel',
        items:
          [
            {
              xtype: 'img',
              src: './resources/images/cover.png',
              height: '70%',
              width: '70%',
              padding: 1,
              margin: 1,
              flex: 2,
              zIndex: 1000
            },
            {
              xtype: 'panel',
              cls: ['tile-text'],
              items: [{
                  xtype: 'panel',
                  cls: 'sliding-text',
                  html: 'Artist - Album'
                }],
              flex: 3
            }
          ]
      }
      ,
      {//Playlist
        id: 'musicDataView',
        name: 'mediaContent',
        flex: 9,
        xtype: 'mediaplaylist',
        store: 'audiostore-id',
        defaultType: 'audiolistitem',
        listeners: {
          resize: {
            fn: function(elem) {
              var pl = this;
              var items = pl.getInnerItems()[0].innerItems;
              items.forEach(function(audioListItem) {
                audioListItem.checkTextOverflow();
              });
            }
          },
          //echoing the select and deselect events
          select: {
            fn: function(list, record, eOpts) {
              Ext.getCmp('mediaPlaylist').fireEvent('select', list, record, eOpts);
            }
          },
          deselect: {
            fn: function(list, record, supressed, eOpts) {
              Ext.getCmp('mediaPlaylist').fireEvent('deselect', list, record, supressed, eOpts);
            }
          }
        }
      }]);
  },
  showVideos: function() {
    this.getContentComponent().setItems([
      {
        name: 'mediaHeader',
        xtype: 'container',
        layout: {
          type: 'hbox',
          pack: 'center',
          align: 'center'
        },
        flex: 2,
        cls: 'tile-panel',
        items:
          [
            {
              xtype: 'img',
              src: './resources/images/video-icon.png',
              height: '70%',
              width: '70%',
              padding: 1,
              margin: 1,
              flex: 2,
              zIndex: 1000
            },
            {
              xtype: 'panel',
              cls: ['tile-text'],
              items: [{
                  xtype: 'panel',
                  cls: 'sliding-text',
                  html: 'Videos'
                }],
              flex: 3
            }
          ]
      },
      {//Playlist
        name: 'mediaContent',
        id: 'videoDataView',
        flex: 9,
        xtype: 'mediaplaylist',
        store: 'videostore-id',
        defaultType: 'videolistitem', //TODO a videolistitem with small video previews?
        listeners: {
          resize: {
            fn: function(elem) {
              var pl = this;
              var items = pl.getInnerItems()[0].innerItems;
              items.forEach(function(videoListItem) {
                videoListItem.checkTextOverflow();
              });
            }
          },
          //echoing the select and deselect events
          select: {
            fn: function(list, record, eOpts) {
              Ext.getCmp('mediaPlaylist').fireEvent('select', list, record, eOpts);
            }
          },
          deselect: {
            fn: function(list, record, supressed, eOpts) {
              Ext.getCmp('mediaPlaylist').fireEvent('deselect', list, record, supressed, eOpts);
            }
          }
        }
      }]);
  },
  showImages: function() {
    this.getContentComponent().setItems([{//Header Panel
        name: 'mediaHeader',
        flex: 2,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: 'Images'
      },
      {//Content Panel
        name: 'mediaContent',
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('Images').fontcolor('lime').big()
      }
    ]);
  },
  showTV: function() {
    this.getContentComponent().setItems([{//Header Panel
        name: 'mediaHeader',
        flex: 2,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: 'DVB-T'
      },
      {//Content Panel
        name: 'mediaContent',
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('DVB-T').fontcolor('orange').big()
      }
    ]);
  },
  showApps: function() {
    this.getContentComponent().setItems([{//Header Panel
        name: 'mediaHeader',
        flex: 2,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: 'Apps'
      },
      {//Content Panel
        name: 'mediaContent',
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('webinos Apps').fontcolor('magenta').big()
      }
    ]);
  },
  showDocuments: function() {
    this.getContentComponent().setItems([{//Header Panel
        name: 'mediaHeader',
        flex: 2,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: 'Documents'
      },
      {//Content Panel
        name: 'mediaContent',
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('Documents').fontcolor('red').big()
      }
    ]);
  }

});