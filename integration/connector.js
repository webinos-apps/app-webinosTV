function run_connector_connect() {

//caches for all discovered pzps
  var pzpCache = {
  };
//caches for all discovered services on devices
  var serviceCache = {
    "Setup": {},
    "WebNotification": {},
    "File": {},
    "App2App": {}
  };

  var setupDevice = function(serviceAdr) {
    if (serviceCache.Setup[serviceAdr]) {
      return;
    }
    webinosTV.app.connectUi.addSourceDevice(serviceAdr, localStorage["devId_" + serviceAdr + "_type"], 0, localStorage["devId_" + serviceAdr + "_name"]);
    webinosTV.app.connectUi.addTargetDevice(serviceAdr, localStorage["devId_" + serviceAdr + "_type"], 0, localStorage["devId_" + serviceAdr + "_name"]);

    webinosTV.app.connectEvents.addEventListener("scanForFiles", function(adr) {
      if (serviceCache.File[adr.serviceAdr] && serviceCache.File[adr.serviceAdr].bound) {
        getFilesFromBoundService(adr.serviceAdr);
      } else {
        webinos.discovery.findServices(new ServiceType('http://webinos.org/api/file'),
          {
            onFound: function(fileService) {
              if (adr.serviceAdr != fileService.serviceAddress) {
                return;
              }
              serviceCache.File[fileService.serviceAddress] = {found: fileService};
              fileService.bindService(
                {onBind: function(fileService) {
                    serviceCache.File[fileService.serviceAddress].bound = fileService;
                    getFilesFromBoundService(fileService.serviceAddress);
                  }},
              {onUnbind: function() {
                  alert("onUnbind")
                }},
              {onServiceAvailable: function() {
                  alert("onServiceAvailable")
                }},
              {onServiceUnavailable: function() {
                  alert("onServiceUnavailable")
                }},
              {onError: function() {
                  alert("onError")
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
      try {
        if (data.source && data.files && data.files.length) {
          serviceCache.File[data.source].files.videos[data.files[0]].getLink(function(link) {
            //  webinosTV.app.connectUi.hideVideoPreview();

            for (var tix = 0; tix < data.targets.length; tix++) {
              // if(webinos.session.getPZPId()===data.targets[tix]){
              webinosTV.app.connectUi.showModalVideo(link, "resources/images/svg/tv.svg");
              //}else{

              //}
            }
            //console.log(link)
            // webinosTV.app.connectUi.showModalVideo(link,"resources/images/svg/tv.svg");

          });

          //
        }
      } catch (e) {
      }
    });

    webinosTV.app.connectEvents.addEventListener("stopFiles", function(data) {
      var v = document.getElementsByTagName("video");
      for (var i = v.length - 1; i >= 0; i--) {
        v[i].src = "";
      }
      ;
      webinosTV.app.connectUi.hideVideoPreview();
    });


    serviceCache.Setup[serviceAdr] = true;
  }

  var getFilesFromBoundService = function(serviceAdr) {
    if (serviceCache.File[serviceAdr].bound) {
      serviceCache.File[serviceAdr].bound.requestFileSystem(1, 1024, function(filesystem) {

        var reader = filesystem.root.createReader();
        var index = "";
        var indexEnd = "";
        var filename = "";

        var successCallback = function(entries) {

          //clear media
          webinosTV.app.connectUi.clearMediaItems('videos');
          serviceCache.File[serviceAdr].files = {videos: {}};

          for (var i = entries.length - 1; i >= 0; i--) {
            if (entries[i].isFile) {

              //store refs at serviceCache.File[serviceAdr]
              var ext = entries[i].fullPath.match(/\.([^\.]+)$/);
              if (ext) {
                switch (ext[1]) {
                  case "mp4":
                  case "MP4":
                  case "webm":
                  case "WEBM":
                    index = entries[i].fullPath.lastIndexOf("/") + 1;
                    indexEnd = entries[i].fullPath.lastIndexOf(".");
                    filename = entries[i].fullPath.substring(index, indexEnd);
                    filename = filename.replace(/_/g, " ");
                    filename = filename.replace(/\w\S*/g, function(txt) {
                      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    webinosTV.app.connectUi.addMediaItem({file: entries[i].fullPath, title: filename}, 'videos');
                    serviceCache.File[serviceAdr].files.videos[entries[i].fullPath] = entries[i];

                    break;

                  case "mp3":
                  case "MP3":
                  case "ogg":
                  case "OGG":
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
  }


  var onNotificationFoundHandler = function(service) {

    if (!serviceCache.WebNotification[service.serviceAddress]) {
      serviceCache.WebNotification[service.serviceAddress] = {found: service};
      service.bindService(
        {onBind: function(service) {
            serviceCache.WebNotification[service.serviceAddress].bound = service;
            //welcome noticifation
            //var wn = new service.WebNotification("title", {body: "body", iconUrl: "icon"});

            service.onClick = function(res) {
              //if (res == "onClick") launchApp("http://192.168.1.100:8080/apps/katwarn_client/index.html", adr);
              if (res == "onClick")
                alert("click");

            };
          }},
      {onUnbind: function() {
          alert("onUnbind")
        }},
      {onServiceAvailable: function() {
          alert("onServiceAvailable")
        }},
      {onServiceUnavailable: function() {
          alert("onServiceUnavailable")
        }},
      {onError: function() {
          alert("onError")
        }}


      );
    }

    if (!pzpCache[service.serviceAddress]) {
      pzpCache[service.serviceAddress] = {
        "available": true
      }
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
        setupDevice(service.serviceAddress);
      });
    } else {
      setupDevice(service.serviceAddress);
    }
  };

  var onApp2AppFoundHandler = function(service) {
    if (!serviceCache.App2App[service.serviceAddress]) {
      serviceCache.App2App[service.serviceAddress] = {found: service};
      service.bindService({
        onBind: function(service) {
          serviceCache.App2App[service.serviceAddress].bound = service;


          var properties = {};
          // we allow all channel clients to send and receive
          properties.mode = "send-receive";


          var config = {};
          // the namespace is an URN which uniquely defines the channel in the personal zone
          config.namespace = "urn:webinos-org:webinosTV";
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
                  alert("master:" + JSON.stringify(message.contents));
                },
                // callback invoked on success, with the client's channel proxy as parameter
                  function(channelProxy) {
                    serviceCache.App2App[service.serviceAddress].channelProxy = channelProxy;
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
                    }
                    //connectToChannel(channelProxy,service.serviceAddress);



                  },
                  function(error) {
                    console.log("Could not create channel: " + error.message);
                    channelFind(service.serviceAddress);
                  }
                );


              }
          });
      }
  };

  var channelFind = function(adr) {
    //try to find channel first
    serviceCache.App2App[adr].bound.searchForChannels(
      // the namespace to search for (can include a wildcard "*" instead of "example"
      // to search for all channels with prefix "org-webinos")
      "urn:webinos-org:webinosTV",
      // no other zones need to be searched, only its own personal zone
        [],
        // callback invoked on each channel found, we expect it to be called at most once
          // because we did not use a wildcard
            function(channelProxy) {
              // we directly request to connect to the channel
              connectToChannel(channelProxy, adr);
            },
            // callback invoked when the search query is accepted for processing
              function(success) {
                console.log("channel search accepted.");

              },
              function(error) {
                alert("Could not search for channel: " + error.message);
              }
            );
          };

        var connectToChannel = function(channelProxy, adr) {
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
                    serviceCache.App2App[adr] = null;
                  }, 200 * Math.random());
                } else {
                  alert("client:" + JSON.stringify(message.contents));
                }
              },
              // callback invoked when the client is successfully connected (i.e. authorized by the creator)
                function(success) {
                  // make the proxy available now that we are successfully connected
                  serviceCache.App2App[adr].channelProxy = channelProxy;
                  channelProxy.send(
                    {message: adr, action: "clientJoins", appSession: appSession},
                  // callback invoked when the message is accepted for processing
                  function(success) {
                    // ok, but no action needed in our example
                  },
                    function(error) {
                      alert("Could not send message: " + error.message);
                    }
                  );
                },
                function(error) {
                  console.log("Could not connect to channel: " + error.message);
                }
              );
            };

          var discoverServices = function() {
            webinos.discovery.findServices(new ServiceType('http://webinos.org/api/webnotification'),
              {
                onFound: onNotificationFoundHandler,
                onLost: function(service) {
                  console.log("LOST ", service);
                },
                onError: function(error) {
                  console.log("error ", error);
                }
              }

            );

            webinos.discovery.findServices(new ServiceType("http://webinos.org/api/app2app"), {
              onFound: onApp2AppFoundHandler,
              onError: function(error) {
                console.log("Error finding service: " + error.message + " (#" + error.code + ")");
              }
            });
          };

          var appSession = Math.random() + Date.now();

          var retries = 10;
          var init = function() {
            if (typeof webinos === "undefined") {
              if (retries > 0) {
                retries--;
                setTimeout(function() {
                  init();
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
            webinosTV.app.connectUi.clearSourceDevices();
            webinosTV.app.connectUi.clearTargetDevices();

            //invoke discovery every 15seconds
            setInterval(discoverServices, 15000);
            discoverServices();
          };

//run the initialisation
          init();
        }
      ;

