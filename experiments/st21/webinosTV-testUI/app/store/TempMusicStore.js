Ext.define('webinosTV.store.TempMusicStore', {
  extend: 'Ext.data.Store',
  xtype: 'tmpmusicstore',
//   requires:[''],

  //TODO this store should change depending on the selected media type
  config:
  {
    storeId:'tmpmusicstore-id',
    fields: ['title','artist', 'album'],
    data: [
      { title: 'Come Together',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Something' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'Maxwell\'s Silver Hammer ' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'Oh! Darling',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Octopus\'s Garden' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'I Want You (She\'s So Heavy)' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'Here Comes the Sun' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'Because',artist:'The Beatles', album:'Abbey Road' },
      { title: 'You Never Give Me Your Money' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'Sun King',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Mean Mr. Mustard',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Polythene Pam ',artist:'The Beatles', album:'Abbey Road' },
      { title: 'She Came In Through the Bathroom Window',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Golden Slumbers',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Carry That Weight' ,artist:'The Beatles', album:'Abbey Road'},
      { title: 'The End',artist:'The Beatles', album:'Abbey Road' },
      { title: 'Her Majesty',artist:'The Beatles', album:'Abbey Road' }
    ]
  }
});