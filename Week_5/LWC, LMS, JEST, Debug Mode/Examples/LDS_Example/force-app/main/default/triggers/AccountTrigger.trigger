trigger AccountTrigger on Account (after insert) {
    
    Set<String> accNames = new Set<String>();
    
    for(Account acc : Trigger.New) {
        accNames.add(acc.Name);
    }
    
    List<Contact> conList = [SELECT LastName FROM Contact WHERE LastName in :accNames];
    
    for(Account accs : Trigger.New) {
        for(Contact cons : conList) {
            if(accs.Name == cons.LastName) {
                cons.AccountId = accs.Id;
            }
        }
    }
    
    update conList;
}