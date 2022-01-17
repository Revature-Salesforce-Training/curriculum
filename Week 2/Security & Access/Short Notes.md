# Short Notes for Security and Access

You should definitely still read the long version. 

Seriously. DO it.

## User License

Acts as a cap on a user's power. The maximum amount of features they can access and use. Make that 
distinction that it determines capabilities of a user but doesn't actually bestow access itself.
The user license we choose determines the profiles we can set. 

## Profiles

Profiles are assigned to users and determine the permissions and access a user can have. We can't 
assign more access in a profile that is not allowed by our user lisence.

## Permission Sets

Permission sets always expand access, it never restricts it. We can use permission sets in addition to 
profiles to give certain users more access than others.

## Feature License

Feature licenses can be given out to individual users and allow a user access to one specific 
capability within Salesforce. Unlike user licenses, feature licenses do bestow the permission, 
therefore bypassing the profile entirely.

## Org Entry
To login to a Salesforce org we first need a user license and a profile, every user must have both.

## 4 Levels of security in Salesforce

* Org level 
  * We can control this through Login Hours and Login IP Ranges found in our Profiles.
* Object Level
  *  Object level security deals with access to CRM objects (both standard and custom) and the actions 
  we can perform on accessible records of those objects. We control this level through profiles and 
  permission sets.
  * We have 6 levels of access: Read, Create, Edit, Delete, View All, and Modify All
* Record Level
  * The owner of a record gets additional permissions and some record sharing depends on who the 
  record owner is
  * Record owners are given the ability to view the record, edit it, delete it, change the owner, and 
  manually share it with others through these tools:
    * OWDs (Org Wide Defaults) - Base level of record access, applying to everyone in our org.
	* Role Hiearchies - Can think of this as the tree of roles in our ORG. From CEO all the way down 
	to a sales rep.
	* Sharing Rules - We use Sharing Rules to grant either read or read and edit access to certain 
	records based on either the record's field values or the owner of the record. If we choose to 
	create an ownership-based Sharing Rule, we'll be able to share records that are owned by members 
	of a Public Group, users holding a certain role, or users holding a certain role and their 
	subordinates. Note that any access provided through an ownership-based sharing rule is removed if 
	the owner changes such that the ownership criteria is no longer fulfilled.
	  * Public Groups - Public Groups are collections of users, users with specific roles, users 
	  with specific roles and their subordinates, and/or other public groups that we use to provide 
	  record access to groups of users through Sharing Rules or Manual Sharing.
	* Manual Sharing - Manual Sharing allows eligible users (i.e. those who own the record, inherit 
	record ownership permissions through role-based sharing, have the System Administrator profile, 
	have the Modify All permission for the corresponding object, or have the Modify All Data 
	permission) to provide record access to other users, members of a Public Group, or users holding 
	a particular role. But any access provided through Manual Sharing is removed when the record owner 
	changes.
	* Bonus (Apex Sharing) - We'll further explore it in the Apex Security & Sharing module. For now, suffice it to say that Apex Sharing allows us to programatically share a record and can be preferable over Manual Sharing because, in some cases, record access is not removed when the record owner changes.
* Field Level - Like with object permissions, we control FLS through profiles and permission sets. 
There are three possible levels of access to any field on a record - no access (the field is not 
visible and the value is uneditable), read access, and read and edit access.