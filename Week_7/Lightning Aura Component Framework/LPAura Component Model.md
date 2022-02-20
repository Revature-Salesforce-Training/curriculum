## Lesson 0 - SLDS
SLDS - Talk about its use in a broader scope, how it can be used with visualforce as well. Also introduce the Lightning Component library.


## Lesson 1 - introduction to Lightning Aura Components. 
* 1.5 hours
    * 45 minutes(Lecture)
    * 45 Minutes(Exercise) 
### Aura Component Model Topics
* Intro
* Benefits 
* Component Bundle
* Harness Apps
* Aura:Attribute 
* Expression Syntax in Aura
    * Value Providers
* Lightning Component library
    * lightning:card

### Demo - Intro Example W/SLDS
### Exercise - Use Lightning Card from the component library, display some information in a component.

## Lesson 2 - Complete Control 
* 1.5 hours
    * 45 minutes(Lecture) + 45 Minutes(Exercise) 
### Aura Control
* Aura:if
* JavaScript Control
    * Controller
        * Action Binding
    * Handler
        * When to use both and how they differ. 
* Apex Control
    * Apex Controller 
        * Calling an @AuraEnabled method.
* Forms
* Security
    * Review apex Security
    * Lightning Locker Services
### Demo - Apex Controller Example
### Exercise - Create a page that displays contact data from the database through a apex controller upon the press of a button.

## Lesson 3 - Lightning Data Service
* 40 minutes
    * 20 minutes(Lecture)  
    * 20 minutes(Exercise)
### Lightning Strikes
* What is LDS?
    * How do we use it?
    * Record Pages and Record ID
* Design Component
    * Customizing the component name
    * Exposing attributes in Lightning App Builder
### Demo - LDS Example
### Exercise - Use LDS to display contact information inside a contact record page.

## Lesson 4 - Eventful Lessons
* 2 hours
    * 1 hr(Lecture) 
    * 1 hour(Exercise)
### Events, but not of the activity variety.
* Custom Events
    * Component Events
    * Application Events
        * Event Propagation Phases
            * Bubbling (Default for component events)
            * Capturing (phase="capture")
            * Default (Default for application events)
    * Registering Events
        * Setting Parameters
        * Firing Events
    * Handling Events
        * Listening (aura:handler)
        * Handling (action="c.function")
            * Getting Parameters
    * System/Browser Events Recap
* Handling Errors
    * Try-catch
    * Displaying Errors
    * AuraHandledException
### Demo - Eventful Lessons Example
### Exercise - Make a custom component event, and then fire and handle said event.

## Future Lessons?
* Connecting to external systems through JS Controllers
    * CSP Trusted Strikes
* Using JS Libraries inside components