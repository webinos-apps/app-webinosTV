Ext.define('webinosTV.controller.SelectMediaController', {
  extend: 'Ext.app.Controller',
  xtype: 'selmediactrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control: {
      mediaSelectionColumn:
        {
          coldeselect: 'mediaSelectionColumnDeselected'
        }
    },
    refs: {
      mediaSelectionColumn: '#mediaSelectionColumn'
    }
  },
  mediaSelectionColumnDeselected: function(column, listOrigin, record) {
    column.setEmptyContent();
//    return false;
  }
});