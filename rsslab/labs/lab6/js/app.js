var RSS = "http://www.raymondcamden.com/rss.cfm";

function initialize() {
	var feed = new google.feeds.Feed(RSS);
	feed.setNumEntries(10);
	feed.load(function(result) {
		var s = "";
		result.feed.entries.forEach(function(e) {
			s += "<li><a href=''>" + e.title + "</a></li>";
		});
		$("#feedList").html(s).listview("refresh");
	});
}

$(document).on("pageinit", "#mainPage", function(event,data) {
	console.log("Called pageinit for mainPage");
	
	google.load("feeds", "1",{callback:initialize});

});

