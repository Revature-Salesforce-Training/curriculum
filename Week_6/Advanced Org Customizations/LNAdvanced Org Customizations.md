# Module - Advanced Org Customizations

[Longform](<./LFAdvanced Org Customizations.md>)

## Custom Permissions

[Custom Permissions](https://help.salesforce.com/articleView?id=custom_perms_overview.htm&type=5)

[Global Variables](https://help.salesforce.com/articleView?id=dev_understanding_global_variables.htm&type=5)

* out of the box (oob) Salesforce settings allow us to control the visibility of features such as processes and apps
* but we can use Custom Permissions to manage access to functionality within these features, allowing more granular customizations
* to create a Custom Permission, we navigate to `Setup` > `Custom Code` > `Custom Permissions` and select `New`
    * on the following screen, we'll provide a label and (optionally a description), before clicking `Save`

Giving Custom Permissions to Users

* once we've created a permission, we can add it to a profile by clicking the `Custom Permissions` link on the profile detail page when we're using the `Enhanced Profile User Interface`
    * from there, we'll click `Edit` on the following page and move our permission from the `Available Custom Permissions` column to the `Enabled Custom Permissions` column before clicking `Save`
    * the process is similar when we're adding a Custom Permission to a permission set
* if we're using the regular profile user interface, we can hover over the `Enabled Custom Permissions` link at the top of the profile detail page and click `Edit` on the popup
    * this will take us to the same two-column available/enabled permissions screen from the other UI

Using Custom Permissions

* we can refer to our permission within formulas in validation rules, formula fields, flows, and process builder by using the `$Permission` global variable, the API name of our permission, and dot notation
    * e.g. `$Permission.Large_Discount`
* alternatively, we could check a user's custom permissions using Apex with the `FeatureManagement.checkPermission()` method
    * this method has a single parameter - a `String` holding the API name of our permission
    * it returns a `Boolean` indicating if the running user has the permission
* example use case
    * we could make a custom permission named `Large_Discount`
    * if a user has this permission, they'll be able to give a discount of greater than 50% to an opportunity
    * if they don't have the permission and try to give such a discount, the record will be submitted to an approval process

## Custom Metadata Types

[What are Custom Metadata Types](https://help.salesforce.com/articleView?id=custommetadatatypes_about.htm&type=5)

Custom Metadata Types (CMTs)

* allow us to create, package, deploy, and even upgrade our own custom metadata
* like custom objects, CMTs can have fields
    * but these fields and the values they contain are metadata
    * so the instances (i.e. records) of a CMT are also metadata
    * therefore, we can migrate both CMTs and custom metadata records with any tool that uses the Metadata API under-the-hood (like the Salesforce Extensions for Visual Studio Code and the Salesforce CLI)
        * we can also perform this migration with our declarative packaging and migration tools
* CMTs are primarily used to hold configuration information for apps
* "configuration information" includes master data
    * e.g. a postal company that has multiple Salesforce orgs can use CMT records to easily migrate information about the prices for shipping different classes of mail (like overnight or next-day air) between their orgs without having to manually create records holding this information in each org
    
Creating CMTs

* to create a CMT, we navigate to `Setup` > `Custom Code` > `Custom Metadata Types` and select `New Custom Metadata Type`
* on the following screen, we'll provide a label and plural label for our type and click `Save` to go to the CMT detail page

Sidebar: Visibility Settings

* determine access to our type and possibly its records

| Visibility | API Value | Radio Button |
| ---------- | --------- | ------------ |
| Public | Public | All Apex code and APIs can use the type, and it's visible in Setup. |
| Protected (Local) | Protected | Only Apex code in the same namespace can see the type. The name of the type and the record are visible if they're referenced in a formula. |
| Protected (Managed) | PackageProtected | Only Apex code in the same managed package can see the type. The name of the type and the record are visible if they're referenced in a formula. |

* if we're creating a managed package and we want subscribers/customers to be able to
    * change the CMT, we should choose the `Public` setting
    * use the CMT, but not change it, we should use the `Protected (Managed)` setting
* if we want customers to be able to create records for the CMT but not change the existing records, we...
    * let's take a couple steps back
    * when we create a CMT, it gets some standard fields
    * one of these standard fields, `IsProtected` can be edited by toggling the `Protected Component` checkbox when creating/editing a record
    * when we protect individual records, we can include a CMT in a managed package with the `Public` visibility setting on the type
    * so our CMT records will be protected, but customers can still make their own
* we don't really have to worry about customers changing the type itself, because there are very few/heavily restricted CMT attributes that customers can change in a managed package
* we can modify records that have been released as a part of a managed package by updating the package or using Apex

## Creating, Updating, and Deleting CMT Records

[Metadata Namespace](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_Metadata.htm)

* we can use Apex to create CMT records by adding one or more instances of `Metadata.CustomMetadata` (a system-defined class that represents a CMT record) to a `Metadata.DeployContainer`
    * we'll then pass this object and a callback function to `Metadata.Operations.enqueueDeployment()`
    * we use this method to retrieve, update, or insert CMT records because traditional DML can't do so
* Apex can't delete CMT records
* we can create, update, and delete records declaratively from the `Custom Metadata Types` page
* if we want to read records in Apex, we can also use SOQL that queries the corresponding CMT
    * there is no governor on the number of queries executed against CMTs in a single transaction, as long as we're not querying `Text Area (Long)` fields
    * but CMT SOQL queries are still subject to the 50,000 record retrieval transaction limit
* CMTs have API names in the format `TypeDeveloperName__mdt`

Using CMT Records

* we can reference CMT types and records declaratively in formulas included in flows, formula fields, processes, and validation rules by using the `$CustomMetadata` global variable, followed by dot notation specifying the API name of the type
    * if we're referring to a particular field on a CMT record, we'll append the API name of the record and field through dot notation to this syntax
        * e.g. `$CustomMetadata.TypeDeveloperName__mdt.RecordDeveloperName.FieldAPIName`

## CMT Fields

* we can create custom fields on CMTs using the `Checkbox`, `Date`, `Date/Time`, `Email`, `Number`, `Percent`, `Phone`, `Picklist`, `Text`, `Text Area`, and `URL` field data types
* we can also create custom relationships for CMTs, these can be
    * relationships to another CMT
    * relationships to an `EntityDefinition` (i.e. a standard/custom object)
    * relationships to a `FieldDefinition` (i.e. a standard/custom field on a standard/custom object)
* CMTs also have page layouts and (optionally) validation rules

## Custom Metadata Type Uses

* as we said earlier, we can use CMTs to hold configuration data
* we'll also use them when
    * deploying a common secret (e.g. authentication information)
    * we want to conditionally execute or skip triggers
    * mapping different objects or fields together through metadata that will persist across migrations
