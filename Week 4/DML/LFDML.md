# Module - DML

This module introduces DML and transaction control.

## Table of Contents

* [DML Statements](#dml-statements)
* [Dropping Tables](#dropping-tables)
* [Database Class](#database-class)
* [Transaction Control](#transaction-control)

### Helpful Links/References

* [Apex DML Operations (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dml_section.htm)
* [Merging Records (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_dml_examples_merge.htm)
* [Standard Objects (Object Reference for Salesforce and Lightning Platform)](https://developer.salesforce.com/docs/atlas.en-us.224.0.object_reference.meta/object_reference/sforce_api_objects_list.htm)
* [Database Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_database.htm)
* [Database Namespace (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_Database.htm)
* [Error Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_database_error.htm#apex_methods_system_database_error)

## DML Statements

In our discussion of SOQL, we addressed the way we implement the read part of database CRUD functionality in Salesforce. DML, or Data Manipulation Language, will be our tool to address the remaining C, U, and D. There are six total DML statements: `insert`, `update`, `upsert`, `delete`, `merge`, and `undelete`. Let's explain each.

Insert is just what it sounds like - it inserts new records into our org. In order to perform this operation successfully, we need to populate all fields that are required for that specific object.

The required fields are different for each standard object, so a good way to make sure we have assigned all necessary values is to consult the `Standard Objects` link in the `Helpful References/Links` section. Once we've selected the desired object, we can use `CTRL` + `F` to search for the string 'required' - any required fields are so marked in this documentation. For required fields on custom objects, we'll have to consult `Object Manager` in our org, unless we're wondering about a `Name` field because all non-`Auto Number` `Name` fields on custom objects are required.

Sidebar over - back to the rest of the DML statements. Update edits existing records. Upsert is a combination of insert and update that updates records that are already in our org and inserts any records that haven't been created yet. Delete deletes records from our database.

Merge is a combination of an update and a delete that takes two arguments: the record that will remain after the completion of the operation and either the single record or list of at most two records that will be merged into the first record, but we should note that merge can only be performed on records of the `Account`, `Case`, `Contact`, and `Lead` objects. Finally, we have undelete, which retrieves and restores records from our org's recycle bin.

So how do we make use of DML? Pretty simply actually! We can put a DML statement right in our Apex code, like this:

```apex
Account clevelandBrowns = new Account(Name='Cleveland Browns');
Account worstNflTeam = new Account(Name='Worst NFL Team');
insert clevelandBrowns;
System.debug(clevelandBrowns.Id)
insert worstNflTeam;
merge clevelandBrowns worstNflTeam;
```

Let's note a few things about the above code example. Even though we didn't (and can't) assign an Id to our `clevelandBrowns` account, we were still able to reference the record's Id after our first DML statement. This is because of Apex's tight integration with the database - after the system inserts our record, it automatically populates the variable in our code with the new record's Id.

We followed the argument format for `merge` that we pointed out earlier, but the remainder of our DML statements will follow the form of our two `insert` statements - taking a single argument that is either a single record or a collection of records on which we're performing the operation.

## Dropping Tables

This seems like an appropriate time to touch on a powerful SQL feature that experienced programmers may be wondering about: dropping tables. We do not have the ability to drop tables (i.e. objects) through DML - we can only delete records of those objects. If we'd like to delete a custom (not standard!) object, Salesforce has no issue with it - but we'll have to do it declaratively through `Setup` and not through code.

## Database Class

In addition to manipulating records through DML statements, we also have the ability to manipulate them through methods of the `Database` class. We'll discuss seven methods from this class: `Database.insert()`, `Database.update()`, `Database.upsert()`, `Database.delete()`, `Database.merge()`, `Database.undelete()`, and `Database.convertLead()`.

The first six are analogous to the DML statements of the same name. The seventh, `Database.convertLead()`, allows us to convert a Lead to an Account, a Contact, and optionally an Opportunity. This method takes two parameters; the first is an instance of the `Database.LeadConvert` class and the second is a parameter common to all seven of the `Database` methods we're discussing, so we'll touch on it shortly. Unless we pass a `true` value to the `setDoNotCreateOpportunity()` method of our `Database.LeadConvert` object, this operation will create a new Opportunity record.

So why would we want to use these methods over DML statements anyway? At first glance, they seem like DML statements, just with more typing. But they have a particularly useful feature, and here is where we'll segue into that second parameter we set aside a little bit ago. Let's look at the structure of `Database.insert()`:

```apex
Database.insert(recordsToInsert, allOrNone);
```

There's that second parameter - `allOrNone` - which is a Boolean that defaults to `true`. Our basic DML statements are `allOrNone` and there's no two ways about it - if we're using a DML statement on a list of records and there's an error in the very last record in that list, the entire transaction is rolled back and none of the changes are committed even though every previous record in the list did not contain an error.

Therein lies the main motivation for using the `Database` class: by setting `allOrNone` to false, we can allow partial completion so that all valid records are committed regardless of other records failing. If we don't use the `Database` class methods with this parameter value (whether we're using a standalone DML statement, the `Database` method with `allOrNone` set to true, or the `Database` method with `allOrNone` unspecified), any failing records will trigger a `DmlException` and our entire operation will fail.

To find any records that failed our operation, we can use the return values of our `Database` methods. Each of the methods we're talking about returns a single an instance of a result class or a list of them, depending on whether we operated on a single record or a list of records, respectively. The following table lists which of these result classes correspond to which `Database` class method.

| Database Class Method | Return Type |
| --------------- | --------------------------- |
| insert | Database.SaveResult |
| update | Database.SaveResult |
| upsert | Database.UpsertResult |
| delete | Database.DeleteResult |
| merge | Database.MergeResult |
| undelete | Database.UndeleteResult |
| convertLead | Database.LeadConvertResult |

Why is the return type for the final method `LeadConvertResult` instead of `ConvertLeadResult` when the method name is `convertLead`? Who knows! Salesforce! Anyway, each of these result classes contains methods that allow us to find out more information about the.... well... results of records in our operation. Let's list those methods in the following table.

| Method | Return Type | Purpose |
| ------ | ----------- | ------- |
| getId() | Id | Returns Id of associated record |
| getErrors() | List<Database.Error> | Returns any errors associated with record |
| isSuccess() | Boolean | Indicates if the operation was successful for the corresponding record |

`DeleteResult`, `MergeResult`, `SaveResult`, `UndeleteResult`, and `UpsertResult` each have all three of these methods (the `LeadConvert` class has the `getErrors()` and `isSuccess()` methods, as well as separate methods to retrieve the Ids of each of the records involved in the operation). In addition, `UpsertResult` has an `isCreated()` method that returns a `Boolean` indicating if the record was inserted or updated.

If we're trying to get information about any failing records, the values returned by the `getErrors()` methods are the most useful, so let's list the methods of the `Database.Error` class as well.

| Method | Return Type | Purpose |
| ------ | ----------- | ------- |
| getFields() | List\<String> | Returns list of field names that had problems |
| getMessage() | String | Returns message associated with specified error |
| getStatusCode() | System.StatusCode | Returns System.StatusCode enum describing problem (e.g. REQUIRED_FIELD_MISSING) |

Note that invoking partial completion only helps us avoid `DmlExceptions` - we'll still have problems when trying to insert a `null` sObject, as in the following code, which raises a `ListException` when the system finds a `null` element in our list.

```apex
List<Contact> cons = new List<Contact>();
Contact c;
cons.add(c);
Database.insert(cons, false);
```

## Transaction Control

Let's finish this module by discussing transaction control, particularly two more methods of the `Database` class: `Database.setSavepoint()` and `Database.rollback()`. We can wrap these methods around logic that alters data, and then return the database to the state it was in before those changes if we decide that we don't like them for whatever reason; like so:

```apex
// original database state
Savepoint sp = Database.setSavepoint();

/* some code that alters data and commits the alterations
the database is in a state that's different from it's original state */

Database.rollback(sp);
// the database is now back to its original state
```

This technique is commonly used in error handling. To implement it, we enclose our database-altering code in a `try` block and prepend it with a savepoint. If we encounter an error, we'll be able to rollback to how our database was beforehand by using the `Database.rollback()` method in the `catch` block.
