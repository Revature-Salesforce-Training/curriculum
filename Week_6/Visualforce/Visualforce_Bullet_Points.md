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

* apex:actionRegion - when a dom event occurs within this tag, the server will only process components within the region (assuming they do not act on elements outside of the region). The rest of the page will be returned to the browser in the same state in which the browser sent it to the server
* apex:actionSupport - no required attributes, but must make use of event and reRender attributes to have functionality. Event holds name of DOM event, reRender holds single id or comma seperated list of multiple ids that are refreshed when the event occurs; 
  * can include apex:actionSupport within the opening and closing tags of a component to target that specific component
* When using apex:commanLink or apex:commandButton you can specify a reRender attribute pointing to the id, or comma seperated list of ids of a component(s) to refresh after the user clicks those buttons
* apex:outputPanel - we can wrap an entire block with this element. once we pass in a reRender attribute, passing in an id, the entire panel can be refreshed

## The View State and best practices

* The view state is the hidden data describing the state (i.e. size, type, name, and/or value) of components on your page, values in fields on your page, and objects returned by standard and custom controllers. 
* 170 kb size limit
  * Best practices
  * only ues apex:form and apex:inputField when necessary
  * remove uneeded components from page
  * only return relevant data with SOQL queries
  * use the transient keyword on apex variables when the situation calls for it
    * these variables aren't included in the view state. they are instance variables that are not saved but remade with each page refresh
  * use stateless components and lazy loading objects
    * For example, replacing any <apex:commandLink> or <apex:commandButton> components that redirect users to a different page with <apex:outputLink> will reduce server calls because the former two have to make a call to a Salesforce server to receive the output of the bound action (a redirection to a different url), while the latter can simply redirect the user to the specified address without needing to communicate with a Force.com server another time before doing so.
    * Lazy loading objects refers to initializing them with null values in controller constructors in order to reduce their size and decrease the time a request takes to complete. The associated getter for a lazy loaded object should then check for the null value and initialize the object if that value is found, thereby delaying initialization until the object is needed.
	
## Parameters

* component used to pass a parameter to it's parent
* has to be a child of apex:actionFunction>, apex:actionSupport, apex:commandLink, apex:outputLink, apex:outputText, or flow:interview

```
<apex:page standardController="Account">
    <apex:outputLink value="http:/google.com/search">
        Google Account
        <apex:param name="q" value="{!account.name}"/>
    </apex:outputLink>
</apex:page>
```

* Value is only required attribute but we had to use name attribute here because url parameters are named
* for multiple nested apex:param elements inside a apex:outputText, we use expression syntax within the value attribute to specify which param to use. {0} for first param for example

## Wrapper Classes

* special type of apex class used to collect multiple values in a single object in a way analogous to making a custom data type
* can use wrapper classes to display tables of data in our Visualforce pages that mix lists of records with other properties

visualforce:
```
<apex:page controller="AccountSetController">
        <apex:pageBlock>
            <apex:pageBlockTable value="{!rankedAccounts}" var="ra">
                <apex:column headerValue="Rank" value="{!ra.rank}"/>
                <apex:column value="{!ra.acc.Name}"/>
                <apex:column value="{!ra.acc.AnnualRevenue}"/>
            </apex:pageBlockTable>
        </apex:pageBlock>
</apex:page>
```

apex:
```
public class AccountSetController {
    public List<Account> accs {get;set;}

    public AccountSetController(){
        this.accs = [SELECT Id, Name, AnnualRevenue FROM Account WHERE AnnualRevenue != null ORDER BY AnnualRevenue DESC];
    }

    public List<wrappedAccRank> getRankedAccounts(){
        List<wrappedAccRank> rankedAccounts = new List<wrappedAccRank>();
        for(Integer i = 0; i < this.accs.size(); i++){
            rankedAccounts.add(new wrappedAccRank(i+1, this.accs[i]));
        }
        return rankedAccounts;
    }

    public class wrappedAccRank{
        public Integer rank {get;set;}
        public Account acc {get;set;}

        public wrappedAccRank(Integer rank, Account acc){
            this.rank = rank;
            this.acc = acc;
        }
    }
}
```

## Visualforce wizards

* set of pages that guide users through a process one step at a time
* different page for each step; same custom controller for each page; Buttons that take users to the next or previous step in a process should be action bound to controller methods that return a reference to the appropriate page using the format Page.visualforcePageName

page 1
```
<apex:page controller="WizardController">
    <apex:form>
        <apex:pageBlock>
            Harry Potter
            <br/>
            <apex:commandButton value="Next Wizard!" action="{!tom}"/>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```
page 2
```
<apex:page controller="WizardController">
    <apex:form>
        <apex:pageBlock>
            Voldemort
            <apex:pageBlockSection>
                <apex:commandButton value="Previous Wizard!" action="{!harry}"/>
                <apex:commandButton value="Next Wizard!" action="{!albus}"/>
            </apex:pageBlockSection>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```
page 3
```
<apex:page controller="WizardController">
    <apex:form>
        <apex:pageBlock>
            Albus Dumbledore
            <br/>
            <apex:commandButton value="Previous Wizard!" action="{!tom}"/>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```
apex controller:
```
public class WizardController {
    public PageReference harry(){
        return Page.harryPotter;
    }

    public PageReference tom(){
        return Page.voldemort;
    }

    public PageReference albus(){
        return Page.dumbledore;
    }
}
```

## Testing Visualforce

* visual test
  * check how it looks in variety of browsers; in every context: classic, lightning experience
* test apex code
  * test methods should begin with the following lines of code to associate the testing environment with the desired Visualforce page
  * then instantiate the custom controller/controller extension and it will grab the page reference from the testing environment. 
  * Be sure to test all setters, getters, and other action methods (including methods that redirect the user to a different page) in your controller using positive and negative (and where appropriate, restricted user and bulk) tests.
```
PageReference pageRef = Page.myVisualforcePageName;
Test.setCurrentPage(pageRef)
```
	
## Including Visualforce in the Salesforce UI

* we can view visualforce on a salesforce tab
* setup>user interface>tabs
* we can add visualforce to an existing tab through lightning app builder
  * need to enable it first at setup>custom code>visualforce pages
  * click edit on VF page
  * check the 'available for lightning experience, lightning communities, and the mobile app' checkbox and save

## Tabs in Visualforce pages

* To include tabs within your page, wrap all of the elements for a given tab within an apex:tab and nest those tabs inside of an apex:tabPanel. You can change the default selected tab by passing its id to the selectedTab attribute of apex:tabPanel

## Dynamic Visualforce

* used to dynamically render content
* use the apex:dynamicComponent tags
* componentValue is required attribute and takes a {!method} that will return a component

VF:
```
<apex:page controller="DynamicController">
    <apex:dynamicComponent componentValue="{!beforeAfterNoon}"/>
</apex:page>
```
apex:
```
public class DynamicController {
    public Component.Apex.OutputText getBeforeAfterNoon(){
        if(DateTime.now().hour() >= 12){
            Component.Apex.OutputText ot = new Component.Apex.OutputText();
            ot.value = 'After Noon';
            return ot;
        }
        else{
            return null;
        }
    }
}
```