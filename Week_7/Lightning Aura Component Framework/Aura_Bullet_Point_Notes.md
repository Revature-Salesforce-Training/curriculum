## Aura Intro

  * Aura is part of the Lighting Component Framework. Along with LWC.
  * Can also make SPAs
  * Has a component bundle like LWC but with more stuff
    * Component - contains our markup
	* controller - has a close relationship to the component. Name will be componentNameController.js; Used to make references to the helper. 
	* Helper - contains all the business logic. It is a best practice to keep business logic here, as the helper is instatiated only once if the component is in multiple places in the markup. The controller will appear every time.
	* style - contains the css to style the component. all selectors are prepended with '.THIS' to unsure that one components styles do not effect another.
	* documentation - contains html markup that provides info on how are component can be used and what its purpose is
	* design - 
	* renderer - used to create custom rendering for component elements; a lot easier to just use the render method in JS though so this is pretty rare
	* SVG - defines the custom icon for a component in the Lightning App Builder's component menu
	
## Viewing Aura Components

### Lighting Apps & Lightning Out (beta)

  * Lighting apps can be a useful tool for us during development. 
    * we can create a harness.app to house our Aura components 
	  * used to see a preview during development
  * Lightning out (in beta)
    * a way to allow Aura components to be used in non-salesforce applications that are not hosted on SF servers
	
### Component Accessibility Interfaces

  * similar to LWC targets in that it determines how/where we can use our component.
    * lightning:availableForFlowActions - use in a flow action
	* lightning:availableForFlowScreens - use in a screen flow
	* flexipage:availableForRecordHome - allows use in lightning record pages
	* check docs for full list
	
## Component Attributes

  * A way to store values in the view. 
  * In our markup of the component
  * Two required attributes. name - what we can reference; type - the datatype (boolean, date, datetime, decimal, double, integer, long, string, object, CRM objects (e.g. Account), and collections like lists. Note: collections cannot contain sObjects. We would instead use an array. (e.g. type="Account[]"))
  * 4 optional attributes 
    * access - determines whether the attribute can be referenced outside the component namespace
	* default - gives a default placeholder value. Assinging default values using sObjects take a specific syntax ex:
	```<aura:attribute name="testAcc" type="Account" default="{'sObjectType':'Account','Name':'test'}"/>```
	* required - determines if it must have a value
	* description - holds an explanation of the purpose of the attribute
	
## Expression Syntax
 
  * in the form {!valueprovider.value}
  * Used to define our:
    * Data binding: wiring a value in the component to an Aura attribute
	* action binding: using expression syntax in the view to pair controller methods with events
	
### Value Providers

  * V - (used in view and controller/helper) references a aura attribute in the view
  * C - (used in the view) references the controller
  * C - (used in the controller/helper) refers to methods in the Apex conroller

## MVCC

  * Model - our orgs data model
  * view - our aura
  * controller - our JS controller
  * controller - our apex controller

### JS Controller and Helper

  * they contain object literals that have name-value pairs where the name is a symbol data type and the value is an anonomous function.
  * the tight coupling of the controller with our component means that a reference of the component, any events, and an instance of our helper gets passed through automatically
    * the component and/or event could be passed into any helper classes to implement our logic
	```
	controller
	({
    myAction : function(component, event, helper) {
	helper.doThisMethod(component, event);
	}
	})
	```
  * We have component.find('string value that is aura:id attribute on any element') 
  * ``` <div aura:id="thisId"></div> ```
  * We can chain this to get values from the view if we wish
  * component.find("thisId").get("v.title")

### Apex Controllers

  * apex controllers must have at least one method that is public, static, and has @AuraEnabled annotation
  * Not part of component bundle. But a controller will be tied to a component like so:
  ```
  <aura:component controller="exApexController">
</aura:component>
  ```
  
  Once our component is linked we can call its methods like so:
  ```
  ({
    myAction : function(component, event, helper) {
        var method = component.get("c.exMethod2");
        method.setParams({inputString : 'hello'});
        method.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                // do some logic
            }

        });
        $A.enqueueAction(method);
    }
})
  ```

## Lightning Events

types of events in aura:
  * custom component events - custom event we create as part of Aura framework (child to parent component communication)
  * custom application events - custom event we create as part of Aura framework, not as performant as component event since it traverses all components. Best practice is only use if necessary. (whole app component communication)
  * system events - events related to the Aura framework such as the completed rendering of an app or component
  * browser events - the DOM events we worked with in JS such as onclick or onhover, ect.
  
### Creating Custom Events

* Start by creating .evt file through either vscode or dev console
* ```<aura:event type="APPLICATION" description="Event template" />```
  * access parameter can take public or global and determines if event can be used outside of namespace that defines it
  * description parameter holds a string of the explanation of the purpose of the event
  * extends parameter allows us to extend another event, ```extends="c.parentEvent"```
  * type is the only required parameter and determines if the event is component or application
  
We pass information through events using aura attributes:
```
<aura:event type="COMPONENT">
    <aura:attribute name="exampleParam" type="String">
</aura:event>
``` 

### Firing events

Once we have created our custom event we must register our event with the component that will fire it. 
```
<aura:component>
    <aura:registerEvent name="compEvent" type="c:exampleComponentEvent"/>
    <aura:registerEvent name="appEvent" type="c:exampleApplicationEvent"/>
</aura:component>
```

Then when we are ready to fire the event we can do so in our JS:
```
    var eventComp = component.getEvent("compEvent");
	eventComp.setParams({"exampleParam":"exampleValue", "exampleParam2":"exampleValue2"})
	//eventComp.setParam() if just a single parameter
    eventComp.fire();
    var eventApp = $A.get("e.c:exampleApplicatinoEvent");
    eventApp.fire();
```

### Firing Lighting Component Library Events

```
var userToast = $A.get("e.force:showToast");
navEvt.setParams({"message": "Hey, this is a toast."});
userToast.fire();
```
$A - our aura framework
e - events
force - namespace
showToast - our name of the event

### Handling Events

We've registered events and fired them. Now we must describe how to handle the events by the components that recieve them.

```
<aura:component>
    <aura:handler name="compEvent" event="c:exampleComponentEvent" action="{!c.handlerFunc}"/>
    <aura:handler event="c:exampleApplicationEvent" action="{!c.otherHandlerFunc}"/>
</aura:component>
```

* event attribute - required, takes same value as type parameter in ```<aura:registerEvent>```
* action attribute - required, contains expression syntax indicating JS controller function to call when the event is recieved
* name attribute - required if component event, must match name attribute in the corresponding ```<aura:registerEvent>```
* phase attribute - optional, can set to capture if we want listener to act in capturing phase rather than defaul bubbling phase

Now in our JS controller:
```
({
    handlerFunc : function(component, event, helper) {
        console.log('here');
		//event.getSource().get("v.name")
		//will return name of element that fired the event
		
		//event.getParam();
		//takes the name of an attribute passed in the event and returns value of that parameter
    },

    otherHandlerFunc : function(component, event, helper){
        console.log('here as well');
    }
})
```

### Handling system events

If we recall system events are related to the aura framework. Here is an example of handling a system event. See the docs for more.
```
<aura:component>
    <aura:handler name="init" value="{!this}" action="{!c.doInit"}/>
</aura:component>
```

That will fire after a component has started loading but before it has been rendered.

## Lighting Component Library

Just like with LWC, Aura also makes use of the component library. Some commone standard components:
* lightning:card - provides opaque container surrounded nested elements
* aura:if - for conditional rendering
* ltng:required - used to load external css and JS uploaded as static resources
* lightning:icon - displays icons from SLDS

## LDS

4 LDS components in the lightning component library

* lightning:recordForm - can view/create; can't prepopulate values; can't delete; more strict layout customization
* lightning:recordViewForm - can view a record; can customize layout with lightning:outputField components
* lightning:recordEditForm - can view/edit/create; can customize layout with lighting:inputField/lightning:outputField; can prepopulate input values with value attribute
* force:recordData - can view/edit/create/delete; requires us to build the form and functionality ourselves; 

## Error Handling in Aura

* can use try-catch-finally blocks in controller or helper 
* Once we catch the error we could fire a force:showToast event
* Or conditionally render our error message with aura:if
* Or we could print the error out to the console with console.error()

* If the error occured in Apex we can:
  * throw new AuraHandledException('String of error message');

## Security in Aura

* Lightning locker helps handle client side security. It's built in and does a lot of work for us
  * enforces JS strict mode
  * limits DOM access
  * restricts use of eval() - to help stop XSS attacks
  * places HTML/DOM elements and global objects in secure wrappers
  
* We are still on the hook for server side security
  * class sharing keywords
  * Security.stripInnaccesible()
  * Schema.DescribeSObjectResult security methods
  * Schema.DescribeFieldResult security methods