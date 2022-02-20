# Module - Apex Integration Services

This module reintroduces Salesforce Connect and introduces SOAP and REST API concepts, out-of-the-box Salesforce APIs, and the requirements for exposing Apex code as a SOAP or REST service.

## Table of Contents

* [External Data and Salesforce Content](#external-data-and-salesforce-connect)
* [The API](#the-api)
* [HTTP Methods](#http-methods)
* [HTTP Status Codes](#http-status-codes)
* [SOAP Webservices](#soap-webservices)
  * [Consuming SOAP Webservices in Salesforce](#consuming-soap-webservices-in-salesforce)
    * [Testing Callouts to SOAP Webservices](#testing-callouts-to-soap-webservices)
  * [Exposing Apex Code as a SOAP Webservice](#exposing-apex-code-as-a-soap-webservice)
  * [The Salesforce SOAP API](#the-salesforce-soap-api)
* [RESTful Webservices](#restful-webservices)
  * [Consuming RESTful Webservices in Salesforce](#consuming-restful-webservices-in-salesforce)
    * [Testing Callouts to RESTful Webservices](#testing-callouts-to-restful-webservices)
  * [Exposing Apex Code as a RESTful Webservice](#exposing-apex-code-as-a-restful-webservice)
  * [The Salesforce REST API](#the-salesforce-rest-api)
* [Other OOB Salesforce APIs](#other-oob-salesforce-apis)

### Helpful References/Links

* [Salesforce Connect (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/platform_connect_about.htm)
* [What is an API? In English, please. (freeCodeCamp)](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/)
* [HTTP Methods (REST API Tutorial)](https://restfulapi.net/http-methods/)
* [To PUT or POST? (Stormpath)](https://stormpath.com/blog/put-or-post)
* [PATCH (MDN web docs)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)
* [HTTP response status codes (MDN web docs)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
* [What is SOAP? (tutorialspoint)](https://www.tutorialspoint.com/soap/what_is_soap.htm)
* [Working with WSDLs (SoapUI)](https://www.soapui.org/soap-and-wsdl/working-with-wsdls/)
* [Adding Remote Site Settings (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_remote_site_settings.htm)
* [SOAP Services: Defining a Class from a WSDL Document (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_wsdl2apex.htm)
* [Test Web Service Callouts (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_wsdl2apex_testing.htm)
* [Test Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_test.htm)
* [WebServiceMock Interface (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_interface_webservicemock.htm#apex_interface_webservicemock)
* [Exposing Apex Methods as SOAP Web Services (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_web_services.htm)
* [Introducing SOAP API (SOAP API Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_quickstart_intro.htm)
* [What is REST (REST API Tutorial)](https://restfulapi.net/)
* [HTTP Classes (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http.htm)
* [JSON Class (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_class_System_Json.htm)
* [Testing HTTP Callouts (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http_testing.htm)
* [Exposing Apex Classes as REST Web Services (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_rest.htm)
* [RestResource Annotation (Apex Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_rest_resource.htm)
* [Introducing Lightning Platform REST API (REST API Developer Guide)](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm)
* [Which API Do I Use? (Salesforce Help)](https://help.salesforce.com/articleView?id=integrate_what_is_api.htm&type=5)
* [Integration and APIs (Developer Center, Salesforce Developers)](https://developer.salesforce.com/developer-centers/integration-apis/)
* [Chatter REST API Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/intro_what_is_chatter_connect.htm)

## External Data and Salesforce Connect

This module is all about integrating Salesforce orgs with external sources, whether we are retrieving data from other systems or exposing methods with which other systems can interact. We will begin with a brief discussion of Salesforce Connect.

Salesforce Connect is a feature that lets us create external objects that map to tables in databases residing outside of our org, therefore meaning that our org can work with data stored in multiple databases. Salesforce Connect is valuable because it allows us to access our data in real-time - each time we look at records of an external object, the latest data is retrieved from the outside database. This is great if we have a large amount of data in an outside system that we plan to continue using and don't want to upload it to our org because of storage reasons or just for ease of use. Keep in mind though, that this feature is best used if you only need to access small amounts of data at any given time.

Because we are primarily focused on programmatic integration here, we will not discuss Salesforce Connect further. For more information on the feature and how to integrate it with other Salesforce products such as Heroku, see the `External Applications` module.

## The API

Throughout the rest of this module, we'll be discussing APIs. We've seen the acronym API before, particularly when talking about the API name of a field or object, but we haven't yet defined the term, so let's do so now. An Application Programming Interface, or API is the part of a server that gets requests from a client, parses them, tells the rest of the system what operations to perform, and then returns a response from the server based on the result of those operations. When we are viewing a webpage as an end user, the underlying API interaction is abstracted from us, but it is still there - we _are_ interacting with an API, just indirectly.

However, many websites offer APIs that external users can interact with programmatically. The APIs that we indirectly interact with when viewing a webpage return HTML to allow our browser to render the page, but the APIs that we programmatically interact with are not returning markup to be displayed, so they receive and transmit data in a different format. For example, RESTful services, a type of API architecture, accept request bodies in either XML or JSON and return response bodies in either of the same formats. SOAP webservices, another type of API, only accept request bodies and return response bodies in XML. These APIs store resources, i.e. individual records of data, using Uniform Resource Identifiers (URIs), which can be accessed at the corresponding Uniform Resource Locator (URL, a subset of the URI).

We'll talk about both SOAP and REST webservices, giving an overview of each type and detailing how to consume said type in Salesforce, how to expose our Apex code as that type of webservice, and finally the corresponding Salesforce out-of-the-box (oob) API. But first, let's explore HTTP methods and status codes.

## HTTP Methods

SOAP is built on top of HTTP and many REST services use HTTP as their communication protocol, so an HTTP discussion is a relevant and important conversation to have. Three of the five HTTP methods we'll detail here are idempotent, meaning that the end result of a set of duplicate requests with the same method to the same URL is independent of the number of duplicate requests. `GET` is one of these idempotent methods and is used to retrieve the resource stored with the target URI. Because we are only reading data and not changing anything stored on the server hosting the API, it makes no difference if we perform a `GET` operation once or 100 times, hence the method's idempotency.

The `PUT` operation will either create a resource at the target URL or update (read "overwrite") the entirety of the resource at said URL if it already exists. Any duplicate `PUT` requests to the same URL after the initial request will update the resource created in the first call, but any changes to the data stored there have no dependence on the number of previous duplicate requests, so that number does not matter and this method, too, is idempotent.

The `POST` method gives the same functionality as does `PUT`, letting us create a resource at the target URL or update an existing entity. However, unlike `PUT`, `POST` requires that we send any update calls to a URL that is not the one that directly corresponds to the resource's URI, meaning that the method is not idempotent because duplicate requests to the same URL will have compounding results: the first `POST` operation will create one resource, the second will create a second resource, and so on.

`PATCH` is an operation that allows us to update some parts of an existing resource, but does not overwrite the entire entity. When making a `PATCH` request, we only provide values for the fields on the resource that we wish to change. But consider a field whose value increments each time another field is updated: because the resource is not entirely overwritten, this field's value will depend on the number of duplicate requests made, regardless of whether it is specified in the call. Therefore, the end result is not independent of the number of requests, which means that `PATCH` is not idempotent.

The last method we will talk about is `DELETE`, which is idempotent: the first call with this operation will delete the resource with the specified URI and because that entity will no longer exist after the first call, we can make as many duplicate requests as we wish without changing the outcome.

## HTTP Status Codes

When we make a request using one of the methods we detailed in the previous section, the server will return a status code along with its response, indicating the outcome of the operation. The status code will be a number between `100` and `599`, which we can broadly group into one of five categories: `1xx`, `2xx`, `3xx`, `4xx`, and `5xx` codes. Let's discuss each of these categories as well as listing some specific examples in each.

`1xx` statuses are informational - they indicate how the operation invoked by our request is proceeding while it is still being processed. For example, the `100` code means `Continue`, i.e. that there have been no errors in processing the request to that point.

`2xx` codes signify success; take the `200` status, which means `OK` - that the request was successful. We will frequently check for this status when coding, as we'll want to perform certain logic in light of a successful call, such as parsing the returned data from any successful `GET` operation. `201` corresponds to `Created` and is a common response to most successful `POST` requests and some error-free `PUT` calls. `204` indicates `No Content` - the request was successful but the response body is empty. Depending on the service implementation, we may see this code when performing `DELETE` operations - some services will remove the entity and return the removed entity in the response body, while others will simply delete it and return no response body.

Next are `3xx` codes, which indicate redirects. An example `3xx` status is `300`, meaning `Multiple Choice`, i.e. that there are multiple possible responses to our request and we should choose one of them. `301` indicates `Moved Permanently` - that the resource's URL has been changed and the new URL for said resource is included in the body of the response. `307` is `Temporary Redirect`, meaning that the URI of the requested entity has changed temporarily and that we should use the same method as in our first request, just directed to the URI returned in the response to our first request instead of the one to which we sent that original request.

`4xx` statuses signify client-side errors. For instance, `400` means `Bad Request`, implying that our request had a syntax error. The messages associated with the `401` and `403` codes appear to be synonyms at first glance, but in actuality they have different meanings - `401` means `Unauthorized`, i.e. that we must provide credentials to perform the specified operation at that URL. `403`, on the other hand, is `Forbidden`, indicating that we have provided credentials but they do not give us permission to perform the requested operation. Let's make the distinction clear - we receive a `401` when we _have not_ authenticated, we receive a `403` when we _have_ authenticated and the provided credentials do not grant access.

The `404` code is a frequently-encountered friend that means `Page Not Found`. But be sure to take note that a request sent to a nonexistent URL is considered an error on the part of the client, not the server. Think of it like asking Google Maps for directions to a made-up address - it's not service's fault that it doesn't know how to get to a place that doesn't exist. This code is also what we will receive with a duplicate `DELETE` call, the system has already deleted the resource after the first call, so it no longer exists at the specifed endpoint. However, `DELETE` is still idempotent - although the response is different, the result is the same.

Finally, `5xx` codes relate to server side errors. In particular, the `500` code means an `Internal Server Error`, indicating that the server has encountered a situation that it does not know how to handle when processing the call. Lastly, `502` means `Bad Gateway`, i.e. that the server made a call to another service to get the information necessary for the response to the original request from the client, but got an invalid response from that second service.

## SOAP Webservices

Simple Object Access Protocol, i.e. SOAP, is an XML-based communication architecture that allows different platforms and languages to communicate through HTTP requests. SOAP services explain how to interact with them through WSDL, or Web Service Description Language, a language based on XML. WSDL files can quickly become verbose and therefore difficult to read, so SOAP can be much less intuitive than REST despite the fact that it is only a couple of years older. But as we will see shortly, Salesforce offers a tool that allows us to ease some of the pain of interacting with SOAP-based APIs.

### Consuming SOAP Webservices in Salesforce

Before we move further, let's differentiate between consuming a webservice and exposing your code as a webservice. When we consume webservices, we are interacting with an external API and either retrieving or manipulating the data stored on the server(s) for which said API acts as a gatekeeper. When we expose are code, we _are_ the API - we are allowing external services to interact with our data through the ways that we define. With that distinction in mind, let's discuss how we consume SOAP-based APIs in Salesforce.

As we said in the previous section, the WSDL files that define interaction with a SOAP API can quickly become large and difficult to comprehend. Fortunately, Salesforce offers a tool that automatically generates an Apex class from a WSDL file: `WSDL2Apex`. To access this feature, simply navigate to `Setup` > `Custom Code` > `Apex Classes` and click the `Generate from WSDL` button. At this point, you will be prompted to choose the desired WSDL file from your computer and select `Parse WSDL`. On the following screen, you will choose Apex class name(s) for the WSDL namespace(s) contained in the uploaded file and finally click `Generate Apex Code` to create the classes.

But to make any request to an external site, we must first allowlist it in our org. To do so, navigate to `Setup` > `Security` > `Remote Site Settings`, click `New Remote Site`, provide the site URL and an alias, and click `Save`. After this step is completed, you can instantiate the generated classes, set any necessary instance variables, and call the appropriate methods to interact with the SOAP webservice.

#### Testing Callouts to SOAP Webservices

Apex test classes do not allow callouts to external services, so to test any Apex code that makes a callout, we must create a response that mocks the one we would receive as a result of the request being delivered to the actual endpoint. For SOAP callouts, we do so by creating a second test class that implements the `WebServiceMock` interface. We will let the system know to direct any callouts made in our test methods to the appropriate class for a fake response by using the `Test.setMock()` method, which takes two parameters. The first of these parameters is the type of interface we are implementing in the mocking class - this is `WebServiceMock.class` when we are testing SOAP callouts. The second parameter is an instance of our implementing class.

Our implementing class must be `global` or `public` (or else the system won't be able to see it) and must define the `doInvoke()` method, which has a `void` return type and is also `public` or `global` (or else the system won't be able to call it). `doInvoke()` takes nine parameters, but because the system calls our method, we don't have to worry about populating any values for them. However, we still must declare all nine and their types, so we will take the opportunity to offer a brief description of what each parameter is.

The first parameter is of type `Object`; it's commonly named `stub` and is an instance of the class generated by the `WSDL2Apex` tool. The second parameter is another `Object` that is commonly referred to as either `soapRequest` or `request`, holding the SOAP request being made. Third is the `response` or `responseMap` parameter of type `Map<String,Object>`, containing the key-value pairs that represent an imitation of the data we expect to receive from the actual service.

The final six parameters are all instances of the `String` data type. First in this group is `endpoint` parameter, which contains the URL to which the request is sent. Next is `soapAction`, indicating the operation that we are trying to perform. After that is `requestName`, holding the name of the desired operation. The seventh parameter signifies the response's namespace and is commonly named either `responseNamespace` or `responseNS`. Following that is the WSDL-defined response element name, held in the `responseName` parameter. Lastly, we have the `responseType` parameter, which indicates the class in the `WSDL2Apex`-generated code that is instantiated in the response.

Within our `doInvoke()` method, we must populate the `response_x` key of the `response`/`responseMap` parameter with an instance of the class indicated by `responseType`. Before adding this instance to the map, we should set any member variables that the code we are testing accesses/depends on.

In the test method, we must call `Test.setMock()` before we make the call to the method that we are testing (i.e. the one that makes the actual callout). Let's see a skeleton of this altogether, starting with the class implementing the mock interface:

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

And the corresponding test class:

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

Testing callouts can be tricky, so let's walk through the above code, being very careful to point out which parts of the code are required syntax and which will change with each implementation. We've already discussed the parameters of the `doInvoke()` method, so we'll start with the code inside of that method. `AutoGeneratedClass` is a placeholder - it should be replaced by the appropriate class created by the `WSDL2Apex` tool. Similarly, `ResponseTypeResponse_element` is also a placeholder that should be replaced by the class indicated by the value the system passes to the `responseType` parameter, but the actual class will likely end in `Response_element`. `expectedMemberVar` is another placeholder - we should consult the class indicated by `responseType` to find the proper replacement(s) for it. Lastly, `response_x` will commonly be the name of the key that we must add to our response map.

When we call the method that performs the callout, the system will direct the call to our mock response test class, rather than the actual webservice. If we are inserting test data at the beginning of a test method (i.e. not with an `@testSetup` method), we must first perform the DML operations, then call `Test.startTest()`, `Test.setMock()`, and the method making the callout, in that order.

### Exposing Apex Code as a SOAP Webservice

In addition to consuming SOAP-based APIs, we also have the ability to expose our Apex code as a SOAP webservice. Any exposed class must be `global` and any exposed methods within that class must be `static` and prepended with the `webservice` keyword. The keyword replaces the access modifier in the method declaration - all `webservice` methods must be `global` so the keyword serves as an indication of the method's scope by itself.

Once we have finished writing our exposed class, we navigate to the `Apex Classes` page at `Setup` > `Custom Code` > `Apex Classes`, find the class in the table, and click the `WSDL` link in the first column, which will take us to a webpage holding the WSDL file necessary to interact with our code. Simply right-click and save the page as an XML file, and you can then distribute it to any parties you wish to provide the service to, at which point they can consume the WSDL through an application such as SoapUI and begin making calls to the code.

Note that any exposed method will run in the context of the system by default. Therefore, we must implement Apex security using the tools discussed in the `Apex Security & Sharing` module to enforce object, field, or record level permissions. Additionally, there are restrictions on the use of the `webservice` keyword: it cannot be used on any outer classes, inner class methods, interfaces, or methods/variables within interfaces. We can expose class member variables with the keyword, but we do not declare them to be `static`. Finally, we cannot return maps from any exposed method.

The process of writing tests for Apex code exposed as a SOAP webservice is no different from testing any other Apex code: simply call the methods from the test class and implement testing best practices - there is nothing special that needs to be done to make sure the class is exposed correctly and there is no way to act as if we are accessing the service externally from within our test class.

### The Salesforce SOAP API

Even though we have the option to make our own SOAP service, we can use the oob SOAP API provided by Salesforce for a variety of functions such as finding duplicate records, executing queries, getting description information about objects and fields, emptying our org's recycle bin, or performing DML operations such as creating, deleting, merging, upserting, updating, and undeleting records. This API is available in both production orgs and Developer Editions, but not in Trailhead playgrounds. To use the service, navigate to `Setup` > `Integrations` > `API` and choose `Generate Enterprise WSDL` if you are developing for your company (as one might in a production org) or `Generate Partner WSDL` if you are developing for others from a Developer Edition and plan to provide your product to users who are not a part of your company.

## RESTful Webservices

Representational State Transfer, i.e. REST, is a set of guidelines for API architecture that includes such requirements as a uniform interface across the service and the service being stateless, meaning that each request can operate independently without any context from previous requests stored on the server. Note that the service cannot store context from a previous request (such as the endpoint of a previous request), but of course can store data added to a record as a result of a previous call. As we will soon see, interacting with RESTful services is much more straightforward than interacting with SOAP webservices.

### Consuming RESTful Webservices in Salesforce

Before we can make any callouts to external sites, we must allowlist said sites for our org just as we did in the `Consuming SOAP Webservices in Salesforce` section. Once we have done so, the process of writing code to make the request is actually quite short using the built-in HTTP classes. Let's look at an example and then break it down (note that we are assuming that the endpoint has already been added in `Remote Site Settings`):

```apex
public class ExRESTCallout {
    public static String makeCallout(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.balldontlie.io/api/v1/games/38');
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if(response.getStatusCode() == 200){
            Map<String,Object> respMap = (Map<String,Object>)
                JSON.deserializeUntyped(response.getBody());
            Map<String,Object> homeTeamMap = (Map<String,Object>)
                respMap.get('home_team');
            Map<String,Object> awayTeamMap = (Map<String,Object>)
                respMap.get('visitor_team');

            Date gameDate = Date.valueOf(String.valueOf(respMap.get('date')));
            String homeTeamName = String.valueOf(homeTeamMap.get('full_name'));
            String awayTeamName = String.valueOf(awayTeamMap.get('full_name'));
            Integer homeTeamScore =
                Integer.valueOf(respMap.get('home_team_score'));
            Integer awayTeamScore =
                Integer.valueOf(respMap.get('visitor_team_score'));
            String winningTeam, losingTeam;
            Integer winningScore, losingScore;

            if(homeTeamScore > awayTeamScore){
                winningTeam = homeTeamName;
                losingTeam = awayTeamName;
                winningScore = homeTeamScore;
                losingScore = awayTeamScore;
            }
            else{
                winningTeam = awayTeamName;
                losingTeam = homeTeamName;
                winningScore = awayTeamScore;
                losingScore = homeTeamScore;
            }
            String gameInfo = 'On ' + gameDate.month() + '/' + gameDate.day() +
                '/' + gameDate.year() + ', the ' + winningTeam +
                ' beat the ' + losingTeam + ' by a score of ' + winningScore +
                ' to ' + losingScore + ' in ' +
                String.valueOf(homeTeamMap.get('city')) + '.';
            return gameInfo;
        }
        return null;
    }
}
```

First, we instantiate an object of the `Http` class and an object of the `HttpRequest` class. Next, we use the `setEndpoint()` and `setMethod()` methods of the `HttpRequest` object to specify the URL to which we are sending the request and the HTTP method we are using, respectively. Note that we can take both of these values as parameters in our method, even though we do not do this in the above code. The `HttpRequest` class offers other useful setters to be used if we are invoking an operation that requires a request body (`setBody()`) or the service we are calling requires authentication (`setHeader()`). Once we have finished the setup, we send the request using the `send()` method of the `Http` class, passing our `HttpRequest` object as an argument to the method and assigning the returned value to an instance of the `HttpResponse` class.

When we receive a response, the system will continue executing our code, at which point we check the status to make sure the request was successful and retrieve the body of the response through the `getBody()` method of the `HttpResponse` class. In the remainder of the code, we parse the JSON returned in the body. The process of parsing JSON in Apex is not always intuitive, but the `JSON` class offers a useful method (`JSON.deserializeUntyped()`, which returns an Apex `Object`) to assist us. Still, we will likely have to perform multiple type conversions (as we do in the above code) to retrieve all the desired data from the JSON. Your author's favorite method of parsing is trial-and-error: debug every step you take in the process to make sure you're on the right track. In the end, the above method will return the string "On 10/21/2018, the Denver Nuggets beat the Golden State Warriors by a score of 100 to 98 in Denver."

#### Testing Callouts to RESTful Webservices

As we saw in the `Testing Callouts to SOAP Webservices` section, Salesforce does not allow test classes to make callouts to external systems. As such, we must provide a mock response for the system to return when we test Apex code that makes a callout to a REST API. There are two ways to create this fake response: writing an Apex class that implements the `HttpCalloutMock` interface and using a static resource. Let's show an example of both, beginning with the interface:

```apex
@isTest
public class ExRESTCalloutMock implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest request){
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');

        response.setBody('{"date":"2004-11-19","home_team":' +
            '{"city":"Detroit","full_name":"Detroit' +
            'Pistons"},"home_team_score":"82",' +
            '"visitor_team":{"full_name":' +
            '"Indiana Pacers"},"visitor_team_score":"97"}');

        response.setStatusCode(200);
        return response;
    }
}
```

And the associated test class/method:

```apex
@isTest
private class ExRESTCalloutTest {
  @isTest
    static void testInterfaceMock(){
        Test.setMock(HttpCalloutMock.class, new ExRESTCalloutMock());
        String testInfo = ExRESTCallout.makeCallout();
        System.assertEquals('On 11/19/2004, the Indiana Pacers beat the ' + 
            'Detroit Pistons by a score of 97 to 82 in Detroit.', testInfo);
    }
}
```

When we implement the `HttpCalloutMock` interface, we must provide a definition for the `respond()` method, which takes a single parameter of type `HttpRequest` and returns an `HttpResponse` object, which we instantiate within the method. Because our Apex code is expecting a response in JSON, we use the `setHeader()` method of the `HttpResponse` class to specify the format of our response. Next, we create the response body with the assistance of the class method `setBody()`. Because our response is JSON, every key and non-object value must be a string; and because the method takes a string parameter and Apex strings are enclosed by single quotes, we use double quotes within the body. Additionally, we make sure to provide a value for every key that the method we are testing accesses. Lastly, we set the response's status code and return the object.

In the test method, we make sure to call the `Test.setMock()` method before calling the method we are testing (i.e. the one that makes the request to the webservice), passing `HttpCalloutMock.class` as the first argument and an instance of the class where we implement the `HttpCalloutMock` interface as the second argument.

Let's demonstrate the same process using a static resource. First, we upload a JSON file as a static resource named `staticresourcemock` with the following content:

```json
{
    "date":"2004-11-19",
    "home_team":{"city":"Detroit","full_name":"Detroit Pistons"},
    "home_team_score":"82",
    "visitor_team":{"full_name":"Indiana Pacers"},
    "visitor_team_score":"97"
}
```

Next, we write the following test class:

```apex
@isTest
private class ExRESTCalloutTest {
    @isTest
    static void testStaticResourceMock(){
        StaticResourceCalloutMock srcMock = new StaticResourceCalloutMock();
        srcMock.setStaticResource('staticresourcemock');
        srcMock.setStatusCode(200);
        srcMock.setHeader('Content-Type', 'application/json');

        Test.setMock(HttpCalloutMock.class, srcMock);
        String testInfo = ExRESTCallout.makeCallout();
        System.assertEquals('On 11/19/2004, the Indiana Pacers beat the ' +
            'Detroit Pistons by a score of 97 to 82 in Detroit.', testInfo);
    }
}
```

In the above code, we begin by creating a new instance of the `StaticResourceCalloutMock` class. Then, we pass the name of the static resource to the object's `setStaticResource()` method, the status code that the method we're testing expects to the object's `setStatusCode()` method, and the response format (because our method is expecting JSON) to its `setHeader()` method. The rest of the test method is the same as that using a class that implements the `HttpCalloutMock` interface, just with the instance of the `StaticResourceCalloutMock` class as the second argument passed to the `Test.setMock()` method instead of an instance of the `HttpCalloutMock` class (note, however, that the first argument remains the same).

Just because the above tests are successful and fulfill the 75% code coverage requirement, it does not necessarily mean that they are sufficient. In fact, these tests are not sufficient because they do not implement all appropriate testing best practices (i.e. they do not test for negative behavior).

Lastly, as when testing SOAP callouts, if we are performing any setup DML within the test method itself, we must follow it with the `Test.startTest()` method before calling `Test.setMock()` and the method that makes the callout.

### Exposing Apex Code as a RESTful Webservice

Just as we can expose code as a SOAP webservice, Salesforce also allows us to expose custom Apex as a REST API. To do so, we must annotate a `global` class with the `@RestResource` annotation. Within parentheses following this annotation, we set the `urlMapping` parameter to the desired relative URL.

This URL is relative to our Salesforce instance, so we'll append `/services/apexrest/` to our instance URL and follow that with our mapped relative value. For example, `urlMapping=/Contact/*` can be hit by specifying our instance URL, then adding `/services/apexrest/Contact` after the `.com` in the instance URL.

Within our class, we can expose methods by declaring them `global` and `static` and annotating them with the appropriate HTTP method annotation. The available annotations are `@HttpGet`, `@HttpPost`, `@HttpPut`, `@HttpDelete`, and `@HttpPatch` and we can use each of them at most once within the class. Note that `@HttpGet` and `@HttpDelete` methods should not take parameters.

As with exposing code as a SOAP webservice, our methods will run in system context by default so we must manually enforce object, field, and record level security. Again, we write test coverage for any exposed code just as we would for any other Apex code.

### The Salesforce REST API

We do not necessarily have to expose our own custom code to provide a RESTful service that allows for interaction with our org because Salesforce provides an oob REST API. This service includes functionality to execute queries, get information about objects and fields, and perform DML operations on records. Reflective of the difference in ease of use between SOAP and REST in general, consuming this API is much simpler than consuming the oob SOAP API.

## Other OOB Salesforce APIs

Let's finish this module by quickly describing some of the other APIs Salesforce offers oob. First, a set of REST-based APIs: the Bulk, Chatter REST, User Interface, and Analytics REST APIs. Bulk API accepts data in either JSON, XML, or CSV and lets us import or delete large amounts of records asynchronously. When we use Data Loader, we can use this API under the hood.

To synchronously access chatter feeds and posts or create Chatter posts, we use the Chatter REST API, which transmits data in either JSON or XML. We can mimick the Salesforce UI through the User Interface API, which communicates synchronously in JSON. Lastly, the Analytics REST API allows us to synchronously interact with Einstein Analytics through JSON or XML.

The Tooling API can be REST-based, but we can also communicate with it using the SOAP architecture; it transmits synchronously in JSON or XML and is designed to help us create custom development tools, such as IDEs, for Salesforce platform applications. This API also allows us access to org metadata to move it when integrating our org with third-party systems.

If we are migrating custom metadata between Salesforce orgs or modifying the metadata in an org, we should use the Metadata API, a SOAP-based API that asynchronously communicates through XML. We've actually seen the Metadata API in action before, we just didn't identify it at the time: recall our discussion of deploying and retrieving org metadata in the `SFDX & Visual Studio Code` module - when we are using the corresponding commands, we are utilizing this API under the hood. The `package.xml` file is the XML we specify to communicate with this API. Alternatively, if we don't use the file and specify the code to use in our deployment and retrieval commands, the process of constructing the XML is entirely abstracted from us.

Finally, we have the Streaming API, which is the only oob API that is not based on REST or SOAP; rather, it's based on the Bayeux protocol. We use this service to subscribe to notifications about changes to Salesforce records or the execution of custom events transmitted by way of asynchronous JSON.
