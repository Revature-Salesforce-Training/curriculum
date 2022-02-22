public with sharing class IntegrationExample {
    
    @AuraEnabled
    public static String getJoke() {
        Http http = new Http();
        HttpRequest httpR = new HttpRequest();

        httpR.setEndpoint('https://api.chucknorris.io/jokes/random?category=career');
        httpR.setMethod('GET');

        HttpResponse res = http.send(httpR);

        if(res.getStatusCode() == 200) {
            system.debug(res);

            Map<String,Object> respMap = (Map<String,Object>)
            JSON.deserializeUntyped(res.getBody());

            system.debug(respMap);

            String joke = (String) respMap.get('value');
            system.debug(joke);

            return joke;
        } else {
            return 'There was an error';
        }
    }
}