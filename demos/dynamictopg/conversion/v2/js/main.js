function init() {
	document.addEventListener("deviceready",startup,false);
	//For testing locally only...
	startup();
}

function startup() {
	console.log("startup");
}