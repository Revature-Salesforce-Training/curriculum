public with sharing class AuraExample {
    

    @AuraEnabled
    public static string returnStringMessage(String message){
        
        return message;
        
    }
}
