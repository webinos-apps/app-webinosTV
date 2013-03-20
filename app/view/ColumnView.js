/**
 * Implements a generic BrowserView Column
 * It has a header and a content component
 * and forwards events from/to its content components
 *
 * usage:
 * var header=columnView.getHeaderComponent();
 * do all operations on header
 *
 * columnView.getContentComponent();
 * var content=columnView.getHeaderComponent();
 * do all operations on content
 */
Ext.define('webinosTV.view.ColumnView', {
  extend: 'Ext.Container',
  xtype: 'colview',
//  height: '100%', //Sencha says it's deprecate to have it here
  config: {
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    headerComponent: null,
    contentComponent: null,
    listeners: {
      select: {
        /**
         * fires whenever a column item child is selected
         * @param {DataView/List} origin list-like component that originated the event
         * @param {Model} record selected record
         */
        fn: function(origin, record)
        {
          this.fireEvent('colselect', this, origin, record);
          return false; //stop bubbling select event
        }
      },
      /**
       * fires whenever a column item is deselected
       * @param {DataView/List} origin list-like component that originated the event
       * @param {Model} record deselected record
       */
      deselect: {
        fn: function(origin, record)
        {
          this.fireEvent('coldeselect', this, origin, record);
          return false; //stop bubbling deselect event
        }
      }
    }
  },
  applyHeaderComponent: function(headerComp) {
    var queryRes = this.query('*[role=columnheader]');
    var hcomp;
    if (queryRes.length === 1) {
      hcomp = queryRes[0];
    }
    else {
      hcomp = this._setRole(headerComp, 'columnheader');
      this.insert(0, hcomp);
    }
    return this.query('*[role=columnheader]')[0];
  },
  applyContentComponent: function(contentComp) {
    var queryRes = this.query('*[role=columncontent]');
    var ccomp;
    if (queryRes.length === 1) {
      ccomp = queryRes[0];
    }
    else {
      ccomp = this._setRole(contentComp, 'columncontent');
      this.add(ccomp);
    }
    return this.query('*[role=columncontent]')[0];
  },
  /**
   * validates that component is a component instance or config object
   * and attach role attribute which is useful for querying
   * */
  _setRole: function(cmp, role) {
    if (cmp.isComponent !== undefined || cmp.xtype !== undefined)
    {
      cmp.role = role;
      return cmp;
    }
    else
    {
      return null;
    }
  },
  /**
   * Returns true if any list child has selection count ===0
   * False if no list child found or selection count > 0
   */
  hasVoidSelection: function() {
    var selectionVoid = false;
    var queryListComponents = this.query('dataview');
    if (queryListComponents.length > 0)
    {
      var listComponent = queryListComponents[0];
      if (listComponent.getSelectionCount() === 0)
      {
        selectionVoid = true;
      }
      //console.warn("hasVoidSelection", queryListComponents, listComponent.getSelectionCount(), selectionVoid);
    }

    return selectionVoid;
  },
  /**
   * Depending on the value of enabled, it masks/unmasks, enables/disables this components content
   * and enables/disables selection on its dataview derived child components
   * @param {Boolean} enabled if true, removes masks and enable selection, otherwise it does the opposite
   *
   */
  enableContent: function(enabled) {
    var content = this.getContentComponent();
    var disabled = !enabled;
    content.setMasked(disabled);
    content.setDisabled(disabled);
    var queryListComponents = this.query('dataview');
    if (queryListComponents.length > 0)
    {
      var listComponent = queryListComponents[0];
      listComponent.deselectAll();
      listComponent.setDisableSelection(disabled);
    }
    // console.warn("Called enableContent with enabled = ", enabled);
  }
});