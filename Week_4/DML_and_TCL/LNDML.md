# Module - DML

## DML Statements

[Apex DML Operations (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dml_section.htm)

- <mark>DML stands for Data Manipulation Language</mark>
- <mark>it's what we use to perform any create, update, or delete operations on records within our org</mark>
- <mark>DML statements can be included inline in Apex code</mark>
- there are six DML statements
    - <mark>insert</mark>
        - creates a new record and inserts it into the database
    - <mark>update</mark>
        - update an existing record
    - <mark>upsert</mark>
        - a combination of insert and update - will insert new records and update any existing ones
        - the upsert statement can be followed by two values - the first will be the record(s) to upsert and the second will be the External Id field to use to match to existing records
        - if we provide such a field, the upsert statement will function like the upsert operation in Data Loader
            - if an existing record with a matching record Id or a matching value for the specified External Id is found, that record will be updated
            - if no match is found, a new record will be created
            - if multiple matching values for the specified External Id are found, an exception thrown
    - <mark>delete</mark>
        - soft-deletes a record (i.e. moves it to the Recycle Bin in our org)
    - <mark>merge</mark>
        - allows us to merge multiple records into one
        - the merge statement is followed by two variables - the first is the record that will remain after the operation and the second is the record (or list of up to two records) to merge into the first
        - a combination of update and delete
        - the merge operation can only be performed on records of the `Account`, `Case`, `Contact`, and `Lead` objects
    - <mark>undelete</mark>
        - restores records from our org's Recycle Bin
- e.g.

```java
Account acc = new Account(Name='Revature');
insert acc;
```

- whenever we use a DML statement, we write the DML statement followed by the variable (whether a single sObject or collection of sObjects) to perform the operation on
- whenever we invoke an insert, update, or upsert operation, the Order of Execution runs on the record(s) that we're operating on
    - this includes the Save step
    - during the Save step, the system writes our record and its fields to the database, but doesn't commit our record
    - if we're creating a record, the Save step will be when the system populates the values of the system-defined fields (e.g. the record Id and audit fields)
        - if we create a record in Apex, the system will automatically populate the Id field on that record with the new record Id (i.e. we don't need to query for it)

## Database Class

[Database Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_database.htm)
[Error Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_database_error.htm#apex_methods_system_database_error)

- <mark>in addition to manipulating records through DML statements, we also have the ability to manipulate them through methods of the Database class</mark>
- <mark>Database class methods for DML operations include Database.insert(), Database.update(), Database.upsert(), Database.delete(), Database.merge(), Database.undelete(), and Database.convertLead()</mark>, the last of which is used to convert a Lead to an account, a contact, and optionally an opportunity
- when invoking one of these methods, we'll pass the single sObject or List of sObjects we want to act on as the first argument
- <mark>all of the Database class methods for DML operations have an additional optional allOrNone parameter</mark>
    - <mark>this parameter takes a Boolean value and defaults to true</mark>
    - <mark>this means is that DML operations using Database class methods are by default all-or-none operations - i.e. if the operation fails on a single record in a collection, the operation will fail for the entirety the collection, no matter the success or failure of any other record in the collection</mark>
    - <mark>if we give a false value to the allOrNone parameter, then we can implement partial completion functionality, so any error-free records will have their changes committed to the database and only those records that have errors will fail the operation</mark>
    - <mark>DML operations that use DML statements are always all-or-none operations and we can't change this</mark>
- <mark>the Database class methods for DML operations each return a single Result object or a List of result objects</mark>

| Database Class Method	| Return Type |
| --------------------- | ----------- |
| Database.insert() | Database.SaveResult |
| Database.update() | Database.SaveResult |
| Database.upsert() | Database.UpsertResult |
| Database.delete() | Database.DeleteResult |
| Database.merge() | Database.MergeResult |
| Database.undelete() | Database.UndeleteResult |
| Database.convertLead() | Database.LeadConvertResult |

    - each result classes contains methods that allow us to find more information about the results of records in our operation

| Method | Return Type | Purpose |
| ------ | ----------- | ------- |
| getId() | Id | Returns Id of associated record |
| getErrors() | List<Database.Error> | Returns any errors associated with the operation on the corresponding record |
| isSuccess() | Boolean | Indicates if the operation was successful for the corresponding record |
 
    - with these methods we can find out information about the success of the operation for each of the records involved
        - if we were executing the operation with a DML statement or by using a Database class method without the allOrNone parameter set to false, we'd be able to implement error handling with try-catch blocks and work with the DMLException (if thrown) to find information about the record(s) that failed
        - if we have a Database class method with allOrNone set to false, a DMLException won't be thrown even if all records in the operation fail

| Database.Error Method | Return Type | Purpose |
| --------------------- | ----------- | ------- |
| getFields() | List<String> | Returns list of field names that had errors |
| getMessage() | String | Returns message associated with the corresponding error |
| getStatusCode() | System.StatusCode | Returns System.StatusCode enum describing problem (e.g. REQUIRED_FIELD_MISSING) |
 
## Transaction Control

- <mark>the Database class also includes methods for transaction control, i.e. Database.setSavepoint() and Database.rollback()</mark>
- <mark>we can wrap these methods around logic that alters records in our org and then return the database to the state that it was in before those changes were made if we need to</mark>
- <mark>Database.setSavepoint() returns an instance of the Savepoint class</mark>
- <mark>we pass this Savepoint instance as an argument to Database.rollback()</mark>

## DML and Governor Limits

- there are governors on the amount of DML operations we can invoke in a single transaction and on the number of records those operations can operate on collectively
- <mark>to avoid the governor on the number of DML operations, we'll want to operate on collections of records, rather than individual records</mark>
- i.e. we can add all records that we want operate on to a single collection and operate on the entire collection at once (if we're inserting new records or making changes to existing ones, we can take care of that in a for loop before the operation, but we'll want to ensure that <mark>we keep our DML operations outside of loops</mark>)
