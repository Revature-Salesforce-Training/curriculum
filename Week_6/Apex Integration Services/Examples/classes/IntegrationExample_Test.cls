@isTest
public with sharing class IntegrationExample_Test {
    

    @isTest
    static void myTest(){
        Test.setMock(HttpCalloutMock.class, new IntegrationExample_Test_Mock());
        String joke = IntegrationExample.getJoke();

        system.assertEquals('test joke', joke);
    }
}