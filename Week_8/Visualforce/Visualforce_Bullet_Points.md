##  Visualforce

* A framework for creating MPAs within the Salesforce ecosystem.
* Can be created in Dev console or Vscode
* We can preview our Visualforce in dev console by clicking 'preview' button
* a visualforce page can contain html markup, although we do not need a head, meta, or body tags. 
* Visualforce is wrapped in apex:page tags
* we have standard visualforce components available to us in the visualforce component library

## Static resources and visualforce

* we can make use of static resources in visualforce just like other frameworks
* for single file: {!$Resource.resourceName}
* for file in archive: {!URLFOR($Resource.archiveName, 'fileName')}

## renderAs 

* we can render a visualforce page as a pdf using: apex:page renderAs="pdf"
* it will not execute JS before render. So we shouldn't rely on JS to give us the final presentation of the page because any changes will not appear in the pdf

## Visualforce expression syntax

* {!value}
* action binding is coupling a method in the page's controller to an event on the page. {!methodName}
* data binding is coupling a variable in the controller to a value on the page. {!variableName}
  * data binding here is 'double binding' meaning that any changes to the bound value on the page will change the value of the variable in the controller and vice versa
  * The double binding occurs because controllers in the Visualforce framework pass non-primitive data types by reference instead of value, so both the controller and page are acting on the same data. On the other hand, primitive data types (such as strings) are passed by value, so the double binding does not apply to them unless you use a standard component such as apex:inputText

## Visualforce controllers

* We have 4 types:
  * standard controllers
  * standard set (list) controllers
  * controller extensions
  * custom controllers
* Note that your Visualforce page can declare either one standard controller/standard set controller or one custom controller, not any combination of or multiples of each.

### Standard controllers

* pre-written, Salesforce-made code that give functionality to our Visualforce pages
* automatically created for standard and custom objects
* works on one record at a time
* can do things such as save or delete a record
* in the apex:page tag we specify this attribute: standardController="NameOfOjbect"
* if visualforce is being used on record detail page, that means the record id is in the URL. We can then reference the record or its fields with expression syntax: {!account.name}
* a few methods of a standard controller:
  * cancel - cancels an edit
  * save - save record and take user to record detail page
  * quicksave - save without redirecting user
  * delete - delete the record
  * just bind the method to an action attribute of a standard component such as apex:commandButton
  * apex:commmandButton action="{!delete}" value="Delete Record" id="delButton"
  * note that commandButton must alwasys be a child of an apex:form component. Any inputs that will interact with database must also be in a apex:form.

### Standard set (list) controllers

* for use of multiple records at a time
* not available for all standard objects, only: account, asset, campaign, case, contact, contract, idea, lead, opportuninty, order, product2, solution, and user
* works with all custom objects
* we need to specify: standardController="NameOfOjbect" recordSetVar="nameOfListOfRecords"
* we can action bind methods, as we did with standard controllers, to standard components such as apex:commandButton
* action binding methods: 
  * first - takes user to first page of records
  * last - takes user to last page of records
  * next - takes user to next page of records
  * previous - takes user to previous page of records
  * save - inserts new records or updates existing records that have been changed, will then redirect the user to the orignal page, if known, or home page
  * quicksave - same as save but does not redirect the user to another page
  * cancel - aborts an edit operation

> Note: By default, 20 records will be displayed per page. To control the number of records available on each page, create a controller extension and set the pageSize with the setPageSize() method. 

> Another Note: a standard list contoller can return up to 10,000 records. Custom controllers can work with larger sets, however.

### Controller Extensions

* Apex classes that extend the functionality of a visualforce page but do not take the place of a standard or custom controller.
* use this attribute in apex:page tag: extensions="nameOfApexClass"
* no maximum number of extensions per page, but precedence decreases from left to right. Meaning that if a method with the same signature is in two different extensions, the method declared first in the extensions attribute will take precedence.

```
public class accountStdExtension {
    public accountStdExtension(ApexPages.StandardController sc){
    }
}

public class accountCustExtension {
    public accountCustExtension(AccountController ac){
    }
}

public class accountSetExtension {
    public accountSetExtension(ApexPages.StandardSetController){
    }
}
```

An example in action:

Apex class
```
public class myControllerExtension {

    private final Account acct;
    
    // The extension constructor initializes the private member
    // variable acct by using the getRecord method from the standard
    // controller.
    public myControllerExtension(ApexPages.StandardController stdController) {
        this.acct = (Account)stdController.getRecord();
    }

    public String getGreeting() {
        return 'Hello ' + acct.name + ' (' + acct.id + ')';
    }
}
```

visualforce
```
<apex:page standardController="Account" extensions="myControllerExtension">
    {!greeting} <p/>
    <apex:form>
        <apex:inputField value="{!account.name}"/> <p/>
        <apex:commandButton value="Save" action="{!save}"/>
    </apex:form>
</apex:page>
```

> Note when retrieving "greeting" while in the visualforce markup we say: {!greeting}, in the apex our method is getGreeting(). We append 'get' to the name of our variable we are referencing in markup. We will discuss this more shortly.
 
### Custom controllers 

* we can create our own controllers by first creating an Apex class to act as the controller
* we set the controller attribute within apex:page to the name of our Apex class that acts as our custom controller
* We have to declare any record variables as properties of our class and we can instantiate them with any values we wish in the contructor. 
* Our class can contain any getters, setters, or actions to bind to events in our Visualforce page
* We can make use of Apex properties to define our getters and setters. Or we may define our own methods.
  * Note that if we define our own methods our getters/setters must be prepended with 'get' or 'set'. i.e. getVariableName, setVariableName
  
```
public class AccountController{
    public Account acc {get{
            if(acc == null){
                return [SELECT Id, Name FROM Account WHERE 
                    Name='Edge Communications']; 
            }
            else{
                return acc;
            }
        } set;}
}
```

* We can instantiate and make use of the standard controller class within our custom controller 

```
public class AccountController{
    public Account acc{get; set;}

    public AccountController(){
        this.acc = (Account) new ApexPages.StandardController(acc).getRecord();
    }
}
```

* Our custom controller could also act as a standard list controller if we wish. We would just need to build our own pagination methods, we could also make use of the StandardSetController class much like we just did with the StandardContoller class.

### Security

* If we are making use of any standard controller, security is handled for us. 
  * the current user context will determine object, field, and record level security.
  * Some buttons may or may not be visible based on security. i.e. A delete button not appearing for a user that doesn't have that permission
* If we are using a custom controller, we can run in system context (full permissions)

### When to use what

* ask yourself: can the standard controller meet this requirment alone? If so then just go with that
* do we need a bit more functionality than the standard controller can provide? but still want to make use of it's methods? Or pehaps we want to overwrite _some_ functionality of a standard controller? Then pair the standard controller with an extension!
* Do we need a whole bunch of features that the standard controllers can't provide? Enough where it would be a pain to overwrite a bunch from the standard controller. Or do we need to run in system context? Then use a custom controller!

## Page Blocks

* apex:pageBlock component - similar to a div element; used to make divisions on the page; styling similar to record detail page; can set the title attribute to display header for the block
* apex:pageBlockSection component - a child of apex:pageBlock; a further division of a block of content; 
* apex:pageBlockButtons component - child of apex:pageBlock; Holds apex:commandButton components; if you use this the buttons appear both top/bottom of the form, could just put the buttons directly in the apex:pageBlock though

## Standard input components

* All input components must be placed in an apex:form component
* apex:input - does not include styling and is not bound to a field on a record of a SF object; have to use controller extension or custom contoller to use any values from this component; we also must pass 'html-5.0' to the doctype attribute in the opening apex:page tag
* apex:inputCheckbox - default is unchecked; not related to any field on a record of a SF object
* apex:inputText - similar to apex:input that has type attribute set to text; not related to any field on a record of a SF object
* apex:inputTextArea - multiline version of apex:inputText; not related to any field on a record of a SF object

* apex:inputField - bound to a record field without any custom apex code; pass the field api name to value attribute with expression syntax; if in a apex:pageBlockSection, the field label will automatically display next to the input

### Input field validation

* inserting data with apex:inputField components will check our validation rules we've specified
  * if the validation rule error message is set to appear on the field, then the validation rule error message will appear next to the apex:inputField
  * If the validation rule error message is set to appear on the top of the page, then we can make use of the apex:messages or apex:pageMessages components to display the error message where we wish in markup
  * If using a custom controller, we can pass error messages to the messages/pageMessages components by using 'ApexPages.addMessages()' method.
  
## Standard output components

* apex:outputField - displays field value of a salesforce record; supply the value attribute with expression syntax pointing to field name {!account.name}; automatically includes field label if placed within apex:pageBlockSection
* apex:outputLabel - gives a label to apex:inputField elements; associate by passing an id of the input component to the for attribute of the label
* apex:outputLink - analogous to html a tag; instead of href we use value attribute
* apex:outputPanel - usefull when paired with apex:actionSupport; discussed later in module
* apex:outputText - displays text to the user; wrap text with this tag if you want to give it a special format or font that differs from the rest of the page

## Displaying records in Visualforce tables

* either use apex:pageBlockTable or apex:dataTable
* total collection of data in either table across all pages can be 1000 records if we allowing editing or 10000 records if read-only
* apex:pageBlockTable includes styling, apex:dataTable does not
* both tables take a value attribute which is a list of records and a var attribute which serves as an individual record
* apex:column elements will add columns to our table

```
<apex:page standardController="Account" recordSetVar="accs">
    <apex:pageBlock>
        <apex:pageBlockTable value="{!accs}" var="acc">
            <apex:column value="{!acc.name}"/>
            <apex:column value="{!acc.numberofemployees}"/>
            <apex:column value="{!acc.annualrevenue}"/>
        </apex:pageBlockTable>
    </apex:pageBlock>
</apex:page>
```

## Inline Editing

* Although earlier we mention apex:outputField can't be edited this isn't entirely true
* we can if we also make use of apex:inlineEditSupport

```
<apex:page standardController="Account" recordSetVar="accs">
    <apex:form>
        <apex:pageBlock >
            <apex:pageBlockTable value="{!accs}" var="acc">
                <apex:column headerValue="Account Name">
                    <apex:outputField value="{!acc.name}">
                        <apex:inlineEditSupport showOnEdit="updateRecords"/>
                    </apex:outputField>
                </apex:column>
            </apex:pageBlockTable>
            <apex:pageBlockButtons>
                <apex:commandButton value="Update Records" action="{!save}" style="display:none" id="updateRecords"/>
            </apex:pageBlockButtons>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```

## Partial Page Rerendering

## The View State and best practices

## Parameters

## Wrapper Classes

## Visualforce wizards

## Testing Visualforce

## Including Visualforce in the Salesforce UI

## Setting styling in Visualforce

## Tabs in Visualforce pages

## Dynamic Visualforce