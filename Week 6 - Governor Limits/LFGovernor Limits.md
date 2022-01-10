# Module - Governor Limits

This module explains why governor limits exist and lists the Apex features that are governed by these limits.

## Table of Contents

* [Terms and Definitions](#terms-and-definitions)
* [An Ode to Governor Limits](#an-ode-to-governor-limits)
* [Governed Operations](#governed-operations)
    * [SOQL](#soql)
    * [SOSL](#sosl)
    * [DML](#dml)
    * [Heap Size](#heap-size)
    * [CPU Time](#cpu-time)
    * [Execution Time](#execution-time)
* [The Limits Class](#the-limits-class)

### Helpful Links/References

* [Salesforce Developer Limits and Allocations Quick Reference](https://developer.salesforce.com/docs/atlas.en-us.224.0.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_overview.htm)
* [Execution Governors and Limits (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm)
* [Running Apex within Governor Execution Limits (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_limits_tips.htm)
* [Limits Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_limits.htm)

## Terms and Definitions

Before we get into the meat of this module, let's begin by defining some terms that are used on the Salesforce platform. First up: limits, allocations, and limitations. Limits are the maximums that are set for different features on the platform and cannot be exceeded, end of story. For example, the limit on the number of records returned by the `Database.QueryLocator()` method in a batch Apex job is 50,000,000, regardless of whether the user is your run-of-the-mill Salesforce customer or Marc Benioff himself.

Allocations, on the other hand, can be increased because they are maximums determined by the edition of Salesforce that a customer has purchased. So if a customer would like larger allocations, they can simply purchase an edition of Salesforce that provides them. For instance, a customer with the `Professional Edition` of Salesforce who would like to create more than 100 custom fields on a given object can simply upgrade to the `Unlimited Edition` or the `Performance Edition`, both of which give them the ability to create 500 custom fields on an object.

Finally, limitations are non-existent characteristics of features and tools, such as the limitation of `Schema Builder` that prevents us from creating Geolocation fields.

Limits are the topic at hand in this module, so let's further categorize them into runtime and design-time limits. Design-time limits are those that we experience when configuring our customizations, such as the number of `VLOOKUP` functions that can be used in validation rules per object, whereas runtime limits are those that occur when an application or customization is executing. These runtime limits, particularly those dealing with the execution of our Apex code (colloquialy known as Apex governor limits or simply governor limits), are our primary focus.

## An Ode to Governor Limits

One of the major benefits of Salesforce is the fact that it's hosted in the cloud. While that gives numerous advantages, we must be mindful that the Salesforce servers support many customers. Because we are in a multitenant environment, governor limits are enforced to make sure that we don't monopolize the reosurces of this shared infrastructure. If the execution of our code exceeds a governor limit, the system throws an unhandleable exception, causing our transaction to fail and any changes that would've been made to the database by that transaction to roll back.

While it might be hard to see any advantages to having operations limited, let's show governor limits some love. The threat of being penalized for writing inefficient code can cause us to implement efficiency as a first principle. And building this habit of designing with efficiency in mind will, over time, make us into better programmers, both in Apex and in general.

## Governed Operations

Let's now explore the operations that are governed, what their limits are, and how to avoid these limits. We'll detail the governor limits on SOQL queries, SOSL searches, DML operations, heap size, CPU time, and total execution time, all of which are governed on a per-transaction basis.

### SOQL

If we're executing synchronously, we can invoke at most 100 SOQL queries in a given transaction. As with many governor limits, asynchronous execution is more generous, allowing us to perform 200 SOQL queries per transaction. Note that any subqueries we execute will count against a separate limit - the number of subqueries that can be executed in a transaction is three times that of the queries we can perform, for a total of 300 synchronous subqueries. However, any records retrieved by either subqueries or standard queries _both_ count toward the same limit of retrieved records, which dictates that all queries in a transaction can retrieve no more than 50,000 records collectively.

To avoid these limits, we should use selective queries so that only the records we want are returned. Additionally, we should keep our queries out of loops and make use of collections to reduce the number of calls to the database.

### SOSL

We can only run 20 SOSL searches in a single transaction. However, each of these searches can return as many as 2,000 records, so the record limit is, in the aggregate, only 20 percent less than the corresponding one imposed on SOQL.

Our strategies for avoiding these limits are very similar to our strategies for those SOQL maximums - we should strive to keep our searches out of loops and use collections to reduce the number of calls made to the database. Additionally, we can write selective searches by using filter clauses in the field declarations following objects in our `RETURNING` clause.

### DML

Before we list the DML governor limits, let's address the umbrella term "DML". Unsurprisingly, Salesforce considers calls to any of the six DML statements (`insert`, `update`, `upsert`, `merge`, `delete`, and `undelete`) and the analogous Database class methods (including `Database.convertLead()`) to be DML operations. But it also counts calls to the `Database.setSavepoint()`, `Database.rollback()`, and `System.runAs()` methods as DML operations.

All of these fall under the per-transaction DML operation limit of 150 invocations that can act on up to 10,000 records collectively. To stay under these limits, we should avoid using DML statements or Database class methods in loops and act on lists of records rather than individual records.

We can marry these two goals by making changes to each record in a collection within a loop, and then using one DML statement or Database class method on the entire collection after the loop. If we believe our operations might still exceed the 10,000 record limit, we should use asynchronous Apex because each asynchronous execution occurs within the context of its own transaction and thus gets its own set of governor limits.

### Heap Size

Heap size isn't something that we have to deal with a lot in training, because we're generally working with small amounts of records. However, when performing bulk operations, it may come in to play. At that point, we'll have to be mindful of the fact that we're limited to a 6 MB heap when executing synchronously and a 12 MB heap when executing asynchronously.

The easiest way to avoid the heap size limit is to use SOQL for loops because of their underlying implementation. A SOQL for loop 
breaks the returned results into batches of 200 records, then iterates through all records within a batch before moving on to the following batch. Because of this chunking, the heap size is much smaller at any one time and because the system does the batching after the records are returned, the SOQL for loop will not increase our number of SOQL queries. Another way to avoid this limit is, as usual, executing asynchronously because of the larger limit for this case.

### CPU Time

Before we begin talking about the CPU time, let's start off with a clarfication. When Salesforce is tracking our CPU time in a transaction for the purpose of enforcing governor limits, only the time that our code and anything that it calls are actually executing is counted - if our code interacts with the database, the time spent in the database performing our operation is not counted. Similarly, if our code makes a callout to an external service, the time waiting for the callout to return is not counted either.

With this in mind, the synchronous CPU time limit of 10 seconds and the asynchronous limit of 60 seconds seem even more reasonable. With the efficiency of modern-day server architectures and the number of floating-point operations CPUs can perform in a single second, it's pretty difficult to hit this limit with properly functioning code. Therefore, our method of avoiding this limit is simple: avoid writing infinite loops.

### Execution Time

The final governor limit that we'll discuss is the one on execution time. A single Apex transaction can last no more than 10 minutes. Again, with the efficiency of modern technology, this limit is very difficult to violate.

## The Limits Class

Let's conclude this module by talking about the Limits class, which assists us in tracking where we stand in terms of our governed operations in a given transaction. The methods within this class come in two flavors: methods with names like `get%()`, which return how much of a governed operation we've used, and methods with names like `getLimit%()`, which return the limit on that governed operation. 

These latter methods are useful because, although we've listed the numeric limits on these operations throughout this module, they are by no means set in stone and could change in the future. Therefore a good use of these tools would be to  track where we are in terms of governed operations in a given transaction - if we determine that we are about to violate a governor limit through use of these methods, we could instead queue an asynchronous job to avoid exceeding the limit.

Key methods for the limits that we've discussed in this module are listed in the following table. Note that the methods for heap size return integers in units of bytes and the methods for CPU time return integers in units of milliseconds.

| Limited Operation | Method to Return Amount Used | Method to Returns Limit |
| ----------------- | ---------------------------- | ----------------------- |
| SOQL Queries | Limits.getQueries() | Limits.getLimitQueries() |
| SOQL Subqueries | Limits.getAggregateQueries() | Limits.getLimitAggregateQueries() |
| Records Returned by SOQL Queries | Limits.getQueryRows() | Limits.getLimitQueryRows() |
| SOSL Searches | Limits.getSoslQueries() | Limits.getLimitSoslQueries() |
| DML Operations | Limits.getDMLStatements() | Limits.getLimitDMLStatements() |
| Records Processed by DML | Limits.getDMLRows() | Limits.getLimitDMLRows() |
| Heap Size | Limits.getHeapSize() | Limits.getLimitHeapSize() |
| CPU Time | Limits.getCpuTime() | Limits.getLimitCpuTime() |
