# Module - Apex Security & Sharing

[Longform](<./LFApex Security & Sharing.md>)

## Apex Security

- <mark>Apex security refers to enforcing our declarative security model</mark>
- Most of the time, this means <mark>ensuring that our Apex code respects the object, field, and record level security we've set up for whatever user is indirectly/directly running our code</mark>
- Because we often make Apex controllers for Visualforce pages and Lightning components, Apex security will also ensure that security is applied to users interacting wtih these interfaces

### Record Level Security in Apex

- By default, Apex generally runs in system mode
    - Apex is a part of the platform, so it can operate on all records in our database
    - Apex is pretty generous, so it assumes that everyone should have the level of access it does by default
    - of course, this isn't always the best approach
    - sharing keywords are how we tame Apex
- There are three sharing keywords
    - <mark>`with sharing`</mark>
        - <mark>user context</mark>
        - <mark>enforces the record access of the user who is explicitly/implicitly invoking our code - if they can't can't operate on a record, our code won't operate on it</mark>
        - whatever operation a user wants to perform, they'll have to either own the record or have access to perform that operation through the sharing model
    - <mark>`without sharing`</mark>
        - <mark>Apex is forced to run in system mode (generally the default)</mark>
    - <mark>`inherited sharing`</mark>
        - <mark>depends on the context</mark>
        - <mark>a method in an `inherited sharing` class acts like</mark>
            - <mark>`with sharing` if the class that called it is `with sharing`</mark>
            - <mark>`without` sharing if the class that called it is `without sharing`</mark>
            - <mark>`with sharing` if it is what begins our transaction</mark>
- If we choose to specify a sharing keyword, we put it in our class signature directly after the access modifier, e.g.

```apex
public with sharing NotSoGenerousClass {}
```

- If we choose not to include a sharing phrase, our code will act like
    - `without sharing` if it is what begins our transaction
    - `inherited sharing` otherwise (taking on the context of the method calling it)
- Summary table

| Sharing Phrase | When starting transaction, acts like | When called by without sharing, acts like | When called by with sharing, acts like |
| -------------- | ------------------------------------------ | ------------------------------------------ | ---------------------- |
| with sharing | with sharing | with sharing | with sharing |
| without sharing | without sharing | without sharing | without sharing |
| inherited sharing | with sharing | without sharing | with sharing |
| no phrase | without sharing | without sharing | with sharing |

### Object and Field Level Security in Apex

- for the most part, the tools available for enforcing object and field level security are the same, so we'll tackle them at once
- three main ways to enforce these security levels, easiest to most difficult to implement (and also least to most precise)
    - <mark>`WITH SECURITY_ENFORCED` SOQL clause</mark>
    - <mark>`Security.stripInaccessible()` method</mark>
    - <mark>classes and methods from the `Schema` namespace</mark>

#### WITH SECURITY_ENFORCED SOQL Clause

- Like putting a picture hanger into a wall with a sledgehammer - sure, it works, but it's not graceful or precise
    - but it is pretty quick to implement: all we have to do is write this clause following any `WHERE` filters in our SOQL queries
- <mark>When a query with this clause is executed, the system will check to make sure that the user invoking the query has read access to any objects and _all_ fields that are queries</mark>
- <mark>If they don't have access to a particular object/field, a `System.QueryException` will be thrown - so we'll have to implement some error handling to ensure we don't crash</mark>
    - only checks fields/objects referenced in the `SELECT` and `FROM` clauses - not anything in a `WHERE`, `GROUP BY`, etc.

#### Security.stripInaccessible()

- `WITH SECURITY_ENFORCED` gets scared easily, so it's not the best tool
    - `Security.stripInaccessible()` is a little more elegant
- Defines two parameters
    - an `AccessType` enum (either `AccessType.CREATABLE`, `AccessType.READABLE`, `AccessType.UPDATABLE`, or `AccessType.UPSERTABLE`)
        - corresponds to the type of permissions we're checking for
    - a list of generic sObjects
        - of course, the system can implicitly type cast from a class to a parent class, so we won't have trouble if we pass, e.g. a list of contacts
- Returns an instance of the `SObjectAccessDecision` class
    - <mark>this class has an instance method named `getRecords()` that returns the post-operation records</mark>
        - <mark>these post-operation records only contain the field values that the running user can perform the action specified by the `AccessType` enum</mark>
- e.g.

```apex
List<sObject> cons = [SELECT Id, Name FROM Contact];
System.debug(cons);
SObjectAccessDecision decision = Security.stripInaccessible(AccessType.UPDATABLE,
  cons);
System.debug(decision.getRecords());
```

- The first debug statement will print a list of contacts including both the `Name` and `Id` fields
    - but `Name` on contact is a formula that concatenates the values of the `FirstName` and `LastName` fields
        - formula => read-only, non-editable field
- The second debug statement will print the list of contacts including only the `Id` fields
    - `Id` isn't updateaable either, but the system has to keep track of the records somehow, so `Security.stripInaccessible()` will _never_ remove the `Id` field
    - similarly, `WITH SECURITY_ENFORCED` will never remove `Id` values either
        - if a user can access an object, they're automatically able to access the `Id` field
- So `Security.stripInaccessible()` is a lot more graceful with FLS, but not with object level security
    - e.g. if we attempt to check for a user's ability to read a field, but they don't have read access to the corresponding object, the method will throw a `System.NoAccessException`

#### Schema Namespace Classes and Methods

- The most graceful option for Apex security.... like a delicate ballerina
- quick review
    - the `SObjectType` class has a static member variable for each sObject within our org
    - these variables are instances of the `DescribeSObjectResult` class
    - <mark>`DescribeSObjectResult`</mark> has the `isAccessible()`, `isCreateable()`, `isDeletable()`, and `isUpdateable()` methods, all of which <mark>return `true` if the running user can invoke the corresponding operation on the object and `false` otherwise</mark>
- e.g.

```apex
Account a = new Account(Name='Example');
if(Schema.SObjectType.Account.isCreateable()){
    insert a;
}
```

- To check permissions for a specific field on an object, we access the `fields` instance variable of the `DescribeSObjectResult` class to access associated <mark>`DescribeFieldResult`</mark> objects
    - each field on the object is represented through a `DescribeFieldResult` object
    - `DescribeFieldResult` has `isAccessible()`, `isCreateable()`, and `isUpdateable()` methods, all of which act like their counterparts in the `DescribeSObjectResult` class.... well _almost_
        - these methods in the `DescribeFieldResult` class actually double dip: <mark>the value returned by any of the method is `true` only if the user has _both_ the corresponding object and field settings</mark>
- Salesforce likes to make things difficult for us, so "createable" and "updateable" have second E's in the `DescribeSObjectResult` and `DescribeFieldResult` methods, but not in the `AccessType` enum values

## Apex Managed Sharing

- Apex sharing is the implicit top (and therefore least restrictive) layer of the record access pyramid
- It's the process of programmatically sharing a record with a user
    - when we do this, we can provide access that will persist across ownership changes (remember, record access giving threw manual sharing is removed when the record owner changes)
- Main engine is the share object
- Share objects are system objects created by Salesforce, there's one for each standard and custom object
- The name of a share object is determined by whether the associated object is standard or custom
    - sharing objects corresponding to standard objects are named so that `Share` is appended to the standard object name (e.g. `ContactShare`)
    - sharing objects corresponding to custom objects have `__Share` replacing `__c` in their API names (e.g. `Jedi__Share`)
- Every share object has four fields that we have to populate
    - `AccessLevel`, which can be `Read` or `Edit`
    - `UserOrGroupId`, which takes the record `Id` of the user or group we're sharing with
    - `ParentId`, which holds the `Id` of the record that we're sharing
    - `RowCause`, which holds our reason for sharing the record
- We insert share records just like we insert records of any other object (DML)
- Just like manual sharing, Apex sharing has to provide access beyond what's given by the OWD for the corresponding object

** Extra information: the default value for `RowCause` is `Manual`. But this is the value that the system uses when it creates the share records that represent our manual shares under-the-hood and any share records with a `Manual` reason get deleted when the record owner changes. So if we want to have persistent access, we'll have to create a custom sharing reason, which we can only do with custom objects and must go into Salesforce Classic to perform. **