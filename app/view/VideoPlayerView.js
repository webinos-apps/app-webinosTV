Ext.define('webinosTV.view.VideoPlayerView',{
	extend: 'Ext.Panel',
	requires: [
      'Ext.Video'
	],
    xtype:'modalvideoplayer',
	config: {
      width:'90%',
      height:'90%',
      modal: { cls:'videoplayermask' },
      hideOnMaskTap:true,
      centered: true,
      items:[
        {
          xtype:'video',
          preload:false,
          width:'100%',
          height:'100%',
          centered:true,
//           url: 'resources/BigBen/bb1.mov',
//           posterUrl: 'resources/BigBen/bb1.JPG'
//           loop: true
        }
      ],
      listeners:{
        hide:{
          fn:function(videoPlayerPanel, eOpts){
            //TODO destroy? notify? ...
            console.log("Video Player Panel Hidden",videoPlayerPanel);
            Ext.Viewport.remove(videoPlayerPanel,true);
          }
        }
      }
	},
    
    setUrl:function(url){
      return this.query('video')[0].setUrl(url);
    },
    
    setPosterUrl:function(url){
      return this.query('video')[0].setPosterUrl(url);
    }
});