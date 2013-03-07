// Categories
Ext.define('webinosTV.view.MediaSelectionColumn', {
  extend: 'Ext.Container',
  xtype: 'mediaselcol',
  config: {
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    items: [
      {//Headers  #2
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
      },
      {
        //Container #2 - playlist with header
        id: 'mediaPlaylist',
        xtype: 'container',
        name: 'mediaContent',
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
              flex: 2,
              xtype: 'tilepanel',
              cls: 'tile-panel',
              text: 'No media category selected'
            },
            {//Content Panel
              flex: 9,
              xtype: 'tilepanel',
              cls: 'tile-panel',
              text: 'please select a media type...'
            }
          ],
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
        }

      }
    ]
  },
  //resets defaults
  setEmptyContent: function() {
    this.setMediaHeaderView({//Header Panel
      flex: 2,
      xtype: 'tilepanel',
      cls: 'tile-panel',
      text: 'No media category selected'
    });
    this.setMediaContentView({//Content Panel
      flex: 9,
      xtype: 'tilepanel',
      cls: 'tile-panel',
      text: 'please select a media type...'
    });
  },
  setContentMasked: function(masked) {
    this.query('container[name="mediaContent"]')[0].setMasked(masked);
  },
  getContentMasked: function() {
    return this.query('container[name="mediaContent"]')[0].getMasked(masked);
  },
  getMediaHeaderView: function(headerConfig) {
    var headerView = this.query('container[name="mediaContent"]')[0].getAt(0);
    return headerView;
  },
  setMediaHeaderView: function(headerConfig) {
    var mediaContent = this.query('container[name="mediaContent"]')[0];
    mediaContent.removeAt(0);
    var headerView = mediaContent.insert(0, headerConfig);
    return headerView;
  },
  getMediaContentView: function(contentConfig) {
    var contentView = this.query('container[name="mediaContent"]')[0].getAt(1);
    return contentView;
  },
  setMediaContentView: function(contentConfig) {
    var mediaContent = this.query('container[name="mediaContent"]')[0];
    mediaContent.removeAt(1);
    var contentView = mediaContent.insert(1, contentConfig);
    return contentView;
  },
  showMusic: function() {
    this.setContentMasked(false);
    this.setMediaHeaderView(
      {
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
    );
    this.setMediaContentView({//Playlist
      id: 'musicDataView',
      flex: 9,
      xtype: 'mediaplaylist',
      store: 'tmpmusicstore-id',
      defaultType: 'audiolistitem',
      listeners: {
        resize: {
          fn: function(elem) {
            var pl = this;
            var items = pl.getInnerItems()[0].innerItems;
            items.forEach(function(audioListItem) {
              audioListItem.checkTextOverflow()
            })
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
    });
  },
  showVideos: function() {
    this.setContentMasked(false);
    this.setMediaHeaderView(
      {
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
      }
    );
    this.setMediaContentView({//Playlist
      id: 'videoDataView',
      flex: 9,
      xtype: 'mediaplaylist',
      store: 'tmpvideostore-id',
      defaultType: 'audiolistitem', //TODO a videolistitem with small video previews?
      listeners: {
        resize: {
          fn: function(elem) {
            var pl = this;
            var items = pl.getInnerItems()[0].innerItems;
            items.forEach(function(audioListItem) {
              audioListItem.checkTextOverflow()
            })
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
    });
  },
  showImages: function() {
    this.setContentMasked(false);
    this.setMediaHeaderView({//Header Panel
      flex: 2,
      xtype: 'tilepanel',
      cls: 'tile-panel',
      text: 'Images'
    });
    this.setMediaContentView(
      {//Content Panel
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('Images').fontcolor('lime').big()
      }
    );
  },
  showTV: function() {
    this.setContentMasked(false);
    this.setMediaHeaderView({//Header Panel
      flex: 2,
      xtype: 'tilepanel',
      cls: 'tile-panel',
      text: 'DVB-T'
    });
    this.setMediaContentView(
      {//Content Panel
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('DVB-T').fontcolor('orange').big()
      }
    );
  },
  showApps: function() {
    this.setContentMasked(false);
    this.setMediaHeaderView({//Header Panel
      flex: 2,
      xtype: 'tilepanel',
      cls: 'tile-panel',
      text: 'Apps'
    });
    this.setMediaContentView(
      {//Content Panel
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('webinos Apps').fontcolor('magenta').big()
      }
    );
  },
  showDocuments: function() {
    this.setContentMasked(false);
    this.setMediaHeaderView({//Header Panel
      flex: 2,
      xtype: 'tilepanel',
      cls: 'tile-panel',
      text: 'Documents'
    });
    this.setMediaContentView(
      {//Content Panel
        flex: 9,
        xtype: 'tilepanel',
        cls: 'tile-panel',
        text: ('Documents').fontcolor('red').big()
      }
    );
  }

});