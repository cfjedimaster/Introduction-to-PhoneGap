component {
    url.returnformat="json";

    remote array function getdepartments() {
        sleep(2000);
        var result = [];
        for(var i=1; i<6; i++) {
            arrayAppend(result,"Department #i#");                  
        }
        return result;
    }
                          
    remote array function getdata() {
        sleep(2000);
        var result = [];
        for(var i=1; i<10; i++) {
            arrayAppend(result,"Something #i#");                  
        }
        return result;
    }

}