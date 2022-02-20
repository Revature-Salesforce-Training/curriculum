# Module - Apex Integration Services

[Longform](<./LFApex Integration Services.md>)

## External Data and Salesforce Connect

Salesforce Connect

* this module is all about integrating Salesforce orgs with external sources
* we've actually already discussed doing this declaratively with Salesforce Connect
* Salesforce Connect lets us create external objects that map to tables in databases residing outside of our org, so our org can work with data stored in multiple databases - all but one of which will be external to our org
* Salesforce Connect allows us to access data in real-time
    * this is great if we have a large amount of data in an outside system that we plan to continue using and don't want to upload it to our org because of storage reasons or just for ease of use

## APIs

[What is an API? In English, please.](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/)

* API stands for Application Programming Interface
* server-side APIs are the part of the server that exposes endpoints to receive requests from a client, parses them, tells the rest of the system what operations to perform, and then returns a response from the server based on the result of those operations
* when we're viewing webpages as end users, the underlying API interaction is abstracted from us, but we're still interacting with an API indirectly
* but many websites offer public APIs that developers can interact with programmatically
    * these APIs don't return markup to be displayed (there's no user interface involved), rather they return data in different formats

<table align="center">
    <tr>
        <th>Type of Webservice</th>
        <th>Data Formats</th>
    </tr>
    <tr>
        <td><mark>REST</mark></td>
        <td><mark>XML, JSON</mark></td>
    </tr>
    <tr>
        <td><mark>SOAP</mark></td>
        <td><mark>XML</mark></td>
    </tr>
</table>

* APIs store resources (i.e. individual data records) using Uniform Resource Identifiers (URIs)
    * we can access URIs at their corresponding Uniform Resource Locators (URLs), which are a part of the URI

## HTTP Methods

* SOAP is built on top of HTTP and many REST services use HTTP as their communication protocol
* three of the five HTTP methods we'll talk about are idempotent
* being <mark>idempotent means that the end result of a set of duplicate requests with the same method to the same URL is independent of the number of duplicate requests made</mark>
    * we CAN get different status codes in responses from idempotent methods (we'll see this shortly)

### <mark>GET</mark>

* <mark>an idempotent method</mark>
* <mark>used to retrieve the resource stored with the target URI</mark>
* because we're only reading data - not changing it - it makes no difference if we make a GET request once or 100 times

### <mark>PUT</mark>

* <mark>either creates a resource at the target URL or updates (read: overwrites) the entirety of the resource at said URL if it already exists</mark>
* any duplicate PUT requests to the same URL after the initial request will overwrite the resource created in the first call
    * because there won't be any dependence on the number of previous requests, <mark>PUT is also idempotent</mark>

### <mark>POST</mark>

* <mark>lets us create a resource at the target URI or update an existing resource</mark>
* but POST requires us to send any update calls to a URL that is different from the one directly corresponding to the resource's URI
* <mark>so POST is not idempotent</mark> because duplicate requests to the same URL will have compounding results
    * the first POST operation will create one resource, the second will create a second resource, etc.

### <mark>PATCH</mark>

* <mark>allows us to update parts of an existing resource, but doesn't overwrite the entire resource</mark>
* when making a PATCH request, we only provide values for the fields that we want to change on the existing resource
* <mark>not idempotent</mark>

### <mark>DELETE</mark>

* <mark>idempotent</mark>
* <mark>the first DELETE call will delete the resource with the specified URI</mark>
* because the resource no longer exists after the first DELETE call, we can make as many duplicate DELETE requests as we want - the outcome of the operation is independent of the number of duplicate requests
    * although subsequent DELETE calls will give different status codes in their responses

## HTTP Status Codes

[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

* when we make a request using an HTTP method, the server will return a status code along with its response
* the status code indicates the outcome of the operation
* it will be a number between `100` and `599`
* we can group status codes into five categories: `1xx`, `2xx`, `3xx`, `4xx`, and `5xx` codes
* each status code has an associated message and meaning

### <mark>1xx HTTP Status Codes</mark>

* <mark>these codes are informational</mark>
* they indicate how the operation that our request invoked is going while it's still being processed
* e.g.

<table align="center">
    <tr>
        <th>Status Code</th>
        <th>Code Message</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td>100</td>
        <td>Continue</td>
        <td>No errors processing the request so far.</td>
    </tr>
</table>

### <mark>2xx HTTP Status Codes</mark>

* <mark>these codes indicate success</mark>

<table align="center">
    <tr>
        <th>Status Code</th>
        <th>Code Message</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td>200</td>
        <td>OK</td>
        <td>The request was successful.</td>
    </tr>
    <tr>
        <td>201</td>
        <td>Created</td>
        <td>The resource was created. A common response from PUT and POST calls.</td>
    </tr>
    <tr>
        <td>204</td>
        <td>No Content</td>
        <td>The request was successful, but the body of the response is empty. A common response from a DELETE call - some services remove the resource and return what they removed in the response body, others simply remove the resource and continue on their way.</td>
    </tr>
</table>

* we'll frequently check for a `200` status code when we want to execute some logic as a result of a successful call

### <mark>3xx HTTP Status Codes</mark>

* <mark>these codes indicate redirects</mark>

<table align="center">
    <tr>
        <th>Status Code</th>
        <th>Code Message</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td>300</td>
        <td>Multiple Choice</td>
        <td>There are multiple possible reponses to our request and we should choose one of them.</td>
    </tr>
    <tr>
        <td>301</td>
        <td>Moved Permanently</td>
        <td>The resource's URL has changed and the new URL for the resource is included in the response body.</td>
    </tr>
    <tr>
        <td>307</td>
        <td>Temporary Redirect</td>
        <td>The URI of the resource has changed temporarily and we should make a request to the URI included in the response body.</td>
    </tr>
</table>

### 4xx HTTP Status Codes

* <mark>client-side errors</mark>

<table align="center">
    <tr>
        <th>Status Code</th>
        <th>Code Message</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td>400</td>
        <td>Bad Request</td>
        <td>Our request had a syntax error.</td>
    </tr>
    <tr>
        <td>401</td>
        <td>Unauthorized</td>
        <td>We must provide credentials to perform the operation we're attempting.</td>
    </tr>
    <tr>
        <td>403</td>
        <td>Forbidden</td>
        <td>We provided credentials when trying our operation, but they didn't give us authorization to proceed.</td>
    </tr>
    <tr>
        <td>404</td>
        <td>Page Not Found</td>
        <td>The request was sent to a nonexistent URL.</td>
</table>

* note that a request sent to a nonexistent URL (which gives a `404` error) is considered an error on the part of the client, not the server
    * you don't blame Google Maps when it can't give you directions to a place that doesn't exist
    * this code is what we'll receive in responses to duplicate DELETE requests - the first request removed the resource, so its corresponding URI no longer exists when we make subsequent requests
        * but DELETE is still idempotent - the response might depend on whether we're making a duplicate call, but the result in the aggregate doesn't

### <mark>5xx HTTP Status Codes</mark>

* <mark>indicate server-side errors</mark>

<table align="center">
    <tr>
        <th>Status Code</th>
        <th>Code Message</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td>500</td>
        <td>Internal Server Error</td>
        <td>The server encountered a situation it didn't know how to handle when processing our request.</td>
    </tr>
    <tr>
        <td>502</td>
        <td>Bad Gateway</td>
        <td>The server made a call to another service to get the information necessary for our request, but that second service gave an invalid response.</td>
    </tr>
</table>

## SOAP Webservices

* SOAP stands for Simple Object Access Protocol
* it's an XML-based communication architecture that allows different platforms and languages to communicate through HTTP requests
* SOAP services explain the ways to interact with them through WSDL (Web Service Description Language), a language based on XML
* WSDL files quickly become verbose, so SOAP can be much less intuitive than REST
    * but as we'll see shortly, Salesforce offers a tool to help with this

### Consuming SOAP Webservices in Salesforce

Consuming

* when we talk about consuming webservices, we mean that we're interacting with an external API and either retrieving or manipulating the data stored on the server that the API gatekeeps

`WSDL2Apex`

* found at `Setup` > `Custom Code` > `Apex Classes`
    * once there, we click `Generate from WSDL`, upload our `WSDL` file, and click `Parse WSDL`
    * then we'll choose the name for the Apex class that Salesforce is going to generate from the WSDL and click `Generate Apex Code`
* this tool creates Apex classes based off of the WSDL we provide
    * we can then call the methods within these classes to interact with the external SOAP service instead of needing to parse the WSDL ourselves

Allowlisting

* before we can make any request to an external site (doesn't matter the kind of service), we need to allowlist it in our org
* to do so, we navigate to `Setup` > `Security` > `Remote Site Settings` and click `New Remote Site`
    * then we'll give the site's URL, give it an alias, and click `Save`
* once this is completed, we'll be able to make an external callout to the service

#### Testing Callouts to SOAP Webservices

[Test Web Service Callouts](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_wsdl2apex_testing.htm)

Mock Classes

* Apex test classes don't let us make callouts to external services
* so when we're testing any Apex that makes a callout, we need to create a response that mocks the one we would get as a result of the actual request
* for SOAP callouts, we do this by making a second test class that implements the `WebServiceMock` interface
* then we'll let the system know which mock we're using with the `Test.setMock()` method
    * this method takes two parameters
    * the first is the type of interface our mock implements (`WebServiceMock.class` when we're testing SOAP callouts)
    * the second is an instance of the class that implements this interface
* mock classes must be `global` or `public` and define the `doInvoke()` method, which has a `void` return type and is also `public` or `global`
* `doInvoke()` takes nine parameters, which are (in order) :

<table align="center">
    <tr>
        <th>doInvoke() Parameter Data Type</th>
        <th>Common Parameter Name</th>
    </tr>
    <tr>
        <td>Object</td>
        <td>stub</td>
    </tr>
    <tr>
        <td>Object</td>
        <td>request</td>
    </tr>
    <tr>
        <td>Map<String, Object></td>
        <td>response</td>
    </tr>
    <tr>
        <td>String</td>
        <td>endpoint</td>
    </tr>
    <tr>
        <td>String</td>
        <td>soapAction</td>
    </tr>
    <tr>
        <td>String</td>
        <td>requestName</td>
    </tr>
    <tr>
        <td>String</td>
        <td>responseNamespace</td>
    </tr>
    <tr>
        <td>String</td>
        <td>responseName</td>
    </tr>
    <tr>
        <td>String</td>
        <td>responseType</td>
    </tr>
</table>

* within our `doInvoke()` method, we must populate the `response_x` key of the `Map<String, Object>` parameter with an instance of the class indicated by the `responseType` parameter
* skeleton for mock class (first block) and test class (second block)

```apex
@isTest
global class SOAPServiceMock implements WebServiceMock {
  global void doInvoke(Object stub, Object request, Map<String,Object> response,
      String endpoint, String soapAction, String requestName,
      String responseNamespace, String responseName, String responseType) {

    AutoGeneratedClass.ResponseTypeResponse_element responseEl =
        new AutoGeneratedClass.ResponseTypeResponse_element();
    responseEl.expectedMemberVar = 'This is an example';
    response.put('response_x', respElement);
  }
}
```

```apex
@isTest
private class SOAPCalloutTest {
  @isTest
  static void testSOAPCallout(){
    Test.setMock(WebServiceMock.class, new SOAPServiceMock());
    // call method that performs callout
    // assert that the response from the mock callout is 'This is an example'
  }
}
```

* in the mock class skelton, we included some placeholders

<table align="center">
    <tr>
        <th>Placeholder</th>
        <th>Replacement</th>
    </tr>
    <tr>
        <td>AutoGeneratedClass</td>
        <td>The class created by WSDL2Apex</td>
    </tr>
    <tr>
        <td>ResponseTypeResponse_element</td>
        <td>The class indicated by the value the system passes to the responseType parameter (which will likely end with Response_element)</td>
    </tr>
    <tr>
        <td>expectedMemberVar</td>
        <td>A member variable from the class corresponding to responseType</td>
    </tr>
</table>

* if we're inserting test data at the beginning of a test method, we must perform the DML operation, then call `Test.startTest()`, `Test.setMock()`, make the mock callout, and call `Test.stopTest()`, in that order

### Exposing Apex Code as a SOAP Webservice

Exposing Code

* when we talk about exposing our code as a webservice, _we_ are the API
    * we're allowing external services to interact with our data through the ways we define

Code Requirements

* <mark>we can expose Apex code as a SOAP webservice as long as the class is `global` and any exposed methods within the class are `static` and use the `webservice` keyword</mark>
* `webservice` is used in place of an access modifier
    * all `webservice` methods must be global so simply including `webservice` also does the job of an access modifier

Generating the WSDL

* we do this by navigating to `Setup` > `Custom Code` > <mark>`Apex Classes` and clicking the `WSDL` link next to our desired class</mark>
    * this link will take us to a webpage holding our WSDL
    * then we can save the webpage as an XML file and give it to anyone that we want to be able to interact with our service
    * then these people can consume the WSDL through an application like SoapUI and start making calls to our code

Considerations

* any exposed method will run in the context of the system by default
* so we should implement Apex security to enforce object, field, and/or record level permissions
* the `webservice` keyword cannot be used on any outer classes or interfaces
* we can expose class member variables with `webservice`, but we don't mark these as `static`
* writing tests for an exposed class isn't different from writing tests for any regular class - we call the class's methods from our test class and follow testing best practices

### The Salesforce SOAP API

* <mark>Salesforce has a standard, out-of-the-box (oob) SOAP API that we can use</mark>
* <mark>it allows us to find duplicate records, execute queries, get information about objects and fields, perform DML operations, and more</mark>
* to use it, we navigate to `Setup` > `Integrations` > `API` and click `Generate Enterprise WSDL` (for us to use) or `Generate Partner WSDL` (for other Salesforce orgs to use)

## RESTful Webservices

REST

* REST stands for Representational State Transfer
* it's a set of guidelines for API architecture that has requirements like implementing a uniform interface across the service and the server being stateless
    * when the server is stateless, each request can operate independently without any context from previous requests stored on the server
    * the server can't store context (like an endpoint) from previous requests, but a stateless server can of course handle adding data to the related database that can then be retrieved by subsequent requests
* generally speaking, interacting with RESTful services is much more straightforward than interacting with SOAP webservices

### Consuming RESTful Webservices in Salesforce

Making the Callout

* of course, we'll have to allowlist any external sites before we can make a callout to them
* the process of writing the code is actually pretty short using the built-in HTTP classes
* skeleton:

```apex
Http http = new Http();
HttpRequest request = new HttpRequest();
request.setEndpoint('insert endpoint here');
request.setMethod('insert method here');
HttpResponse response = http.send(request);

if(response.getStatusCode() == 200) {
    // do something
    // probably includes parsing JSON from the response
}
```

* <mark>we start by instantiating the `Http` and `HttpRequest` classes</mark>
* <mark>then we use the `setEndpoint()` and `setMethod()` methods from the `HttpRequest` object to specify the URL that our request is going to and the HTTP method we're using, respectively</mark>
    * <mark>`HttpRequest` has other setters, including `setBody()` and `setHeader()`</mark>
        * <mark>we'll use these if we want to specify a request body or if we need to authenticate, respectively</mark>
* <mark>once the setup is done, we make the request using the `send()` method from the `Http` class, passing the `HttpRequest` object as a parameter and assigning the response to an instance of the `HttpResponse` class</mark>
* we can then check our response's status and retrieve its body using the `getBody()` method
    * this body will almost always be JSON that we'll have to parse
    * parsing JSON in Apex isn't always intuitive, but we can use the `JSON.deserializeUntyped()` method to convert the JSON to an Apex `Object`
    * still, we'll probably have to perform multiple type conversions
    * the best method is trail-and-error by debugging every step we take to make sure we're on the right track
* callouts (whether to SOAP or REST services) made from Apex are only asynchronous if the class making them implements asynchronous Apex

#### Testing Callouts to RESTful Webservices

[Testing HTTP Callouts](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http_testing.htm)

Mocking

* like we saw before, Apex test classes can't make callouts to external systems
* so we'll have to make a mock response again, which we can do by
    * using a static resource
    * or writing an Apex class that implements the `HttpCalloutMock` interface

Mock Class

* skeleton:

```apex
@isTest
public class ExRESTCalloutMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest request){
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');

        response.setBody('{"this":"acts like a JSON object where we'll put any data we need to work with in our response body"}');

        response.setStatusCode(200);
        return response;
    }
}
```

* we'll then call `Test.setMock()` in our test class, the first parameter will be `HttpCalloutMock.class` this time
    * e.g. `Test.setMock(HttpCalloutMock.class, new ExRESTCalloutMock())`
* when we implement the `HttpCalloutMock` interface, we need to provide a definition for the `respond()` method
    * this method takes a single parameter of type `HttpRequest` and returns an `HttpResponse` object
    * we use the `setHeader()` method to specify our response format (JSON)
    * we create the response body with `setBody()`
        * we want to make sure that we make a key-value pair for every key the code that we're testing expects
    * we set the status code with `setStatusCode()` and finish by returning the response

Static Resource Mock

* to mock using a static resource, we'll upload a JSON file as a resource
* then we'll write something like the following skeleton:

```apex
StaticResourceMock srcMock = new StaticResourceMock();
srcMock.setStaticResource('whateverWeNamedTheResource');
srcMock.setStatusCode(200);
srcMock.setHeader('Content-Type', 'application/json');

Test.setMock(HttpCalloutMock.class, srcMock);
```

* we create an instance of the `StaticResourceMock` class, set the static resource we're using, our response status code, our response format, and invoke `Test.setMock()`
    * note that the first argument to `Test.setMock()` is still `HttpCalloutMock.class`, even though we haven't written a mock class
* just like with SOAP callouts, if we're doing any setup DML within the test method, we need to follow it with `Test.startTest()`, then `Test.setMock()`, a call to the method that makes the callout, and `Test.stopTest()`

### Exposing Apex Code as a RESTful Webservice

[Exposing Apex Classes as REST Web Services](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_rest.htm)

Code Requirements

* <mark>we can expose custom Apex classes as REST APIs so long as the class is `global` and annotated with `@RestResource`</mark>
    * <mark>in parentheses following the annotation, we set the `urlMapping` parameter, passing the relative URL we want our API to live at</mark>
    * this URL is relative to our Salesforce instance, and will follow `/services/apexrest/`, which itself follows our instance URL
* <mark>within the class, we can expose methods by declaring them as `global` and `static`</mark>
    * we'll also annotate them with the corresponding Http method annotation
        * <mark>this can be `@HttpGet`, `@HttpPost`, `@HttpPut`, `@HttpDelete`, or `@HttpPatch`</mark>
        * GET and DELETE methods shouldn't take parameters
        * we can only use each annotation a maximum of one time per class
* our exposed methods will run in system context by default, so we'll need to implement Apex security
* we test exposed code just like we test any other Apex code

### The Salesforce REST API

* <mark>Salesforce also has a standard REST API they provide</mark>
* <mark>we can use it to execute queries, get information about objects and fields, perform DML operations, and more</mark>

## Other OOB Salesforce APIs

[Which API Do I Use?](https://help.salesforce.com/articleView?id=integrate_what_is_api.htm&type=5)

Bulk API

* accepts data in either JSON, XML, or CSV formats
* lets us import or delete large amounts of records asynchronously

Chatter REST API

* lets us synchronously access Chatter feeds/posts and create Chatter posts
* transmits data in XML or JSON

User Interface API

* lets us mimic the Salesforce UI
* communicates synchronously in JSON

Analytics REST API

* lets us synchronously interact with Einstein Analytics through JSON or XML

Tooling API

* we can communicate with this API through a REST or SOAP architecture
* synchronous
* uses JSON or XML data formats
* used to create custom development tools, such as IDEs, for Salesforce
* also lets us access org metadata

Metadata API

* a SOAP-based API that asynchronously communicates through XML
* this is what we use when we deploy and retrieve metadata through the Salesforce CLI or Salesforce Extensions for Visual Studio Code
    * the `package.xml` file is the XML we write to communicate with this API

Streaming API

* communicates through a Bayeux protocol using JSON
* asynchronous
* used to subscribe to notifications about changes to Salesforce records or the execution of custom events
