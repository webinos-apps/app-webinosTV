Ext.define('webinosTV.controller.SelectPlayModeController', {
  extend: 'Ext.app.Controller',
  xtype: 'playmodectrl',
//   requires:[''],

  //TODO actions depending on media type - right now it's just masking/unmasking
  config: {
    control: {
      actionList:
        {
          select: 'actionSelected',
          deselect: 'actionDeSelected'
        }
    },
    refs: {
      actionsColumn: '#actionControlsColumn',
      actionList: '#actionsList',
      tdevList: '#targetDevicesList'
    }
  },
  actionSelected: function(actionList, record, eOpts)
  {
    var selectedColumn = this.getActionsColumn();
    var header = selectedColumn.query('panel[name=columnheadertext]')[0];
    if (header) {
      header.addCls('selected-column-header');
    }
    record.get('action')("play");
  },
  actionDeSelected: function(actionList, record, eOpts)
  {
    var selectedColumn = this.getActionsColumn();
    var header = selectedColumn.query('panel[name=columnheadertext]')[0];
    if (header) {
      header.removeCls('selected-column-header');
    }
    record.get('action')("stop");
  }

});