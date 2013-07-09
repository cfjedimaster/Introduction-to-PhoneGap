component {

	url.returnformat="json";

	remote array function getdata(string zip) {
		var result = [];
		var total = randRange(5,10);
		for(var i=1; i<=total; i++) {
			var item = {"title":"Result #i#", "body":"Found item in #zip#"};
			arrayAppend(result, item);
		}

		return result;
	}


}