# Module - Introduction to Salesforce

This module introduces Salesforce, the Force.com platform, Sales, Service, and Marketing Clouds, AppExchange, and helpful resources such as Trailhead, the Trailblazer Community, and the Salesforce  Developer Resources.

## Table of Contents

* [Introduction to Salesforce](#introduction-to-salesforce)
  * [PAAS vs. SAAS](#paas-vs.-saas)
  * [Cloud Computing](#cloud-computing)
  * [Multi-Tenant Environments in Salesforce](#multi-tenant-environments-in-salesforce)
* [Sales Cloud](#sales-cloud)
* [Service Cloud](#service-cloud)
* [Marketing Cloud](#marketing-cloud)
* [AppExchange](#appexchange)
* [Resources](#resources)
  * [Trailhead](#trailhead)
  * [Trailblazer Community](#trailblazer-community)
  * [Developer Resources](#developer-resources)

### Helpful References/Links

* [Trailhead](https://trailhead.salesforce.com/)
* [Trailblazer Community](https://success.salesforce.com)
* [Salesforce Developer Resources](https://developer.salesforce.com/)
* [Create a Free Developer Edition Org](https://developer.salesforce.com/signup)
* [Glossary (Salesforce Help)](https://help.salesforce.com/articleView?id=glossary.htm&type=0)
* [Salesforce Glossary - An unofficial list of Salesforce terms and acronyms (Daniel Ballinger's FishOfPrey.com)](https://www.fishofprey.com/2021/02/salesforce-glossary-unofficial-list-of.html)

## Introduction to Salesforce

Founded by Marc Benioff in 1999, Salesforce is the fourth largest software firm in the world. Over 150,000 companies use Salesforce and 85% of Fortune 100 companies use at least one AppExchange app. Salesforce was the first company to host a CRM platform (the company's primary product) in the cloud. A CRM (Customer Relationship Management) platform is a technology that allows companies to manage their interactions with customers and potential customers, relationships with those customers, and store data about their products, among many other uses.

### PAAS vs. SAAS

Salesforce provides both PAAS (Platform as a Service) and SAAS (Software as a Service) functionality. In SAAS, the application is hosted as a service and provided to customers through the internet; the vendor (in our case Salesforce) maintains and supports the application and the customer's data. With an SAAS, customers don't need to worry about installing, configuring, or maintaining the application on their own hardware.

In PAAS, the vendor (again, Salesforce in our case) gives an API (application programming interface) to allow its customers to create applications that extend and build off of the PAAS's infrastructure and codebase. Just as with SAAS, the PAAS vendor hosts the software and hardware on their own infrastructure - the difference between the two is that the customer (not the vendor) is the one creating and maintaining the application in PAAS.

So how do these concepts apply to Salesforce? Well, the out-of-the-box (OOB) Salesforce org (a customer's individual version of Salesforce) and all of its standard objects, standard report types, and other OOB features are an SAAS. The customer (us) doesn't worry about updating and maintaining these standard features - Salesforce does that for us. On the other hand, the Force.com platform is a PAAS, the framework that allows for declarative and programmatic customization in our Salesforce orgs.

Salesforce releases updates three times a year. Because the code running our declarative customizations is abstracted from us (i.e. when making point-and-click customizations, the platform is creating the underlying code, not us), support for declarative customizations is maintained across releases. However, when we make programmatic customizations, the underlying framework may change in releases in a way that drops support for our code. Still, the ability for programmatic customization is a major advantage of Salesforce compared to other CRMs.

We will make these programmatic customizations through the Visualforce and Lightning Aura Component frameworks. We will delve into these in the coming weeks, but they both follow XML formatting and also interact with Apex, Salesforce's proprietary Java-like language.

### Cloud Computing

As we saw in the previous sections, Salesforce (both the SAAS and PAAS aspects) are hosted in the cloud. There are numerous benefits to cloud computing such as adaptability, the multitenant environment, reliability, scalability, and security. Let's dive into each one of these in a little more detail.

Cloud computing allows for adaptable and customizable programming and applications while allowing customers to maintain control over the code they wrote to create those programs and applications. The multitenant environment abstracts the underlying infrastructure from us, so that each customer doesn't have to maintain their own infrastructure. These platforms are also reliable third-parties because their focus and success as a business rests solely on supporting and providing their services. Because of this, platforms are incentivized to provide a robust and easily accessible customer support system. Cloud computing allows for quick and easy scaling of applications. Without cloud computing, if a customer needed more resources, they would have to buy, configure, and maintain more of their own servers; with cloud computing, customers can just pay the platform for access to additional resources. Finally, cloud platforms offer increased security because they have more infrastructure resources and security expertise than the average customer.

### Multi-Tenant Environments in Salesforce

All of the benefits of cloud computing that we discussed in the previous section apply to Salesforce, but we must be especially aware of multitenacy. In order to function properly, a cloud platform must share resources cost-efficiently and securely. Salesforce accomplishes this by enforcing Governor Limits that ensure that one organization's processes and database interactions don't monopolize shared resources in the multitenant environment.

We'll revisit governor limits when we begin talking about Apex, but a quick preview of the governor limits we'll commonly have to consider: Salesforce limits each transaction to 100 synchronous or 200 asynchronous SOQL queries, 20 SOSL searches, and 150 DML operations.

## Sales Cloud

Sales Cloud is the sales app made by Salesforce and available for purchase and use within Salesforce orgs. This app contains the Lead, Account, Contact, Contract, Opportunity, Product, Pricebook, Quote, and Campaign standard objects. Features include Web-to-Lead support, Lead Assignment Rules, Lead Auto-Response Rules, Reports and Dashboards, Sales Processes, etc. Sales Cloud is a standard feature in all Developer Edition and Trailhead Playground orgs.

## Service Cloud

Service Cloud is the customer service app made by Salesforce and available for purchase and use within Salesforce orgs. This app contains the Account, Contact, Case, and Solution standard objects. Features include Web-to-Case, Email-to-Case, Case Assignment Rules, Case Auto-Response Rules, Support Processes, Salesforce Knowledge, etc. The app is Salesforce's solution to allow us to support our customers and maintain healthy relationships with them. Service Cloud is a standard feature in all Developer Edition and Trailhead Playground orgs.

## Marketing Cloud

Marketing Cloud is the marketing app made by Salesforce and available for purchase. Standard features allow us to create marketing materials and analyze data from our marketing campaigns. Marketing Cloud is not included in Trailhead Playgrounds or Developer Edition orgs.

## AppExchange

AppExchange is the official Salesforce app marketplace; it contains prebuilt solutions, developed by Salesforce, Salesforce partners, and Salesforce consultants, to add to and extend the functionality of Salesforce and its apps. AppExchange includes apps, Lightning Components, Lightning Bolt solutions for Communities, and Lightning Data. Solutions can be either free or paid through one-time or subscription-based payment models. As we'll discuss throughout training, this cost, along with a Salesforce customer's programmatic expertise and available time, is a factor that we must be mindful of when deciding whether an AppExchange product is the appropriate bridge between Salesforce's OOB functionality and our business needs.

## Resources

With all of the OOB features and jargon, Salesforce can certainly be overwhelming at first! But rest assured, there are many robust resources available to answer any questions you may have.

### Trailhead

Trailhead is a vast knowledge base for learning the features and concepts of Salesforce. Trailhead contains badges, superbadges, projects, and information on earning and maintaining Salesforce credentials. Badges are learning modules that test your knowledge at the end of each unit through a multiple-choice quiz or a challenge where you apply the concepts you just learned to your own Developer Edition or Trailhead Playground (a special type of Developer Edition designed specifically for learning through Trailhead). Projects give step-by-step instructions that you implement in your own Playground to reinforce what you've learned. Superbadges are (short of the certification exams themselves) the ultimate test of your Salesforce knowledge - after you've completed the badges required to unlock a superbadge, you will be given a list of business requirements to implement in a Playground. You'll have to use your Salesforce knowledge to determine which OOB feature, declarative customization, or programmatic customization you should use. When you complete a badge (also known as a module), project, or superbadge, you'll earn points and badges, progressing through the Trailblazer ranks on your journey from Scout to Ranger. Create a [Trailhead account](https://trailhead.salesforce.com/home) - it's free! Plus Trailhead is fun - at least in my opinion!

### Trailblazer Community

The [Trailblazer Community](https://trailblazer.salesforce.com/about) is a resource where you can connect with other Trailblazers, ask and answer Salesforce questions, and discuss ideas. If you're stuck on a problem, want to meet other Salesforce consultants, or just learn more about Salesforce in general, check it out!

### Developer Resources

Salesforce's [Developer Resources](https://developer.salesforce.com/) are a robust, in-depth reference for all things Salesforce. Are you wondering about the fields on a standard object? Not sure how to expose your Apex class as a Restful webservice? This is the place to look!
