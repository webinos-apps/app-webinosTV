// var run_events_connect = 
function run_events_connect(){

if(typeof webinosTV==="undefined"){
	console.log("error: UI not ready.");
}

/*webinosTV.uievents =*/ 
//TODO may be making this code more readable?
return (function(){

	var _callbackRegistry = {};

	var addEventListener = function(type,cb){
		if(!_callbackRegistry[type]){
			_callbackRegistry[type]={};
		}
		var listenerId = Math.random+Date.now();
		_callbackRegistry[type][listenerId]=cb;
		return listenerId;
	};
	var removeEventListener = function(type,listenerId){
		if(!_callbackRegistry[type]){
			return;
		}
		delete _callbackRegistry[type][listenerId];
	};
	var notify = function(type, valueObject){
		if(!_callbackRegistry[type]){
			return;
		}
		for (var i in _callbackRegistry[type]) {
					if(_callbackRegistry[type].hasOwnProperty(i)){
						_callbackRegistry[type][i](valueObject);
					}
				};		
	};


	return {
		addEventListener:addEventListener,
		removeEventListener:removeEventListener,
		notify:notify
	};
})();


};

