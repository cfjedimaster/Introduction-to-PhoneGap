var lat, lon;

function init() {
	document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    console.log("onDeviceReady");
	//Begin by getting the user's location, but let's let them know we are doing something...
	$("#takePictureButton").text("Stand by...");

	navigator.geolocation.getCurrentPosition(function(geo) {
		console.log(geo);
		lat = geo.coords.latitude;
		lon = geo.coords.longitude;

		$("#takePictureButton").text("Take Picture!").removeAttr("disabled").on("touchend",takePic);

	}, generalError);

}

function takePic() {
    console.log("takePic");
	navigator.camera.getPicture(function(d) {
		
		//Assign to img
		$("#destPicture").attr("src", d);

		//display map
		$("#mapPicture").attr("src", "http://maps.googleapis.com/maps/api/staticmap?center="+
			lat+","+lon+
			"&zoom=13&size=300x300&maptype=roadmap"+
			"&markers=color:blue%7C"+lat+","+lon+"&sensor=false");

	}, generalError, 
	{ destinationType:Camera.DestinationType.FILE_URI, quality: 75, targetWidth: 300, targetHeight: 300});

}

function generalError(e) {
	navigator.notification.alert("Sorry, I've failed you...", function() {}, "Error!");
}