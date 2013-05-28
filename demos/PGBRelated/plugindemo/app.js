document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
    document.querySelector("#scanBtn").addEventListener("touchend", startScan, false);
    
}

function startScan(e) {
    e.preventDefault();
    
    window.plugins.barcodeScanner.scan( 
        function (result) { 
            var s = "We got a barcode!<br/>" + 
                "Result: " + result.text + "<br/>" + 
                "Format: " + result.format + "<br/>" + "Cancelled: " + result.cancelled; 
            document.querySelector("#result").innerHTML = s;
        }, 
        function (error) { alert("Scanning failed: " + error); } );
    
}