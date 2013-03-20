/**
 * This class represents a single list of tile items
 * The DataViewItem type will be passed when instanciating
 * the class (or in its config file)
 */
Ext.define('webinosTV.view.TilesDataView', {
  extend: 'Ext.DataView',
  xtype: 'tileslist',
  config: {
    useComponents: true,
    height: '100%',
    loadingText: 'Loading list...',
    emptyText: '<div>' + ('No items found!').fontcolor('cyan') + '</div>',
    scrollable: {
      direction: 'vertical',
      directionLock: true
    },
    mode: 'SINGLE',
    allowDeselect: true,
    itemCls: 'tile-panel',
    selectedCls: 'tile-panel-selected',
    pressedDelay: 100,
    pressedCls: 'tile-panel-pressed',
    //Forward events to parent
    bubbleEvents: ['select', 'deselect'], //TODO add refresh?
    listeners: {
      itemdoubletap: {
        fn: function(tileList, index, listItem, record, e, eOpts) {
          if (tileList.getMode() === 'MULTI') {
//             tileList.deselectAll();
            tileList.select(index);
          }
        }
      }
    }
  }
});