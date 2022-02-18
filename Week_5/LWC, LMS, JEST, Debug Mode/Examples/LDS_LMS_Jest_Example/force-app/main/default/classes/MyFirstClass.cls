public with sharing class MyFirstClass {

    /*
    public static void helloWorld() {
        System.debug('Hello world!');
    }
    
    
    public List<List<sObject>> mySoslMethod() {
        List<List<sObject>> mySoslResult = [FIND 'com' RETURNING Account(Name, Rating), Contact(Name)];
		List<Account> accList = mySoslResult[0];
        List<Contact> conList = mySoslResult[1];
        
        return mySoslResult;
    } */
    
    public void dataFactory(Integer i) {
        List<Contact> conList = new List<Contact>();
        for(Integer g = 0; g < i; g++) {
            Contact c = new Contact(firstName='John', lastName='Doe' + g);
            conList.add(c);
        }
        insert conList;
    }
    
    public void deleteRec(List<sObject> sList) {
        delete sList;
    }
    
}