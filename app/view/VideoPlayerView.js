Ext.define('webinosTV.view.VideoPlayerView',{
	extend: 'Ext.Container',
	requires: [
		'Ext.Video'
	],
	config: {
		layout: 'fit',
		url: ['http://localhost:9876/media/video2F%bbb.webm'],
		loop: true
	}
})