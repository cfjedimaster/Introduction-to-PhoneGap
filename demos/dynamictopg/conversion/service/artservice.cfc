component {
	
	remote struct function getArt(required numeric id) {
		var q = new com.adobe.coldfusion.query();
		q.setDatasource("cfartgallery");
		q.setSQL("select artid, artname, description, price, issold, largeimage from art where artid = :artid");
		q.addParam(name="artid", value=arguments.id, cfsqltype="cf_sql_integer");
		var result = q.execute().getResult();
		//convert the Query into a simple structure
		var art = {"id"=result.artid[1], "name"=result.artname[1], "description"=result.description[1], "price"=dollarFormat(result.price[1]), 
				  "sold"=result.issold[1], "image"="http://#cgi.server_name#/cfdocs/images/artgallery/" & result.largeimage[1]};
		return art;
	}

	remote array function getArtList() {
		var q = new com.adobe.coldfusion.query();
		q.setDatasource("cfartgallery");
		q.setSQL("select artid, artname from art order by artname asc");
		var data = q.execute().getResult();
		var result = [];
		for(var i=1; i<= data.recordCount; i++) {
			arrayAppend(result, {"id"=data.artid[i], "name"=data.artname[i]});
		}
		return result;
	}

}