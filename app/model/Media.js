Ext.define('webinosTV.model.Media', {
  extend: 'Ext.data.Model',
  alternateClassName: 'webinosMedia',
//      {"id": 1, "title": "some title", "file": "path/to/file", "meta": {}, "type": "video"},
  config: {
    fields: [
      'id', //id and file (abs path ) should be unique! TODO put validation funcs here
      'title', // 'media title to be displayed' TODO call it label?
      'file', // reference (abs path) to media file
      'meta', //object with additional, media-specific, infos
      'type' //'audio','video' ,'image', 'tvchannel', 'app', 'doc', 'album' - album is a collection of media
    ],
    validations: [
      {type: 'presence', field: 'id'},
      {type: 'presence', field: 'title'},
      {type: 'presence', field: 'file'},
      {type: 'presence', field: 'type'},
      {type: 'inclusion', field: 'type', list: ['audio', 'video', 'image', 'tvchannel', 'app', 'doc', 'album']}
    ]
  }
});