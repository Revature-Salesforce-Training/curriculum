# Why LWC?

You might be asking yourself after Visualforce and Aura Components, why are we delving into a third UI framework? It is both a reasonable and good question to ask. Part of it is the ever changing world of technology. It flies by at a rapid pace and standards change.
	
Back when Aura was created web standards were limited, and to extend from those limited standards developers created a variety of frameworks to fill the needs of various business use cases, including salesforce with Aura. This made it possible to develop large sclae client-side apps on the web, but not with certain caveats.
	
React, Angular, Lightning Components are all built off of JavaScript but by their nature came to act like a language in their own right. This meant that while there was some overlap the skills learned in one didn't directly overlap with the others. This saw the rise of React developers, Angular developers, and of course developers specialized in Salesforce's Lightning Aura Components. Further they are not readily interoperable, what is written in one will not work well with another.
	
By 2019 when Web Components were introduced standards had changed. Core ECMAScript (The basis for JavaScript) added things like classes, modules, decorators, and more. As a result frameworks are less needed than they were, those gaps they filled having grown smaller, or evaporated entirely. The core now has the updates it needs to be a application development platform all on its own, and things once required by a framework is now standard.
	
By switching to the standard based lightning web components it becomes easier to find common solutions as it is less reliant on proprietary technologies, it is easier to find overlap and carry the skills gained to other technologies and vice versa, becomes less reliant on the salesforce platform itself, and still alows for a quick development cycle.
	
Beyond that we still have through salesforce the ability to interact with the platform, to leverage a library of pre-existing components to enable speedy solutions, and under the hood a underlying service that allows for all the power you are used to and even quicker performance.
	
# Dev Environments

We can of course utilize VSCode to develop our LWC, but we cannot leverage things like the dev Console, which has yet to be updated to support them. (A update to supplement the dev console with a cloud based VSCode IDE is in the works and I look forward to seeing it once it makes wide release.)
	
## https://webcomponents.dev/

You can work using this site to experiment with LWC as well, though it won't be connected to your org. It can be a useful tool to experiment with LWC.

## Local Dev Server

You cannot create LWC via the Dev Console, and there also isn't by default an easy way to preview like you can with a harness app in Aura. However, there is a tool for creating a local development server to perform similar functionality.
		
install local dev server
authorize a dev hub
create a scratch org
launch local dev server.

		Tip:
			If you are getting an error installing and running the local developer server try the below:
				You need to install node gyp by running 
				npm install -g node-gyp
				in command prompt or whatever command line interface you use.
				And then after that you run 
				npm install --global --production windows-build-tools

# The Component

Similar to aura we have components, and like aura there are multiple files associated with them. Fortunately it is much reduced from what we had before. They include at most four files: HTML, JavaScript, the meta-xml, and optionally CSS.

## HTML

HTML is exactly as it always has been, but now we are going to take advantage of a few new things with LWC.

### Template Tag

LWC are built off of a templating system. This uses a virtual DOM to render components. Because of this we leverage LWC to manipulate the DOM instead of directly doing so.
			
When a component is rendered the template tag is replaced by the name of the component in kebab case. We also will leverage components with directives in a few minutes.

### Identifiers

We can reference our properties in JS by using identifiers, which is a similar syntax to the expression syntax in aura.
		
### Layout Tags

Compiles into slds 'mostly', debatable which is better. SLDS can be more fiddly, but more flexible, and slightly faster.

### Template Directives

Directives can be used to render lists using either the for:each or iterator directives. We can also make use of the if:true and if:false directives to conditionally render sections of our page.

### Shadow DOM

Component DOM's are encapsulated in a shadow DOM. This makes them isolated from one another. This ensures what we do in one will not accidentally impact other parts of our page. We can allow for communication between them through events and 

## JS

Within Web Components we find JavaScript becoming even more important. 

Future Topics
			--Async await
			--Promises
			--Fetch
			--Arrow/Anonymous Functions

### Namespace

Just like with aura components when we want to reference components we must do so by adding a namespace prefix of c.
When we name things in JS we use camel case, but in HTML we use kebob case to reference them.

### Properties / Public Properties

Fields, properties, and attributes are in many cases interchangeable depending on the context within LWC. In some respects you might consider fields/properties as akin to aura attributes.

### LWC Modules

Modules contain the various parts we want to use in order to create our LWC inside our JS.

### Import/Export

Importing other JS code
import {functions} from 'c/file';

### Lifecycle Hooks
		connectedCallback, renderedCallback, disconnectedCallback
			connected callback occurs when  a component is inserted into the DOM.
			rendered callback occurs when the component is rendered.
			disconnected callback occurs when a component is removed from the DOM.
			
			Additionally there is a constructor(), and errorCallback.
### Decorators

API,TRACK,WIRE
		API defines a property or function as public and accessible outside of the component.
		TRACK used to make objects and arrays reactive.
		WIRE allows you to bind data from a salesforce org.

### Lightning Locker

Just as in Aura, the lightning locker provides security to our JS, handling things like xss.

## CSS

Its CSS, go figure.

## Meta XML

https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_configuration_tags
targets are important, determines where a component can be used.

# Lightning Data Service

## `@wire`, LDS wire adapters

We are able to make use of LDS similar to how we can in Aura, bypassing the need to write any back-end code for accessing something simple like creating or viewing a record with standard functionality.

Just like with Aura Components there are different types of LDS forms you can make depending on your use case. Also like with aura components this is a highly efficient way to do so.

## Apex Controller

### `@wire`

In addition to LDS, the @wire decorator also lets you access your apex controllers.
For this we need to import the method we need from apex 
	@salesforce/apex/classname.method
then we can wire a custom apex method.
		
	PROPERTY
		import { identifier } from 'identifier module'
		@wire(identifier, {argument object, if any parameters are needed})
		property;


	FUNCTION
		@wire(identifier, {argument object})
		function({error, data}){
			if(data){
				this.property = data;
			}
		}

# Events

## Up
		Passing information up is handled through events.
		The child has a function that sends a new custom event, the parent component listens for and handles the event.
			new CustomEvent('eventname');
			
			<c-component-that-fired-event oneventname={eventhandler}>
				Note the handler listens for the event name with the on prefix attached. So with a custom event we named bob, we would listen onbob.
				the event handler meanwhile would be in the parent component.

## Down
		Passing information down is achieved through public properties and methods. 
		By leveraging the @api decorator we can mark properties and functions as public.
		Public properties and functions can be used by parent  components

# LMS

## LWC, LAC, Visualforce

It is possible to utilize the lightning message service through not just LWC, but also in Aura and Visualforce. While we are not explicitly going to go over that today you should be aware of that capability. It extends the lifespan of legacy components by letting them interact with the LWC framework.

Beyond that our LMS is like a new and improved version of our application events in Aura. It allows us to communicate across components regardless of where they may be in the overall hierarchy. To do this we need three things:
	1. A Message Channel.
	2. A Publisher Component.
	3. A Subscriber Component.

# JEST Testing
	
## Install Node.js
		https://nodejs.org/en/download/
## Install NPM
		Automatically installed with Node.js 
		
## What is Jest?

You can think of it as like the Apex Testing Framework, but specialized to JavaScript. It isn't the only one, others like Jasmine also exist. However, Jest has a node module for LWC. This allows us to utilize Jest to test our LWC.
		
## Install sfdx-lwc-jest
		sfdx update
		sfdx force:lightning:lwc:test:setup

## Running Tests
		npm run test:unit

This will run all the tests in the directory.
		
You can also automate tests as a part of the package.json.
		
### VSCode

The testing menu in Visual Studio Code will also display any tests you've written and you can run them from there.
		
## Writing A Test
		__tests__ folder
			Contains our test files.
			
		.forceignore
			Should automatically have the test folder added, if not, add: ```**/__tests__/**```
		
		Make the test file.
		
			(Test Suite)
			Describe
				(Cleanup)
				afterEach
			
				(Test Blocks)
				It
					(Asserts)
					Expect
		
		Constructors and Super.
			If you have a constructor you need to use the super keyword at the start.
			
### Testing @wire LDS.
		Mock Data
		
		Promises
	
### Testing @wire apex.
		Basically the same as above, just we need to import the apex class.
		
### Mocking Components
	
		
# JS Debugging

## Org Debug Mode
		Debug Mode in setup, check box next to yourself, check enable.
	
		This will prevent the JS from being minisfied which will make it easier to to troubleshoot.
	
## Developer Tools
		Most browsers will have some form of developer tools that you can utilize.
	
## Breakpoints
		With the tools not only can you finds your console log but you can also work with the source to make changes and add breakpoints to allow you to pause and see the state of things at certain points in time.
	
## Monitoring Execution
		Utilize devb tools to step through the code and see the flow.

# OPEN SOURCE VS PLATFORM
	
Lightning Web Components on the Salesforce platform is a managed version of Lightning Web Components: Open Source. When working off the Salesforce platform, you can download LWC, configure it your way, deploy your application on any hosting environment, and chose when to upgrade. When working on the Salesforce platform, Salesforce manages the configuration, deployment, and upgrade of LWC for all customers.

LWC OSS and LWC on the platform have different release schedules. The LWC engineering team usually releases LWC OSS weekly, whereas the Salesforce platform is released three times a year. Because of this difference, the version of LWC on the Salesforce platform is 3–6 months behind the open-source version of LWC.

The open-source LWC engine is identical to the LWC engine on the Salesforce platform. The difference is how the engine is configured at the compiler level and at run time.

## OSS W/ Data
		Salesforce API's.
		
## OSS to LWC
		Need to add the meta data
		change namespace

# ACCESSIBILITY

## Semantic Markup

	We utilize semantic markup as the core of web accessibility. We want to use the appropriate semantic mark up for the html we are writing. A table is going to have a table of data for instance, and that is itself easy to understand and work with. On the opposite end would be if we created a table of data using a series of divs. Visually it might appear the same, but to visually impaired individuals the differences is drastic.
	
	To this end we want to use semantic markup whenever possible to ensure we are making our pages or applications as accessible as possible.
	
## Aria

	Accessible Rich Internet Applications, or Aria, is an extension of HTML to aid in accessibility. It applies attributes to DOM nodes: Roles, States, and Properties.
	
	These attributes allow us to overcome some of the limitations of using things like divs. we can apply a role to the div to identify what the div's role actually is to those using assistive technologies like screen readers. States meanwhile help identify the state of an aria component. such as if a drop down list is expended, a checkbox is checked, and so on. Properties meanwhile describe key aspects of the object, such as if a select element allows for multiselect or not.
	
	It can be difficult to know what to use where, and hopefully in time you'll grow in your familiarity and use of them, in the meantime though salesforce highly recommends the use of its component and slds blueprints which are built with these subjects in mind.
	
## Accessible Navigation
