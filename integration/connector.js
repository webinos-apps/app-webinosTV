function run_connector_connect(){

//caches for all discovered pzps
var pzpCache = {

};
//caches for all discovered services on devices
var serviceCache = {
	"WebNotification":{}
};


var onNotificationFoundHandler = function (service) {

    if(!serviceCache.WebNotification[service.serviceAddress]){
        serviceCache.WebNotification[service.serviceAddress]={found:service};
        service.bindService( 
             {onBind: function (service) {
                serviceCache.WebNotification[service.serviceAddress].bound=service;
                //welcome noticifation
                //var wn = new service.WebNotification("title", {body: "body", iconUrl: "icon"});
            
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
        console.log(service);
    }

    if(!localStorage["devId_"+service.serviceAddress+"_type"]){
            //Missing Device Status API fix, ask user for device types and names
            
            webinosTV.app.connectUi.requestDevNameAndType(service.serviceAddress,function(){
                //pop up notification cb
                service.WebNotification("webinosTV", {body: "You are now configuring this device.", iconUrl: "icon"});
            },function(res){
                localStorage["devId_"+service.serviceAddress+"_type"]=res.type;
                localStorage["devId_"+service.serviceAddress+"_name"]=res.name;
                webinosTV.app.connectUi.addSourceDevice(service.serviceAddress,localStorage["devId_"+service.serviceAddress+"_type"],0,localStorage["devId_"+service.serviceAddress+"_name"]);
                webinosTV.app.connectUi.addTargetDevice(service.serviceAddress,localStorage["devId_"+service.serviceAddress+"_type"],0,localStorage["devId_"+service.serviceAddress+"_name"]);
            });
    }else{
                webinosTV.app.connectUi.addSourceDevice(service.serviceAddress,localStorage["devId_"+service.serviceAddress+"_type"],0,localStorage["devId_"+service.serviceAddress+"_name"]);
                webinosTV.app.connectUi.addTargetDevice(service.serviceAddress,localStorage["devId_"+service.serviceAddress+"_type"],0,localStorage["devId_"+service.serviceAddress+"_name"]);                       
    }
}

var discoverWebNotification = function(){
		webinos.discovery.findServices(new ServiceType('http://webinos.org/api/notifications'), 
            {
            onFound: onNotificationFoundHandler,
            onLost: function(service){
                	console.log("LOST ", service);
                },
            onError: function(error){
                	console.log("error ", error);
                }
            }
			
		);

        //FIXME: legacy hack for webinos @ android v0.8
        webinos.discovery.findServices(new ServiceType('http://webinos.org/api/webnotification'), 
            {
            onFound: onNotificationFoundHandler,
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

