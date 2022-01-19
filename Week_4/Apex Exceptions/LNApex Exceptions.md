# Apex Exceptions

[Longform](<./LFApex Exceptions.md>)

[Exception Class and Built-In Exceptions (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_exception_methods.htm)

[Exceptions in Apex (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_exception_definition.htm)

## Standard Exceptions

* the Apex System namespace has 26 standard exceptions

| | | |
| - | - | - |
| `AsyncException` | `BigObjectException` | `CalloutException` |
| `DmlException` | `EmailException` | `ExternalObjectException` |
| `IllegalArgumentException` | `InvalidParameterValueException` | `LimitException` |
| `JSONException` | `ListException` | `MathException` |
| `NoAccessException` | `NoDataFoundException` | `NoSuchElementException` |
| `NullPointerException` | `QueryException` | `RequiredFeatureMissing` |
| `SearchException` | `SecurityException` | `SerializationException` |
| `SObjectException` | `StringException` | `TypeException` |
| `VisualforceException` | `XmlException` ||

* <mark>DmlException</mark>
    * raised when we have an error in a DML operation (e.g. we forget to populate a required field or the value of a field violates a validation rule)
* <mark>QueryException</mark>
    * commonly raised when we attempt to assign the result of a SOQL query that returns either zero or multiple records to a single sObject
* <mark>ListException</mark>
    * raised when we attempt to access an element at a nonexistent index of a List (most commonly happen whenever we attempt to work with a List that still has a null value)
* <mark>SObjectException</mark>
    * raised when we attempt to read from a field on an sObject retrieved from a SOQL query that didn't include that particular field
* <mark>LimitException</mark>
    * <mark>raised when our code exceeds a governor limit</mark>
    * <mark>the LimitException is the only standard exception that cannot be caught and handled</mark>
 
## Custom Exceptions

[Create Custom Exceptions (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_exception_custom.htm)

* <mark>we can create custom exceptions by making Apex classes with names that end in Exception and they extend the Exception class</mark>

```java
public class FieldSecurityException extends Exception {}
 ```

* <mark>we can throw custom exceptions by using the throw keyword and instantiating our Apex class that represents our custom exception</mark>

```java
throw new FieldSecurityException('You do not have access to all fields in the query.');
``` 

## Try-Catch-Finally Blocks

* whenever an exception is raised by our code we want to either handle the exception and continue execution or fail gracefully
* we'll do so through exception handling with the try-catch-finally block
* <mark>try</mark>
    * <mark>will surround the code that may throw an exception</mark>
* <mark>catch</mark>
    * <mark>follows the try block</mark>
    * <mark>we can have one or more catch blocks</mark>
    * <mark>handles the exception thrown by the code in the try block</mark>
    * each catch block declares a single parameter - an instance of the type of exception that they handle
    * these can be standard exceptions (e.g. DmlException), custom exceptions, or the generic Exception superclass
    * but since all exceptions (standard and custom) are subclasses of the Exception class, we'll want to have a catch block that handles the generic Exception as the final catch block in our try-catch block group
* <mark>finally</mark>
    * <mark>follows the try block (and the catch block, if one is included)</mark>
    * <mark>will execute whether the code in the try block raised exception or not</mark>
    * if an exception was raised by the try block, it needs to be handled (either by a catch block in the same method or one in a calling method) or our execution will fail with that uncaught exception before it reaches our finally block
* <mark>try blocks cannot be alone - they must have at least one catch or finally block following them</mark>
 
## Exception Methods

* <mark>because all exceptions (both standard and custom) extend the `Exception` class, they inherit that class's methods</mark> 

| Method | Parameter Type | Return Type | Purpose |
| ---------- | ------------------ | --------------- | ---------- |
| `getCause()` | N/A | `Exception` | Returns nested exception |
| <mark>getLineNumber()</mark> | N/A | `Integer` | Returns code line number that threw exception |
| <mark>getMessage()</mark> | N/A | `String` | Returns exception message |
| <mark>getStackTraceString()</mark> | N/A | `String` | Returns stack trace |
| <mark>getTypeName()</mark> |	N/A | `String` | Returns type of exception (e.g. DmlException) |
| `initCause()` | `Exception` | `void` | Sets exception cause |
| `setMessage()` | `String` | `void` | Sets exception message |
 
### `DmlException` Methods

* the `DmlException` holds all the records that failed the DML operation and the errors associated with them

| Method | Parameter Type | Return Type | Purpose |
| ---------- | ------------------ | --------------- | ---------- |
| `getDmlFieldNames()` | `Integer` | `List<String>` | Returns names of field(s) that raised the exception for the specified record |
| `getDmlFields()` | `Integer` | `List<Schema.sObjectField>` | Returns instances of field(s) that raised the exception for the specified record |
| `getDmlId()` | `Integer` | `String` | Returns Id of specified record |
| `getDmlIndex()` | `Integer` | `Integer` | Returns index of specified record in the DML statement that failed |
| `getDmlMessage()` | `Integer` | `String` | Returns exception method for specified record |
| `getDmlType()` | `Integer` | `System.StatusCode` | Returns `System.StatusCode` enum for specified (e.g `REQUIRED_FIELD_MISSING`) |
| `getNumDml()` |	N/A | `Integer` | Returns number of failed records |
