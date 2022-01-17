# Module - SOQL

[Longform](<./LFSOQL.md>)

[SOQL and SOSL Reference](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_sosl_intro.htm)
[SOQL and SOSL (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_SOQL.htm)

## Interacting with the Database on the Salesforce Platform
 - we can interact with the Database from Apex code through one of three options
        - DML, which allows us to manipulate existing records and create new ones
        - SOQL and SOSL, which allow us to retrieve records from the database
- SOQL is analogous to the read functionality of SQL
- like Apex, SOQL is case-insensitive (although it can be helpful to put all clauses in all capital letters)
 

## Basic SOQL Syntax
- <mark>the basic SOQL statement adheres to the following format</mark>

```sql
[SELECT fieldNames FROM objectName]
``` 

- <mark>fieldNames is the API name of the field we want to retrieve or comma-separated list of API names of the fields we want to retrieve</mark>
- <mark>objectName is the API name of the object that we want to execute our query against</mark>
- <mark>we must include at least one field in the SELECT clause of our query and exactly one object in the FROM clause of our query</mark>
- unlike SQL, SOQL doesn't have the asterisk to select all fields on an object
    - SOQL does have a FIELDS function that can retrieve all fields from an object
    - this function can take one of three parameters - ALL, CUSTOM, or STANDARD, to return values for all fields, only custom fields, or only standard fields, respectively - but only FIELDS(STANDARD) is supported in Apex code (the others are supported on Salesforce's standard APIs)
 

## SOQL Execution Environments

- we can write SOQL queries inline in our Apex code without needing any prior setup beforehand
Query Editor in the Developer Console
    - this allows us to execute queries outside of Apex (as well as allowing us to execute SOSL searches outside of Apex)
    - when we execute a SOQL query in the Query Editor, we'll exclude the square brackets wrapping our query
 
## Optional SOQL Clauses

- in addition to the SELECT and FROM clauses (which are required for all SOQL queries), we also have a variety of optional SOQL clauses that can be used
    - <mark>WHERE</mark>
    - <mark>WITH</mark>
    - <mark>GROUP BY/HAVING</mark>
    - <mark>ORDER BY</mark>
    - <mark>LIMIT</mark>
    - <mark>OFFSET</mark>
    - <mark>FOR REFERENCE</mark>
    - <mark>FOR UPDATE</mark>
- the order in which the optional clauses are listed is the order in which they must occur in our query if we use them (e.g. if we have a WHERE and OFFSET clause, OFFSET must be after the WHERE clause)

### WHERE

- <mark>it's a filter for which records we want to return</mark>
- it follows the format WHERE fieldName comparisonOperator value, e.g.

```java
List<Account> edgeAccs = [SELECT Name FROM Account WHERE Name = 'Edge Communications'];
``` 

### WITH

- it's a filter that acts based on the data category of a Salesforce Knowledge article, the Chatter feed of a user, or user permissions
- WITH DATA CATEGORY filterExpression
- <mark>WITH SECURITY_ENFORCED</mark>
    - <mark>a query using this clause will take the object and field level permissions of the user executing the query into account</mark>
    - <mark>if the query is operating on a field or object that the running user doesn't have read access to, an exception will be thrown and nothing will be returned</mark>
    - <mark>this is one of three ways we can enforce object and field level security in our Apex code</mark>

### GROUP BY and HAVING

- GROUP BY groups returned records by the specified field
    - GROUP BY FieldOrFieldsToGroupBy
- HAVING allow us to filter our retrieved records based on the result of an aggregate function
- we can use a GROUP BY clause without including a HAVING clause, but a HAVING clause can only be used in a query that has either a GROUP BY clause or an aggregate function (or both)

### ORDER BY

- ORDER BY sorts returned records by their values for a specified field
    - ORDER BY fieldToSortBy ASC/DESC NULLS FIRST/NULLS LAST, e.g. ORDER BY Name ASC NULLS LAST
    - the choice of ASC or DESC sort and whether to use NULLS FIRST or NULLS LAST is optional
    - if we exclude a sorting direction, ORDER BY will default to an ascending sort
    - if we exclude a specification on how to treat null values, ORDER BY will default to listing null values first
 

### LIMIT

- LIMIT restricts the number of returned records to a maximum of the specified integer
- LIMIT does not guarantee that we retrieve exactly the specified number of records, only that we won't retrieve more than the specified number of records because we may write a query that a smaller number of records match

```java
List<Account> accList = [SELECT Name FROM Account LIMIT 10];
```
 
### OFFSET

- OFFSET skips the specified number of records when returning the results of our query
- OFFSET is commonly used in combination with LIMIT and ORDER BY when we want to implement pagination in, e.g. tables on Visualforce pages

```java
List<Account> accs = [SELECT Name FROM Account ORDER BY Name OFFSET 10];
```
 
### FOR REFERENCE

- updates system audit fields and recently viewed lists on the records of the object we're querying and its related records

```java
List<Account> accs = [SELECT Name FROM Account FOR REFERENCE];
```

### FOR UPDATE

- locks any retrieved records to other users so that no other usre can edit them for the duration of the transaction

```java
List<Account> accs = [SELECT Name FROM Account FOR UPDATE];
```
 
## SOQL Return Types
- <mark>SOQL has two main return types</mark>
    - <mark>a single sObject (a single record, e.g. we can write queries with a return type of Account)</mark>
    - <mark>a List of sObjects (e.g. List<Account>)</mark>
- generally speaking, we'll want to use the List return type most often
    - if we try to assign the result of a query to a single sObject variable and that query either returns no records or more than one record, we'll get a QueryException
    - although the LIMIT clause will allow us to ensure that no more than one record is returned from a query, it doesn't guarantee that one record will be returned from a query (we can write a SOQL query using a LIMIT clause that ends up returning nothing because there aren't any records that match our query)
    - we'll also want to use the List return type in order to bulkify our code and avoid violating governor limits
- if we're a writing a query that uses aggregate functions, the return type for that query will either be Integer or List<AggregateResult>

## Variable Binding in SOQL

[Variable Binding in SOQL and SOSL](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_SOQL_variables.htm)

- with our optional clauses, we can use string literals or integers for filters (e.g. with the WHERE clause)
- <mark>but we can also use variables from Apex as filters by manking use of variable binding</mark>
- <mark>to perform variable binding, we'll just precede the name of the variable whose value we want to use with a colon (:) in our query</mark>

```java
String accountName = 'Edge Communications';
List<Account> edgeCommunications = [SELECT Id FROM Account WHERE Name=:accountName]
```

- we'll commonly want to use variable binding when the values of the filters for our query aren't known until runtime (e.g. when we're allowing an end user to provide a value for a filter)
 

## <mark>Aggregate Functions</mark>

- there are six aggregate functions that we can use in SOQL queries - <mark>COUNT, COUNT_DISTINCT, MIN, MAX, SUM, AVG</mark>
- the difference between COUNT and COUNT_DISTINCT is that COUNT_DISTINCT returns the number of unique, non-null matching results
- we pass the field that we want to perform the operation on as an argument to the aggregate function
all of the aggregate functions except COUNT require an argument
    - we can give COUNT a field, but if we don't, it will just return the number of records that match our query
- <mark>when we write a SOQL query that only contains the COUNT function in its SELECT clause (without an argument) and no grouping, the return type of the query will be Integer</mark>

```java
Integer numOfContacts = [SELECT COUNT() FROM Contact];
``` 

- in all other cases, the return type of a SOQL query that uses an aggregate function will be List<AggregateResult>

### AggregateResult and Aliasing

- <mark>the AggregateResult class has a get() method that we use to retrieve values because we can't reference any fields on an AggregateResult through dot notation</mark>
- if we're retrieving the value for a field that doesn't have an aggregate function acting on it, we'll just pass the API name of the field as a parameter
- if we're retrieving the value of a field that does have an aggregate function acting on it, the name that we'll use will default to exprN, where N starts at 0 for the leftmost aggregate function in the query and increments from there
- we can also alias fields in our SOQL queries and alias aggregate function results by simply including the name that we want to use before the comma (if there are additional fields in our SELECT clause) or before the FROM clause
- when a query uses an aggregate function, all fields in the SELECT clause must either be operated on by an aggregate function or be a field that we're grouping by

```java
List<AggregateResult> annRevByIndustry = [SELECT Industry, SUM(AnnualRevenue) 
sumRev FROM Account GROUP BY Industry HAVING SUM(AnnualRevenue) > 0];
    
for(AggregateResult ar : annRevByIndustry) {
    System.debug(ar.get('industry') + ': $' + ar.get('sumRev'));
}
```

## FORMAT

- <mark>the FORMAT function applies formatting corresponding to a user's locale to standard/custom number, date, time, and currency fields</mark>
- we pass the API name of the field to apply the formatting to as an argument to the function
- this function is used in the SELECT clause of our SOQL queries

```java
List<Account> accs = [SELECT FORMAT(NumberOfEmployees) FROM Account];
``` 

## Date Functions

- <mark>date functions allow us to filter or group results by specified dates</mark>
- they include CALENDAR_MONTH, CALENDAR_QUARTER, CALENDAR_YEAR, FISCAL_MONTH, FISCAL_QUARTER, FISCAL_YEAR, DAY_IN_WEEK, DAY_IN_MONTH, DAY_IN_YEAR, etc.
- they can also be used in the SELECT clause to return the value of date field corresponding to the function used
- we pass the name of the date field as an argument to the function

```java
List<Account> accs = [SELECT Id FROM Account WHERE CALENDAR_YEAR(CreatedDate)=2020];
```

## Relationship Queries

- we can't create relationships between objects to use them in relationship queries on-the-fly (i.e. the objects need to have already been related by a relationship field)

### Child-to-Parent Queries

- <mark>to retrieve a field from a parent record, we use dot notation</mark>
- <mark>if we're querying a custom relationship, the __c suffix on the relationship field in the query will change __r</mark>
- <mark>if we're querying a standard relationship, these tend to follow the naming format ParentObjectId and we'll lop off the Id at the end of the field API name (e.g. Account.Name)</mark>
- with child-to-parent queries, we can query up to five levels of relationships

```java
List<Contact> cons = [SELECT Id, Account.Name FROM Contact];
List<Tie_Fighter__c> ties = [SELECT Id, Star_Destroyer__r.Name FROM Tie_Fighter__c];
```

### Parent-to-Child Queries

- <mark>to retrieve fields from children records, we'll use a subquery</mark>
- <mark>this is another SOQL query with its own SELECT and FROM clauses that lives in the SELECT clause of the outer query</mark>
- <mark>in a subquery, the name of the child object after the FROM clause is pluralized</mark>
    - <mark>for standard relationships, this generally just means adding an s (e.g. Contacts)</mark>
    - <mark>for custom relationships, the suffix of the object name will change from __c to __r as well</mark>
        - we can control the plural version of the child object name for custom relationships because it's the value we set in the Plural Label field when creating or editing the relationship field
        - but the Plural Label defaults to whatever we set as the Plural Label of the custom object when creating it
- we can only have at most one level of subquery within a SOQL query (i.e. we can't nest subqueries inside of other subqueries)

```java
List<Account> accsWithContacts = [SELECT Name, (SELECT LastName FROM Contacts) FROM Account];
List<Star_Destroyer__c> starDestroyers = [SELECT Name, (SELECT Name FROM Tie_Fighters__r) 
                                          FROM Star_Destroyer__c];
```

## SOQL Wildcards

- when using a LIKE operator for comparison in a WHERE clause, we can use wildcards within the string literal
- SOQL has two wildcards
    - %, which matches zero or more characters
    - _, which matches exactly one character

```java
List<Account> accs = [SELECT Name FROM Account WHERE Name LIKE '%communications%'];
``` 

## Retrieved Fields

- if we want to read from a field from one of our records in our results, we need to specify that field in our SELECT clause in our query
- SOQL queries don't return all of fields and values for matching records, only those for fields that we specify
    - with the exception of the Id field, which is always returned, regardless of whether it's explicitly included in the query or not
- e.g. the following code would raise an exception

```java
List<Account> accs = [SELECT Id FROM Account];
System.debug(accs[0].Name); // throws error
``` 

- we can assign a value to a field on a record even if that field wasn't included in a SOQL query - we just need to assign a value to it before we can read from it
 

## SOQL and Governor Limits

- there are per-transaction governor limits on the number of SOQL queries that we can execute and the number of records those queries can return collectively
- to avoid these governor limits, we should
    - operate on collections (i.e. write a single query that retrieves multiple records instead of multiple queries that each return a smaller number of records whenever possible) to cut down on the number of queries executed
    - write selective queries so that we return only the records we need to help stay under the governor on the number of records our queries can retrieve collectively in a single transaction
    - use the SOQL for loop to both reduce the number of queries executed and the heap size if we're retrieving a large amount of results
- a common pattern when we want to retrieve a list of records is to populate a collection of filter values (e.g. a list of parent record Id's to retrieve the related children) within a loop, execute the SOQL query that returns the results outside of a loop, and assign the result to a list

## SOQL For Loops

- Apex has a third type of for loop - the SOQL for loop
- <mark>SOQL for loops are used to avoid governor limits on heap size and the number of queries executed</mark>
- their format is as follows

```java
for(List<objectApiName> iterableVar : [SELECT fieldNames FROM objectName]) {}
``` 

    - after the colon, we include a SOQL query to execute and iterate through the results of
- we'll commonly use nested for loops with the SOQL for loop
    - e.g.

```java
for(List<Account> accs : [SELECT Name FROM Account]) {
    for(Account a : accs){
    }
}
``` 

    - the SOQL for loop is implicitly batched
        - the query in the SOQL for loop only counts as one query for the purposes of governor limits
        - but the results are returned in batches of up to 200 records
        - this helps lower our chances of hitting the heap size governor when returning large amounts of fields and records because it reduces the amount of records we have in local memory at any given time
        - the SOQL for loop will iterate once per batch of up to 200 records (e.g. if we write a query that returns 205 records, the results will be operated on in one batch of 200 records and a second batch of the remaining 5 records)
    - the nested enhanced for loop will iterate once per record in a batch
