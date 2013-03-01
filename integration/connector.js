function run_connector_connect(){

//caches for all discovered pzps
var pzpCache = {

};
//caches for all discovered services on devices
var serviceCache = {
	"WebNotification":{}
};
serviceGLOBAL=serviceCache;

var discoverWebNotification = function(){
		webinos.discovery.findServices(new ServiceType('http://webinos.org/api/webnotification'), 
                {onFound: function (service) {

                	if(!serviceCache.WebNotification[service.serviceAddress]){
                		serviceCache.WebNotification[service.serviceAddress]={found:service};
                		service.bindService( 
                             {onBind: function (service) {
                             	serviceCache.WebNotification[service.serviceAddress].bound=service;
								var wn = new service.WebNotification("title", {body: "body", iconUrl: "icon"});
							
							service.onClick = function (res) {
								//if (res == "onClick") launchApp("http://192.168.1.100:8080/apps/katwarn_client/index.html", adr);
								if (res == "onClick") alert("click");

							};       
							}},
							{onUnbind:function(){alert("onUnbind")}},
							{onServiceAvailable:function(){alert("onServiceAvailable")}},
							{onServiceUnavailable:function(){alert("onServiceUnavailable")}},
							{onError:function(){alert("onError")}}


							); 
                	}

                	if(!pzpCache[service.serviceAddress]){
                		pzpCache[service.serviceAddress]={
                			"available":true
                		}
                		//new pzp/device discovered, let the user decide on the device type. FIXME: in future this should be automated
                		webinosTV.app.connectUi.addSourceDevice(service.serviceAddress,(service.serviceAddress.indexOf("Mac")!=-1)?"pc":"tablet",0,"My Device");
                		webinosTV.app.connectUi.addTargetDevice(service.serviceAddress,(service.serviceAddress.indexOf("Mac")!=-1)?"pc":"tablet",0,"My Device");
                	}
                	
					
                	/*webn = service;
                	
                	var adr = webn.serviceAddress;
                	
                	 service.bindService( 
                             {onBind: function (service) {
				var wn = new service.WebNotification(title, {body: body, iconUrl: icon});
				
				service.onClick = function (res) {
					//if (res == "onClick") launchApp("http://192.168.1.100:8080/apps/katwarn_client/index.html", adr);
					if (res == "onClick") launchApp("http://192.168.1.50:4000/static/katwarn_client/index.html", adr);

				};               	 
                             }
                	 	}
                	 );*/
           		
                },
            onLost: function(service){
                	console.log("LOST ", service);
                },
            onError: function(error){
                	console.log("error ", error);
                }
            }
			
		);
};

var init = function(){
	if(typeof webinos==="undefined"){
		alert("Is your PZP started on this device? Cannot connect it.");
		return;
	}

	//clear the ui
	webinosTV.app.connectUi.clearSourceDevices();
	webinosTV.app.connectUi.clearTargetDevices();

	//invoke discovery every 15seconds
	setInterval(discoverWebNotification, 15000); discoverWebNotification();
};

//run the initialisation
init();
};

