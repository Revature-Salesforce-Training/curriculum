public with sharing class SchemaNamespaceExample {
    
    
    //using schema to get info about a picklist
    public static List<String> getAccountIndustries() {
        Schema.DescribeFieldResult fr = Schema.SObjectType.Account.fields.Industry;

        /*
            Below would have the same effect as above. We are just using a token with the 
			getDescribe method to get the information. Instead of using a static member variable 
			like we did above. 

            Schema.DescribeFieldResult fr = Account.Industry.getDescribe();

        */
        List<Schema.PicklistEntry> pl = fr.getPicklistValues();
        List<String> picklistOptions = new List<String>();
        for(Schema.PicklistEntry pe : pl) {
            picklistOptions.add(pe.getValue());
        }
        return picklistOptions;
    }
}
