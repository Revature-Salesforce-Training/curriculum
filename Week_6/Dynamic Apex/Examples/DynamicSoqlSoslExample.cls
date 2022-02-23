public with sharing class DynamicSoqlSoslExample {
    
 
    public static List<Contact> dynSoql() {

        String t = 'Andy Young';
        String query = 'SELECT Id FROM Contact WHERE Name =: t';
        List<Contact> conList = Database.query(query);
        return conList;
    }

    public static List<List<sObject>> dynSosl() {
        
        String t = 'Andy Young';
        String query = 'Find :t RETURNING Contact(Phone, Email)';
        List<List<Contact>> soslResults = search.query(query);
        return soslResults;
    }
}