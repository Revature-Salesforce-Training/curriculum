# Module - Apex Best Practices

[Longform](<./LFApex Best Practices.md>)

## Coding Best Practices

Code Commenting
* Comment code.... appropriately
    * no one likes reading a lengthy instruction manual and we probably won't like writing one either
    * we can reduce the amount of comments we have to write by creating self-documenting code (code with descriptive method/variable names that allow others to infer their purpose from the name alone)
    * `recordsList` is a bad variable name, `edgeCommEmployees` is a good, descriptive variable name

Testing
* test your code!
    * even though we have a test coverage requirement of 75% for Apex code, hitting this floor _does not_ mean that we've written good, meaningful tests that will ensure that our code works as expected
    * even outside of Apex, we want to write test coverage for our code (e.g. through tools such as `Jest` for JavaScript)
* to make sure we've created good, meaningful tests, we should adhere to our testing best practices (test single, bulk, positive, negative, and as a restricted user)
    * test as a restricted user only when necessary/appropriate
* don't test against production data

Modularity
* writing modular methods (i.e. one method for each piece of business logic such as one method to handle SOQL queries) is a good practice to implement
* we can also achieve modularity by moving repetitive code to a single method that can be invoked multiple times
    * good rule of thumb: if you're writing a block of logic in method B that's very similar to a block of logic in method A, refactor the logic into method C and then call C from both B and A
* one of the differences between a good programmer and a great programmer is the amount of repetitive code they write
* increasing modularity also increases abstraction and dynamism, meaning we'll also be making more flexible programs

Bulkification
* design code that can handle large amounts of records/data

## Apex Best Practices

[Apex Design Best Practices](https://developer.salesforce.com/wiki/apex_code_best_practices)

[Apex Best Practices: The 15 Apex Commandments](https://developer.salesforce.com/blogs/developer-relations/2015/01/apex-best-practices-15-apex-commandments.html)

Stay Within Governor Limits
* this can be done by
    * avoiding SOQL/DML in loops whenever possible
    * operating on collections of records rather than individual records
    * using SOQL for loops and selective queries
    * invoking asynchronous Apex if we still think we might run into governor limits after implementing all of the above

Follow Trigger Best Practices
* one trigger per object
    * the order in which multiple triggers on the same object execute isn't guaranteed ahead of runtime
* make logicless triggers
    * move all the logic to a helper/handler/utility method and call that method
* avoid recursive triggers
* bulkify triggers

Hardcoding Record Ids
* DON'T DO IT
* .... seriously do not do it
* there's no guarantee that the same record will have the same Id in two different orgs
* additionally, avoiding hardcoding is a good general principle to have - the more dynamic our code, the better
