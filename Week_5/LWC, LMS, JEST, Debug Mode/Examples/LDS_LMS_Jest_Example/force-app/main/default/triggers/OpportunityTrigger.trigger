trigger OpportunityTrigger on Opportunity (before update) {

    for(Opportunity opp : Trigger.New) {
        if(opp.StageName == 'Closed Won' || opp.StageName == 'Closed Lost') {
            opp.addError('Cannot update opportunities whose stage is closed won or closed lost');
        }
    }
}