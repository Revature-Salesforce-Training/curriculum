# Module - User Setup

[Longform](<./LFUser Setup>)

[User Management (Salesforce Help)](https://help.salesforce.com/articleView?id=users_mgmt_overview.htm&type=5)

## User Object

- the User object is a special kind of standard object
- records of the User object represent users who can login to our Salesforce orgs
- each User must have a User license and a profile that's assigned to them
- the username is another required field for the User object
  - the value that's provided to a username must be unique across all Salesforce orgs (if we use luigi@aol.com as the username for a new user in our orgs, no one will ever be able to create a new user with that username again or to change the username of an existing user to that value, regardless of the Salesforce org that they're working with)
    - when we visit the [generic login page](https://login.salesforce.com), Salesforce determines the org to check our credentials against and log us into based on the username that we provide (so each username is part of no more than one org)
  - this value must be in the format of an email address (something@value.domain), but it doesn't have to be a valid email address

## User Statuses

- a user's status determines whether they're able to login to the org and if they're consuming a user license
- users can have one of four statuses
- <mark>Active</mark>
  - the status that's granted to a user when we create a new User record
  - <mark>it consumes the user licenses assigned to that user (so that we can't assign that same license to anyone else) and allows them to login to the org</mark>
- <mark>Inactive</mark>
  - <mark>inactive users can't login to the org and don't consume the user license that was assigned to them</mark>
  - a common status for users who have left the company because we can't delete User records in Salesforce
  - each object has at least three relationships to the User object (OwnerId, CreatedBy, LastModifiedBy), so to preserve the values of these fields, we're unable to delete users
- <mark>Frozen</mark>
  - <mark>frozen users can't login to the org, but they do consume the user license that was assigned to them (so we can't assign it to anyone else)</mark>
  - <mark>users are frozen by the Admin and they can later be unfrozen by the Admin</mark>
  - we'll commonly freeze users in the case that they're credentials may have been compromised
- <mark>Locked</mark>
  - <mark>locked users can't login to the org, but they do consume the user license that was assigned to them (so we can't assign it to anyone else)</mark>
  - <mark>users are locked by the system when they enter their password incorrectly too many times and they can later be unlocked by the Admin</mark>
- as administrators, we can send password reset emails to users by clicking the Reset Password link on their User detail pages

## User License Types

- Trailhead Playgrounds and Developer Editions only come with two Salesforce user licenses and one of these two will always be consumed by us
- when we want to create more than one additional user in a Trailhead Playground or Developer Edition, we can do so by assigning those extra users the Salesforce Platform user license
- the Salesforce license is the most capable user license (i.e. whoever has a Salesforce license has the most capability for access to features and objects within the org)
- the Salesforce Platform license is more limited than the Salesforce license
  - but it still allows the users who hold to access custom objects, custom tabs, custom applications, reports, dashboards, and a variety of standard objects
  - so for our purposes, there isn't a big difference between assigning a user the Salesforce and the Salesforce Platform user license
 