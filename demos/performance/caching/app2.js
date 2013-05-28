var btn;
var field;
var results;
var dd;

document.addEventListener("deviceready", init, false);
            
function init() {
    btn = $("#doSearch"); 
    field = $("#search");
    results = $("#results");
    dd = $("#department");
    
    if(!("departments" in window.localStorage)) {
        //we need to fetch data on departments before we can search
        results.html("<i>Stand by, fetching employee departments.</i>");
        
        $.get("api.cfc?method=getdepartments", function(res, code) {
            var s = "";
            for(var i=0; i<res.length; i++) {
                s+= "<option>"+res[i]+"</option>";   
            }
            dd.html(s);
            btn.removeAttr("disabled");
            results.html("");
            //Cache it
            window.localStorage.departments = JSON.stringify(res);
        }, "json");

    } else {
        var depts = JSON.parse(window.localStorage.departments);
        var s = "";
        for(var i=0; i<depts.length; i++) {
            s+= "<option>"+depts[i]+"</option>";   
        }
        dd.html(s);
        btn.removeAttr("disabled");
    }
    
    btn.on("touchend", function(e) {
        //So yeah, I'd also get the department field, but it isn't important to the demo
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
