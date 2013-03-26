/**
 * This class represents a media item
 * Example: {"id": "1", "title": "some title", "file": "path/to/file", "meta": {}, "type": "video"},
 * WARNING NEVER PUT '-' in ID
 */
Ext.define('webinosTV.model.Media', {
  extend: 'Ext.data.Model',
  alternateClassName: 'webinosMedia',
  config: {
    ///Defining type should automatically convert raw data to target type, e.g. 1 to '1' but do not rely on it
    ///@see http://docs.sencha.com/touch/2-1/#!/api/Ext.data.Field-cfg-type
    fields: [
      {name: 'id', type: 'string', allowNull: false}, //id and file (abs path ) should be unique! TODO put validation funcs here
      {name: 'title', type: 'string'}, // 'media title to be displayed' TODO call it label?
      {name: 'file', type: 'string'}, // reference (abs path) to media file
      {name: 'meta', type: 'auto'}, //object with additional, media-specific, infos
      {name: 'type', type: 'string'} //'audio','video' ,'image', 'tvchannel', 'app', 'doc', 'album' - album is a collection of media
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