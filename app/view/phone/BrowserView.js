Ext.define('webinosTV.view.phone.BrowserView', {
//extend: 'webinosTV.view.BrowserView',
  extend: 'Ext.Carousel',
  xtype: 'phone-browserview', //It actually does not extend anything

  config: {
    id: 'browserMainView',
    top: 0,
    left: 0,
    queueColumnLocked: true,
    direction: 'horizontal',
    directionLock: true,
//    activeItem: 1, //useless as columns get added lately - must be set by addAllColumns()
    width: '100%',
    height: '100%',
    cls: ['main-container', 'restore-size'],
    ui: 'csc-indicator',
    layout: {
      type: 'hbox', //Main component
      align: 'center',
      pack: 'center'
    }
  },
  onDragStart: function(e) {
//    console.log("Curr Item", this.getActiveIndex(), "Dir", e.deltaX > 0 ? "Left" : "Right");
    if (this.getQueueColumnLocked() && e.deltaX > 0 && this.getActiveIndex() === 1)
    {
      console.warn("Dev Q Col Locked");
      return false;
    }
    else
    {
      this.callParent(arguments);
    }
  },
  previous: function() {
    if (this.getActiveIndex() === 1 && this.getQueueColumnLocked()) {
      console.warn("Dev Q Col Locked");
      return;
    }
    else
    {
      this.callParent(arguments);
    }
  },
  addAllColumns: function() {
    this.add([
      //queue details
      {
        xtype: 'phonedevqueuecol',
        id: 'queuecol-id',
        hidden: false,
        flex: 2,
        height: '100%'
      },
      // Queue and Source devices
      {
        xtype: 'srcdevscol',
        flex: 2.5,
        height: '100%',
        id: 'sourceDevicesColumn'
      },
      // Categories
      {
        xtype: 'categscol',
        flex: 1.5,
        height: '100%',
        id: 'categoriesColumn'
      },
      // Media selection
      {
        xtype: 'mediaselcol',
        flex: 3,
        height: '100%',
        id: 'mediaSelectionColumn'
      },
      // Target devices
      {
        xtype: 'tgtdevscol',
        flex: 1.5,
        height: '100%',
        id: 'targetDevicesColumn'
      },
      // Actions
      {
        xtype: 'actctrlscol',
        flex: 1.5,
        height: '100%',
        id: 'actionControlsColumn'
      }
    ]);
    this.setActiveItem(1);
  }
});