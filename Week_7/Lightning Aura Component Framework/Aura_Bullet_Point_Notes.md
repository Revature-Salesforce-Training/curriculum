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

### JS Controller and Helper

### Apex Controllers

## Lightning Events

## Lighting Component Library

## LDS (to be combined with forms in LN)

## Error Handling in Aura

## Security in Aura