# Module - Asynchronous Apex

[Longform](<./LFAsynchronous Apex.md>)

## Async

- Any code that we write normally runs synchronously - i.e. one line at a time and each line must finish executing before the system executes the following line
    - so if line 137 of `SuperCoolMethod` in `SuperCoolClass` calls `ModeratelyTolerableMethod`, line 138 won't execute until `ModeratelyTolerableMethod` finishes and returns (even if it has a `void` return type)
- Normally, synchronous execution works just fine
- But if we're calling a very resource intensive method that takes a long time to execute or making a callout to another webservice, it's not the best
    - We don't want our code waiting around forever or depending on the availability of some external service to successfully continue execution (that's like having a barista messs up our coffee so that it wasn't _just_ the way we like it and deciding that the best option is to pack it in, head home for the day, and try again tomorrow)
    - In these cases, we'd rather execute asynchronously
- Asynchronous execution is where we invoke another method/process but continue executing in the code that called it
    - i.e. we're processing in parallel rather than serial, so we aren't waiting for the method to return
    - doesn't _necessarily_ mean concurrent execution
- Asynchronous Apex is particularly nice because any asynchronous operation gets its own set of governor limits and these limits are generally higher than their counterparts for synchronous execution

## Future Methods

- First and most basic tool in the asynchronous Apex toolbox
- <mark>`static` methods with the `@future` annotation (signals that they're asynchronous)</mark>
    - the annotation is only used on the method, not the enclosing class
- <mark>Future methods must have a `void` return type</mark>
    - remember, we don't want our calling code to depend on the result of any asynchronous methods or we're taking away some of the advantages of asynchronous execution
- Can take any number of primitives or collections of primitives as parameters, <mark>but _cannot_ have sObjects as parameters</mark>
    - again because we're executing asynchronously - we don't know when an `@future` method will run, so the record might be modified by someone else between the time when we queue the method and when the method actually executes
    - <mark>so if we want to operate on records, we should have our method accept record Ids and query for the corresponding records</mark>
- Commonly used for mixed DML operations
    - DML operations on multiple objects
    - with most combinations of objects, these aren't a problem
    - but a subset of objects known as setup objects (e.g. `User` if we're creating it or changing the profile, role, or whether the user is active), must be operated on in their own transaction
- Also frequently used for callouts to external webservices so that the life of our request is separated from the execution of our code
- To invoke a future method, we call it just like we call a regular method
- Considerations
    - <mark>cannot be used for a getter, setter, or constructor in the controller for a Visualforce page</mark>
    - <mark>one future method can't call another future method</mark>
    - <mark>because there's no guarantee when a future method will execute (they're run when resources are available), we don't know the order that multiple future methods will execute in, so we shouldn't have them operating on the same data</mark>

### Testing Future Methods

- We said before that `Test.startTest()` and `Test.stopTest()` give us a fresh set of governor limits, but they also synchronously execute any asynchronous methods called between them
- So to test a future method, we wrap the call to it in `Test.startTest()` and `Test.stopTest()` so that we ensure it will finish execution by the time we reach any of our assert calls
- E.g.

```apex
public class FutureExample {
  @future
    public static void futureExample() {
    	PermissionSet ps = new PermissionSet(Name='Creative_Name',
			Label='Creative Label');
        insert ps;
    }
    
    public static void futureInvoker() {
        Account acc = new Account(Name='Important Account');
		insert acc;
		futureExample();
    }
}

@isTest
private class FutureExample_Test {
	@isTest
    static void testFutureInvoker() {
        Test.startTest();
        FutureExample.futureInvoker();
        Test.stopTest();
		System.assertEquals(1, [SELECT COUNT() FROM Account WHERE Name=
			'Important Account']);
		System.assertEquals(1, [SELECT COUNT() FROM PermissionSet WHERE Name=
			'Creative_Name']);
    }
}
```

## Queueable Apex

- Similar to future methods, but more flexible
- Can queue one (but only one) queueable job from another and each job comes with an Id that we can use to keep track of its execution
- Queueable classes have to implement the `Queueable` interface and be `public` or `global` (we couldn't see them if they weren't)
- Interface? => required to implement some methods as part of our contract
    - in this case, just the `execute()` method, which is `public` or `global`, has a `void` return type, and a single parameter which is an instance of the `QueueableContext` interface
    - this is where we implement whatever logic we want
- To invoke our queueable class, we instantiate the class and call the `System.enqueueJob()` method
    - `System.enqueueJob()` takes one argument - the queueable class instantiation we just made - and returns the job Id we can use to track our job
- Can navigate to `Setup` > `Environments` > `Jobs` > `Apex Jobs`, look in the table for our job's Id, and check its status
- Remember, one queueable job can invoke another, so we can call `System.enqueueJob()` inside of our `Queueable` class
- Limits: can only call `System.enqueueJob()` 50 times in a synchronous transaction or once in an asynchronous transaction
- We test queueable Apex by wrapping the `System.enqueueJob()` in `Test.startTest()` and `Test.stopTest()`
- Queueable Apex foreshadows our other asynchronous options - batchable and schedulable apex both require us to implement interfaces and have at least one method that takes a `Context` parameter
    - `Context` parameters are how the system tracks the job

## Batchable Apex

- <mark>Ideal for operations on ~~big~~ ~~large~~ huge amounts of records (think tens/hundreds of thousands or even millions of records)</mark>
- <mark>Breaks the group of records into smaller batches that are executed separately</mark>
- <mark>Create batch Apex by implementing the `Database.Batchable` interface</mark>
    - following the interface in our class signature, we enclose the specific/generic type that our batches will consist of in angle brackets (commonly the generic `sObject`)
    - e.g.

```apex
public class BatchableExample implements Database.Batchable<sObject> {
}
```

- `Database.Batchable` has three methods that we have to implement: `start()`, `execute()`, and `finish()`
- <mark>`start()`</mark>
    - `public` or `global`, declares a single parameter of type `Database.BatchableContext`, and returns either a list of `sObjects` or a `Database.QueryLocator` object
    - <mark>where we setup our batches</mark>
    - `Database.QueryLocator` return type is preferred
        - batch Apex isn't a free pass to ignore governor limits, so if we used a regular SOQL query in `start()`, we couldn't return any more than 50,000 records
        - but if we return a `Database.QueryLocator` instance, that can refer to up to 50,000,000 records
    - return `Database.QueryLocator` by invoking `Database.getQueryLocator()`, which takes our query as a string (no square brackets)
- <mark>`execute()`</mark>
    - <mark>where we actually operate on the retrieved records</mark>
    - `public` or `global`, has a `void` return type, has two parameters (a `Database.BatchableContext` instance and a list of `sObjects`/generic types)
    - executes once for each batch of records
- <mark>`finish()`</mark>
    - `public` or `global`, `void` return type, takes a single parameter (`Database.BatchableContext` instance)
    - <mark>we just have to define this method - it doesn't need to have any logic</mark>
    - <mark>we'll write logic for it if we need to perform any post-execution cleanup or want to invoke another batch job (we can chain batch jobs)</mark>
- e.g.

```apex
public class BatchableExample implements Database.Batchable<sObject> {
	public Database.QueryLocator start(Database.BatchableContext bc) {
		return Database.getQueryLocator('SELECT Id, LastReferencedDate FROM ' + 
			'Contact');
	}

	public void execute(Database.BatchableContext bc, List<sObject> generics){
		List<Contact> cons = new List<Contact>();
		Contact con;
		for(sObject generic : generics) {
			con = (Contact) generic;
			if(con.LastReferencedDate < DateTime.now().addMonths(-6)){
				con.Ready_to_Archive__c = true;
			}
			cons.add(con);
		}
		update cons;
	}

	public void finish(Database.BatchableContext bc) {
	}
}
```

- <mark>invoke our batch jobs by using `Database.executeBatch()`</mark>
    - <mark>method takes two parameters: an instance of our batchable class and an (optional) integer specifying batch size, which defaults to 200, but can be as large as 2,000 or as small as 1</mark>
    - returns a job Id that we can use to find the job on the `Apex Jobs` page
- System breaks our collection of records returned by `start()` into chunks of our specified size
    - each chunk is then queued and executed as its own transaction
        - so we still have to write efficiently in our `execute()` method (a batch size of 200 will cause us to violate governor limits if we put a DML statement in a loop)
        - but jobs are separate - so any successful batches are committed, regardless of any failed batches
    - more efficient to use smaller number of batches
- test batch Apex by wrapping the `Database.executeBatch()` call in `Test.startTest()` and `Test.stopTest()`

## <mark>Schedulable Apex</mark>

- <mark>Used to run code at a set time</mark>
- <mark>Schedulable classes implement the `Schedulable` interface</mark>
    - only has one method that we have to implement - <mark>`execute()`</mark> - which must be `public` or `global` (just like our schedulable class), have a `void` return type, and take a single parameter of type `SchedulableContext`
    - `execute()` is where we implement our logic such as queueing a batch Apex job (so that we can have the batch Apex job run either once or repeatedly at a set time)
- <mark>Invoke scheduled class by using the `System.schedule()` method, which takes three parameters</mark>
    - <mark>a string that names our job</mark>
    - <mark>a CRON expression</mark>
    - <mark>an instance of our scheduled class</mark>
- Once we've scheduled our job, we can check it out by navigating to `Setup` > `Environments` > `Jobs` > `Scheduled Jobs`
- Test scheduled Apex by wrapping the `System.schedule()` call in `Test.startTest()` and `Test.stopTest()`
    - because `Test.stopTest()` synchronously executes any asynchronous jobs queued after `Test.startTest()`, the CRON expression we specify in test classes doesn't matter
    - `Test.stopTest()` only makes the _first_ layer of asynchronous code execute - so if we have a scheduled class that queues a batch class, we'll have to test them separately

### <mark>CRON Expressions</mark>

- <mark>Strings that denote time</mark>
- Used to schedule jobs in Apex, but most commonly used to scheduled jobs on the command line in UNIX-based systems
- Salesforce CRON expressions look slightly different than UNIX ones
    - <mark>Apex CRONs have either six or seven space-separated values that specify (in order) the second, minute, hour, day of the month, month, day of the week, and optionally the year when the job should run</mark>

<p align="center"><img src="img/cron_table.png"/></p>

| Special Character | Purpose |
| ----------------- | ------- |
| , | Delimit values to choose more than one month, day of month, day of week, or year. |
| - | Denotes range to specify multiple of the same values that can use the , special character |
| * | Uses all options available for a given value. |
| ? | No value specified. Used when dictating a day of the month but not a day of the week or vice versa. |
| / | Specifies an increment. |
| L | Last day of the period. Either last day of the month or last day of the week (Saturday). |
| W | Nearest weekday for a particular day of the month. |
| # | Specify the particular day of the month when choosing the day of the week. |

- <mark>we can use special characters to make our jobs run repetitively</mark>, e.g. '0 0 0 1 * ?' makes a job that runs on the first second of every month, regardless of what day of the week that is

## AsyncApexJob

- an instance of the AsyncApexJob object is created for each asynchronous job we queue and every batch invoked by a batch Apex job
- we can query this object to find information about our asynchronous executions
- this object contains fields such as JobType, which specifies the kind of asynchronous operation