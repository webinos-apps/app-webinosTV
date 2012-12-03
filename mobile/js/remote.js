/**
 * TODO
 * (1. Source management.)
 */

;(function (webinos) {
	webinos.file._Service = webinos.file.Service
	webinos.file.Service = Service

	webinos.util.inherits(Service, webinos.file._Service)
	function Service(object, rpc) {
		Service.parent.call(this, object, rpc)
	}

	Service.prototype.getAddress = function (successCallback, errorCallback) {
		var request = this.rpc.createRPC(this, "getAddress")
		this.rpc.executeRPC(request, successCallback, errorCallback)
	}
})(webinos)

;(function (webinos, undefined) {
	webinos.EventTarget = function () {
		var eventListeners = {};

		this.addEventListener = function (type, callback) {
			if (Array.isArray(type)) {
				for (var i = 0; i < type.length; i++) {
					this.addEventListener(type[i], callback);
				}

				return;
			}

			if (!(type in eventListeners)) {
				eventListeners[type] = [];
			}

			if (eventListeners[type].indexOf(callback) === -1) {
				eventListeners[type].push(callback);
			}
		};

		this.removeEventListener = function (type, callback) {
			if (Array.isArray(type)) {
				for (var i = 0; i < type.length; i++) {
					this.removeEventListener(type[i], callback);
				}

				return;
			}

			if (type in eventListeners) {
				var index = eventListeners[type].indexOf(callback);

				if (index !== -1) {
					eventListeners[type].splice(index, 1);

					if (!eventListeners[type].length) {
						delete eventListeners[type];
					}
				}
			}
		};

		this.dispatchEvent = function (event) {
			if (event.type in eventListeners) {
				event.target = this;

				for (var i = 0; i < eventListeners[event.type].length; i++) {
					eventListeners[event.type][i].call(this, event);
				}
			}
		};
	};

	webinos.Event = function (type, eventInitDict) {
		this.type = type;
		this.timeStamp = Date.now();
	};

	webinos.CustomEvent = function (type, eventInitDict) {
		webinos.Event.call(this, type, eventInitDict);

		this.detail = eventInitDict.detail;
	};
})(webinos);

(function (webinos, remote, undefined) {
	// TODO Remove dependency on async.js (is the queue still necessary at all?).
	// TODO Check token on `push` and clear tasks array on `clear`.
	var queue = async.queue(function (data, callback) {
		try {
			if (data.token >= queue.token) {
				data.fun();
			}
		} finally {
			callback();
		}
	}, 1);

	queue.token = 0;
	queue.clear = function () {
		queue.token++;
	};

	remote.sources = [];
	remote.sources.add = function () {
		Array.prototype.push.apply(this, arguments);

		for (var x = 0; x < arguments.length; x++) {
			remote.dispatchEvent(new webinos.CustomEvent("source.add", {
				detail: arguments[x]
			}));
		}
	};

	remote.addEventListener("source.add", function (event) {
		var source = event.detail;

		if (remote.browse.fullPath !== undefined) {
			source.browse(remote.browse.fullPath, remote.browse.flatten);
		}
	});

  // Hopefully this runs before anyone trying to play something...
  remote.addEventListener("source.add", function (event) {
    var source = event.detail

    source.service.getAddress(function (address) {
      source.address = address
    })
  })

	remote.Source = function (service, filesystem) {
		this.service = service;
		this.filesystem = filesystem;
	};

	remote.Source.prototype.browse = function (fullPath, flatten) {
		var source = this,
			token = queue.token;

		this.filesystem.root.getDirectory(fullPath, { create: false }, function (directory) {
			var reader = directory.createReader();

			var successCallback = function (entries) {
				if (entries.length == 0) {
					return;
				}

				queue.push({
					token: token,
					fun: function () {
						entries.forEach(function (entry) {
							var abstractEntry;

							if (entry.isFile) {
								abstractEntry = new remote.AbstractFileEntry(entry.fullPath);
							} else if (entry.isDirectory) {
								if (!flatten) {
									abstractEntry = new remote.AbstractDirectoryEntry(entry.fullPath);
								} else {
									source.browse(entry.fullPath, flatten);

									return;
								}
							}

							abstractEntry.instances.push({
								source: source,
								entry: entry
							});

							remote.browse.entries.add(abstractEntry);
						});
					}
				});

				reader.readEntries(successCallback);
			};

			reader.readEntries(successCallback);
		});
	};

	remote.AbstractEntry = function (fullPath) {
		this.instances = [];

		this.name = webinos.path.basename(fullPath);
		this.fullPath = fullPath;
	};

	remote.AbstractEntry.prototype.isFile = false;
	remote.AbstractEntry.prototype.isDirectory = false;

	remote.AbstractDirectoryEntry = function (fullPath) {
		remote.AbstractEntry.call(this, fullPath);
	};

	webinos.util.inherits(remote.AbstractDirectoryEntry, remote.AbstractEntry);

	remote.AbstractDirectoryEntry.prototype.isDirectory = true;

	remote.AbstractFileEntry = function (fullPath) {
		remote.AbstractEntry.call(this, fullPath);
	};

	webinos.util.inherits(remote.AbstractFileEntry, remote.AbstractEntry);

	remote.AbstractFileEntry.prototype.isFile = true;

	remote.browse = function (fullPath, flatten) {
		var relativeFlatten = false;

		if (typeof flatten === "boolean") {
			relativeFlatten = flatten;
		}

		remote.browse.fullPath = fullPath;
		remote.browse.flatten = relativeFlatten;
		remote.browse.entries.splice(0, remote.browse.entries.length);

		queue.clear();

		remote.sources.forEach(function (source) {
			source.browse(fullPath, relativeFlatten);
		});

		remote.dispatchEvent(new webinos.CustomEvent("browse", {
			detail: fullPath
		}));
	};

	remote.browse.entries = [];
	remote.browse.entries.add = function () {
		arguments:
		for (var x = 0; x < arguments.length; x++) {
			var i;
			for (i = 0; i < this.length; i++) {
				if (this[i].fullPath === arguments[x].fullPath &&
						(this[i].isFile && arguments[x].isFile || this[i].isDirectory && arguments[x].isDirectory)) {
					this[i].instances.push.apply(this[i].instances, arguments[x].instances);

					continue arguments;
				} else if (this[i].fullPath > arguments[x].fullPath) {
					break;
				}
			}

			this.splice(i, 0, arguments[x]);

			remote.dispatchEvent(new webinos.CustomEvent("browse.entry.add", {
				detail: arguments[x]
			}));
		}
	};

	webinos.discovery.findServices(new ServiceType("http://webinos.org/api/file"), {
		onFound: function (service) {
			service.bindService({
				onBind: function () {
					service.requestFileSystem(1, 0, function (filesystem) {
						remote.sources.add(new remote.Source(service, filesystem));
					});
				}
			});
		}
	});

	var messaging = Object.create(new webinos.EventTarget());

	messaging.dispatchMessage = function (message) {
		this.dispatchEvent(new webinos.CustomEvent(message.type, {
			detail: message.payload
		}));
	};

	messaging.addEventListener("helloPlayer", function (event) {
		var target = remote.targets.find(event.detail.id);

		if (!target) {
			target = new remote.Target(event.detail.id, event.detail.name);

			remote.targets.add(target);
		}

		target.update({
			mode: event.detail.mode,
			title: event.detail.title
		}, event.timeStamp);
	});

	messaging.addEventListener(["channels", "play", "pause", "status"], function (event) {
		if (event.detail.type === "player" || event.type === "channels" && event.detail.type === "response") {
			var target = remote.targets.find(event.detail.id);

			if (target) {
				var pausedMap = {
						"channels": undefined,
						"play": false,
						"pause": true,
						"status": false // Sure?
					},
					paused = pausedMap[event.type];

				target.update({
					mode: event.detail.mode,
					channels: event.detail.channels,
					currentChannel: event.detail.currentChannel,
					title: event.detail.title,
					currentTime: event.detail.time,
					duration: event.detail.duration,
					paused: paused
				}, event.timeStamp);
			}
		}
	});

	remote.targets = [];
	remote.targets.add = function () {
		Array.prototype.push.apply(this, arguments);

		for (var x = 0; x < arguments.length; x++) {
			remote.dispatchEvent(new webinos.CustomEvent("target.add", {
				detail: arguments[x]
			}));
		}
	};

	remote.addEventListener("target.add", function (event) {
		var target = event.detail;

		messaging.service.createWebinosEvent("channels", null, {
			id: target.id,
			type: "request"
		}).dispatchWebinosEvent();
	});

	remote.targets.find = function (id) {
		for (var i = 0; i < this.length; i++) {
			// Use non-strict equality on `id`.
			if (this[i].id == id) {
				return this[i];
			}
		}

		return null;
	};

	remote.targets.remove = function () {
		for (var x = 0; x < arguments.length; x++) {
			var index = remote.targets.indexOf(arguments[x]);

			remote.targets.splice(index, 1);

			remote.dispatchEvent(new webinos.CustomEvent("target.remove", {
				detail: arguments[x]
			}));
		}
	};

	remote.Target = function (id, name) {
		webinos.EventTarget.call(this);

		this.id = id;
		this.name = name;
	};

	webinos.util.inherits(remote.Target, webinos.EventTarget);

	remote.Target.prototype.lastUpdated = 0;

	remote.Target.prototype.mode = undefined;
	remote.Target.prototype.channels = [];
	remote.Target.prototype.currentChannel = undefined;
	remote.Target.prototype.title = "";

	remote.Target.prototype.currentTime = 0;
	remote.Target.prototype.duration = NaN;
	remote.Target.prototype.paused = true;

	remote.Target.prototype.update = function (updateDict, updateTimeStamp) {
		var typeMap = {
			"mode": "modechange",
			"channels": "channelsupdate",
			"currentChannel": "channelchange",
			"title": "titleupdate",
			"currentTime": "timeupdate",
			"duration": "durationchange",
			"paused": function (oldValue, newValue) {
				return !newValue ? "play" : "pause";
			}
		};

		for (key in updateDict) {
			if (updateDict[key] !== undefined && this[key] !== updateDict[key]) {
				var type;

				if (!(key in typeMap)) {
					continue;
				} else if (typeof typeMap[key] === "function") {
					type = typeMap[key].call(this, this[key], updateDict[key]);
				} else {
					type = typeMap[key];
				}

				if (key === "channels" || key === "currentChannel") {
					// FIXME workaround for bug #WP-49
					updateDict[key] = JSON.parse(updateDict[key].replace(/\$/g, "#"));
				}

				this[key] = updateDict[key];
				this.dispatchEvent(new webinos.Event(type));
			}
		}

		this.lastUpdated = updateTimeStamp || Date.now();
	};

	remote.Target.prototype.action = function (action) {
		messaging.service.createWebinosEvent("controllerAction", null, {
			id: this.id,
			action: action
		}).dispatchWebinosEvent();
	};

	remote.Target.prototype.live = function (channel) {
		messaging.service.createWebinosEvent("init", null, {
			id: this.id,
			channel: JSON.stringify(channel).replace(/#/g, "$") // FIXME workaround for bug #WP-49
		}).dispatchWebinosEvent();
	};

	remote.Target.prototype.playback = function (instance, currentTime) {
		var url = "http://" + instance.source.address
				+ instance.entry.fullPath;
				// + instance.entry.toURL().substring(8);

		messaging.service.createWebinosEvent("init", null, {
			id: this.id,
			name: instance.entry.name,
			url: url,
			time: currentTime || 0
		}).dispatchWebinosEvent();
	};

	remote.Target.prototype.play = function () {
		messaging.service.createWebinosEvent("play", null, {
			id: this.id
		}).dispatchWebinosEvent();
	};

	remote.Target.prototype.pause = function () {
		messaging.service.createWebinosEvent("pause", null, {
			id: this.id
		}).dispatchWebinosEvent();
	};

	remote.Target.prototype.volume = function (action) {
		var message;

		if (action === "mute") {
			message = messaging.service.createWebinosEvent("mute", null, {
				id: this.id
			});
		} else {
			message = messaging.service.createWebinosEvent("volume", null, {
				id: this.id,
				action: action
			});
		}

		message.dispatchWebinosEvent();
	};

	remote.Target.prototype.clear = function () {
		messaging.service.createWebinosEvent("clear", null, {
			id: this.id
		}).dispatchWebinosEvent();
	};

	webinos.discovery.findServices(new ServiceType("http://webinos.org/api/events"), {
		onFound: function (service) {
			messaging.service = service;

			service.bind({
				onBind: function () {
					service.addWebinosEventListener(messaging.dispatchMessage.bind(messaging));
					service.createWebinosEvent("helloController").dispatchWebinosEvent();
				}
			});
		}
	});

	window.setInterval(function () {
		messaging.service.createWebinosEvent("helloController").dispatchWebinosEvent();

		var threshold = Date.now() - 10000;

		for (var i = 0; i < remote.targets.length; i++) {
			if (threshold > remote.targets[i].lastUpdated) {
				remote.targets.remove(remote.targets[i]);
			}
		}
	}, 5000);
})(webinos, remote = Object.create(new webinos.EventTarget()));
