component {
    url.returnformat="json";

    remote array function getdata() {
        sleep(4000);
        var result = [];
        for(var i=1; i<10; i++) {
            arrayAppend(result,"Something #i#");                  
        }
        return result;
    }

}