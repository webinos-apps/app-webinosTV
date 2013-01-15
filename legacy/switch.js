var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; 
if(isAndroid) {
  window.location = /*window.location.protocol+'//'+window.location.host+'/zap-and-shake*/'./mobile/index.html';
}else{
  var names=['George','John','Thomas', 'James', 'Andrew', 'Martin', 'William', 'Zachary', 'Millard', 'Franklin'], rooms=['Livingroom', 'Bedroom','Kitchen','Poolhouse','Hall'];

  document.getElementById('tvconfig').setAttribute('style','display:inherit');
  document.getElementById('username').value=names[Math.floor(Math.random()*names.length)];
  document.getElementById('tvlocation').value=rooms[Math.floor(Math.random()*rooms.length)];

  var go = function(){
  var hrname=document.getElementById('username').value+'`s '+document.getElementById('tvlocation').value+' TV';
  window.location = /*window.location.protocol+'//'+window.location.host+'/zap-and-shake*/'./tv/index.html?id='+(new Date().getTime())+"&name="+hrname;
  };
  var autostart = setTimeout(go,2000);
  var focushandler = function(){
	clearTimeout(autostart);
	document.getElementById('go').setAttribute('style','display:inherit');
	document.getElementById('go').addEventListener("click",go);
  };

  document.getElementById('username').addEventListener("focus",focushandler);
  document.getElementById('tvlocation').addEventListener("focus",focushandler);


}
