# Preserving data quality
Challenges 
1. Create a validation rule on contact that does not allow any phone number formats other than (xxx) xxx-xxxx. Hint: use regex.
2. Use duplicate rules and matching rules to block the save of any duplicate record. Use a custom solution, not the standard rules.

## Validation rules 
Rules that verify that data a user enters meet standards before saving a record. Can have a custom 
error message appear by the field or on top of the page. This is configured on the object in object 
manager. We enter an error condition formula and if it evaluates to true, we display our error. 


- We have many functions available to us in the formula builder
  - REGEX - A series of characters that define a search pattern.
  - VLOOLUP - VLOOKUP(field_to_return, field_on_lookup_object, lookup_value) Searches an object for a record where the specified field matches the specified lookup_value. If a match is found, returns another specified field value.
- We can conditionally make certain fields required using validation rules
  - AND(Account_Market = "Corporate", Test = "")
  - This will give an error message if "Test" has no value when Account Market is "Corporate".

## Duplicate rules / Matching rules

- A matching rule compares field values to determine whether a record is similar enough to existing records to be considered a duplicate. For example, a matching rule can specify that if the Email and Phone values of two records match exactly, the records might be duplicates. We can not only check for exact matches, but close matches as well. We can configure this for certain standard objects, and it is called fuzzy matching. An exact match would only catch John Smith, whereas a fuzzy match rule would also catch Jon Smith, Johnny Smith, Jonathan Smith, etc. However, fuzzy matching is not perfect, and when it comes to names tends to mainly work with western names.
- Duplicate rules work together with your matching rules to prevent users from creating duplicate records. A matching rule determines whether the record a user is creating or updating is similar enough to other records to be considered a duplicate, whereas a duplicate rule tells Salesforce what action to take when duplicates are identified. For example, a duplicate rule can block users from saving records that have been identified as possible duplicates, or simply alert users that they may be creating a duplicate but allow them to save the record anyway.
