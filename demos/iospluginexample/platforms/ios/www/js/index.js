 document.addEventListener('deviceready', deviceready, false);

function deviceready() {


    Cordova.exec("NativeControls.createTabBar");
    //var options = "top";
    var options = "bottom";
    console.log('yes');
    window.onorientationchange = function() {
		var orientation = window.orientation;
        
		switch(orientation) {
	    	case 0:
                
                Cordova.exec("NativeControls.showTabBar", options);
                Cordova.exec("NativeControls.showToolBar");
                
                
                /* Add a descriptive message on "Handling iPhone or iPod touch Orientation Events"  */
                document.getElementById("currentOrientation").innerHTML="Now in portrait orientation (Home button on the bottom).";
                break;
                
	    	case 90:
                
                Cordova.exec("NativeControls.showTabBar", options);
                Cordova.exec("NativeControls.showToolBar");
                
                document.getElementById("currentOrientation").innerHTML="Now in landscape orientation and turned to the left (Home button to the right).";
                break;
                
	    	case -90:
                
                Cordova.exec("NativeControls.showTabBar", options);
                Cordova.exec("NativeControls.showToolBar");
                
                document.getElementById("currentOrientation").innerHTML="Now in landscape orientation and turned to the right (Home button to the left).";
                break;
                
            default:
                
                Cordova.exec("NativeControls.showTabBar", options);
                Cordova.exec("NativeControls.showToolBar");
                
                document.getElementById("currentOrientation").innerHTML="Now the orientation must be -180. default: case: ";
                break;         
		}//end switch
    }//end window.orientationchange
    
    console.log("Got here");
    Cordova.exec("NativeControls.showTabBar", options);
    Cordova.exec("NativeControls.showToolBar");


}

