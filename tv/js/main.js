/*******************************************************************************
*  Code contributed to the webinos project
* 
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*  
*     http://www.apache.org/licenses/LICENSE-2.0
*  
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* 
* Copyright 2012 Martin Lasak, Fraunhofer FOKUS
******************************************************************************/

var app = (function() {
	
var $name,
	$content,
	$media,
	$video,
	$audio,
	$head,
	$header,
	$muteicon;

var mode = "tv"; // initial mode, other values are: video, audio, image

var currentPlayer;

var timeToStartFrom = 0;	
	
var statusSendID;
	
var config = $.deparam.querystring();

var tv = {
	service: undefined,
	channelList: undefined
};

function solveRecurrence(channel) {
  return {
    channelType: channel.channelType,
    longName: channel.longName,
    name: channel.name,
    stream: channel.stream
  }
};

function changeToChannel(chan) {
	if (chan) {
		tv.service.display.setChannel(/*Channel*/ {channelType:chan.channelType,name:chan.name,longName:chan.longName,stream:chan.stream,tvsource:chan.tvsource}, /*TVDisplaySuccessCB*/ function(channel){
			console.log("#TV: channelchange ok");
			mode = "tv";

			tvcontroller.mediaroom.tuneChannel();
			
			$header.empty();
			$content.empty();
			
			setTimeout(function() {
				$head = $('');
				$header.html($head);
				$name.text(chan.name);

				setupVideoElem(channel.stream);
				$video[0].play();

        var currentChannel = solveRecurrence(tvcontroller.mediaroom.getFocusedChannel());
        var currentChannelEvent = events.service.createWebinosEvent("channels", {}, {
          type: "response",
          id: config.id,
          currentChannel: JSON.stringify(currentChannel).replace(/#/g, '$') // #FIXME workaround for bug #WP-49
        });
        currentChannelEvent.dispatchWebinosEvent();
			}, 3500);
			
		}, /*TVErrorCB*/ function(){});
	}
}

function setupVideoElem(url) {
	$content.html($video);
	$video.attr('src', url);
	$video.attr('loop', 'loop');
	
	currentPlayer = '#videoplayer';
}

function setupAudioElem(url) {
	$media = $('<div height="100%" style="text-align:center"><img height="400px" width="400px" src="img/back.jpg"></img><br id="breaker">' + '</div>');
	$content.html($media);
	$('#breaker').after($audio);
	$audio.attr('src', url);
	
	currentPlayer = '#audioplayer';
}

function playListener() {
	var play = events.service.createWebinosEvent("play", {}, {
		type: "player",
		id: config.id,
		name: config.name,
		time: $(currentPlayer)[0].currentTime,
		duration: $(currentPlayer)[0].duration,
		mode: mode,
		title: $name.text()
	});

	play.dispatchWebinosEvent();

	window.clearInterval(statusSendID);
	statusSendID = window.setInterval(sendStatus, 900);
}

function playAtTime(time) {
	timeToStartFrom = time;

	$(currentPlayer).on("play", function (event) {
		playListener();
	});
	
	$(currentPlayer).on("loadedmetadata", function (event) {
		if (timeToStartFrom !== 0) {
			console.log("Resume Play at " + timeToStartFrom);
			$(currentPlayer)[0].currentTime = timeToStartFrom;
			timeToStartFrom = 0;
		}
		$(currentPlayer).trigger("play");

	});

	$(currentPlayer).on("pause", function (event) {
		window.clearInterval(statusSendID);
		if (timeToStartFrom == 0){
			var pause = events.service.createWebinosEvent("pause", {}, {
				type: "player",
				id: config.id,
				name: config.name,
				time: $(currentPlayer)[0].currentTime,
				duration: $(currentPlayer)[0].duration,
				mode: mode,
				title: $name.text()
			});

			pause.dispatchWebinosEvent();
		}
	});
}

function sendHelloPlayer() {
	var hello = events.service.createWebinosEvent("helloPlayer", {}, {
		id: config.id,
		name: config.name,
		mode: mode,
		title: $name.text()
	});

	hello.dispatchWebinosEvent();
}

var events = {
	service: undefined,
	
	handler: function (event) {
		// Skip own events to prevent looping on `init` event.
		if (event.addressing.source.id === events.service.myAppID) {
			return;
		}

		switch (event.type) {
		case "helloController":
			sendHelloPlayer();
			break;

		case "controllerAction":
			if (event.payload.id == config.id) {
				switch(event.payload.action) {
				//case 'left':
				case 'right':
					tvcontroller.mediaroom.rotate('left');
					break;	
	
				//case 'right':
				case 'left':
					tvcontroller.mediaroom.rotate('right');
					break;
	
				//case 'up':
				case 'full':
					//alert('fs');
					break;
				case 'down':
					if (!tv.service) {
						return;
					}
					
					changeToChannel(tvcontroller.mediaroom.getFocusedChannel());
					break;
					
				//case 'down':
				case 'up':
					if (!tv.service) {
						return;
					}
	
					var chan = tvcontroller.mediaroom.getFocusedChannel();
					if (chan) {
						//do something with the channel information
					}
					break;
				}
			}
			break;

		case "channels":
			if (event.payload.id == config.id && event.payload.type === "request") {
				var channels = tv.channelList.map(solveRecurrence)
				  , currentChannel = solveRecurrence(tvcontroller.mediaroom.getFocusedChannel());

				var channelsEvent = events.service.createWebinosEvent("channels", {}, {
					type: "response",
					id: config.id,
					channels: JSON.stringify(channels).replace(/#/g, '$'), // #FIXME workaround for bug #WP-49
					currentChannel: JSON.stringify(currentChannel).replace(/#/g, '$')
				});
				channelsEvent.dispatchWebinosEvent();
			}
			break;

		case "init":
			if (event.payload.id == config.id) {
				$content.empty();
				$video[0].pause();
				$video.removeAttr('src');

				$name.text(event.payload.name);

				var extname = webinos.path.extname(event.payload.name);

				switch (extname) {
				case ".mp3":
				case ".m4a":
				case ".ogg":
					var pl = webinosMeta.getMetaData(event.payload.url);
					var nowPl = "";
					if (pl !== null)nowPl = pl.title + " " + pl.author + "<br>" + pl.year + " " + pl.album;
					else nowPl = event.payload.name;
					$head = $('<center><img style="background-color: white;" src="img/webinos.png"></img><h2>Now Playing<br>' + nowPl + '</h2><br><center>');
					setupAudioElem(event.payload.url);
					playAtTime(event.payload.time);
					mode = "audio";
					break;

				case ".m4v":
				case ".ogv":
				case ".webm":
				case ".mp4":
					$head = $('');
					setupVideoElem(event.payload.url);
					playAtTime(event.payload.time);
					mode = "video";
					break;

				case ".jpg":
				case ".jpeg":
				case ".png":
				case ".gif":
					$head = $('');
					$media = $('<img id ="imgplayer" src="' + event.payload.url + '" width="100%"></img>');
					$content.html($media);
					mode = "image";
					break;

				default:
					if (typeof event.payload.channel !== 'undefined') {
						// FIXME workaround for bug #WP-49
						var channel = JSON.parse(event.payload.channel.replace(/\$/g, "#"));

						changeToChannel(channel);
						tvcontroller.mediaroom.tuneChannelByName(channel.name);
					}
				}
				
				$header.html($head);
			}
			break;

		case "volume":
			if (event.payload.id == config.id) {
				if (event.payload.action === "up") {
					$(currentPlayer)[0].volume += 0.1;
				} else {
					$(currentPlayer)[0].volume -= 0.1;
				}
			}
			break;

		case "mute":
			if (event.payload.id == config.id) {
				// if (typeof event.payload.action !== "undefined") {
					$(currentPlayer)[0].muted = !$(currentPlayer)[0].muted; // event.payload.action
				// }
				if($(currentPlayer)[0].muted){
					$muteicon.show();
				}else{
					$muteicon.hide();
				}
			}
			break;

		case "play":
			if (event.payload.id == config.id && typeof $video !== "undefined") {
				$(currentPlayer).trigger("play");
			}
			break;

		case "pause":
			if (event.payload.id == config.id && typeof $video !== "undefined"){
				window.clearInterval(statusSendID);
				$(currentPlayer).trigger("pause");
			}
			break;

		case "clear":
			if (event.payload.id == config.id){
				$content.empty();
			}
		}
	}
};

function init() {
	$name = $("#name");
	$content = $("#realcontent");
	$header = $("#header");
	
	$video = $('<video id="videoplayer" width="100%"></video>');
	$audio = $('<audio id="audioplayer" controls></video>');

	$muteicon = $('#muteicon');
	
	webinos.discovery.findServices(new ServiceType("http://webinos.org/api/events"), {
		onFound: function (service) {
			events.service = service;

			service.bind({onBind: function () {
				service.addWebinosEventListener(events.handler);

				sendHelloPlayer();
			}});
		}
	});
	
	webinos.discovery.findServices(new ServiceType('http://webinos.org/api/tv'), {
		onFound: function (service) {
			console.log("TV API found: " + service.api + " " + service.serviceAddress+ " " + service.description);

			tv.service = service;
			
			service.tuner.getTVSources(/*TVSuccessCB*/ function(result){
				console.log("#TV: get sources ok");
				if(result && result.length){
					console.log("#TV: found channel list with", result.length, "channels");
					tv.channelList = result[0].channelList;
					tvcontroller.mediaroom.buildChannelList(tv.channelList);
					changeToChannel(tvcontroller.mediaroom.getFocusedChannel());
				}
			});
		}
	});
};

function sendStatus() {
	if ($(currentPlayer)[0].currentTime === 'NaN') return;
	
	var status = events.service.createWebinosEvent("status", {}, {
		type: "player",
		id: config.id,
		name: config.name,
		time: $(currentPlayer)[0].currentTime,
		duration: $(currentPlayer)[0].duration
	});
	
	status.dispatchWebinosEvent();
}

return {
	init: init
}

})();

$(document).ready(app.init);
