# Module - Apex System & Schema Namespace Classes

This module introduces and reviews classes and common methods within the Apex System and Schema namespaces.

## Table of Contents

* [System Namespace](#system-namespace)
    * [Database Class](#database-class)
    * [Limits Class](#limits-class)
    * [System Class](#system-class)
    * [Test Class](#test-class)
    * [UserInfo Class](#userinfo-class)
* [Schema Namespace](#schema-namespace)

### Helpful References/Links

* [Execution Governors and Limits (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm)
* [System Namespace (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_System.htm)
* [Database Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_database.htm#apex_methods_system_database)
* [Limits Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_limits.htm#apex_methods_system_limits)
* [System Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_system.htm#apex_methods_system_system)
* [Test Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_test.htm#apex_methods_system_test)
* [UserInfo Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_userinfo.htm#apex_methods_system_userinfo)
* [Schema Namespace (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_Schema.htm)

## System Namespace

The System namespace contains the classes and methods that are at the heart of much of the Apex functionality we have explored so far and will explore throughout the remainder of training, so let's begin by listing those members that we've already seen.

In the `Introduction to Apex` module, we talked about primitive data types in Apex. When we create a variable using one of these data types, we're actually instantiating the corresponding `System` namespace class (either `Blob`, `Date`, `Datetime`, `Decimal`, `Double`, `Id`, `Integer`, `Long`, `SObject`, `String`, or `Time`), which contains methods to perform operations such as explicit type conversion. The collections that we discussed in the same module are also namespace members - the `List`, `Set`, and `Map` classes contain the constructors we use to instantiate the collections and methods used to add values to, retrieve values from, and interact with them.

While we discussed mathematical operators in Apex during our introduction, we didn't discuss the modulus operation because Apex doesn't have a modulus operator. However, the `Math` class (another part of the `System` namespace) holds a method for finding moduli, in addition to other mathematical methods and constants such as the values of pi and e. Lastly, the namespace holds the `Enum` class that governs the abstract data type we explored that we briefly touched on when first discussing Apex.

That's a lot of classes from this namespace in just one module - but we're not done! The `System` namespace's `Exception` class is the parent of all standard exceptions and holds methods such as `setMessage()` and `getMessage()` that we encountered in the `Apex Exceptions` unit. It was also present in our material covering triggers (by way of the `Trigger` class which holds all of the Trigger context variables) and Visualforce (by way of the `ApexPages` and `PageReference` classes).

The namespace will continue to appear in our future studies. For example, the `Search` class will be part of our discussion of dynamic SOSL in the `Dynamic Apex` module. We'll encounter the `Queueable`, `QueueableContext`, `Schedulable`, and `SchedulableContext` interfaces when discussing asynchronous Apex. Finally, our material in the `Apex Integration Services` module will heavily utilize the `Http`, `HttpRequest`, `HttpResponse`, `JSON`, and `WebServiceCallout` classes in addition to the `HttpCalloutMock` and `WebServiceMock` interfaces.

All that and we haven't even gotten to one of our main topics in this module, a particular set of `System` namespace classes including `Database`, `Limits`, `System`, `Test`, and `UserInfo`. We have employed a few of these classes in the past, so throughout the remainder of this module we will offer a reminder of some of their most common and helpful methods and preview where we might see them again in the future.

### Database Class

As its name suggests, the `Database` class contains methods used to interact with the database. In the `DML` module, we discussed its DML (`Database.insert()`, `Database.update()`, `Database.upsert()`, `Database.delete()`, `Database.undelete()`, `Database.merge()`, and `Database.convertLead()`) and transaction control methods (`Database.setSavepoint()` and `Database.rollback()`).

This class also contains methods for performing operations on external objects like `Database.insertAsync()`, `Database.updateAsync()`, and `Database.deleteAsync()`. We'll see it again through the `Database.query()` method that we'll discuss while covering dynamic SOQL.

### Limits Class

We first came upon the `Limits` class in our `Governor Limits` unit. As we saw there, this class consists entirely of paired getter methods pertaining to Apex governor limits where one half of each pair returns an integer indicating the governor limit for a given feature (beginning wtih `getLimit`) and the other half returns an integer indicating how much of a given feature we have used (beginning with `get`). Let's summarize our findings from that material in the following table:

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

The class contains other methods that we didn't touch on because they were outside of our scope at the time, but will be relevant to our future material. For example, `Limits` holds methods relating to the maximum number of HTTP callouts (the `Limits.getCallouts()` and `Limits.getLimitCallouts()` methods), which is 100 per transaction and is relevant to the `Apex Integration Services` unit.

It also holds functions pertaining to subjects that we will explore in the `Asynchronous Apex` module, briefly listed in the following table.

| Transaction-Limited Operation | Method to Return Amount Used | Method to Return Limit | Limit |
| ----------------------------- | ---------------------------- | ---------------------- | ----- |
| Queued Apex Jobs | `Limits.getQueueableJobs()` | `Limits.getLimitQueueableJobs()` | 50 |
| Future Method Calls | `Limits.getFutureCalls()` | `Limits.getLimitFutureCalls()` | 50 |

### System Class

That's right - the `System` namespace contains the `System` class (yet another unexpected development). We introduced this class in the `Introduction to Apex` unit, where we used `System.debug()` for the first time. The class also contains useful methods for test classes like `System.assert()`, `System.assertEquals()`, `System.assertNotEquals()`, `System.equals()`, and `System.runAs()`.

We will make further use of the `System` class in our asynchronous Apex material, particularly through the `System.enqueueJob()`, `System.schedule()`, and `System.scheduleBatch()` methods.

### Test Class

Unsurprisingly, the `Test` class was part of our material in the `Apex Testing Framework` module by way of the `Test.startTest()` and `Test.stopTest()` methods, which give a new set of governor limits to any code contained within a block that they enclose and execute any asynchronous operations queued within that block. It also appeared when we talked about testing Visualforce and saw the usefulness of the `Test.setCurrentPage()` function.

We'll see this class again through the `Test.setMock()` method that we'll cover in our `Apex Integration Services` module.

### UserInfo Class

`UserInfo` returns all sorts of information about the running user through methods such as `UserInfo.getFirstName()`, `UserInfo.getLanguage()`, `UserInfo.getLastName()`, `UserInfo.getLocale()`, `UserInfo.getName()`, and `UserInfo.getTimeZone()`. Throughout our programming journey, we'll probably most commonly use the `UserInfo.getProfileId()` and `UserInfo.getUserId()` methods to determine what to show or execute based on the characteristics of the running user.

## Schema Namespace

We haven't really seen the `Schema` namespace yet, but it's quite useful. This namespace contains a variety of classes that are used to access information about the configuration of our data model and the accompanying security model. For example, when discussing dynamic Apex, we'll use the `getPicklistValues()` method from the `Schema.DescribeFieldResult` class. This method returns a list of objects of another `Schema` class, `Schema.PicklistEntry`, which allows us to access the labels and values of a picklist at runtime.

The `Schema.DescribeFieldResult` class will also be included in our `Apex Security & Sharing` module. It is there that we'll discuss how we can use the `Schema.DescribeFieldResult`, `Schema.DescribeSObjectResult`, and `Schema.SObjectType` classes to ensure that the running user has the permissions to perform a specific operation before our code executes it on their behalf.
