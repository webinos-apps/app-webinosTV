// Ext.define('webinosTV.view.AudioMPListItem', {
//     extend: 'Ext.dataview.component.ListItem',
//     requires:['Ext.field.Checkbox'],
//     xtype: 'audiolistitem',
//     config: {
//       dataMap: {
// 	getTitle: {
// 	  setHtml:'title'
// 	},
//       },
//       layout:'hbox',
//       title: true,
//       items: [
// 	{
// 	  xtype: 'panel',
// 	  cls:'sliding-text',
// 	  itemId: 'title',
// // 	  style:'background-color:orange;'
// 	},
// 	{
// 	  cls:'tile-panel',
// 	  xtype:'checkboxfield',
// 	  docked:'right'
// 	}
//       ]
//     },
//     applyTitle: function () {
// //       console.log(this.child('#title'))
//       return this.child('#title');
//     }
// });


//  *Using DataView inspite of list
//  * 
Ext.define('webinosTV.view.AudioMPListItem', {
  extend: 'Ext.dataview.component.DataItem',
  xtype: 'audiolistitem',
  config:{
    audioLabel:true,
    selected:false,
    index:-1,
    width:'100%'/*,
    listeners:{
//       painted:{
// 	fn:'onPainted'
//       },
//       resize:{
// 	fn:'onPainted'
//       }
    }*/
  },

  applyAudioLabel:function(config){
    var store= this.getDataview().getStore();
    var index=store.indexOf(this.getRecord());
    this.setIndex(index);
    var itemContainer=Ext.create('Ext.Container',{
      layout:'hbox',
// 	height:10,
      items:[
// 	  {xtype:'tilepanel', iconCls : null, text:this.getRecord().data.title}
	{
	  cls:'playlist-container-'+index%2,
	  margin: 0,
	  padding:4,
	  flex:9,
	  items:[
	    {
	      xtype:'panel',
 	      margin:2,
	      html:this.getRecord().data.title
	    },
	    {
	      xtype:'panel',
	      docked:'right',
	      width:'10%',
	      style:'background-color:#333;color:#006bb6;text-align:center;',//TODO in css
	      html: (' + ').bold()
	    }
	  ]
	}
      ]
    });
    return itemContainer;
  },

  updateAudioLabel:function(newLabel,oldLabel)
  {
    if (oldLabel) {
      this.remove(oldLabel);
    }

    if (newLabel) {
      this.add(newLabel);
    }
  },

  select:function(){
    var panel=this.getAt(1).getAt(0);
    this.setSelected(true);
    panel.setCls('playlist-container-pressed');
    setTimeout(function(){
      panel.setCls('playlist-container-selected');
    },300);
  },

  unselect:function(){
    this.setSelected(false);
    var panel=this.getAt(1).getAt(0);
    panel.setCls('playlist-container-'+this.getIndex()%2);
  },

  checkTextOverflow:function(){
    var slidingCls='sliding-text';
    var hasOverflow=(this.element.dom.clientWidth-this.element.dom.scrollWidth)!==0;
    var textPanel = this.getAt(1).getAt(0).getAt(0); //TODO a smarter way to get this
    var hasSlidingCls=false;
    if(textPanel.getCls()!==null)
    {
      hasSlidingCls=textPanel.getCls().indexOf(slidingCls)!==-1;
    }

    if(hasOverflow)
    {
      if(!hasSlidingCls)
      {
// 	console.log("ADD cls - "+this.getIndex(),hasSlidingCls);
	textPanel.addCls(slidingCls);
      }
    }
    else
    {
      if(hasSlidingCls)
      {
// 	console.log("REMOVE cls - "+this.getIndex(),hasSlidingCls);
	textPanel.removeCls(slidingCls);
      }
    }
  }
});

