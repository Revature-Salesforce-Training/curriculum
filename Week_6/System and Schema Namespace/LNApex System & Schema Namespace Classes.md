# Module - Apex System & Schema Namespace Classes

[Longform](<./LFApex System & Schema Namespace Classes.md>)

## System Namespace

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_System.htm)

- Contains many of the classes and methods that we've used so far
    - primitive Apex data types (`Blob`, `Date`, `Datetime`, `Decimal`, `Double`, `Id`, `Integer`, `Long`, `SObject`, `String`, `Time`) are all represented by classes in the namespace
        - when we create a primitive variable we're actually instantiating one of these classes, which contain methods for things like type conversion
    - Apex collections (`List`, `Set`, and `Map`) and enums (`Enum`) are also represented by classes in this namespace
    - `Exception` class is the parent of all standard exceptions and has methods for error handling
    - `Trigger` class containing Trigger context variables
- But our primary focus here is the `Database`, `Limits`, `System`, `Test`, and `UserInfo` classes - most of which will be review

### <mark>Database Class</mark>

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_database.htm#apex_methods_system_database)

- Holds methods used to interact with the database
- e.g. DML methods (`Database.insert()`, `Database.update()`, `Database.upsert()`, `Database.delete()`, `Database.undelete()`, and `Database.merge()`) and transaction control methods (`Database.rollback()` and `Database.setSavepoint()`)
- Also holds `Database.query()`, which we'll further explore when we talk about Dynamic SOQL

### <mark>Limits Class</mark>

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_limits.htm#apex_methods_system_limits)

- Consists of paired getter methods pertaining to Apex governor limits
- One half of each pair returns an integer indicating the governor limit for a given feature (starts with `getLimit`) and the other half returns an integer indicating how much of a given feature we've used (starts with `get`)
- Useful to ensure our code doesn't violate governor limits and crash (e.g. can have control flow that will queue an asynchronous job to perform remaining operations if we're about to violate governor limits)

| Transaction-Limited Operation | Method to Return Amount Used | Method to Return Limit | Limit |
| ----------------- | ---------------------------- | ---------------------- | ----- |
| SOQL Queries | Limits.getQueries() | Limits.getLimitQueries() | 100 (synchronous) |
| SOQL Subqueries | Limits.getAggregateQueries() | Limits.getLimitAggregateQueries() | 300 (synchronous) |
| Records Returned by SOQL Queries | Limits.getQueryRows() | Limits.getLimitQueryRows() | 50,000 |
| SOSL Searches | Limits.getSoslQueries() | Limits.getLimitSoslQueries() | 20 |
| DML Operations | Limits.getDMLStatements() | Limits.getLimitDMLStatements() | 150 |
| Records Processed by DML | Limits.getDMLRows() | Limits.getLimitDMLRows() | 10,000 |
| Heap Size | Limits.getHeapSize() | Limits.getLimitHeapSize() | 6 MB (synchronous) |
| CPU Time | Limits.getCpuTime() | Limits.getLimitCpuTime() | 10 sec (synchronous) |

### <mark>System Class</mark>

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_system.htm#apex_methods_system_system)

- Yup, the `System` namespace holds a `System` class
- We've used the class for
    - logging to the console (`System.debug()`)
    - testing (`System.assert()`, `System.assertEquals()`, `System.assertNotEquals()`, `System.equals()`, and `System.runAs()`)
- We're going to see further uses for this class when we talk about asynchronous Apex

### <mark>Test Class</mark>

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_test.htm#apex_methods_system_test)

- Holds methods like `Test.startTest()`, `Test.stopTest()`, and `Test.setCurrentPage()` (the latter for testing Visualforce pages)
- We'll see it again when we talk about testing asynchronous jobs and callouts

### <mark>UserInfo Class</mark>

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_userinfo.htm#apex_methods_system_userinfo)

- Holds methods that return all sorts of information about the running user
- We'll probably most commonly use `UserInfo.getProfileId()` and `UserInfo.getUserId()`

## <mark>Schema Namespace</mark>

[Documentation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_Schema.htm)

- Haven't really seen this yet, but it's coming
- Contains classes and methods that describe the configuration of our database (e.g. the objects and fields we set up declaratively and our security model)
- Will talk about the `getPicklistValues()` method from the `Schema.DescribeFieldResult` class when discussing dynamic Apex
- We'll see the `Schema.DescribeFieldResult` class again, along with `Schema.DescribeSObjectResult` and `Schema.SObjectType`, when we're talking about Apex security
