public with sharing class ContactsHelper {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getQueryContacts(String query) {

        return [SELECT Name, Phone, Email 
                FROM Contact 
                WHERE Name LIKE :query];
    }
}