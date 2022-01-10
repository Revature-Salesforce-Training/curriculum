# Module - Governor Limits

[Longform](<./LFGovernor Limits.md>)

## Why Governor Limits

- <mark>One of Salesforce's major benefits is that it's hosted in the cloud</mark>
    - <mark>but this brings a requirement that Salesforce servers must support many customers (i.e. it's a multitenant environment)</mark>
    - <mark>to ensure that we don't monopolize shared resources, Salesforce enforces governor limits on our code</mark>
- Might seem like a drawback, but the threat of being penalized for writing inefficient code can cause us to make writing efficiently a first principle
    - this will make us better programmers both in Apex and in general
- <mark>If our code exceeds a governor limit, the system throws a `System.LimitException`</mark>
    - <mark>this exception can't be handled, so our transaction will fail, any changes that would've been made will be rolled back, and our code will crash</mark>

## Governed Operations

### <mark>SOQL</mark>

- In a single transaction, we can
    - execute at most 100 synchronous <mark>SOQL queries</mark>
    - execute at most 200 asynchronous SOQL queries
        - asynchronous governor limits are generally higher
    - execute at most 300 synchronous SOQL subqueries
    - return no more than 50,000 <mark>records from all queries collectively</mark>
- <mark>We can avoid these limits by</mark>
    - <mark>using selective queries so that only the records we want are returned</mark>
    - <mark>keeping queries out of loops</mark>
    - <mark>returning lists of records rather than individual records</mark>

### SOSL

- In a single transaction, we can execute no more than 20 <mark>SOSL searches</mark>
- Each <mark>SOSL search can return</mark> up to 2,000 records
- <mark>We can avoid these limits by</mark>
    - <mark>keeping SOSL searches out of loops</mark>
    - <mark>returning multiple records rather than an individual record</mark>
    - <mark>write selective searches by using filter clauses in the field declarations following objects in our `RETURNING` clause</mark>

### DML

- For governor limits, "DML" is kind of an umbrella term that includes
    - calls to any DML statement or the analogous `Database` class method
    - _and_ `Database.setSavepoint()`, `Database.rollback()`, and `System.runAs()`
- DML limits
    - 150 <mark>DML operations per transaction</mark>
    - DML operations can operate on no more than 10,000 <mark>records collectively in a single transaction</mark>
- <mark>To avoid these limits, we</mark>
    - <mark>keep DML statements out of loops</mark>
    - <mark>act on lists of records rather than individual records</mark>
    - we can achieve both of these goals by making changes to each record within a collection in a loop and then using DML on the entire collection _outside_ of the loop
    - <mark>we can also use asynchronous Apex if we still think we might go over these limits</mark>

### Remaining Limits

- <mark>There are also limits on heap size, CPU time, and execution time</mark>
- These are 
    - a 6 MB synchronous heap or 12 MB asynchronous heap
        - we can avoid this by using SOQL for loops
    - 10 seconds of synchronous CPU time or 60 seconds of asynchronous CPU time
        - this doesn't count time spent in the database performing an operation or time spent waiting for a callout to return
    - 10 minutes of execution time for a single transaction
 