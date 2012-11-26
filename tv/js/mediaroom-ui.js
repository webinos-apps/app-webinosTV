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

if (typeof tvcontroller!='object') tvcontroller = {};

tvcontroller.mediaroom = (function(){

	var channelList = [];
	var channelListPosition = 0;
	
	function animateShowChanList() {
		$('#channelList').addClass('show');
		$('#channelList').removeClass('hide');
	}
	
	function animateHideChanList() {
		setTimeout(function() {
			$('#channelList').removeClass('show');
			$('#channelList').addClass('hide');
		}, 5000);
	}

	var rotate = function(direction) {

		animateShowChanList();
		$('.channel').removeClass('channelFocused');

		if(direction==="left"){
			if(channelList.length){
				channelListPosition--;	
				if(channelListPosition<0) {channelListPosition=0}
				else{
					//$('#channelList').css('left',widthToMove/2+'+px');		
				}
			}
		}
		if(direction==="right"){
			if(channelList.length){
				channelListPosition++;	
				if(channelListPosition>=channelList.length) {channelListPosition=channelList.length-1;}
				else{
					//$('#channelList').css('left',widthToMove/2+'+px');		
				}
			}
		}

		animateHideChanList();

		if(channelList.length)
			$(channelList[channelListPosition].domRef).addClass('channelFocused');
	};

	var buildChannelList = function(cl){
		animateShowChanList();
		
		channelList = cl;
		$('#channelList').html('');
		for(var cix=0; cix<channelList.length; cix++){
			var chan = $('<div class="channel">'+channelList[cix].name+'</div>');
			if(cix==0) chan.addClass('channelFocused');
			channelList[cix].domRef = chan;
			$('#channelList').append(chan);
		}
		tuneChannel();

		animateHideChanList();
	};

	var getFocusedChannel = function(){
		if(channelList[channelListPosition]){
			return channelList[channelListPosition];
		}
		return null;
	};

	var tuneChannel = function(){
		$('.channel').removeClass('channelTuned');
		if(channelList[channelListPosition])
			$(channelList[channelListPosition].domRef).addClass('channelTuned');
	};

	var tuneChannelByName = function(name){
		for (var i = 0; i < channelList.length; i++) {
			if (name === channelList[i].name) {
				channelListPosition = i;
				
				$('.channel').removeClass('channelFocused');
				$(channelList[channelListPosition].domRef).addClass('channelFocused');
				tuneChannel();
				return;
			}
		}
	};

	// interface
	return {
		rotate: rotate,
		buildChannelList: buildChannelList,
		getFocusedChannel: getFocusedChannel,
		tuneChannel: tuneChannel,
		tuneChannelByName: tuneChannelByName
	};

})();
