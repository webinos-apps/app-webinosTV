Ext.define('integration.PZPConnector', {
//  requires: [
//  ],
  mixins: ['Ext.mixin.Observable'], //can fire or listen to events
  //alternateClassName: [],
  config: {
  },
//caches for all discovered pzps
  pzpCache: {
  },
//caches for all discovered services on devices
  serviceCache: {
    "DeviceStatus": {},
    "Setup": {},
    "WebNotification": {},
    "File": {},
    "App2App": {},
    "TV": {}
  },
  appSession: null, // Math.random() + Date.now(),
  retries: null, //10,
  constructor: function(config) {
    var connector = this;
    connector.initConfig(config); // We need to initialize the config options when the class is instantiated
    connector.appSession = Math.random() + Date.now();
    connector.retries = 10;
    //run the initialisation
    connector.init();
  },
  init: function() {
    var connector = this;
    if (typeof webinos === "undefined") {
      if (connector.retries > 0) {
        connector.retries--;
        setTimeout(function() {
          connector.init();
        }, 1000);
        return;
      }
      var msg = Ext.create('Ext.MessageBox', {
        title: 'Alert',
        message: 'Is your PZP started on this device? Cannot connect it.<br>' + ('Running as detached UI.').fontcolor('red'),
        buttons: [{
            text: 'OK',
            handler: function() {
              this.getParent().getParent().hide();
            }
          }
        ]
      });
      msg.show();
      setTimeout(
        function() {
          msg.destroy();
        }, 8000);
//		alert("Is your PZP started on this device? Cannot connect it.");
      return;
    }

//clear the ui
    //webinosTV.app.connectUi.clearSourceDevices();
    //webinosTV.app.connectUi.clearTargetDevices();
    //invoke discovery every 15seconds
    setInterval(connector.invokeDiscovery, 15000, connector);
    connector.invokeDiscovery(connector);
  },
  invokeDiscovery: function(connector){
    connector.discoverDevices(connector);
    connector.discoverCommunicationChannel(connector);
  },
  /**
   *
   */
  setupDevice: function(serviceAdr,type,name,connector) {
    if (connector.serviceCache.Setup[(serviceAdr)]) {
      return;
    }
    webinosTV.app.connectUi.getSourceDevicesManager().addDevice(serviceAdr, type, 0, name);
    //webinosTV.app.connectUi.getTargetDevicesManager().addDevice(serviceAdr, type, 0, name);
    webinosTV.app.connectEvents.addEventListener("scanForFiles", function(adr) {
      if (connector.serviceCache.File[(adr.serviceAdr)] && connector.serviceCache.File[(adr.serviceAdr)].bound) {
        connector.getFilesFromBoundService((adr.serviceAdr));
      } else {
        webinos.discovery.findServices(new ServiceType('http://webinos.org/api/file'),
          {
            onFound: function(fileService) {
              if (adr.serviceAdr !== fileService.serviceAddress) {
                return;
              }
              connector.serviceCache.File[(fileService.serviceAddress)] = {found: fileService};
              fileService.bindService(
                {onBind: function(fileService) {
                    connector.serviceCache.File[(fileService.serviceAddress)].bound = fileService;
                    connector.getFilesFromBoundService(fileService.serviceAddress);
                  }},
              {onUnbind: function() {
                  console.log("onUnbind")
                }},
              {onServiceAvailable: function() {
                  console.log("onServiceAvailable")
                }},
              {onServiceUnavailable: function() {
                  console.log("onServiceUnavailable")
                }},
              {onError: function() {
                  console.log("onError")
                }}
              );
            }
          },
        {},
          {serviceId: adr.serviceAdr}
        );
      }
      //in addition to files, check for tv api
      if (connector.serviceCache.TV[adr.serviceAdr] && connector.serviceCache.TV[adr.serviceAdr].bound) {
        connector.getChannelsFromBoundService(adr.serviceAdr);
      } else {
        webinos.discovery.findServices(new ServiceType('http://webinos.org/api/tv'),
          {
            onFound: function(tvService) {
              if (adr.serviceAdr !== tvService.serviceAddress) {
                return;
              }
              connector.serviceCache.TV[tvService.serviceAddress] = {found: tvService};
              tvService.bindService(
                {onBind: function(fileService) {
                    connector.serviceCache.TV[tvService.serviceAddress].bound = tvService;
                    connector.getChannelsFromBoundService(tvService.serviceAddress);
                  }},
              {onUnbind: function() {
                  console.log("onUnbind")
                }},
              {onServiceAvailable: function() {
                  console.log("onServiceAvailable")
                }},
              {onServiceUnavailable: function() {
                  console.log("onServiceUnavailable")
                }},
              {onError: function() {
                  console.log("onError")
                }}
              );
            }
          },
        {},
          {serviceId: adr.serviceAdr}
        );
      }
    });
    webinosTV.app.connectEvents.addEventListener("playFiles", function(data) {
      connector.playFiles(data,connector);
    });
    webinosTV.app.connectEvents.addEventListener("stopFiles", function(data) {
      var v = document.getElementsByTagName("video");
      for (var i = v.length - 1; i >= 0; i--) {
        v[i].src = "";
      }
      webinosTV.app.connectUi.getMediaPlayerManager().hideMediaPlayer();
    });
    webinosTV.app.connectEvents.addEventListener("queueFiles", function(data) {
      connector.invokeRemotely("queueFiles",data,connector);
    });
    connector.serviceCache.Setup[(serviceAdr)] = true;
  },
  playFiles: function(data,connector){
      try {
        if (data.source && data.media && data.media.length) {
          console.log(typeof connector.serviceCache,connector.serviceCache);

          switch(data.media[0].split("|")[2]){
            case 'video':
              connector.serviceCache.File[data.source].files.videos[data.media[0].split("|")[1]].getLink(function(link) {
                for (var tix = 0; tix < data.targets.length; tix++) {
                  if(webinos.session.getPZPId()===data.targets[tix] && (!!!data.appSession || data.appSession!=connector.appSession)){
                    webinosTV.app.connectUi.getMediaPlayerManager().showModalVideo(link, "resources/images/svg/tv.svg");
                  }
                }
              });
            break;
            case 'audio':
              connector.serviceCache.File[data.source].files.audios[data.media[0].split("|")[1]].getLink(function(link) {
                for (var tix = 0; tix < data.targets.length; tix++) {
                  if(webinos.session.getPZPId()===data.targets[tix] && (!!!data.appSession || data.appSession!=connector.appSession)){
                    webinosTV.app.connectUi.getMediaPlayerManager().showModalAudio(link, "resources/images/svg/music.svg");
                  }
                }
              });
            break;
            case 'image':
              connector.serviceCache.File[data.source].files.images[data.media[0].split("|")[1]].getLink(function(link) {
                for (var tix = 0; tix < data.targets.length; tix++) {
                  if(webinos.session.getPZPId()===data.targets[tix] && (!!!data.appSession || data.appSession!=connector.appSession)){
                    webinosTV.app.connectUi.getMediaPlayerManager().showModalVideo("", link);
                  }
                }
              });
            break;
            case 'tvchannel':
                for (var tix = 0; tix < data.targets.length; tix++) {
                  if(webinos.session.getPZPId()===data.targets[tix] && (!!!data.appSession || data.appSession!=connector.appSession)){
                    webinosTV.app.connectUi.getMediaPlayerManager().showModalVideo(data.media[0].split("|")[1], "resources/images/svg/tv.svg");
                  }
                }
            
            break;
            default:
        }
        if(data&&!!!data.appSession){
        //play remotely
          connector.invokeRemotely("playFiles",{targets:data.targets,source:data.source,media:[data.media[0]],appSession:connector.appSession},connector);
        }
        }
      } catch (e) {
          console.warn(e)
      }
  },
  invokeRemotely: function(action,data,connector){
    if(data.source && connector.serviceCache.App2App){
      for(var a2aix in connector.serviceCache.App2App){
        if(connector.serviceCache.App2App.hasOwnProperty(a2aix))
       connector.serviceCache.App2App[a2aix].channelProxy.send(
        {action: action, message: JSON.stringify(data)},
      // callback invoked when the message is accepted for processing
      function(success) {
        // ok, but no action needed in our example
      },
        function(error) {
          console.log("Could not send message: " + error.message);
        }
      );         
      }
    
    }
  },
  /**
   *
   */
  handleMessage: function(msgdata,connector){
    
    if(msgdata&&msgdata.action){
      var data = "";
      try{
        data = JSON.parse(msgdata.message);
      }catch(e){}
      switch(msgdata.action){
        case "playFiles":
          connector.playFiles(data,connector);
        break;
        case "queueFiles":
          webinosTV.app.connectUi.getQueuesManager().addToDevicesQueue(data.media, data.targets);
        break;
        default:
      }
    }
  },
  /**
   *
   */
  getFilesFromBoundService: function(serviceAdr) {
    var connector = this;
    if (connector.serviceCache.File[(serviceAdr)].bound) {
      connector.serviceCache.File[(serviceAdr)].bound.requestFileSystem(1, 1024, function(filesystem) {

        var reader = filesystem.root.createReader();
        var index = "";
        var indexEnd = "";
        var filename = "";
        var successCallback = function(entries) {

//clear media
          webinosTV.app.connectUi.getMediaItemsManager().clearMediaItems('video');
          webinosTV.app.connectUi.getMediaItemsManager().clearMediaItems('audio');
          webinosTV.app.connectUi.getMediaItemsManager().clearMediaItems('image');
          connector.serviceCache.File[(serviceAdr)].files = {videos: {},audios: {}, images: {}};
          for (var i = entries.length - 1; i >= 0; i--) {
            if (entries[i].isFile) {

//store refs at serviceCache.File[serviceAdr]
              var ext = entries[i].fullPath.match(/\.([^\.]+)$/);
              index = entries[i].fullPath.lastIndexOf("/") + 1;
              indexEnd = entries[i].fullPath.lastIndexOf(".");
              filename = entries[i].fullPath.substring(index, indexEnd);
              filename = filename.replace(/_/g, " ");
              filename = filename.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              });
              if (ext) {
                switch (ext[1].toLowerCase()) {
                  case "mp4":
                  case "webm":
                  case "mov":
                    webinosTV.app.connectUi.getMediaItemsManager().addMediaItem({file: entries[i].fullPath, title: filename, type: 'video',id:serviceAdr+"|"+entries[i].fullPath +"|video"});
                    connector.serviceCache.File[(serviceAdr)].files.videos[entries[i].fullPath] = entries[i];
                    break;
                  case "mp3":
                  case "ogg":
                    webinosTV.app.connectUi.getMediaItemsManager().addMediaItem({file: entries[i].fullPath, title: filename, type: 'audio',id:serviceAdr+"|"+entries[i].fullPath +"|audio"});
                    connector.serviceCache.File[(serviceAdr)].files.audios[entries[i].fullPath] = entries[i];
                    break;
                  case "png":
                  case "jpg":
                  case "jpeg":
                    webinosTV.app.connectUi.getMediaItemsManager().addMediaItem({file: entries[i].fullPath, title: filename, type: 'images',id:serviceAdr+"|"+entries[i].fullPath +"|image"});
                    connector.serviceCache.File[(serviceAdr)].files.images[entries[i].fullPath] = entries[i];
                    break;
                  default:
                    console.log("Unknown file extention " + ext[1]);
                }
              }
            }
          }
          ;
        };
        var errorCallback = function(error) {
          console.log("Error reading directory (#" + error.name + ")");
        };
        reader.readEntries(successCallback, errorCallback);
      }, function(error) {
        console.log("Error requesting filesystem (#" + error.code + ")");
      });
    } else {
      console.log("Error getting files, no bound service for " + serviceAdr);
    }
  },
  /**
   *
   */
  getChannelsFromBoundService: function(serviceAdr) {
    var connector = this;
    webinosTV.app.connectUi.getMediaItemsManager().clearMediaItems('tvchannel');
    if (connector.serviceCache.TV[(serviceAdr)].bound) {

      var successCallback = function(sources){
        if(sources && sources.length){
          sources=sources[0];
        for (var i = 0; sources.channelList.length  > i; i++) {
            webinosTV.app.connectUi.getMediaItemsManager().addMediaItem({file: sources.channelList[i].stream, title: sources.channelList[i].name, type: 'tvchannel',id:serviceAdr+"|"+sources.channelList[i].stream +"|tvchannel"});

        };
      }
      };
      var errorCallback = function(){};
      connector.serviceCache.TV[(serviceAdr)].bound.tuner.getTVSources(/*TVSuccessCB*/ successCallback, /*optional TVErrorCB*/ errorCallback);
    }
  },
  /**
   *
   */
  onNotificationFoundHandler: function(service) {
    var connector = this;
    if (!connector.serviceCache.WebNotification[(service.serviceAddress)]) {
      connector.serviceCache.WebNotification[(service.serviceAddress)] = {found: service};
      service.bindService(
        {onBind: function(service) {
            serviceCache.WebNotification[(service.serviceAddress)].bound = service;
            //welcome noticifation
            //var wn = new service.WebNotification("title", {body: "body", iconUrl: "icon"});

            service.onClick = function(res) {
//if (res == "onClick") launchApp("http://192.168.1.100:8080/apps/katwarn_client/index.html", adr);
              if (res === "onClick")
                alert("click");
            };
          }},
      {onUnbind: function() {
          alert("onUnbind");
        }},
      {onServiceAvailable: function() {
          alert("onServiceAvailable");
        }},
      {onServiceUnavailable: function() {
          alert("onServiceUnavailable");
        }},
      {onError: function() {
          alert("onError");
        }}


      );
    }

    if (!connector.pzpCache[(service.serviceAddress)]) {
      connector.pzpCache[(service.serviceAddress)] = {
        "available": true
      };
      //new pzp/device discovered, let the user decide on the device type. FIXME: in future this should be automated
      console.log(service);
    }

    if (!localStorage["devId_" + service.serviceAddress + "_type"]) {
//Missing Device Status API fix, ask user for device types and names

      webinosTV.app.connectUi.requestDevNameAndType(service.serviceAddress, function() {
//pop up notification cb
        service.WebNotification("webinosTV", {body: "You are now configuring this device.", iconUrl: "icon"});
      }, function(res) {
        localStorage["devId_" + service.serviceAddress + "_type"] = res.type;
        localStorage["devId_" + service.serviceAddress + "_name"] = res.name;
        connector.setupDevice(service.serviceAddress);
      });
    } else {
      connector.setupDevice(service.serviceAddress);
    }
  },
  /**
   *
   */
  onApp2AppFoundHandler: function(service, connector) {
    if (!connector.serviceCache.App2App[(service.serviceAddress)]) {
      connector.serviceCache.App2App[(service.serviceAddress)] = {found: service};
      service.bindService({
        onBind: function(service) {
          connector.serviceCache.App2App[(service.serviceAddress)].bound = service;
          var properties = {};
          // we allow all channel clients to send and receive
          properties.mode = "send-receive";
          properties.reclaimIfExists = true;
          var config = {};
          // the namespace is an URN which uniquely defines the channel in the personal zone
          config.namespace = "urn:webinos-org:webinosTV-"+btoa(webinos.session.getPZHId());
          config.properties = properties;
          // we can attach application-specific information to the channel
          config.appInfo = {};
          service.createChannel(
            config,
            // callback invoked when a client want to connect to the channel
              function(request) {
                // we allow all clients to connect (we could also for example check some application-
                // specific information in the request.requestInfo to make a decision)
                var accepted = false;
                accepted = true; //Should be checked!
                if (accepted) {

                  //request.requestInfo.name;
                  //request.from.peerId;

                }
                return accepted;
              },
              // callback invoked to receive messages
                function(message) {
                  console.log("master:" + JSON.stringify(message.contents));
                  connector.handleMessage(message.contents,connector);
                },
                // callback invoked on success, with the client's channel proxy as parameter
                  function(channelProxy) {
                    connector.serviceCache.App2App[(service.serviceAddress)].channelProxy = channelProxy;
                   // alert("masterJoins");
                    window.onbeforeunload = function() {
                      channelProxy.send(
                        {action: "creatorLeaves", message: service.serviceAddress},
                      // callback invoked when the message is accepted for processing
                      function(success) {
                        // ok, but no action needed in our example
                      },
                        function(error) {
                          console.log("Could not send message: " + error.message);
                        }
                      );
                      channelProxy.disconnect();
                    };
                    //connectToChannel(channelProxy,service.serviceAddress);



                  },
                  function(error) {
                    console.log("Could not create channel: " + error.message);
                    connector.channelFind(service.serviceAddress);
                  }
                );
              }
          });
      }
  },
  /**
   *
   */
  channelFind: function(adr) {
    var connector = this;
    //try to find channel first
    connector.serviceCache.App2App[(adr)].bound.searchForChannels(
      // the namespace to search for (can include a wildcard "*" instead of "example"
      // to search for all channels with prefix "org-webinos")
      "urn:webinos-org:webinosTV-"+btoa(webinos.session.getPZHId()),
      // no other zones need to be searched, only its own personal zone
        [],
        // callback invoked on each channel found, we expect it to be called at most once
          // because we did not use a wildcard
            function(channelProxy) {
              // we directly request to connect to the channel
              connector.connectToChannel(channelProxy, adr);
            },
            // callback invoked when the search query is accepted for processing
              function(success) {
                console.log("channel search accepted.");
              },
              function(error) {
                console.log("Could not search for channel: " + error.message);
              }
            );
          },
        /**
         *
         */
        connectToChannel: function(channelProxy, adr) {
          var connector = this;
          // we can include application-specific information to the connect request

          var requestInfo = new Object();
          requestInfo.name = webinos.session.getPZPId() + "_" + Date.now();
          channelProxy.connect(
            requestInfo,
            // callback invoked to receive messages, only after successful connect
              function(message) {
                if (message.contents && message.contents.action === "creatorLeaves") {
                  //select randomly the next creator.
                  setTimeout(function() {
                    delete connector.serviceCache.App2App[adr];
                  }, 200 * Math.random());
                } else {
                  console.log("client:" + JSON.stringify(message.contents));
                  connector.handleMessage(message.contents,connector);
                }
              },
              // callback invoked when the client is successfully connected (i.e. authorized by the creator)
                function(success) {
                  // make the proxy available now that we are successfully connected
                  connector.serviceCache.App2App[(adr)].channelProxy = channelProxy;
                  channelProxy.send(
                    {message: adr, action: "clientJoins", appSession: connector.appSession},
                  // callback invoked when the message is accepted for processing
                  function(success) {
                    // ok, but no action needed in our example
                  },
                    function(error) {
                      console.log("Could not send message: " + error.message);
                    }
                  );
                },
                function(error) {
                  console.log("Could not connect to channel: " + error.message);
                }
              );
            },
          discoverCommunicationChannel: function(connector) {
            webinos.discovery.findServices(new ServiceType("http://webinos.org/api/app2app"), {
              onFound: function(srv){connector.onApp2AppFoundHandler(srv,connector);},
              onError: function(error) {
                console.log("Error finding service: " + error.message + " (#" + error.code + ")");
              }
            });
          },
          discoverDevices: function(connector){
                webinos.discovery.findServices(new ServiceType('http://webinos.org/api/devicestatus'),
                {onFound:function(service){connector.onDeviceStatusFoundHandler(service,connector);}});
          },
          onDeviceStatusFoundHandler: function(service,connector) {
            if (!connector.serviceCache.DeviceStatus[(service.serviceAddress)]) {
              connector.serviceCache.DeviceStatus[(service.serviceAddress)] = {found: service};
              service.bindService(
                {onBind: function(service) {
                    connector.serviceCache.DeviceStatus[(service.serviceAddress)].bound = service;
                    var prop = {
                        component:"_DEFAULT",
                        aspect:"Device",
                        property:"type"
                    };
                    var successCB = function (value) {
                        value=(value==="smartphone")?"phone":value;
                        //webinos.session.addListener('friendlyName', function(msg){
                          var friendlyName = service.serviceAddress;//(service.serviceAddress.split("'s ").length>1)?service.serviceAddress.split("'s ")[1]:service.serviceAddress;
                          connector.setupDevice(service.serviceAddress,value,friendlyName,connector);
                        //});
                        //var options = {"type": 'prop', "payload":{"status": "getFriendlyName"}};
                        //webinos.session.message_send(options, service.serviceAddress);
                    };
                    var errorCB = function (value) {
                        console.log("Error: " + value);
                    };
                    service.getPropertyValue(successCB, errorCB, prop);
                  }},
              {onUnbind: function() {
                  console.log("to be implemented.");
                }},
              {onServiceAvailable: function() {
                  console.log("to be implemented.");
                }},
              {onServiceUnavailable: function() {
                  console.log("to be implemented.");
                }},
              {onError: function() {
                  console.log("to be implemented.");
                }}


              );
            }
        }

    });
