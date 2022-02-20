# Module - Apex Best Practices

This module reviews and, in some cases, introduces Apex best practices.

## Table of Contents

* [Best Practices](#best-practices)
* [Apex Best Practices](#apex-best-practices)

### Helpful Links/References

* ["Apex Design Best Practices" (Salesforce Developers)](https://developer.salesforce.com/wiki/apex_code_best_practices)
* [Apex Best Practices: The 15 Apex Commandments (Salesforce Developers Blog)](https://developer.salesforce.com/blogs/developer-relations/2015/01/apex-best-practices-15-apex-commandments.html)

## Best Practices

While we've named this module `Apex Best Practices`, a lot of the principles we'll discuss are best practices for programming in general. So let's start off with these and then get into some Apex-specific conventions later. To begin, we always want to comment code, but we want to comment appropriately rather than going overboard - no one likes reading a lengthy instruction manual and we probably wouldn't like writing one either.

So how do we reduce the amount of comments that we have to include? By writing self-documenting code. Self-documenting code uses descriptive method and variable names so that any reader can infer the purpose of a method/variable from its name alone. For example, we'd much rather name our list `edgeCommEmployees`, than have to write a comment explaining that `recordsList` is a list of contacts who work at `Edge Communications`. 

Although we'll never be able to ensure that our code will _always_ work as expected, we can strive to get as close to this as possible by testing and error handling. While we do have a test coverage requirement of 75% with Apex, hitting this limit **does not** mean that we've written good, meaningful tests. To ensure that our tests do have these qualities, we want to follow the best practices of testing single, bulk, positive, and negative use cases, as well as testing as a restricted user when appropriate. Additionally, we should not test against production data, lest we inadvertently modify it. We can make the process of testing our code easier by writing methods that are modular - i.e. having one method for each piece of required logic.

We can also achieve modularity by moving repetitive code to a single method that can be invoked multiple times. In this case, we'd also be implementing abstraction which is awesome because one of the differences between a great programmer and one who is merely good is the amount of repetitive code they write. Increasing abstraction often means increasing dynamism, meaning that we'll get more flexible programs as well.

Finally, we want to make sure we are writing code that can efficiently work with bulk amounts of data.

## Apex Best Practices

Of course, with the governor limits we have in Salesforce, efficiency and bulkification become more requirements than simple ideals that would be nice to have. We can make sure we fall below these maximums by abstaining from SOQL/DML within loops whenever possible and operating on collections of records rather than individual records. In particular, we can generate sets of record Ids that we would like to retrieve and then use the `IN` clause to retrieve all of these records with a single query.

SOQL for loops and selective queries will help us stay within the heap size governor if we're working with large amounts of data. Child-to-parent relationship queries can reduce the amount of queries we execute and parent-to-child queries have a higher limit, so implementing relationship queries when possible is also a good idea.

If we've applied all of the above and we still think we might violate a governor, we should use the methods of the `Limits` class to determine when we are about to, so that we can invoke asynchronous Apex to operate on the remaining records. In fact, there are other times when we might need to use asynchronous code, such as writing future methods to perform mixed DML operations. Lastly, to ensure the efficiency of our operations when the system is inside of the database, we should filter queries on indexed fields and avoid using `null` filter values.

We've already discussed trigger best practices, but it never hurts to review. We should never have more than one trigger per object because the order in which these triggers execute cannot be determined before runtime. Additionally, our triggers should be logicless, using bulkified helper methods instead. These methods (in fact, all methods we write) should be able to handle 200 records at least because the system breaks our records into batches of this size when it invokes our triggers, assuming that they aren't already broken into batches of the same size or smaller by another tool such as batch Apex. We should also be especially mindful of triggers acting on related objects to ensure we haven't created two or more triggers that will recursively invoke each other.

Finally, we should never, never hardcode a record Id because there is no guarantee that this value will be the same in different orgs. In fact we should avoid hardcoding in general - the more dynamic our code, the better.
