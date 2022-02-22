@isTest
public with sharing class IntegrationExample_Test_Mock implements HttpCalloutMock {
    
    public HttpResponse respond(HttpRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png","id" : "SAzi0oZBRnm5oS6Bf_v5Iw","url" : "","value" : "test joke"}');
        res.setStatusCode(200);
        return res;
    }
}