var diary;
var mainView;

document.addEventListener('deviceready', deviceready, false);

function deviceready() {
	console.log('deviceready');

	//create a new instance of our Diary and listen for it to complete it's setup
	diary = new Diary();
	diary.setup(startApp);


}

/*
Main application handler. At this point my database is setup and I can start listening for events.
*/

function startApp() {
	console.log('startApp');

	mainView = $("#mainView");

	//Load the main view
	pageLoad("main.html");
	
	//Always listen for home click
	$(document).on("touchend", ".homeButton", function(e) {
		e.preventDefault();
		pageLoad("main.html");
	});


}

function pageLoad(u) {
	console.log("load "+u);
	//convert url params into an ob
	var data = {};
	if(u.indexOf("?") >= 0) {
		var qs = u.split("?")[1];
		var parts = qs.split("&");
		for(var i=0, len=parts.length; i<len; i++) {
			var bits = parts[i].split("=");
			data[bits[0]] = bits[1];
		};
	}

    $.get(u,function(res,code) {
		mainView.html(res);
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent("pageload",true,true,data);
		var page = $("div", mainView);
		page[0].dispatchEvent(evt);
	});
}

$(document).on("pageload", "#mainPage", function(e) {
	diary.getEntries(function(data) {
		console.log('getEntries');
		var s = "";
		for(var i=0, len=data.length; i<len; i++) {
			s += "<div data-id='"+data[i].id+"'>" + data[i].title + "</div>";
		}
		$("#entryList").html(s);

		//Listen for add clicks
		$("#addEntryBtn").on("touchstart", function(e) {
			e.preventDefault();
			pageLoad("add.html");
		});

		//Listen for entry clicks
		$("#entryList div").on("touchstart", function(e) { 
			e.preventDefault();
			console.log("entry click");
			var id = $(this).data("id");
			pageLoad("entry.html?id="+id);
		});

	});

});

$(document).on("pageload", "#entryPage", function(e) {

	diary.getEntry(Number(e.detail.id), function(ob) {
		var content = "<h2>" + ob.title + "</h2>";
		content += "Written "+dtFormat(ob.published) + "<br/><br/>";
		content += ob.body;
		if(ob.image) content += "<img class='imgDisplay' src='" + ob.image + "'>";
		console.log(ob.image);
		$("#entryDisplay").html(content);
	});
});

$(document).on("pageload", "#addPage", function(e) {

	function onCamSuccess(imgdata) {
		console.log(imgdata);
		$("#entryPicture").val(imgdata);
		$("#imgPreview").attr("src", imgdata);
	}
	
	function onCamFail(e) {
		console.log('camFail');console.dir(e);
		navigator.notification.alert("Sorry, something went wrong.", null, "Oops!");
	}
	
	$("#takePicture").on("touchstart", function(e) {
		e.preventDefault();
		
		navigator.camera.getPicture(onCamSuccess, onCamFail, {quality:50, destinationType:Camera.DestinationType.FILE_URI});
	});
	
	$("#addEntrySubmit").on("touchstart", function(e) {
		e.preventDefault();
		//grab the values
		var title = $("#entryTitle").val();
		var body = $("#entryBody").val();
		var img = $("#entryPicture").val();
		//store!
		diary.saveEntry({title:title,body:body,image:img}, function() {
			pageLoad("main.html");
		});
		
	});
});


function dtFormat(input) {
    if(!input) return "";
	input = new Date(input);
    var res = (input.getMonth()+1) + "/" + input.getDate() + "/" + input.getFullYear() + " ";
    var hour = input.getHours()+1;
    var ampm = "AM";
	if(hour === 12) ampm = "PM";
    if(hour > 12){
        hour-=12;
        ampm = "PM";
    }
    var minute = input.getMinutes()+1;
    if(minute < 10) minute = "0" + minute;
    res += hour + ":" + minute + " " + ampm;
    return res;
}
