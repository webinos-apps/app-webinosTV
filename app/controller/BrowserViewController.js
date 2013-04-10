/**
 * This is the main view controller
 * it reacts to all the events fired by the browserView
 * and its child columns
 *
 * It handle the general UI behavior
 * Column specific behaviors are to be handled in column controllers
 *
 */
Ext.define('webinosTV.controller.BrowserViewController', {
  extend: 'Ext.app.Controller',
  xtype: 'bvctrl',
  config: {
    control: {
      'colview': {//works for all instances and subclasses of colview
        colselect: 'columnSelected', //event: cb
        coldeselect: 'columnDeselected'
      }
    },
    refs: {
      ///ALL COLUMNS REFERENCES HERE
      browserView: '#browserMainView'
    }
  },
  columnSelected: function(column, listOrigin, records) {
    //console.warn("+++ Called SELECT column for", column.getId(), "from", listOrigin.getId(), records);
    if (column.getId() !== 'queuecol-id') {
      var browserView = this.getBrowserView();
      column.getHeaderComponent().addCls('selected-column-header');
      this._enableNextColumn(column, true);
    }
//    return false;
  },
  columnDeselected: function(column, listOrigin, records) {
    //console.warn("--- Called DESELECT column for", column.getId(), "from", listOrigin.getId(), records, "SEL IS VOID =", column.hasVoidSelection());
    if (column.getId() !== 'queuecol-id') {
      var browserView = this.getBrowserView();

      if (column.hasVoidSelection())
      {
        column.getHeaderComponent().removeCls('selected-column-header');
        this._enableNextColumn(column, false);
      }
    }
    //return false;
  },
  /**
   * Enables/disables (and mask/unmask) next column in order (if any)
   * @param {ColumnView} column current column
   * @param {Boolean} columnEnabled if true, enable column, else disable it
   */
  _enableNextColumn: function(column, columnEnabled) {
    var bv = this.getBrowserView();
    var columnViewsIds = bv.getItems().keys; //all the ids of the columns
    var currentColumnIndex = columnViewsIds.indexOf(column.getId());
    var nextColumnIndex = currentColumnIndex < columnViewsIds.length - 1 && currentColumnIndex > -1 ? currentColumnIndex + 1 : -1;

//    console.log("Curr", column.getId(), "[" + currentColumnIndex + "], next =", columnViewsIds[nextColumnIndex]);
//Column ID must contain the word "Column" in order to avoid trouble with other components that may get temporarily added to the bw
//such as a mask
    if (nextColumnIndex > -1 && columnViewsIds[nextColumnIndex].search(/Column/g) > -1)
    {
      var nextColumn = bv.query('#' + columnViewsIds[nextColumnIndex])[0];
      nextColumn.enableContent(columnEnabled);
    }
  }
});