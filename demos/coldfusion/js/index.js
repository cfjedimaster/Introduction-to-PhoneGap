var cleared = false;

document.addEventListener("deviceready", init, false);

function init() {
	$("#status").text("Stand by - getting stuff");

	getData();
}

function getData() {
	if(!cleared) {
		$("#status").text("");
		cleared = true;
	}

	$.getJSON("http://localhost/presentations/introduction to phonegap/demos/coldfusion/server.cfc?method=getStats", function(res) {
		console.dir(res);
		var fsPer = Math.floor((parseInt(res.freeSpace,10)/parseInt(res.totalSpace,10))*100);
		$("#fsMeter").val(fsPer);
		var mPer = Math.floor((parseInt(res.freeMemory,10)/parseInt(res.totalMemory,10))*100);
		$("#memoryMeter").val(mPer);
		window.setTimeout(getData, 2000);
	});
}

