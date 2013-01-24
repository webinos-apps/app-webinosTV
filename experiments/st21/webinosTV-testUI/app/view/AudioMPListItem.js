Ext.define('webinosTV.view.AudioMPListItem', {
    extend: 'Ext.dataview.component.ListItem',
    xtype: 'audiolistitem',
    config: {
      dataMap: {
	getTitle: {
	  setHtml:'title'
	},
      },
      title: true,
      items: [
	{ xtype: 'component', itemId: 'title' },
      ]
    },
    applyTitle: function () {
      return this.child('#title');
    }
});

/*
 *Using DataView inspite of list
 * 
Ext.define('webinosTV.view.AudioMPListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'audiolistitem',
    config:{
      audioLabel:true,
      selected:false
    },

    applyAudioLabel:function(config){
      var itemPanel=Ext.create('Ext.Panel',{
	html:this.getRecord().data.title.fontcolor('cyan')
      });
      return itemPanel;
    },

    updateAudioLabel:function(newLabel,oldLabel)
    {
      if (oldLabel) {
	this.remove(oldLabel);
      }

      if (newLabel) {
	this.add(newLabel);
      }
    }
});

 */