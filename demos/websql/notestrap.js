var db;

$(document).ready(function() {
	console.log("Application begun");

	db = window.openDatabase("notestrap", "1.0", "Note App", 5*1024*1024);

	//Handle initial creation and then load up the notes
    db.transaction(function(tx) {
		tx.executeSql("create table if not exists notes(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, updated DATE)");
    },dbError,function(tx) { 
		getNotes();
    });

    //Generic error handler
	function dbError(e) {
		console.log("SQL ERROR");
		console.dir(e);
	}

	//Call to get Notes
	function getNotes(search) {
		db.readTransaction(function(tx) {
			if(!search) {
				tx.executeSql("select id,title,body,updated from notes order by updated desc", [], displayNotes);
			} else {
				var fuzzy = "%" + search + "%";
				tx.executeSql("select id,title,body,updated from notes where title like ? or body like ? order by updated desc", [fuzzy,fuzzy], displayNotes);
			}
		}, dbError);
	}

	//Just handle the layout of notes
	function displayNotes(tx,results) {
		var data = convertResults(results);
		if(data.length === 0) {
			$("#noteTable").hide();
			$("#status").html("<p>You do not have any notes currently.</p>");
		} else {
			$("#status").html("");
			$("#noteTable").show();
			var s = "";
			for(var i=0;i<data.length;i++) {
				var d = new Date();
				d.setTime(data[i].updated);
				s+= "<tr data-id='"+data[i].id+"'><td><a class='noteRecord'>"+(data[i].title?data[i].title:"No title")+"</a></td><td>"+d.toDateString() + " "+d.toTimeString()+"</td>";
				s+= "<td><img class='noteEdit' src='page_edit.png' title='Edit'> <img class='noteDelete' src='page_delete.png' title='Delete'></td>";
				s+= "</tr>";
			}
			$("#noteTable tbody").html(s);
		}
	}

	function deleteNote(id,cb) {
		db.transaction(function(tx) {
			tx.executeSql("delete from notes where id = ?", [id], function(tx) {
				cb();
			});
		});
	}

	function getNote(id,cb) {
		db.readTransaction(function(tx) {
			tx.executeSql("select title,body,updated from notes where id = ?", [id], function(tx,results) {
				var result = convertResults(results)[0];
				cb(result);
			});
		},dbError);
	}

	$("#addNoteBtn").on("click", function() {
		$("#displayDiv").hide();
		$("#editDiv").show();
	});

	$("#saveNoteBtn").on("click", function(e) {
		e.preventDefault();
		var title = $("#title").val();
		var body = $("#body").val();

		db.transaction(function(tx) {
			var existingId = $("#editDiv").data("noteid");
			if(existingId) {
				tx.executeSql("update notes set title=?, body=?, updated=? where id=?", [title, body, new Date().getTime(), existingId]);
			} else {
				tx.executeSql("insert into notes(title,body,updated) values(?,?,?)", [title, body, new Date().getTime()]);
			}
			$("#title").val("");
			$("#body").val("");
			$("#editDiv").removeData("noteid").hide();
			$("#editDiv").hide();
		}, dbError, getNotes);

	});

	$(document).on("click", ".noteRecord", function(e) {
		e.preventDefault();
		$("#editDiv").hide();

		var record = $(this).parent().parent().data("id");
		getNote(record, function(note) {
			$("#displayDiv h2").text(note.title?note.title:"No title");
			$("#displayDiv p").text(note.body);
			$("#displayDiv").show();
		});
	});

	$(document).on("click", ".noteDelete", function(e) {
		e.preventDefault();
		var record = $(this).parent().parent().data("id");
		deleteNote(record, getNotes);
	});

	$(document).on("click", ".noteEdit", function(e) {
		e.preventDefault();
		var record = $(this).parent().parent().data("id");
		getNote(record, function(note) {
			$("#title").val(note.title);
			$("#body").val(note.body);
			$("#displayDiv").hide();
			$("#editDiv").data("noteid",record).show();
		
		});
	});

	$("#searchField").on("input", function(e) {
		var value = $.trim($(this).val());
		$("#editDiv").hide();
		$("#displayDiv").hide();

		getNotes(value);

	});

});

//Generic utility
function convertResults(resultset) {
	var results = [];
	for(var i=0,len=resultset.rows.length;i<len;i++) {
		var row = resultset.rows.item(i);
		var result = {};
		for(var key in row) {
			result[key] = row[key];
		}
		results.push(result);
	}
	return results;
}