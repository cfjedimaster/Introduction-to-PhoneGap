<cfparam name="url.id" default="">
<cfset artService = new art()>
<cfset art = artService.getArt(url.id)>

<!DOCTYPE html> 
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<cfoutput><title>Art: #art.name#</title></cfoutput> 
	<link rel="stylesheet" href="css/jquery.mobile-1.1.0.min.css" />
	<script src="js/jquery-1.7.2.min.js"></script>
	<script src="js/jquery.mobile-1.1.0.min.js"></script>
</head> 

<body> 

<div data-role="page">

	<div data-role="header">
		<cfoutput><h1>Art: #art.name#</h1></cfoutput>
	</div>

	<div data-role="content">	
		<cfoutput>
		<p>
		#art.description#
		</p>
		<p>
			Price: #dollarFormat(art.price)#<br/>
			Sold: <cfif art.sold>Yes<cfelse>No</cfif>
		</p>

		<p>
			<img src="/cfdocs/images/artgallery/#art.image#">
		</p>
		</cfoutput>
	</div>
	
	<div data-role="footer">
		<h4>Raymond Camden</h4>
	</div>	

</div>

</body>
</html>