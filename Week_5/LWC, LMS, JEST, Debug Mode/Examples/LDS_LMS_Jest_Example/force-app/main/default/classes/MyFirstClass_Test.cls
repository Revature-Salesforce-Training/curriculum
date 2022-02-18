@isTest
public class MyFirstClass_Test {
    
    @TestSetup
    public static void MakeTestData() {
        
    }

    @isTest
    public static void single() {
        
        //Account acc = new Account(Name='com', Rating='Hot');
        //Contact con = new Contact(firstName='conner', lastName='Mcgreggor');
        //insert acc;
        //insert con;
        
        //List<ID> fixedSearchResults = new List<Id>();
        //fixedSearchResults.add(acc.Id);
        //fixedSearchResults.add(con.Id);
        //Test.setFixedSearchResults(fixedSearchResults);
        //List<List<sObject>> searchList = [FIND 'com' RETURNING Account(Name, Rating), Contact(Name)];
        //<Account> accList = searchList[0];
        
        //MyFirstClass c = new MyFirstClass();
        
        
        //List<List<sObject>> sList = c.mySoslMethod();
        //List<Account> accList = sList[0];
        //System.debug(accList);
        //System.assertEquals(accList[0].Name, 'com');
        //
        
        MyFirstClass c = new MyFirstClass();
        c.dataFactory(1);
        
        Contact con = [SELECT Name FROM Contact];
        System.assertEquals('John Doe0', con.Name);
    }
    
    @isTest
    public static void bulkTest() {
        
        MyFirstClass c = new MyFirstClass();
        c.dataFactory(100);
        
        List<Contact> conList = [SELECT Name FROM Contact];
        System.assertEquals(100, conList.size());
    }
    
    @isTest
    public static void deleteTest() {
        
        List<Contact> con = new List<Contact>();
        con.add(new Contact(firstName='John', lastName='Doe'));
        insert con;
        
        //List<Case> caseList = Test.loadData(Case.sObjectType, 'TestCases');
        
        List<Contact> conQuery = [SELECT id FROM Contact];
        System.assertEquals(1, conQuery.size());
        
        MyFirstClass c = new MyFirstClass();
        
        Test.startTest();
        c.deleteRec(con);
        Test.stopTest();
        
        List<Contact> anotherConQuery = [SELECT id FROM Contact];
        System.assertEquals(0, anotherConQuery.size());
        
    }
    
    @isTest
    public static void userTesting() {
        // Setup test data
        // Create a unique UserName
        String uniqueUserName = 'standarduser' + DateTime.now().getTime() + '@testorg.com';
        // This code runs as the system user
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
        User u = new User(Alias = 'standt', Email='standarduser@testorg.com',
        EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
        LocaleSidKey='en_US', ProfileId = p.Id,
        TimeZoneSidKey='America/Los_Angeles',
         UserName=uniqueUserName);

        System.runAs(u) {
              // The following code runs as user 'u'
              System.debug('Current User: ' + UserInfo.getUserName());
              System.debug('Current Profile: ' + UserInfo.getProfileId());
          }
    }
    
}