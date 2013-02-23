/**
 * TODO
 * 1. Recursive media search.
 */
;(function (webinos, remote, $, undefined) {
	//  se c o nd s
	//  (to)
	//  s t r in g
	var setcroindgs = function (seconds) {
		var units = [ { suffix: "h", divisor: 60*60 }, { suffix: "m", divisor: 60 }, { suffix: "s", divisor: 1 } ];
		var strings = [];

		for (var i = 0; i < units.length; i++) {
			var times = ((seconds - (seconds % units[i].divisor)) / units[i].divisor);

			if (times > 0) {
				seconds -= times * units[i].divisor;
				strings.push(times + units[i].suffix);
			}
		}

		return strings.join(" ");
	};

	var currentPage = "#browse",
		tvCurrentPage = "#live",
		libraryCurrentPage = "#browse";

	var getTypeByName = function (name) {
		switch (webinos.path.extname(name)) {
			case ".ogv":
			case ".webm":
			case ".m4v":
			case ".mp4":
				return "video";
			case ".mp3":
			case ".m4a":
			case ".ogg":
				return "audio";
			case ".jpg":
			case ".jpeg":
			case ".png":
			case ".gif":
				return "image";
			default:
				return undefined;
		}
	};

	remote.AbstractEntry.prototype.htmlify = function () {
		if (this.html === undefined) {
			var name = this.name;

			if (remote.browse.flatten) {
				name = webinos.path.relative(remote.browse.fullPath, this.fullPath);
			}

			this.html = $("<li>", {
					"class": this.isFile ? "file" : "directory"
				})
				.attr("data-" + $.mobile.ns + "filtertext", this.name)
				.append($("<a>").text(name))
				.jqmData("entry", this);

			var type = getTypeByName(this.name);

			if (type) {
				this.html.jqmData("filtertype", type);
				this.html.find("a").prepend($("<img>", {
					"src": "images/" + type + ".png",
					"class": "ui-li-icon ui-li-icon-" + type
				}));
			}
		}

		return this.html;
	};

	remote.addEventListener("browse", function (event) {
		var fullPath = event.detail;

		$("#browse-entries").empty();

		$("#browse-back").toggle(fullPath !== "/");
		$("#browse-name").text(webinos.path.basename(fullPath) || "Library");
	});

	remote.addEventListener("browse.entry.add", function (event) {
		var entry = event.detail,
			html = entry.htmlify();

		var list = $("#browse-entries"),
			index = remote.browse.entries.indexOf(entry);

		if (index == 0) {
			html.prependTo(list);
		} else {
			html.insertAfter(remote.browse.entries[index - 1].html);
		}

		list.listview("refresh");
	});

	remote.addEventListener("target.add", function (event) {
		var target = event.detail;

		if (!remote.ui.target) {
			remote.ui.target = target;
		}
	});

	remote.addEventListener("target.remove", function (event) {
		var target = event.detail;

		if (remote.ui.target === target) {
			if (remote.targets.length) {
				remote.ui.target = remote.targets[0];
			} else {
				remote.ui.target = undefined;
			}
		}
	});

	remote.ui = {};

	var target,
		targetEventTypes = ["modechange", "channelchange", "titleupdate", "timeupdate", "durationchange", "play", "pause"],
		targetEventHandlerMap = {
			"modechange": function () {
				var dynamicOrStaticPlayback = this.mode !== "image";

				$("#playback-dynamic").toggle(dynamicOrStaticPlayback);
				$("#playback-static").toggle(!dynamicOrStaticPlayback);

				switch (currentPage) {
					case "#live":
					case "#playback":
						if (this.mode === "tv") {
							remote.ui.live();
						} else {
							remote.ui.playback();
						}

						break;
					default:
						if (this.mode === "tv") {
							tvCurrentPage = "#live";
						} else {
							tvCurrentPage = "#playback";
						}

						break;
				}
			},
			"channelchange": function () {
			  if ($.mobile.activePage.attr("id") === "preview") {
	        var video = $("#preview-video");
	        video.attr("src", remote.ui.target.currentChannel.stream);
	        setTimeout(function() {
	        	video.trigger("play");
	        }, 100);
			  }
			},
			"titleupdate": function () {
				$("#playback-name").text(this.title);
			},
			"timeupdate": function () {
				var timeline = $("#playback-timeline");
					timeline.attr("value", this.currentTime);

				if (timeline.hasClass("ui-slider-input")) {
					timeline.slider("refresh");
				}

				$("#playback-currentTime").text(setcroindgs(Math.round(this.currentTime)));
			},
			"durationchange": function () {
				var timeline = $("#playback-timeline");
					timeline.attr("max", this.duration);

				if (timeline.hasClass("ui-slider-input")) {
					timeline.slider("refresh");
				}

				$("#playback-duration").text(setcroindgs(Math.round(this.duration)));
			},
			"play": function () {
				var toggle = $("#playback-toggle");

				if (toggle.hasClass("ui-btn")) {
					$(".ui-btn-text", toggle).text("Pause");
				} else {
					toggle.text("Pause");
				}
			},
			"pause": function () {
				var toggle = $("#playback-toggle");

				if (toggle.hasClass("ui-btn")) {
					$(".ui-btn-text", toggle).text("Play");
				} else {
					toggle.text("Play");
				}
			}
		},
		targetEventHandler = function (event) {
			if (event.type in targetEventHandlerMap) {
				targetEventHandlerMap[event.type].call(this, event);
			}
		};

	Object.defineProperty(remote.ui, "target", {
		get: function () {
			return target;
		},
		set: function (newTarget) {
			if (target) {
				target.removeEventListener(targetEventTypes, targetEventHandler);
			}

			target = newTarget;

			if (target) {
				target.addEventListener(targetEventTypes, targetEventHandler);

				if (target.lastUpdated) {
					var types;

					if (target.mode === "tv") {
						types = ["modechange", "channelchange"];
					} else {
						types = ["modechange", "titleupdate", "timeupdate", "durationchange", !target.paused ? "play" : "pause"];
					}

					types.forEach(function (type) {
						targetEventHandlerMap[type].call(this);
					}, target);
				}

				$("#live-title").text("Live @ " + target.name);
				$("#preview-title").text("Preview @ " + target.name);
				$("#channels-title").text("Channels @ " + target.name);
				$("#playback-title").text("Playback @ " + target.name);
			} else {
				$("#live-title").text("Live");
				$("#preview-title").text("Preview");
				$("#channels-title").text("Channels");
				$("#playback-title").text("Playback");
			}
		},
		enumerable: true,
		configurable: true
	});

	remote.ui.browse = function (fullPath) {
		if (fullPath) {
			remote.browse(fullPath);
		}

		currentPage = libraryCurrentPage = "#browse";

		$.mobile.changePage("#browse");
	};

	remote.ui.view = function (instance) {
		if (instance) {
			var type = getTypeByName(instance.entry.name),
				videoOrAudio = false, videoOrAudioOrImage = false;
				source = "http://" + instance.source.address
				  + instance.entry.fullPath;
					// + instance.entry.toURL().substring(8);

			var html;

			switch (type) {
				case "video":
					videoOrAudioOrImage = videoOrAudio = true;

					html = $("<video>", {
						"src": source,
						"controls": true
					});
					break;
				case "audio":
					videoOrAudioOrImage = videoOrAudio = true;

					html = $("<audio>", {
						"src": source,
						"controls": true
					});
					break;
				case "image":
					videoOrAudioOrImage = true;

					html = $("<img>", {
						"src": source,
						"width": "100%",
						"height": "100%"
					});
					break;
				default:
					html = "Unviewable type: " + instance.entry.name;
					break;
			}

			$("#view-name").text(instance.entry.name);
			$("#view-remote")
				.off("click")
				.on("click", function () {
					var currentTime;

					if (videoOrAudio) {
						var media = html[0];
							media.pause();

						currentTime = media.currentTime;
					}

					if (remote.targets.length > 1) {
						remote.ui.choose([{
							id: "target",
							legend: "Target:",
							options: remote.targets.map(function (target) {
								return {
									label: target.name,
									value: target,
									checked: remote.ui.target === target
								};
							})
						}], function (values) {
							remote.ui.target = values.target;

							remote.ui.playback(instance, currentTime);
						});
					} else {
						remote.ui.playback(instance, currentTime);
					}

					return false;
				})
				.toggle(videoOrAudioOrImage);

			$("#view-content").html(html);

      $("#view-copy")
        .off("click")
        .on("click", function () {
          remote.ui.choose(
            [ { id: "source"
              , legend: "Target:"
              , options: remote.sources.filter(function (source) {
                  return source !== instance.source
                }).map(function (source) {
                  return { label : source.service.serviceAddress
                         , value : source
                         }
                })
              }
            ]
          , function (values) {
              var parts = instance.entry.fullPath.substr(1).split("/")
              parts.splice(-1, 1)

              var prepare = function (entry) {
                    if (parts.length) {
                      entry.getDirectory(
                        parts.shift()
                      , { create : true }
                      , prepare
                      )
                    } else {
                      createOrTruncateAndWrite(entry)
                    }
                  }
                , createOrTruncateAndWrite = function (parent) {
                  parent.getFile(
                    "copy-" + instance.entry.name
                  , { create : true }
                  , function (entry) {
                      entry.createWriter(function (writer) {
                        writer.onwriteend = function (event) {
                          instance.entry.file(function (file) {
                            var reader = new window.FileReader()
                            reader.onloadend = function (event) {
                              writer.onwriteend = function (event) {
                                remote.ui.view()
                              }
                              writer.write(reader.result)
                            }
                            reader.readAsArrayBuffer(file)
                          })
                        }
                        writer.truncate(0)
                      })
                    })
                }

              prepare(values.source.filesystem.root)
            }
          )
        })
        .toggle(remote.sources.length > 1)

			$("#browse-now").toggle(videoOrAudio);
		}

		currentPage = libraryCurrentPage = "#view";

		$.mobile.changePage("#view");
	};

	remote.ui.live = function (action) {
		if (remote.ui.target) {
			if (action) {
				remote.ui.target.action("up");
			}

			currentPage = tvCurrentPage = "#live";

			$.mobile.changePage("#live");
		}
	};

	remote.ui.playback = function (instance, currentTime) {
		if (remote.ui.target) {
			if (instance) {
				remote.ui.target.playback(instance, currentTime);
			}

			currentPage = tvCurrentPage = "#playback";

			$.mobile.changePage("#playback");
		}
	};

	remote.ui.choose = function (parameters, callback) {
		var form = $("#choose-form");
			form.empty();

		for (var x = 0; x < parameters.length; x++) {
			var container = $("<fieldset>")
				.attr("data-" + $.mobile.ns + "role", "controlgroup")
				.append($("<legend>").text(parameters[x].legend))
				.appendTo(form);

			for (var i = 0; i < parameters[x].options.length; i++) {
				$("<input>", {
						"type": "radio",
						"name": "choose-x-" + parameters[x].id,
						"id": "choose-x-" + parameters[x].id + "-" + i
					})
					.attr("checked", parameters[x].options[i].checked || false)
					.jqmData("value", parameters[x].options[i].value)
					.appendTo(container);

				$("<label>", {
						"for": "choose-x-" + parameters[x].id + "-" + i
					})
					.text(parameters[x].options[i].label)
					.appendTo(container);
			}

			if (!$("input[name='choose-x-" + parameters[x].id + "']:checked").length) {
				$("input[name='choose-x-" + parameters[x].id + "']:first").attr("checked", true);
			}
		}

		$("<input>", {
				"type": "submit",
				"value": "OK"
			})
			.on("click", function () {
				var values = {};

				for (var x = 0; x < parameters.length; x++) {
					values[parameters[x].id] = $("input[name='choose-x-" + parameters[x].id +"']:checked").jqmData("value");
				}

				callback.call(null, values);

				return false;
			})
			.appendTo(form);

		form.trigger("create");

		$.mobile.changePage("#choose");
	};

	if (window.DeviceOrientationEvent) {
		var deviceOrientationLocked = true,
			deviceOrientationInterval = 500,
			deviceOrientationLastEvent = 0;

	    window.addEventListener("deviceorientation", function (event) {
	    	if (!deviceOrientationLocked) {
		    	var timeStamp = Date.now(),
		    		threshold = timeStamp - deviceOrientationInterval;

		        if (threshold > deviceOrientationLastEvent) {
		            var action;

		            if (event.gamma > 45) {
									 action = "right";
									//action = "left";
		            } else if (event.gamma < -45) {
									action = "left";
									// action = "right";
		            } else if (event.beta > 60) {
		            	action = "up";
		            	// action = "down";
		            } else if (event.beta < -45) {
		            	 action = "down";
		            	//action = "full";
		            }

		            if (action) {
		            	deviceOrientationLastEvent = timeStamp;

		                if (remote.ui.target) {
		                	remote.ui.target.action(action);
		                }
		            }
		        }
	        }
	    });
	}

	$(document).ready(function () {
		$(".tv").on("click", function () {
			currentPage = tvCurrentPage;

			$.mobile.changePage(tvCurrentPage);

			return false;
		});

		$(".library").on("click", function () {
			currentPage = libraryCurrentPage;

			$.mobile.changePage(libraryCurrentPage);

			return false;
		});

		$(".ui-listview-filter .ui-input-text", "#browse")
			.on("focus", function (event) {
				if (!$(this).jqmData("lastval").length) {
					remote.browse(remote.browse.fullPath, true);
				}
			})
			.on("blur", function (event) {
				if (!$(this).jqmData("lastval").length) {
					remote.browse(remote.browse.fullPath);
				}
			});

		$("#browse-back").on("click", function () {
			remote.ui.browse(webinos.path.dirname(remote.browse.fullPath));

			return false;
		});

		$("#browse-upload").on("click", function () {
			if (remote.sources.length) {
				$.mobile.changePage("#upload");
			}

			return false;
		});

		$("#browse-now").on("click", function () {
			remote.ui.view();

			return false;
		});

		$("#browse-entries").on("click", ".directory", function () {
			var entry = $(this).jqmData("entry");

			remote.ui.browse(entry.fullPath);

			return false;
		});

		var noclick = false;

		$("#browse-entries").on("click swiperight taphold", ".file", function (event) {
			// Prevent `click` event after `swiperight` or `taphold` event on non-touch devices.
			// TODO Fix `click` event after `click` event on non-touch devices (-.-*).
			if (!$.support.touch) {
				if (event.type === "click" && noclick) {
					noclick = false;

					return false;
				} else {
					noclick = true;
				}
			}

			var entry = $(this).jqmData("entry");

			var funMap = {
					"click": remote.ui.view,
					"swiperight": remote.ui.playback,
					"taphold": remote.ui.playback
				},
				fun = funMap[event.type];

			var parameters = [];

			if (entry.instances.length > 1) {
				parameters.push({
					id: "instance",
					legend: "Source:",
					options: entry.instances.map(function (instance) {
						return {
							label: instance.source.service.serviceAddress,
							value: instance
						};
					})
				});
			}

			if (event.type !== "click" && remote.targets.length > 1) {
				parameters.push({
					id: "target",
					legend: "Target:",
					options: remote.targets.map(function (target) {
						return {
							label: target.name,
							value: target,
							checked: remote.ui.target === target
						};
					})
				});
			}

			if (parameters.length) {
				remote.ui.choose(parameters, function (values) {
					if (values.target) {
						remote.ui.target = values.target;
					}

					var instance;

					if (values.instances) {
						instance = values.instance;
					} else {
						instance = entry.instances[0];
					}

					fun.call(null, instance);
				});
			} else {
				fun.call(null, entry.instances[0]);
			}

			return false;
		});

		$("#upload-image").on("change", function () {
			var self = $(this)
			self.attr("disabled", "disabled");

			function reset() {
				self.attr("value", "");
				self.removeAttr("disabled");

				remote.ui.browse(remote.browse.fullPath);
			}

			var files = this.files;
	    if (files && files.length > 0) {
      	var file = files[0];

      	function doUpload(source) {
      		source.filesystem.root.getDirectory(remote.browse.fullPath, null, function (parent) {
	          parent.getFile(file.name, { create : true, exclusive : true }, function (entry) {
              entry.createWriter(function (writer) {
                writer.onwriteend = function (event) {
                	reset()
                }
                writer.onerror = reset
                writer.write(file)
              }, reset);
	          }, reset);
      		}, reset);
      	}

				if (remote.sources.length > 1) {
					remote.ui.choose([{
						id: "source",
						legend: "Target:",
						options: remote.sources.map(function (source) {
							return {
								label: source.service.serviceAddress,
								value: source
							};
						})
					}], function (values) {
						doUpload(values.source);
					});
				} else if (remote.sources.length) {
					doUpload(remote.sources[0]);
				} else {
					reset();
				}
	    }
		});

		$("#view-back").on("click", function () {
			remote.ui.browse();

			return false;
		});

		$(".tv-volume").on("click", function () {
			var action = $(this).jqmData("action");

			if (remote.ui.target) {
				remote.ui.target.volume(action);
			}

			return false;
		});

		$("#live-mode").on("change", function () {
			var touchOrGesture = $(this).val() === "touch";

			$("#live-touch").toggle(touchOrGesture);
			$("#live-gesture").toggle(!touchOrGesture);

			deviceOrientationLocked = touchOrGesture;
		});

		$(".live-channel").on("click", function () {
			var action = $(this).jqmData("action");

			if (remote.ui.target) {
				switch (action) {
					case "next":
						remote.ui.target.action("right");
						remote.ui.target.action("up");
						break;
					case "previous":
						remote.ui.target.action("left");
						remote.ui.target.action("up");
						break;
					case "list":
						var list = $("#channels-list");
							list.empty();

						remote.ui.target.channels.forEach(function (channel) {
							$("<li>")
								.append($("<a>").text(channel.name))
								.jqmData("channel", channel)
								.appendTo(list);
						});

						list
							.off("click")
							.on("click", "li", function () {
								var channel = $(this).jqmData("channel");

								remote.ui.target.live(channel);
								remote.ui.live(); // Should handle the above as well.

								return false;
							});

						if (list.hasClass("ui-listview")) {
							list.listview("refresh");
						}

						$.mobile.changePage("#channels");

						break;
				}
			}

			return false;
		});

		$("#live-preview").on("click", function () {
		  if (remote.ui.target) {
		    var video = $("#preview-video");
		    video.attr("src", remote.ui.target.currentChannel.stream.replace("_big.ogv","_s.webm"));
			video.attr("loop","loop");
        setTimeout(function() {
        	video.trigger("play");
        }, 100);

		    $.mobile.changePage("#preview");
		  }
		});

		$("#preview").on("pagehide", function () {
		  var video = $("#preview-video");
		  video.trigger("pause");
		});

		$("#playback-live").on("click", function () {
			remote.ui.live(true);

			return false;
		});

		$("#playback-toggle").on("click", function () {
			if (remote.ui.target) {
				if (remote.ui.target.paused) {
					remote.ui.target.play();
				} else {
					remote.ui.target.pause();
				}
			}

			return false;
		});

		$(".target").on("click", function () {
			if (remote.targets.length) {
				remote.ui.choose([{
					id: "target",
					legend: "Target:",
					options: remote.targets.map(function (target) {
						return {
							label: target.name,
							value: target,
							checked: remote.ui.target === target
						};
					})
				}], function (values) {
					remote.ui.target = values.target;
				});
			}

			return false;
		});

		// Initialize (somehow) when DOM is ready.
		remote.ui.browse("/");
	});
})(webinos, remote, jQuery);
