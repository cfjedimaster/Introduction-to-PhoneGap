var RSS = "http://www.raymondcamden.com/rss.cfm";
var entries = [];
var selected = "";

$(document).on("touchend", ".contentLink", function(e) {
	selected = $(this).data("entryid");
});

$(document).on("touchend", ".fullLink", function(e) {
	e.preventDefault();
	window.open($(this).attr("href"), '_blank','location=yes');
});

function initialize() {
	var feed = new google.feeds.Feed(RSS);
	feed.setNumEntries(10);
	feed.load(function(result) {
		var s = "";
		result.feed.entries.forEach(function(e,idx) {
			s += "<li><a href='#contentPage' class='contentLink' data-entryid='"+idx+"'>" + e.title + "</a></li>";
		});
		$("#feedList").html(s).listview("refresh");
		entries = result.feed.entries;
	});
}

$(document).on("pageinit", "#mainPage", function(event,data) {
	console.log("Called pageinit for mainPage");
	
	google.load("feeds", "1",{callback:initialize});

});

// I handle the "Flash of Previou Content issue"
$(document).on("pagebeforeshow", "#contentPage", function(event,data) {
	$("h1", this).text("");	
	$("div[data-role=content]",this).html("");	
});

// I load the details
$(document).on("pageshow", "#contentPage", function(event,data) {
	var entry = entries[selected];
	$("h1", this).text(entry.title);
	$("div[data-role=content]",this).html(entry.content);	

	var contentHTML = "";
	contentHTML += entry.content;
	contentHTML += '<p/><a href="'+entry.link + '" class="fullLink" data-role="button">Read Entry on Site</a>';
	$("div[data-role=content]",this).html(contentHTML);
	$("div[data-role=content] .fullLink",this).button();

});
