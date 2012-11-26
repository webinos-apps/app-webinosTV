/*******************************************************************************
 * Code contributed to the webinos project
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * Copyright 2012 Martin Lasak, Fraunhofer FOKUS
 ******************************************************************************/

if (typeof tvcontroller != 'object')
	tvcontroller = {};

tvcontroller.mediaroom = (function() {

	var hoverTo, select, popupChannelList, left, right;
	var chnnelListCache;
	var init, rotate, tuneChannel, tuneChannelByName, buildChannelList, getFocusedChannel;

	var currentChannelIndex = 0;
	var currentSelectedChannelIndex = 0;
	var currentPosition = 0;
	var channelList = $(".channel_list_ul");
	var channels = $(".channel");
	var channelContainer = $(".channel_list");
	var channelHideTimeoutHandle = null;

	hoverTo = function(ix) {
		if (typeof currentChannelIndex !== "number" || ix < 0
				|| ix >= channels.length) {
			return false;
		}
		popupChannelList();
		$(channels[currentChannelIndex]).removeClass('hovered_channel');
		var pos = 20;
		for ( var cix = 0; cix < ix; cix++) {
			pos -= $(channels[cix]).width() + 20;
		}
		currentChannelIndex = ix;
		currentPosition = pos;
		channelList.css("left", currentPosition + "px");
		$(channels[currentChannelIndex]).addClass('hovered_channel');
		return true;
	};

	select = function(ix) {
		if (hoverTo(ix)) {
			channels.removeClass('selected');
			currentSelectedChannelIndex = currentChannelIndex;
			$(channels[currentSelectedChannelIndex]).addClass('selected');
		}
	};

	popupChannelList = function() {
		if (channelHideTimeoutHandle) {
			clearTimeout(channelHideTimeoutHandle);
		} else {
			channelContainer.css("bottom", "2em");
			channelContainer.css("opacity", 1);
		}

		channelHideTimeoutHandle = setTimeout(function() {
			channelContainer.css("bottom", "-8em");
			channelContainer.css("opacity", 0);
			channelHideTimeoutHandle = null;
		}, 2000);
	};

	left = function() {
		if (currentChannelIndex <= 0)
			return;

		$(channels[currentChannelIndex]).removeClass('hovered_channel');

		currentChannelIndex--;
		currentPosition += $(channels[currentChannelIndex]).width() + 20;
		channelList.css("left", currentPosition + "px");
		$(channels[currentChannelIndex]).addClass('hovered_channel');
	};

	right = function() {
		if (currentChannelIndex >= channels.length - 1)
			return;

		$(channels[currentChannelIndex]).removeClass('hovered_channel');

		currentPosition -= $(channels[currentChannelIndex]).width() + 20;
		currentChannelIndex++;
		channelList.css("left", currentPosition + "px");
		$(channels[currentChannelIndex]).addClass('hovered_channel');

	};

	rotate = function(direction) {
		popupChannelList();
		(direction === "left") ? left() : right();
	};

	tuneChannel = function(ix) {
		select((typeof ix==='number')?ix:currentChannelIndex);
	};

	tuneChannelByName = function(name) {
		for (var i = 0; i < chnnelListCache.length; i++) {
			if (name === chnnelListCache[i].name) {
				tuneChannel(i);
				return;
			}
		}
	};
	
	buildChannelList = function(cl) {
		chnnelListCache = cl;
		channelList.html('');
		for(var cix=0; cix<chnnelListCache.length; cix++){
			var chan = $('<li class="channel">'+chnnelListCache[cix].name+'</li>');
			if(cix==0) chan.addClass('selected');
			chnnelListCache[cix].domRef = chan;
			channelList.append(chan);
		}
		
		init();
	};
	
	getFocusedChannel = function() {
		if(chnnelListCache && chnnelListCache[currentChannelIndex]){
			return chnnelListCache[currentChannelIndex];
		}
		return null;
	};

	init = function() {

		currentChannelIndex = 0;
		currentSelectedChannelIndex = 0;
		currentPosition = 0;
		channelList = $(".channel_list_ul");
		channels = $(".channel");
		channelContainer = $(".channel_list");
		channelHideTimeoutHandle = null;

		/*$("body").keydown(function(e) {
			console.log(e.keyCode);
			if (e.keyCode == 37) { // left
				left();
			} else if (e.keyCode == 39) { // right
				right();
			} else if (e.keyCode == 38) { // up
				select(currentChannelIndex);
			}

			popupChannelList();

			// return false;
		});*/
		
		popupChannelList();
	};

	// interface
	return {
		rotate : rotate,
		buildChannelList : buildChannelList,
		getFocusedChannel : getFocusedChannel,
		tuneChannel : tuneChannel,
		tuneChannelByName : tuneChannelByName,
		init : init
	};

})();

$(document).ready(function() {
	tvcontroller.mediaroom.init();
});
