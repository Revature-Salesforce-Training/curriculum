# Module - Lightning Web Components

## Introduction to LWC

- the Lightning Web Component framework is Salesforce's newest programmatic UI framework
- it was released in the Spring '19 of Salesforce
- Lightning Web Components make use of ECMAScript standards and new HTML standards
- because of this, they're more performant than Aura components
    - when the Aura Component Framework was developed and released, browsers didn't have any implementations for custom HTML elements or for modules
    - but in the time between the release of the Aura Component Framework and the Lightning Web Component Framework, standards were updated so that conformant browsers now natively supported templating, custom HTML elements, web components, and JavaScript modules
    - this meant that web component frameworks no longer had to have functionality for these features themselves
    - by removing these responsibilities from the framework and therefore the extra layer of abstraction, newer component models are more performant because they're making use of the browser's native capabilities

## LWC Bundles

- HTML template
    - default HTML template

    ```html
    <template>
    </template>
    ``` 

    - HTML templates are placeholders for markup that isn't immediately rendered when a page is loaded
    - rather it's rendered through custom JS functionality that attaches it to the DOM
    - in the case of LWC, this is performed by the framework itself
- JS module
    - by using JS modules, we can reuse JavaScript code without needing to rewrite the same functionality and export our classes (will be important for testing)
    - default JS module

    ```js
    import { LightningElement } from 'lwc';
    export default class MyComponent extends LightningElement  {
        
    }
    ```

    - we are using the import statement to import LightningElement from lwc
    - lwc is the core JS module for the LWC Framework
    - LightningElement is a custom wrapper of a standard HTML element
    - all of our JS files that are part of components that are rendered UI elements should start with this syntax (i.e. importing LightningElement and creating a class that extends it)
    - MyComponent is a placeholder for the name of our LWC
- CSS file
    - this file is optional
    - we can include it to provide custom styling for our component
    - but, like with Aura components and Visualforce pages, we can also make use of SLDS to be able to include default Salesforce styling without needing to write our own CSS
- SVG file
    - this file is optional
    - we can include it to create a custom icon that will be displayed next to our component when we're working with it in the Lightning App Builder or Experience Builder
- Meta XML file
    - like with the other files that we have in Salesforce projects, LWCs have an XML file that includes information about the API version they should be used with
    - we also use this file to determine where and how our LWC can be surfaced within our Salesforce org
- each of the files in a LWC bundle have the name of the component itself followed by the respective file extension
    - e.g. a component named newAccountForm would have files with the names newAccountForm.html, newAccountForm.js, newAccountForm.css, newAccountForm.svg, newAccountForm.js-meta.xml
- to render a component as a UI element, it must have a Meta XML file, HTML template, and a JS file
- we can create service components without HTML files to serve as shareable JS code

## HTML Template File

- template directives allow us to conditionally render markup or to iterate through collections
- we have four template directives in the LWC model
- `if:true` and `if:false`
- these will take the place of any `<aura:if>` components that we would include in an Aura component
they follow the following format

    ```html
    <template>
        <template if:true={booleanProperty}>
            <!-- markup to render if booleanProperty is true -->
        </template>
        <template if:false={otherBooleanProperty}>
            <!-- markup to render if otherBooleanProperty is false -->
        </template>
    </template>
    ```

    - when the bound boolean property in the JS file is true, the markup contained between a template `if:true` directive will be rendered
    - when the bound boolean property in the JS file is false, the markup contained between a template `if:false` directive will be rendered
- `for:each`
    - allows us to iterate through a collection and render markup for each item within that collection

    ```html
    <template>
        <template for:each={arrayToIterateThrough} for:item="arrayItem">
            <!-- markup to render for each item in the list -->
        </template>
    </template>
    ```

    - we data bind a collection from our JS file to the `for:each` attribute
    - we provide a value to the `for:item` attribute that we'll use to refer to item we're working with on the current iteration
    - each outer tag within the `for:each` directive needs to include the key attribute
    - this attribute is bound to an identifier that's unique for each item within the collection
    - e.g. if we're iterating through a collection of records, we'll usually use the record Id as the `key` value for each of our tags
    - when we're referring to the current item within our `for:each` directive, we'll do so using the data bind syntax that we've observed so far (i.e. curly braces surrounding the variable name)
- curly braces surrounding a variable name in the HTML template are bound to a property or method within the components JS file
- we also have a forth directive that we can use, `iterator`
    - like the `for:each` directive, this allows us to iterate through a collection
    - but it also provides us the ability to provide special functionality for the first and last items of the collection

    ```html
    <template>
        <template iterator:iteratorName={collectionToIterateThrough}>
            <!-- within our directive, we can work with the iterator property (in this case, iteratorName)
    this property has value, index, first, and last properties -->
        </template>
    </template>
    ```
 
    - the `value` property returns the value of the current item
    - the `index` property holds the index of the item in the collection
    - the `first` and `last` properties are Boolean properties that are `true` if we're working with the first item in the collection and `true` if we're working with the last item in the collection, respectively, and `false` otherwise (working with these properties is how we can provide custom markup for the first and last items of a collection)
    - like with the for:item value in the `for:each` directive, we'll refer to our iterator in the iterator directive through data binding (i.e. through curly braces surrounding the variable name)
- like with the Aura Component Model, Salesforce provides out of the box components that we can use for Lightning Web Components through the Lightning Component Library
- like with Aura components, we can instantiate LWCs inside of other LWCs
    - in fact, LWC and Aura components are partially interoperable
    - we can instantiate a LWC inside of an Aura component
    - but we cannot instantiate an Aura component inside of a LWC
- to instantiate a component inside of another, we follow the kebab case naming convention with the format <namespace-component-name>
    - e.g. <lightning-card>
    - with custom components, any capital letters in their camelcase filenames are replaced with lowercase letters after a hypen
    - e.g. <c-new-account-form> to instantiate a component named newAccountForm
    - like with Aura components, our default namespace for custom LWCs is c

## Creating Lightning Web Components

- unlike Aura components, LWCs cannot be created in the Developer Console
- we have to create LWCs outside of our Salesforce orgs
- we can so in Visual Studio Code with the Salesforce Extension Pack through the `SFDX: Create Lightning Web Component` command
    - this command will create a new Lightning web component bundle in the `lwc` directory of our SFDX project by default
    - this bundle will contain the HTML, JS, and Meta XML files
- to preview a LWC, we can surface it in our Salesforce org (through e.g. a Lightning home page), include it in a custom Lightning application (again Aura components can contain LWCs and a Lightning application is a special kind of Aura component), or we can preview our components locally through the local development server
 
## Local Development Server

- we can install the plugin for the Local Development Server with the following command

```bash
sfdx plugins:install @salesforce/lwc-dev-server
```

- we can preview individual components with the `SFDX: Peview Component Locally` command
- we can start and stop the local development server with the `SFDX: Start Local Development Server` and `SFDX: Stop Local Development Server` commands, respectively
- this will allow us to preview our LWCs without needing to deploy them to a Salesforce org
- but if the component that we're previewing relies on data from a Salesforce org, we can still preview it
for it to function properly, we'll want our default org for our SFDX project to be a scratch org that contains data
the local development server will automatically query our scratch org for this data when the component is previewed
whenever we preview a component in the local development server, it will automatically be refreshed whenever we save its corresponding files without us needing to perform any sort of deployment operation

Component JS File
fields are member variables of a JS class
when we declare variables in a JS class, we don't declare them (and can't declare them) with one of the three scope-enforcing keywords (let, const, var)
this is because variables declared within a JS class are implicitly scoped to the class itself
any exposed fields that are available for external code are properties
attributes are the way that we refer to fields from our JS file within our component's HTML template
when we're doing so, we'll replace the camelcase of a field name in our JS file with kebab case in the HTML template
e.g. 
```
<template>
    <!-- the following code would allow us to set a variable in the child component's
JS named exPublicProperty -->
<c-child-component ex-public-property="example value"></c-child-component>
</template>
 ```

Shadow DOM
the shadow DOM encapsulates the DOM (document object model)
with this encapsulation, the inner content of a component cannot be accessed by entities outside of the component bundle
this is valuable because it allows us to protect our component from outside manipulation
it also allows us to separate our components for the purposes of applying, e.g. different stylings
 
LWC Decorators
@track
to use the track decorator, we'll want to import it from the lwc module
allows us to make objects and arrays in our JS reactive
this means that our component will automatically rerender whenever the contents of a collection annotated with the track decorator change
by default, all primitive fields in a JS module for a LWC are reactive
but the framework is not reactive to changes in the values of items within a collection without the use of the track decorator
@wire
to use the wire decorator, we'll want to import it from the lwc module
allows us to invoke methods from our org or other external services through use of the wire service
@api
to use the api decorator, we'll want to import it from the lwc module
we'll apply the @api decorator to any variable or method within our class that we'd like to expose publically
this will allow other components within our application to work with the variable or to be able to invoke the method

```
import { LightningElement, api } from 'lwc';
export default class ChildComponent extends LightningElement {
    @api exPublicProperty;
}
 ```

we can alternatively create getter and setter methods for a variable in our JS class
we can then expose one of the getter and setter methods with the api decorator, but not both
```
import { LightningElement, api } from 'lwc';
export default class ChildComponent extends LightningElement {
    publicProperty;
    
    get exPublicProperty() {
        return this.publicProperty;
    }
    
    @api
    set exPublicProperty(value) {
        if(value > 0) {
            this.publicProperty = value;
        }
    }
}
```
See more
 

getter and setter methods are preceded by the get and set keywords, respectively
 

 

Meta XML File
the meta XML file contains information about the API version used for a component and where it can be surfaced within a Salesforce org
```
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
<apiVersion>52.0</apiVersion>
    <isExposed>false</isExposed>
</LightningComponentBundle>
 ```

to surface our LWCs within our Salesforce orgs, we'll want to change the value of the <isExposed> tag to true
we'll then follow the <isExposed> tag with a set of <targets> tags
within our <targets> tags, we'll add a <target> for each specification for exposing our component
if we want to expose our component through
a custom tab, we'll use the lightning__Tab target
a Lightning App, Home, or Record page, we'll use the lightning__AppPage, lightning__HomePage, or lightning__RecordPage targets, respectively
a Flow screen, we'll use the lightning__FlowScreen target
a page in Experience site, we'll use the lightningCommunity__Page target
```
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
<apiVersion>52.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
    <target>lightningCommunity__Page</target>
        <target>lightning__HomePage</target>
        <target>lightning__AppPage</target>
    </targets>
</LightningComponentBundle>
 ```

we can also add a set of <targetConfigs> tags to specify properties or behavior for a certain destination
within the <targetConfigs> tags, we'll add a <targetConfig> for each target that we want to provide additional information for
within the <targetConfig> tag, we can expose properties from our components JS file with <property> tags
the <property> tags can take name, label, and type attributes (among others)
this will allow us to expose JS properties for their values to be set when our component is added to, e.g. a Lightning Page, flow screen, or a page in an Experience site
we can also add an <objects> tag within a <targetConfig> tag for a lightning__RecordPage
within the opening and closing <objects> tags, we'll add an <object> tag containing the API name of an object that we want to work with
these tags allow us to choose specific objects whose record pages can contain this component
if we want our component to be able to be surfaced on record pages for all objects, we can simply omit the <objects> tags entirely
we can include the <supportedFormFactors> tag
within the <supportedFormFactors> tags, we'll include a <supportedFormFactor> tag
<supportedFormFactor> will only take values of Large or Small, allowing our component to be rendered for only desktops or mobile devices
if we use the small value, we need to use the lightning__AppPage or lightning__RecordPage targets as well
 

Lifecycle Hooks
Lifecylce hooks are callback methods that are invoked through a components lifecylce
we have five lifecycle hooks available with our Lightning Web Components
constructor()
connectedCallback()
renderedCallback()
disconnectedCallback()
errorCallback()
 

Lightning Web Component Lifecycle

when an LWC is instantiated, the constructor() is invoked first
the component is then is inserted into the DOM
next the connectedCallback() is invoked
the component is then rendered
then the renderedCallback() is invoked
when an LWC is removed from the DOM, the disconnectedCallback() lifecycle hook is invoked
if we have any children custom LWCs, the lifecycle is modified
the constructor() method will be invoked on the parent component
if there are any public properties for the parent component, the values for those will be assigned
the parent component is then inserted into the DOM and the connectedCallback() is invoked
the parent component is rendered
the constructor() method will be invoked on the child component
if there are any public properties for the child component, the values for those will be assigned
the child component is inserted into the DOM and the connectedCallback() is invoked on the child
the child is then rendered and the renderedCallback() is invoked on the child
then the renderedCallback() is invoked on the parent
when a component that has custom children components is removed from the DOM, we again have a modified lifecycle
the parent component is removed from the DOM
disconnectedCallback() is invoked on the parent component
the child component is removed from the DOM
disconnectedCallback() is invoked on the child component
 

constructor() Callback

the constructor() callback is invoked when a component is instantiated
we shouldn't add any attributes to the custom element associated with our LWC (i.e. the HTML template) through this method
the constructor() callback for any parent components is invoked before that of their children
before we invoke any other logic within our constructor() callback, we'll want to invoke the constructor of the parent class through super()
 

connectedCallback()

the connectedCallback() lifecycle hook is invoked when the framework inserts a component into the DOM
we can use this to perform any setup operations
e.g. retrieve data from an Apex method or subscribe to a channel on the Lightning Message Service
the connectedCallback() lifecycle hook for any parent components is invoked before that of their children

renderedCallback()

the renderedCallback() lifecycle hook is invoked once a component has rendered
the renderedCallback() lifecycle hook for any children components is invoked before that of their parents
we want to be aware that a component can be rendered and rerendered multiple times throughout its lifecycle
as we saw in our discussion of the track decorator, any primitive fields in our JS class are reactive by default
so whenever the value of any field changes, the component will be rerendered
this operation will invoke the renderedCallback() lifecycle hook once again
if we have code that we only want to execute when the component is initially rendered, we can use a boolean field in our JS class and set its value to true during the first invocation of the renderedCallback() lifecycle hook
 

disconnectedCallback()

the disconnectedCallback() lifecycle hook is invoked when the framework removes a component from the DOM
the disconnectedCallback() lifecycle hook for any parent components is invoked before that of their children
we use the disconnectedCallback() hook to perform any cleanup operations
e.g. unsubscribing from a channel of the Lightning Message Service
 

errorCallback()

the errorCallback() lifecycle hook is invoked whenever an error occurs in the lifecycle of a child component or if an error occurs in an event handler in a child component
we can use this lifecycle hook to capture all exceptions that occur in any descendant components
the errorCallback() lifecycle hook is declared with two parameters
a JS object holding the error (named error)
a string holding the stack trace of the exception (named stack)
 

Communicating Between Lightning Web Components
to communicate between LWCs, we'll generally choose one of three options
if we want to communicate from parent components to children components, we'll make use of public properties and methods on the child component
the fields and methods in a child component are made public through the use of the @api decorator
we can assign values to the properties of a child component when instantiating it or we can invoke a method of the child component and pass information to that method as arguments
if we want to communicate from children components to parent components, we'll fire a custom event to do so
if we want to communicate between unrelated components or communicate between some combination of LWCs, Aura components, and Visualforce pages, we'll use the Lightning Message Service

Custom Events

to create a custom event, we'll instantiate the CustomEvent class within our component
we can fire our custom event by calling the dispatchEvent() method, passing it the custom event that we instantiated
when we instantiate the CustomEvent class, we'll provide at least one argument to the class constructor
this first argument will be the name of our event
a parent component will be able to handle the event by adding an event handler on its instantiation of a child component
e.g. a custom event fired through the code this.dispatchEvent(new CustomEvent('next')) can be handled through an event handler attached with on preceding the event name
we action bind an event handler method in the parent component by using curly braces
```
<template>
    <c-child-component onnext={methodToHandleEvent}>
    </c-child-component>
</template>
 ```

we can propagate information through a custom event by providing additional arguments to the constructor when instantiating the custom event
most often, we'll pass an object literal containing the information
by convention, the information that we'll pass will be the value of a key named detail within this literal
e.g. new CustomEvent('customeventname', { detail : 'value to propagate through event' })
to handle a custom event that propagates information, our event handler method in the parent component will declare a single parameter (commonly named event)
this parameter will be an object with the values that we passed as the second argument to our CustomEvent constructor
so we can retrieve the value propagated through the event by working with the detail property of the event parameter 
e.g.
```
parentComponentHandlerMethod(event) {
    console.log(event.detail);
}
 ```

we can also attach event listeners in the JS file of our parent components
to do so, we'll use the addEventListener() method
we'll call this method on our components HTML template
this method takes two parameters
the first is the name of the event to handle (without the on prefix)
the event handler function to invoke when the event is received
if we're adding event listeners through JS, we'll oftentimes do so in one of our lifecycle hook functions
when a custom event is fired it doesn't cross the shadow boundary by default
the shadow boundary is division between the shadow DOM and the regular DOM
this means that, by default, a custom event will only be able to be handled by the direct parent of the component that fires it
any grandparent or further ancestor components are on the other side of the shadow boundary, so the event will never reach them
if we do want our event to be able to be handled by grandparent or other ancestor components, we can work with the bubbles and composed properties of our custom event instance
the bubbles property defaults to a false value 
but we can provide a true value to this property to be able to have our event bubble up the shadow DOM
in addition to setting the bubbles property to true, we'll also want to set the composed property to true, which will have our event propagate up to the root of the DOM itself
the composed property defaults to a false value  (meaning that the event won't cross the shadow boundary)
e.g. new CustomEvent('customeventname', { bubbles: true, composed: true})
with only the bubbles property set to a true value, the event will bubble up the shadow DOM, but won't cross the shadow boundary
 

Custom Event Conventions

when naming a custom event, by convention we want to avoid using any uppercase letters or spaces
rather, the name of our custom event should be all lowercase and if we do need to separate words, we should do so through the use of an underscore
JS passes non-primitive values by reference, meaning that if any event handlers modify a non-primitive passed to them (such as an object or an array), this non-primitive value will also be changed in the child component that fired the event
therefore, we can inadvertantly modify the values of children component objects when working with data passed through our custom events
to avoid these behavior, we can
avoid passing any non-primtives values through custom events entirely
copy any non-primitive values to new variables before firing the custom event and adding those new variables to the detail property instead
 

Lightning Message Service

Lightning Message Service allows us to communicate between unrelated LWCs, as well as Aura components and Visualforce pages on a Lightning Page
this allows to communicate across different UI frameworks
to work with Lightning Message Service, we'll first create a message channel
we'll do so by creating an instance of the LightningMessageChannel metadata type in the messageChannels directory in our Salesforce project
the message channel file will follow the format nameOfMessageChannel.messageChannel-meta.xml
once we've created a Lightning message channel, we can import the Lightning message channel into any component within our project
the format our import statement will mirror the following:
import nameOfMessageChannel from '@salesforce/messageChannel/nameOfMessageChannel'
 

the message name has the __c suffix appended to it
to publish an event through our message channel, we'll want to import the message channel as well as the publish method and MessageContext object from the lightning/messageService module
the MessageContext object is used to hold information about the LWC using the message channel
the publish method allows us to publish messages to the channel, that subscribers can then receive
this method takes three parameters (or optionally four parameters)
a reference to the imported MessageContext object
the message channel to publish the message on
an object containing information to propagate through the message
the scope specification (will want import APPLICATION_SCOPE from the lightning/messageService module)

```
import { LightningElement } from 'lwc';
import nameOfMessageChannel from '@salesforce/messageChannel/nameOfMessageChannel';
import { publish, MessageContext } from 'lightning/messageService';
export default class MessageChannelPublisher {
@wire(MessageContext)
messageContext;
publishingMethod() {
publish(this.messageContext, nameOfMessageChannel, { data : 'value to pass through event'});
}
}
```
See more
 

once we've published a message to our channel, it'll be propagated to any components or pages that subscribe to the channel
to subscribe to a message channel in a LWC, we'll make use of the subscribe() method
this method will be imported from the lightning/messageService
in addition to importing the subscribe() method, we'll also want to import the MessageContext object, APPLICATION_SCOPE, and the unsubscribe() method from the lightning/messageService
when we invoke the subscribe() method, we'll pass it three (or optionally four parameters)
the first will be a reference to the MessageContext object
the second will be the imported message channel
the third will be a specification for an event handler
the (optional) fourth parameter will be a scope specification
 

Scope for Lightning Message Service

by default, messages published to a channel through Lightning Message Service can only be received by components (or pages) that subscribe to the channel and exist on thesame navigation tab in our Salesforce application
but we can publish messages that are broadcast to the entire Salesforce application by using the APPLICATION_SCOPE optional parameter
we'll provide this parameter specification when we're invoking the publish() method in the publishing component as well as when we're subscribing to the channel through the subscribe() method in the listening components
if we don't want our message to broadcast outside of the active area (i.e. the selected navigation tab in our Salesforce application), we can omit this parameter from calls to the publish() and subscribe() methods
 

Incorporating Salesforce Records
generally speaking, our order of preference for working with Salesforce data should be as follows
use standard components from the Lightning Component Library with Lightning Data Service
use wire adapters with Lightning Data Service
use wire adapters with Apex
imperatively invoking Apex methods

Importing Objects and Fields

when working with records in LWCs, we generally want to import them from the @salesforce/schema module rather than storing their API names in string variables
we do this because
the framework will check for the existence of the objects and fields (which can help us find typos)
any objects or fields imported into a LWC will be unable to be deleted from the Salesforce org
the syntax to import an object into our JS class is as follows
import OBJECT_NAME from '@salesforce/schema/ObjectApiName';
 

e.g. ```import OBJECTZ_OBJECT from '@salesforce/schema/Objectz__c';```
the syntax to import a field into our JS class is as follows
```import FIELD_NAME from '@salesforce/schema/ObjectApiName.FieldApiName';```
 

e.g. ```import MUTE_FIELD from '@salesforce/schema/Objectz__c.Mute__c';```

Lightning Data Service

Lightning Data Service in the Lightning Web Component Framework works a lot like Lightning Data Service in the Aura Component Framework
it allows us to interact with records without much, if any, non-markup code
if multiple components are working with the same record, Lightning Data Service will only query for the record a single time and update the record in all components that reference it whenever changes are made to it
Lightning Data Service caches the record locally so that unnecessary server calls aren't made
there are three components for Lightning Data Service available for Lightning web components
<lightning-record-form>
has the fields, layout-type, object-api-name, and record-id attributes (among others)
object-api-name is the only required attribute, we pass it the API name of the object whose record we're working with
record-id takes the record Id of an existing record when we want to view or edit an existing record
if this attribute is not specified, we'll be creating a new record
we'll want to specify one of the fields and layout-type attributes, but not both
we can specify the fields attribute and pass it an array of comma-separated fields to include in our form
or we can specify the layout-type attribute and pass it either "Full" or "Compact" to have our form include all fields that are present on the object's default page layout or compact layout, respectively
we can modify the number of columns used in our <lightning-record-form>, but if we want to make further modifications such as changing the form layout beyond the number of columns or prepopulating field values, we'll need to use either <lightning-record-view-form> or <lightning-record-edit-form>
<lightning-record-view-form>
has the object-api-name and record-id attributes (among other attributes)
both of these attributes are required
in between the opening and closing <lightning-record-view-form> tags, we can display the record's values for individual fields by using <lightning-output-field> components
<lightning-output-field> has a field-name attribute that takes the API name of the field to display the value of
<lightning-record-edit-form>
has the object-api-name as its only required attribute
we can specify the record-id attribute to edit an existing record
if we omit this attribute, we'll be creating a new record
in between the opening and closing <lightning-record-edit-form> tags, we can display the record's fields by using <lightning-input-field>
<lightning-input-field> has a field-name attribute that takes the API name of the field that we want to display
 

Context Aware Components

if we surface a LWC on a record page, we can declare public recordId and objectApiName properties in the components JS class using the @api decorator
the LWC framework will automatically populate these with the record Id and API name of the object whose record page we're currently viewing

Wire Service

the wire service allows us to retrieve data for a Lightning web component by invoking a method from Lightning Data Service, an Apex method, or a method from another JS module
to use the wire serivce, we need to import the wire decorator from the lwc module
when using the wire decorator, we annotate the field or function in our JS class that uses the wire service as follows
following the decorator, we'll have a set of parentheses containing the name of the wire adapter (i.e. the method we imported to invoke through the wire service)
if the adapter method requires any parameters, we'll add these as an object literal in the parentheses (comma-separating the adapter method and its parameters)
the keys in our object will be the name of the parameter and the values will be the arguments we want to assign to those parameters
we can make values reactive by prepending by using the $
when a reactive parameter value changes, the wire service will automatically invoke the adapter method with the new parameter value
if we use the wire decorator to annotate a field in our JS class, the value returned from the adapter method will be assigned to that field
the value will be returned as an object with two keys
the data key will hold the value returned from the method
the error key will hold any errors that occurred during the adapter method execution
e.g.
```
@wire(wireAdapterMethod)
resultField;
```

if we use the wire decorator to annotate a function, the value returned from the adapter method is an object with error and data properties
we'll annotate a function with the wire decorator when we want to execute logic on the returned value or handle any errors
e.g.
```
@wire(wireAdapterMethod)
resultFunction({error, data}) {
    if(data) {
        // if data is truthy, the adapter method executed successfully
        // we'll perform some sort of processing here
    } else {
        // we'll perform error handling using the error in the error key
    }
}
```

Using Wire Adapters with the Lightning Data Service

to use Lightning Data Service and the wire service together, we'll decorate one of the adapter methods available in the lightning/ui modules with @wire
the lightning/ui modules all use Lightning Data Service under the hood
there are four lightning/ui modules

lightning/ui Module	Contains Adapter Methods For...
lightning/uiAppsApi	retrieving information about standard and custom Salesforce applications
lightning/uiListsApi	retrieving information about list views
lightning/uiObjectInfoApi	retrieving information about objects and fields (similar to the classes in the Schema namespace in Apex)
lightning/uiRecordApi	interacting with records
 

Exposing Apex Methods

exposing an Apex method to a Lightning web component is the same as exposing an Apex method to an Aura component
the enclosing class must be public or global
the method needs to be static, public/global, and annotated with @AuraEnabled
if we're invoking a method through the wire service or if our method doesn't make any DML operations, we can follow the @AuraEnabled annotation with the cacheable parameter and assign it a true value in order to have the results of our method cached on the client

Importing Apex Methods

to import an Apex method, we'll import it from the @salesforce/apex module as follows
```import nameOfApexMethod from '@salesforce/apex/NameOfApexClass.nameOfApexMethod';```
 

Invoking Apex Methods Through the Wire Service

we need to turn to Apex in the case that we want to perform an operation that Lightning Data Service doesn't support (e.g. retrieving records through the use of a SOQL query or performing a DML operation on multiple records at once)
to invoke an Apex method through the wire service, we follow the same structure as when invoking a method from one of the lightning/ui modules through the wire service
we import the wire decorator from the lwc module
we annotate the field or function that we want to assign the returned value to with @wire
following the wire decorator, we have a set of parentheses where we specify the adapter method (i.e. the Apex method that we imported)
if the Apex method declares any parameters, we'll include an object literal in our parentheses to assign arguments to them
e.g.
```
@wire(apexMethodAdapter, {methodParameter : 'value to assign'})
resultField;
```

any Apex method invoked from the wire service must have the cacheable parameter set to true
so if we need to perform DML operations through Apex, we'll invoke the Apex method imperatively
we'll also invoke imperative Apex when we want to control when our Apex method is called
a wired method or property is invoked when the component is instantiated
we can refresh the cache (i.e. invoke the wire adapter) through the use of the refreshApex() method
 

Invoking Apex Methods Imperatively

to an invoke an Apex method imperatively, we'll need to expose and import it just as we would when invoking an Apex method through the use of the wire service
in the JS class function that we want to invoke the Apex method within, we'll call the method and pass any parameters that it declares through the following syntax
following the name of the method, we'll a set of parentheses containing an object literal where the keys are the names of the Apex method's parameters and the values are the arguments we want to pass to those parameters
the framework will then invoke the Apex method, which will return a promise
a promise is a JavaScript object that is a proxy for a value that will become available
to handle the promise, we'll use .then() and .catch() methods
the .then() method will be invoked when the Apex method executes successfully and it will take a single parameter holding the result of the method
the .catch() method will be invoked when the Apex method has an error while executing and it will take a single parameter (the error that occurred)

Testing Lightning Web Components
Jest

to test LWCs, we use Jest
Jest is a JS testing framework
to use Jest, we can install the sfdx-lwc-jest node package with sfdx force:lightning:lwc:test:setup command in our terminal in the folder holding our SFDX project
we'll use Jest for operations such as
testing the values of our component's public properties and methods
testing mock user interaction with our component
testing how our component handles the server calls that it invokes
 

Creating Jest Tests

to make a Jest for a component, we first the __tests__ folder inside of our component's folder
our Jest files will be JS files that we create in the __tests__ folder
the __tests__ folder is included in our project's .forceignore file by default
this means that any Jest tests that we write for our components will not be deployed to our orgs
as a convention, we end our names of our test files with .test, e.g. exampleTest.test.js
rather than manually creating the __tests__ folder and test files, we can use the SDFX: Create Lightning Web Component Test command palette command
when we run this command, we'll choose the parent folder of the main/default/lwc directory that contains the component we're writing a test for as well as the component that we're testing
this command will create a __tests__ directory inside of the folder for our chosen component and a test file named componentName.test.js
default componentName.test.js file

```
import { createElement } from 'lwc';
import ComponentName from 'c/componentName';
describe('c-component-name', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        const element = createElement('c-component-name', {
            is: ComponentName
        });
        document.body.appendChild(element);
        expect(1).toBe(2);
    });
}
```
See more
 

Jest Test File Structure

within our test file, we'll begin by importing the component that we're testing as follows
import ComponentName from 'namespace/componentName';
we'll also import the createElement method from the lwc module, which we can use to create the component in our test setup
each test suite is denoted through a describe block
our call to the describe method takes two parameters - a description for the test suite and an anonymous function containing our test suite code
to work our component in our tests, we'll create it with a call to createElement
this method takes two parameters - the name of component we're creating and the reference to the imported component as the value for the is property of an object literal
within our test suites, we use it or test methods to denote single tests
each it or test method call takes two parameters - a description for the test and an anonymous function containg our test code
once we've instantiated the component that we're testing in our test blocks, we can insert it into the DOM by calling the appendChild() method on the document object
to make an assert statement, we call the expect method using one of the Jest framework's matchers (e.g. the toBe() matcher to test equality)
we can perform setup and cleanup for our test suites through calls to the beforeEach() and afterEach() methods
these methods take a single parameter - an anonymous function containing the code to execute before or after each test method within the suite runs
if we want to work with the contents of a component that we've inserted into the DOM, we'll call the querySelector() method on its shadowRoot property
the shadowRoot is used to refer to the root of an element's shadow DOM
 

Running Tests

we can run tests through npm with npm run test:unit command
if we run this command from a component folder, only the tests for that LWC will be executed
if we run this command from the root folder of our SFDX project, all tests within the project will be executed
we can also run our test files within Visual Studio Code through the use of the Salesforce Extension Pack

Testing Components that Use the Wire Service

because our tests shouldn't make calls to outside entities, we want to mock the data that we'd get back from an adapter method
to mock this data, we'll create a data folder inside of our __tests__ folder and a JSON file within that file
the JSON file will contain a mock of the data we'd get back from invoking the adapter method
within our test file, we'll import the wired method and the adapter register method
if we're testing a LDS adapter method, we'll import registerLdsTestWireAdapter
if we're testing an Apex adapter method, we'll import registerApexTestWireAdapter
if we're testing an adapter method that invokes code from another source, we'll import registerTestWireAdapter
all of these methods will be imported from the @salesforce/sfdx-lwc-jest module
we'll also import the mock data through a call to the require() method, passing this method a relative path to the JSON file that holds our mock data
within our test file following our imports, we'll invoke the emit() method on our imported register method, passing the imported adapter method as an argument
in the Summer '21 release of the sfdx-lwc-jest module, we no longer have to import and invoke the registration methods
rather, we invoke the emit() method on our imported adapter method, passing the imported mock data as an argument
this behavior starts with version 1.0.1 of the sfdx-lwc-jest module
 
Security in Lightning Web Components
Client-Side Security

client-side security is taken care of for us through Lightning Locker
like with Aura components, Lightning Locker
enforces strict mode in our JS code (although strict mode is automatically enforced for all JS modules)
allows the LWC Framework to wrap each component within its own shadow DOM
wraps all global objects in secure wrappers
is automatically enabled for all LWCs
 

Server-Side Security

to ensure that our Apex code invoked from LWCs (either through the wire service or imperative calls) respects our declarative security model, we'll want to use
with sharing or inherited sharing keywords in our class signatures to enforce record level security
WITH SECURITY_ENFORCED SOQL clause, Schema namespace classes and methods, Security.stripInaccessible() methods to enforce object and field level security
 

CSP in the Lightning Web Component Framework

the Content Security Policy in the Lightning Web Compon ent framework is an implemntation of a W3C (World Wide Web Consortium) standard
this standard is designed to limit outside entities to prevent cross-site scripting and other attacks
the CSP in the Lightning Web Component Framework
prevents us from using external JavaScript libraries unless they're uploaded to our Salesforce orgs as static resources
prevents us from using resources such as images that are external our Salesforce org
we'll want to either upload any resources that we want to use as static resources or allowlist the site that we're retrieving them from by creating a CSP Trusted Site in Setup
prevents us from using <script> tags or inline JS in our HTML templates

Debugging Lightning Web Components
Debug Mode

by default, Lightning web components and Aura components run in production mode
production mode uses JavaScript minification
in minification, line breaks, whitespace, tabs, and comments are removed
variable names are also changed to be shorter
minification allows the runtime size of our JS to be as small as possible, but looking at minified code can make it hard to decipher
to turn off minification while debugging, we can go to the Debug Mode page in Setup
because working in debug mode disables minification and therefore disables runtime optimizations, we will see performance differences when operating in debug mode

Debugging Lightning Web Components

when debugging LWCs, we can make use of browser developer tools
Chrome Developer Tools
Firefox Developer Tools
when using our brower's developer tools to debug, we can set breakpoints within our JS files to pause execution
we can also add /aura_prod.*.js$ and /components/.*.js$ to the ignore list of our browser's developer tools, so that our execution doesn't pause on any exceptions that are caused framework code, rather than our own custom code
we can also enable custom formatters in our browser's developer tools to parse proxy objects
the Lightning Web Component framework uses proxy objects to ensure that data from decorators or passed into children components from parent components is treated as read-only
 

Writing Accessible LWCs
we want to implement accessibility for our web components to make them usable by users with disabilities, such as those users who have sight problems
users who have sight problems often times use screen readers to navigate websites and we can add attributes to the elements and components in our markup to assist these screen readers

Title Attribute

screen readers read the title of an element or component to a user out loud
we should check the documentation for the HTML element or standard LWC that we're using
if it has a title attribute, we should be sure to specify a value for it to allow users with disabilities to know its purpose
when creating our own custom components, we can make a public title property for them
we should getter and setter methods for the title property
inside the setter, we call the setAttribute() method on our component
this method takes two arguments, the attribute to provide a value for (title in this case) and the value to assign to that attribute

ARIA Attributes

ARIA stands for Accessible Rich Internet Applications
it's a W3C standard for creating applications that can be used by everyone, including any users with disabilities
ARIA attributes are used to provide screen readers with additional information about the state of our page

Controlling Focus

users with poor eyesight may use the tab key on their keyboard to navigate through a webpage
to ensure that elements that we want our users to interact with can take focus, we can set the tabindex attribute of an element to 0
this allows an element that wouldn't normally be able to take focus to do so when a user's navigating through our page
elements that allow for user input/interaction, such as buttons and input elements, are natively able to gain focus

Lightning Web Components Open-Source
unlike the Aura Component Framework and the Visualforce Framework, there's an open-source version of the Lightning Web Component Framework
this means that we can not only run applications that use LWCs outside of the Salesforce platform, but we can even download the framework source code and make modifications to our personal copies
the LWC OSS framework has a new version released (on average) once a week
we can view the source for the open-source framework here
to find documentation on LWC OSS, we can visit https://lwc.dev 
when working with the open-source version of the framework, we'll go about our development process differently

Development Environment

when developing applications for the Salesforce platform using the on-platform version of the LWC Framework, we use the Salesforce Extension Pack for Visual Studio Code and the Salesforce CLI to create and deploy our components
but when creating applications to run outside of the Salesforce platform using the open-source version of the framework, we don't have any preferred IDE or development environment
rather than creating a new SFDX project to hold our LWCs, we'll often times create a new application using npx
npx is an executor for Node.js packages
to create a new application with LWC OSS, we'll run the following command in our terminals
npx create-lwc-app nameOfApplication
to preview our applications locally, we can run the npm run watch command
to build our applications, we can run the npm run build command
we can also work with applications using LWC OSS at https://webcomponents.dev 

Custom Component Namespaces

when working with the open-source LWC Framework, we have the ability to control the namespaces that our custom components are held within
to create a namespace, we create a folder within the src/modules directory
the name of this folder will be the namespace that hosts any component bundles created within
this is different from the on-platform version of the framework, where all custom components are created in the default c namespace
or if we're working a Developer Edition org and we've set a custom namespace to use with managed packages, whatever namespace we've provided

Standard Components

applications built using the open-source version of the LWC Framework don't have access to standard components from the Lightning Component Library
this is because these components are an addition on top of the framework available when executing applications on the Salesforce platform, but they are not a part of the framework themselves
however, we can still make use of components that have been created and released
these can be components developed by third parties, or we can make use of the open-source versions of standard components from the Lightning Component Library
using components from the Lightning Component Library in applications using the open-source version of the framework can be done by
downloading components from the Base Component Recipes repository (note that these components exist within the c namespace in the repository)
installing the lightning-base-components Node.js package within our application by running the npm install lightning-base-components command within our application root directory and by adding the key-value pair for the package in our lwc.config.json file
we want to add this key-value pair in the lwc.config.json file because this is one of the files that the framework uses to resolve dependencies when building our application

Working with Salesforce Records

components created using the open-source version of the Lightning Web Component Framework don't have access to Lightning Data Service or Apex through @salesforce modules because they don't run on the Salesforce platform
in fact, the components from the Lightning Component Library that we can use in our applications using the open-source version of the framework don't include components that depend on Lightning Data Service (e.g. <lightning-record-form>, <lightning-record-view-form>, and <lightning-record-edit-form>
instead, we'll need to make calls to Salesforce APIs to be able to retrieve and work with records
we can either write the code to make these requests ourselves or we can use a package that allows us to invoke these APIs (e.g. JSforce)
we still have access to the same decorators that are available in the on-platform version of the LWC Framework
this means that we can use the @wire decorator to be able to have the framework handle the invocation of the methods that we're calling