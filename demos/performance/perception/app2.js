var btn;
var field;
var results;
document.addEventListener("deviceready", init, false);
            
function init() {
    btn = $("#doSearch"); 
    field = $("#search");
    results = $("#results");
    
    btn.on("touchend", function(e) {
        e.preventDefault();
        var term = field.val();
        results.html("<i>Please stand by - we are doing your search...</i>");
        btn.attr("disabled","disabled");
        $.post("api.cfc?method=getdata", {term:term}, function(res, code) {
            var s = "<p>";
            for(var i=0; i<res.length; i++) {
                s += res[i] + "<br/>";
            }
            s += "</p>";
            results.html(s);
            btn.removeAttr("disabled");
        },"json");
    });
}
