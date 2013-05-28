<cfset artService = new art()>
<cfset art = artService.getArtList()>

<!DOCTYPE html> 
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<title>Art Lister</title> 
	<link rel="stylesheet" href="css/jquery.mobile-1.3.1.min.css" />
	<script src="js/jquery.js"></script>
	<script src="js/jquery.mobile-1.3.1.js"></script>
</head> 

<body> 

<div data-role="page">

	<div data-role="header">
		<h1>Art</h1>
	</div>

	<div data-role="content">	
		<ul data-role="listview" data-inset="true">
		<cfoutput query="art">
			<li><a href="detail.cfm?id=#artid#">#artname#</a></li>
		</cfoutput>
		</ul>
	</div>
	
	<div data-role="footer">
		<h4>Raymond Camden</h4>
	</div>	

</div>

</body>
</html>