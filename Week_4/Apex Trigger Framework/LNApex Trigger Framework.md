# Apex Trigger Framework

[Longform](<./LFApex Trigger Framework.md>)

## Triggers

[Triggers (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers.htm)

* we have two types of Apex files - classes and triggers
* <mark>a trigger is a set of code is invoked when a set DML operation occurs on a specified object</mark>
* <mark>there are two main types of triggers</mark>
    * <mark>before triggers are invoked before the Save step in the order of execution</mark>
        * <mark>they're used for performing more complex validation than we can accomplish through validation rules, setting default values for fields, or performing updates on the fields of the records involved in the DML operation</mark>
        * <mark>when using before triggers for either of these last two cases, we don't (and actually can't) invoke a DML operation on those records that initially invoked the DML operation</mark>
            * <mark>but any changes that we make to the records involved in the DML operation in a before trigger will be automatically written to the database in the Save step</mark>
    * <mark>after triggers are invoked after the Save step in the order of execution</mark>
        * <mark>in the Save step, records have the values for their system-defined fields (e.g. audit fields being set)</mark>
        * <mark>this includes populating the record Id of any newly created records</mark>
        * <mark>in after triggers, we're not able to edit the fields of the records that invoked the DML operation, so we use after triggers for making changes to other records (including, e.g., setting the value of a relationship field with the Id of a newly created record)</mark>
 
## Creating Triggers

* we can make triggers in the Developer Console and Visual Studio Code
* when creating a trigger in the Developer Console, we'll provide a name for the trigger and choose the object that it will act on
    * this trigger will then be invoked as part of the Order of Execution when one of our specified events occurs on a record of the object that we chose
* <mark>trigger signature skeleton</mark>

    ```java
    trigger triggerName on sObject (before insert) {
    }
    ```

    * `triggerName` is the name of the trigger
        * as we'll discuss later, one of the trigger best practices is to have no more than one trigger per object
        * to drive home this best practice, we commonly name our triggers after the object they're associated with (e.g. `ContactTrigger`)
    * `sObject` is the object our trigger is associated with
    * following the sObject, the events that invoke our trigger will be in parentheses

## Trigger Events

* a trigger event is a combination of trigger type and DML event
* there are seven total trigger events - <mark>before insert, after insert, before update, after update, before delete, after delete, and after undelete</mark>
* the combination of trigger events and our associated object determine when our trigger will fire (e.g. a `before insert` trigger on `Account` will be invoked in the before trigger step of the Order of Execution whenever a new account is created)

## Trigger Context Variables

[Trigger Context Variables (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_context_variables.htm)

[Context Variable Considerations (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_context_variables_considerations.htm)

| Boolean Trigger Context Variable | Returns `true` if... |
| ---------------------------------------- | ------------------- |
| <mark>Trigger.isExecuting</mark> | <mark>A trigger is the current execution context.</mark> |
| <mark>Trigger.isInsert</mark> | <mark>The trigger was invoked by an insert operation.</mark> |
| <mark>Trigger.isUpdate</mark>	| <mark>The trigger was invoked by an update operation.</mark> |
| <mark>Trigger.isDelete</mark> | <mark>The trigger was invoked by an delete operation.</mark> |
| <mark>Trigger.isUndelete</mark> | <mark>The trigger was invoked by an undelete operation.</mark> |
| <mark>Trigger.isBefore</mark> | <mark>The trigger is a before trigger - i.e. it was fired before the soft-save in the Order of Execution.</mark> |
| <mark>Trigger.isAfter</mark> | <mark>The trigger is a after trigger - i.e. it was fired after the soft-save in the Order of Execution.</mark> |
 
* we use the Boolean trigger context variables to determine the invoking operation and trigger type
    * we do this with control flow to be able to direct the execution appropriately (e.g. we would wrap code to execute for a before insert trigger in a conditional that checks for the values of the `Trigger.isBefore` and `Trigger.isInsert` context variables)
* `Trigger.isExecuting` is commonly used in helper/handler/utility methods that our trigger calls in the case that the logic within that method was written to be called by both triggers and other Apex classes (so if we're referring to Trigger context variables in that helper method, we'll wrap those references in conditionals that check the value of `Trigger.isExecuting` so that we ensure that a trigger invoked our method and we're not going to try to reference a null value)
    * e.g.

```java
if(Trigger.isExecuting) {
System.debug(Trigger.new);
}
```

| Trigger Context Variable | Data Type | Available In | Explanation |
| ------------------------------ | ------------ | --------------- | -------------- |
| <mark>Trigger.new</mark> | <mark>`List<sObject>`</mark>, e.g. `List<Account>` | <mark>insert, update, and undelete triggers</mark> | <mark>Holds new versions of records involved in the trigger operation (i.e. the records as they will be if the operation is successfully committed).</mark> |
| <mark>Trigger.newMap</mark> | <mark>`Map<Id, sObject>`</mark>, e.g. `Map<Id, Account>` | <mark>before update, after insert, after update, and after undelete triggers</mark> | <mark>Holds new versions of records involved in the trigger operation as the values to which the corresponding record Ids are mapped.</mark> |
| <mark>Trigger.old</mark> | <mark>`List<sObject>`</mark>, e.g. `List<Account>` | <mark> update and delete triggers</mark> | <mark>Holds old versions of records involved in the trigger operation (i.e. the records as they were before the operation started).</mark> |
| <mark>Trigger.oldMap</mark> |<mark>`Map<Id, sObject>`</mark>, e.g. `Map<Id, Account>`	| <mark>update and delete triggers</mark> | <mark>Holds old versions of records involved in the trigger operation as the values to which the corresponding record Ids are mapped.</mark> |
| <mark>Trigger.operationType</mark> | <mark>System.TriggerOperation</mark>	| <mark>All triggers</mark> | <mark>Returns an enum specifying the invoking trigger event.</mark> |
| <mark>Trigger.size</mark> | <mark>Integer</mark> | <mark>All triggers</mark> | <mark>Returns the sum of the sizes of Trigger.old and Trigger.new</mark> |
 
* <mark>merge and upsert are broken down into their constituent parts - so to handle the merge operation, we want to use the Trigger context variables to check for the operation to be both an update and a delete</mark>
* <mark>and to handle the upsert operation, we want to use the Trigger context variables to check for the operation to be both an insert and an update</mark>
* the values in `Trigger.old` and `Trigger.oldMap` are always read-only
* the values in `Trigger.new` and `Trigger.newMap` are editable if we're working in a before trigger, and read-only in after triggers
* the possible values for the `Trigger.operationType` enum are `BEFORE_INSERT`, `BEFORE_UPDATE`, `BEFORE_DELETE`, `AFTER_INSERT`, `AFTER_UPDATE`, `AFTER_DELETE`, and `AFTER_UNDELETE`
* any trigger that handles more than one event will direct the execution path appropriately by either using a conditional and the `Boolean` trigger context variables to determine the invoking event or by using a switch statement and the `Trigger.operationType` context variable to determine the invoking event
* the order of the records in `Trigger.old` may not necessarily be the same as their order in `Trigger.new`
    * so to avoid any problems, we'll commonly want to work with the List version of one of `Trigger.new`/`Trigger.old` and the Map version of the other
    * we can iterate through the List with an enhanced for loop and then use the record Id of the record that we're working on in the current iteration and pass it as an argument to the `get()` method of the map, to get the other version of the same record

```java
for(Account a : Trigger.new) {
System.debug('Old version of record: ' + Trigger.oldMap.get(a.Id));
}
``` 

## Trigger Best Practices

* we have four trigger-specific best practices
* <mark>we should have at most one trigger per object</mark>
    * having one trigger per object allows us to maintain readability of our codebase
    * while the Order of Execution tells us where our before and after triggers will fire in relation to other tools
    * the Order of Execution DOES NOT tell us the order in which multiple triggers acting on the same event on the same object will be invoked
    * so to ensure the order in which our code will run, we want to stick to one trigger per object
    * following this best practice is the motivation behind the common trigger naming convention
    * some developers will even create triggers that handle all seven trigger events even if not all are being used at the time just to drive the best practice home further
    * we'll use control flow (i.e. "traffic cop logic") to determine the invoking event and execute the appropriate code
* <mark>triggers should be logicless</mark>
    * a trigger should contain traffic cop logic to determine the invoking event and then it should invoke a method from a helper/handler/utility class to perform the actual business logic
    * this helps keep our triggers short and readable
    * it also promotes code reusability because we'll later be able to invoke that method from other contexts
        * we can't explicitly invoke a trigger, so we wouldn't be able to reuse the code if it was entirely in the trigger
* <mark>triggers should be bulkified</mark>
    * when a DML operation on more than 200 records occurs, the system implicitly batches the records into groups of 200
    * at the bare minimum, our triggers should be able to successfully handle 200 records without violating governor limits
    * we achieve this bulkification by following the best practices we discussed for avoiding the governors on DML operations and SOQL queries
    * we should avoid writing recursive triggers
    * recursive triggers are two or more triggers that continually indirectly invoke each other in a single transaction
    * if we do we write recursive triggers, we'll quickly violate the governor on trigger stack depth (which is 16), causing our commit to fail and any changes it would've made won't persist

## Trigger Use Cases

* in addition to the use cases we listed for before and after triggers earlier, we can also use after triggers to implement Apex sharing
* we can use before triggers to implement more complex validation than we can through validation rules
    * <mark>if we determine that a record is invalid, we can call the addError() method on it, which prevents the DML operation from occuring on that particular record</mark>
    * this method can be called on an `sObject` or a field on an `sObject`
    * it takes one argument - the error message to surface and display to the user
    * if we call `addError()` on an `sObject`, the error message will be displayed at the top of the page
    * if we call `addError()` on a field on an `sObject`, the error message will be displayed next to that field
