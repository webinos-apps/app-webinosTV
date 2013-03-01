
Ext.define('webinosTV.view.BrowserView', {
    extend: 'Ext.Container',

    requires: [
      'Ext.Panel', 'Ext.Button', 'Ext.data.Store', 'Ext.Img', 'Ext.SegmentedButton'],
    config: {
      id: 'browserMainView',
      currentSourceDeviceQueue: null, //private attribute - see showSourceDeviceQueue
      width: '100%',
      height: '100%',
      cls: 'main-container',
      layout: {
          type: 'hbox', //Main component
          align: 'center',
          pack: 'center'
      },
      items: [
      // Queue and Source devices
      {
        xtype: 'srcdevscol',
        flex: 2.5,
        height: '100%',
        id:'sourceDevicesColumn'
      },
      // Categories 
      {
          xtype: 'categscol',
          flex: 1.5,
          height: '100%',
          id:'categoriesColumn'
      },
      // Media selection
      {
        xtype: 'mediaselcol',
        flex: 3,
        height: '100%',
        id:'mediaSelectionColumn'
      },
      // Target devices
      {
        xtype: 'tgtdevscol',
        flex: 1.5,
        height: '100%',
        id:'targetDevicesColumn'
      },
      // Actions
      {
        xtype: 'actctrlscol',
        flex: 1.5,
        height: '100%',
        id:'actionControlsColumn'
      }]
    },


    showSourceDeviceQueue: function (deviceID) { //TODO update panel if it is already showing (otherwise 2 pushes)
        var mainContainer = this;

        //TODO remove once layouts are ready
        function get_random_color() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.round(Math.random() * 15)];
            }
            return color;
        }

        var currentSourceDeviceID = mainContainer.getCurrentSourceDeviceQueue();
        switch (currentSourceDeviceID) {
            case null:
                //add
                {

                    //   	  //WARNING: this is NOT the final stuff
                    mainContainer.insert(0, {
                        xtype: 'container',
                        flex: 2,
                        height: '100%',
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
                                html: 'Device Queue',
                                padding: 2,
                                margin: 2
                            }]
                        }, {
                            xtype: 'tilepanel',
                            cls: 'tile-panel',
                            flex: 9,
                            text: ('Queue for ' + deviceID + '<br>Here you\'ll see a single device queue...').fontcolor(get_random_color()).small()
                        }]
                    });
                    mainContainer.getAt(0).getAt(1).getAt(0).addCls('not-implemented-yet');
                    mainContainer.setCurrentSourceDeviceQueue(deviceID);
                }
                break;
            case deviceID:
                //remove
                {
                    mainContainer.removeAt(0);
                    mainContainer.setCurrentSourceDeviceQueue(null);
                }
                break;
            default:
                //update
                {
                    //WARNING: this is NOT the final stuff
                    mainContainer.getAt(0).getAt(1).setText(('Queue for ' + deviceID + '<br>Here you\'ll see a single device queue...').fontcolor(get_random_color()).small());
                    mainContainer.setCurrentSourceDeviceQueue(deviceID);
                }
                break;
        }
    }
});