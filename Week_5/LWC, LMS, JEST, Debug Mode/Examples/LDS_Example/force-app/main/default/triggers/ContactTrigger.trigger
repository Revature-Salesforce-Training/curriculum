trigger ContactTrigger on Contact (before insert) {

    List<Contact> conListOld = [SELECT Email FROM Contact];
    
    for(Contact oldCon : conListOld) {
        for(Contact newCon : Trigger.New) {
            if(oldCon.Email == newCon.Email) {
                newCon.Email.addError('Duplicate Email found!');
            }
        }
    }
}