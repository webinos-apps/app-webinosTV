Ext.define('webinosTV.model.Media', {
  extend: 'Ext.data.Model',

  config: {
    fields: ['id','title','file'] //id and file (abs path ) should be unique! TODO put validation funcs here
  }
});