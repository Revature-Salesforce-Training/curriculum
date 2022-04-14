# Module - Apex Trigger Framework

This module introduces the Apex Trigger Framework, including trigger types/events, trigger purposes, and best practices.

## Table of Contents

* [Triggers](#triggers)
* [Creating Triggers](#creating-triggers)
* [Trigger Events](#trigger-events)
* [Trigger Context Variables](#trigger-context-variables)
* [Trigger Best Practices](#trigger-best-practices)
* [Trigger Use Cases](#trigger-use-cases)
* [Custom Validation in Before Triggers](#custom-validation-in-before-triggers)

### Helpful References/Links

* [Triggers (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers.htm)
* [System Fields (Object Reference for Salesforce and Lightning Platform)](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/system_fields.htm)
* [Things You Should Know about Data in Apex (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_dml_limitations.htm)
* [Triggers and Recovered Records (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_recovered_records.htm)
* [Trigger Context Variables (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_context_variables.htm)
* [Context Variable Considerations (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_context_variables_considerations.htm)
* [Apex Governor Limits (Salesforce Developer Limits and Allocations Quick Reference)](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_apexgov.htm)

## Triggers

Since this entire module is about triggers, we should probably begin by defining them. Anyone who has experience with SQL will likely already be familiar with the term, but let's provide an explicit definition to be safe. An Apex trigger is a set of Apex code that is invoked by a DML operation on a record of a particular object. There are two types of triggers: `before` and `after`.

`Before` triggers are used to perform more complex validation than validation rules can accomplish or in use cases where those rules are simply not applicable - e.g. when a record is deleted. We can also use `before` triggers to update or provide default values for fields. As their name suggests, `before` triggers are fired before the soft-save in the Order of Execution (see the `Order of Execution` module), so we can still edit the field values of the record or records that invoked the DML operation in the first place. Note that we cannot (and do not need) to execute a second DML operation on those records to persist our changes - when we change the values of the records that invoked our trigger, our updates persist automatically.

`After` triggers are likewise appropriately named because they execute after the soft-save in the Order of Execution, which means that the field values of the records that invoked this trigger are uneditable. So instead of using them to make changes to the records that were involved in the initial DML operation, we use `after` triggers to make changes to other records, most often those on other objects (because we're working with separate records, we _will_ need to use DML operations to persist these changes).

As part of its tasks during the save step, the system populates the `LastModifiedDate`, `LastModifiedById` (which holds the `Id` of the user who modified the record), and `SystemModstamp` fields, the last of which will hold the date and time when the record was last modified, regardless of whether this modification was done by a user or an automated process such as a scheduled flow. If the record is being created, the system will also populate the `Id`, `CreatedDate`, and `CreatedById` fields.

In many cases, we'll be waiting for the `after` trigger when a record is created in order to work with that record's `Id` after it's given by the soft-save. We'll commonly use this value to, e.g., send a Chatter post with a link to the new record or update a relationship field on a related record.

## Creating Triggers

To create a trigger in the Developer Console, we navigate to `File` > `New` > `Apex Trigger`. In the resulting popup, we'll provide a name for our trigger and choose the sObject with which it's associated. Once we've performed this association, the trigger becomes a part of the Order of Execution for DML events on that object. While it may not rise to the level of being a best practice, it is standard to name the trigger after the object it acts on, e.g. we would name a trigger on the Account object `AccountTrigger`.

Now that we've created our trigger, it'll be invoked whenever our chosen DML operations occur on a record of the associated object. Of course, because we're operating within the Developer Console, the system provides us a default code skeleton that looks like the following.

```apex
trigger triggerName on sObject (before insert) {
}
```

Note that `triggerName` will be replaced with the name we provided and `sObject` will be supplanted by the object we chose.

While we get this skeleton for free, whiteboarding a trigger from scratch is an _extremely_ common interview question, so let's break down the above syntax. But before we start, we should be clear that our file here is not an Apex class, but an Apex trigger - classes and triggers are two distinct entities, and they therefore naturally have two distinct signatures.

The trigger signature begins with the `trigger` keyword, followed by the name of our trigger, the `on` keyword, the API name of the sObject it's associated with (a trigger must be related to _exactly_ one object), the trigger events it acts on in parentheses (we'll get to those in a bit), and finally the trigger body contained in curly braces. This syntax is the same regardless of where we create our trigger, but if we make it through the `SFDX: Create Apex Trigger` command included with the `Salesforce Extensions for Visual Studio Code`, we'll get a slightly different skeleton, as shown below.

```apex
trigger triggerName on SOBJECT (before insert) {
}
```

`triggerName` is still a placeholder, but `SOBJECT` is not. Because the wizard for creating a trigger in Visual Studio Code does not have us choose the associated object, we'll have to make this specification ourselves once our file has been created.

## Trigger Events

Trigger events are the actions that trigger (fine... "invoke") our triggers. Each trigger event is a combination of trigger type (either `before` or `after`) and a DML operation. The seven trigger events are `before insert`, `before update`, `before delete`, `after insert`, `after update`, `after delete`, and `after undelete`. Note that an `after undelete` trigger can only be created for the `Account`, `Asset`, `Campaign`, `Case`, `Contact`, `ContentDocument`, `Contract`, `Event`, `Lead`, `Opportunity`, `Product2`, `Solution`, and `Task` standard objects (as well as all custom objects).

The astute among us may notice that we appear to be missing a couple of DML operations - `merge` and `upsert` - but this is actually not the case. Because both of these functions are combination operations, we'll create a trigger that acts on `merge` by handling both `update` and `delete`. Similarly, a trigger on the `upsert` operation will act on trigger events involving both `insert` and `update`.

Our trigger events work just how their nomenclature suggests they should. For example, a `before insert` trigger will be invoked when a record is created and before the soft-save in the Order of Execution.

## Trigger Context Variables

Trigger context variables are the most important tools in our trigger toolbox. These predefined system-loaded framework entities allow us to determine information about the event that invoked our trigger and work with the records involved. There are thirteen context variables in total, defined in the following tables.

| Boolean Trigger Context Variable | Returns `true` if... |
| -------------------------------- | ------- |
| `Trigger.isExecuting` | A trigger is the current execution context. |
| `Trigger.isInsert` | The trigger was invoked by an `insert` DML operation. |
| `Trigger.isUpdate` | The trigger was invoked by an `update` DML operation. |
| `Trigger.isDelete` | The trigger was invoked by a `delete` DML operation. |
| `Trigger.isUndelete` | The trigger was invoked by an `undelete` DML operation. |
| `Trigger.isBefore` | The trigger is a `before trigger` - i.e. it was fired before the soft-save in the Order of Execution. |
| `Trigger.isAfter` | The trigger is an `after trigger` - i.e. it was fired after the soft-save in the Order of Execution. |

| Trigger Context Variable | Data Type | Available In | Explanation |
| ------------------------ | --------- | ------------ | ------- |
| `Trigger.new` | `List<sObject>` | `insert`, `update`, and `undelete` triggers | Holds new versions of records involved in the trigger operation. |
| `Trigger.newMap` | `Map<Id, sObject>` | `before update`, `after insert`, `after update`, and `after undelete` triggers | Holds new versions of records involved in the trigger operation as the values to which the corresponding record Ids are mapped. |
| `Trigger.old` | `List<sObject>` | `update` and `delete` triggers | Holds old versions of records involved in the trigger operation. |
| `Trigger.oldMap` | `Map<Id, sObject>` | `update` and `delete` triggers | Holds old versions of records involved in the trigger operation as the values to which the corresponding record Ids are mapped. |
| `Trigger.operationType` | `System.TriggerOperation` | All triggers | Returns an enum specifying the invoking trigger event. | 
| `Trigger.size` | `Integer` | All triggers | Returns the sum of the sizes of `Trigger.old` and `Trigger.new`. |

Let's make a couple notes. First, as we earlier stated, `merge` and `upsert` are broken into their constituent operations when we're working with trigger events, so a trigger invoked by a `merge` operation will return `true` for both `Trigger.isUpdate` and `Trigger.isDelete` and return `false` for `Trigger.isInsert` and `Trigger.isUndelete` (and we'll see analogous functionality for a trigger invoked by `upsert`).

Records in `Trigger.old` are always read-only, but records in `Trigger.new` are editable if we're working in a `before` trigger. `Trigger.old` is unavailable in `insert` and `undelete` triggers because there is no "old" version of an entirely new record and the "old" version of an undeleted record is nothing because it was previously deleted. Its map counterpart, `Trigger.oldMap`, can only be used in `update` and `delete` triggers for a similar reason.

`Trigger.new` cannot be used in `delete` triggers because the "new" variation of a record slated for deletion doesn't exist - it's going to be deleted. `Trigger.newMap` is not a part of `before insert` triggers because the records in a `before insert` trigger have not been committed to the Salesforce database or gone through the soft-save, so the system hasn't given them `Id` values.

Finally, the possible values for `Trigger.operationType` are `BEFORE_INSERT`, `BEFORE_UPDATE`, `BEFORE_DELETE`, `AFTER_INSERT`, `AFTER_UPDATE`, `AFTER_DELETE`, and `AFTER_UNDELETE`. We can use this context variable and the returned enum value in place of the corresponding `Boolean` context variables, as we'll discuss when we address best practices shortly.

We should also be aware that the order of the records in `Trigger.old` may not necessarily be the same as their order in `Trigger.new`. So to avoid any problems resulting from this, we'll commonly iterate over records from one of the context variables - either `Trigger.old` or `Trigger.new` - and retrieve the corresponding record from the opposite map (`Trigger.oldMap` if we're iterating over `Trigger.new` or `Trigger.newMap` if we're iterating over `Trigger.old`) based on its `Id`.

## Trigger Best Practices

Before we get into trigger use cases, let's turn to those best practices that we've alluded to multiple times now. We have four trigger-specific best practices, starting with using only one trigger per object.

While the Order of Execution tells us where our `before` and `after` triggers will fire in relation to other tools, it makes no claims as to the order in which multiple triggers on the same object will execute. In fact, there's no way to determine this order ahead of runtime. When we have only one trigger per object, we take back control of the order of our code. That is, line three of our trigger will **always** execute just before line four, but we can't guarantee that `AccountTriggerOne` will be invoked before `AccountTriggerTwo`.

There are a couple of guidelines that we can follow to ensure that we (and others in our org) are following this practice. First, we can default to our standard trigger naming format of `sObjectTrigger` (e.g. `AccountTrigger`). Secondly, we can write our triggers so that they handle all events when we create them, regardless of whether we have logic defined or a need for handling a particular event at the moment. Take the following example:

```apex
trigger AccountTrigger on Account(before insert, before update, before delete,
    after insert, after update, after delete, after undelete) {
}
```

When combined, these two conventions will encourage anyone who's later adding additional functionality (whether we're the ones doing it or someone else is) to expand the current trigger rather than writing a new one. But if we have a trigger acting on all events, how will we ensure that the proper logic is associated with the proper event?

Control flow and trigger context variables. Using either if-else statements that contain `Boolean` context variables in their conditions or a switch statement operating on the `Trigger.operationType` variable, we can determine the event that invoked our trigger and then invoke the appropriate logic.

We follow our second best practice, making logicless triggers, by adding a bit more to this skeleton we're starting to build - we'll just include calls to Apex class helper/utility/handler methods (whichever term we prefer) within the control flow logic for a given event. We want our triggers to be logicless for multiple reasons. First, it will keep them short and readable - anyone who's looking at the code or adding to it later will be able to quickly decipher what it's doing and/or add their piece of required logic.

But this also promotes code reusability because there will almost certainly be cases where we have a piece of logic that is useful/needed whether it's being invoked by a trigger or a different piece of code entirely. This logic _needs_ to be in an Apex class because we can't directly invoke a trigger, so we wouldn't be able to reuse it otherwise.

With these two practices in mind, our ideal trigger file will only contain what we call "traffic cop" logic - it figures out the trigger event that invoked it and then calls the appropriate utility method to do the heavy lifting. Some think that our triggers should be even shorter, immediately calling utility methods and leaving it up to those methods to act as our crossing guards, but we'll push back on this idea.

First, it wouldn't really improve readability, especially if we want to maintain reusability. Our trigger context variables can be used outside of triggers, so we could use `Trigger.isExecuting` to determine if a trigger is the execution context - i.e. the origin of the transaction - for our particular method (rather than a different tool, such as a scheduled batch job, being the execution context). This logic would be necessary to determine whether our code could use tools like `Trigger.new` or if it was being called by something else, in which case we'd need another way to get the records on which we want to operate.

It's much simpler to have our trigger be the traffic cop and then pass appropriate context variables such as `Trigger.old`, `Trigger.new`, `Trigger.oldMap`, and/or `Trigger.newMap` to the utility method to get it started. Even though all of the aforementioned variables are collections of generic sObjects, the system will be able to implicitly convert them to more specific sObjects - so we can pass `Trigger.new` from a trigger on Account to a method that declares a `List<Account>` as a parameter without any problems and save ourselves a bit more writing.

We always want to bulkify the code we write on the Salesforce platform, whether in a trigger or otherwise, so it should come as no surprise that bulkifying triggers is our next best practice. `Trigger.new` and the analogous context variables are implicitly batched by the system so that they will contain no more than 200 records per trigger invocation - although the system may not have to do this itself because the batching will have already happened in some cases, e.g. it may have been done by a batch Apex job.

Regardless, we should design our triggers to successfully work with up to 200 records at once without violating governor limits. We can ensure that this is the case by following our regular Apex best practices such as keeping SOQL/DML out of loops (whether in the trigger itself or in helper methods) and operating on collections of records, rather than individual ones.

Finally, we should avoid writing recursive triggers at all costs. Recursive triggers occur when two triggers continually indirectly invoke each other in a single operation. Consider the following two triggers, on the Account and Contact objects, which violate best practices in that they include logic and are recursive.

```apex
trigger AccountTrigger on Account (after update) {
    Set<Id> accIds = new Set<Id>();
    for(Account a : Trigger.new) {
        if(a.Description == 'This is a bad idea.') {
            accIds.add(a.Id);
        }
    }
    
    List<Contact> cons = [SELECT Id FROM Contact WHERE AccountId IN :accIds];

    for(Contact c : cons) {
        c.Description = 'Seriously, bad idea.';
    }
    
    update cons;
}
```

```apex
trigger ContactTrigger on Contact (after update) {
	Set<Id> accIds = new Set<Id>();

    for(Contact c : Trigger.new) {
        if(c.Description == 'Seriously, bad idea.') {
            accIds.add(c.AccountId);
        }
    }
    
    List<Account> accs = [SELECT Id FROM Account WHERE Id IN :accIds];
    
    for(Account a : accs) {
        a.Description = 'This is a bad idea.';
    }
    update accs;
}
```

When an account with the `This is a bad idea.` description is updated, `AccountTrigger` and `ContactTrigger` will indirectly recursively invoke each other until we quickly violate the governor on the maximum total stack depth for triggers (which is 16), causing our commit to fail and be rolled back. This example is probably unrealistic and relatively simple, so we should be aware that debugging recursive triggers in the wild may not be so straightforward. But if we get a `System.DmlException` containing a lengthy error message that includes "maximum trigger depth exceeded," a set of recursive triggers is to blame.

## Trigger Use Cases

As we've continuously emphasized when working on the Salesforce platform, we should always try to develop declaratively when possible. But this is not to say that there's never a case for writing code - we wouldn't be talking about triggers if we never needed to use them! So what are triggers good for?

To put it simply, use cases that are declarative tools can't do or requirements that are just easier to implement with code. As we said earlier, we use `before` triggers for more complex validation than validation rules can accomplish. We may also use them to set default values that depend on records of objects unrelated to the object our trigger is associated with because formula fields, and therefore workflows and processes, can't access values from unrelated objects. Similarly, we'd use an `after` trigger to make a change to a record of an unrelated object.

Triggers are also useful for implementing Apex sharing, especially when working with complex implementations. Flows _can_ create records of share objects, but they may not always be the best option. In fact, let's broaden this concept: even though we want to turn to declarative development first as a best practice, we shouldn't blindly use declarative tools any time they can accomplish our use case. Sometimes, it's easier to create and maintain a feature by writing a few lines of code instead of creating, e.g., some monstrous flow. So in these cases, we should write the code - trigger or otherwise.

We may also want to write a trigger when the user who is going to be performing a particular DML operation doesn't have access to all objects/fields that are indirectly involved in the operation for good reason. We may not want to change a user's profile/permission set combination so that they do have all necessary access because of our security implementation, so we can turn to our Apex code because it runs in system context by default, being able to access all fields on all records on every object (see the `Apex Security & Sharing` module).

So, being mindful of everything we've discussed about triggers so far, we can ask ourselves a few questions when creating a trigger. First, is this a good trigger use case? If not, we should probably be solving our requirement through declarative tools. Once we've determined that we do need to write a trigger, we should figure out the associated object, the trigger event(s), and, as an implicit part of the trigger event, whether the trigger should be a `before` trigger, an `after` trigger, or both.

## Custom Validation in Before Triggers

Let's finish this module by diving a little deeper into how we implement validation in before triggers. Of course, the details on what makes a particular record invalid will vary from implementation to implementation. But after we've determined that a record is invalid, we can turn to the `addError()` method.

This method can be called on any sObject or field on an sObject in Apex code and it comes in many overloaded forms. The simplest of these forms takes a single string as an argument specifying our error message. Once we've attached an error to a record/field through `addError()`, we've ensured that the corresponding record will fail the DML operation. Depending on the way the DML was invoked and the number of records in the operation, this may cause the entire transaction to fail and rollback.

If we're using this method on the records in `Trigger.new` in an `insert` or `update` trigger or the records in `Trigger.old` in a `before delete` trigger, the custom error message we've created will be displayed in the user interface (assuming that the operation was initiated from the user interface). If we called `addError()` on the object, the message will show at the top of the page. If we called the method on a specific field, the message will be displayed next to that field.

When we're going to fail, we generally want to fail early to minimize the amount of time end users may have to wait (among other considerations), which is why we'll perform the validation in a `before` trigger. All together, our implementation of custom trigger validation should look something like the following.

```apex
trigger AccountTrigger on Account (before insert) {
    if(Trigger.new[0].Name == 'Try this') {
        Trigger.new[0].Name.addError('Nope');
    }   
}
```
