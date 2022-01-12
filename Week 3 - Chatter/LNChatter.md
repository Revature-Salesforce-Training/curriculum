# Module - Chatter

## Chatter

[Work with Posts (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_posts_parent.htm&type=5)

[Polls (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_feed_polls.htm&type=5)

[Questions (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_questions_parent.htm&type=5)

- <mark>a communication channel/social network that allows users to share information and collaborate without needing to leave their Salesforce orgs</mark>
- in terms of syntax, Chatter looks fairly similar to Twitter
    - both make use of the hashtag
    - both allow users to tag others through use of the @ symbol
- whenever we're writing a Chatter post, we'll do so using the Chatter publisher
    - within the Chatter publisher, we have access to standard rich text editing features such as bolding and italicizing text
    - but we can also attach up to 10 files to a single Chatter post, tag other users through use of the @ symbol or the appropriate publisher button, create topics with the use of the hashtag
    - we can also link to records through either the / or the appropriate button in the Chatter publisher
- we can Share a published Chatter post through the Share button, but only the post itself is shared, no attached files or comments will be included
- Polls
    - allow us to give our users one of a series of options to choose in response to a prompt
    - we can include up to 10 options for a single poll
- <mark>Questions</mark>
    - functions similarly to an open-ended poll
    - <mark>questions allow us to ask a question and get suggestions/help from other users</mark>
    - in our questions, we can attach up to 10 files, tag other users, link to records, and create hyperlinks
    - once a question has been published, users who have access to the post can promote the best answers by liking the corresponding comment
    - <mark>the moderators and the user who asked the question can exlicitly elevate the best answer by clicking the Select as Best link</mark>
    - once an answer has been selected as the best answer, it will automatically be the top comment shown whenever anyone views the question

## Chatter Feeds

[Feed Tracking (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_feed_tracking_overview.htm&type=5)

- <mark>Chatter feed appears in Chatter groups, the Chatter tab, topic detail pages, record detail pages (if the page contains the Chatter standard lightning component), and a user's profile</mark>
- Record Feeds
    - if a record detail page contains the Chatter standard Lightning component and we have access to that record, we'll be able to work with Chatter from the record page
    - we can the system make automatic posts to the record's feed when changes are made to the values of certain fields
    - to do so, we'll enable Chatter feed racking by navigating to the Feed Tracking in setup
    - for each object we can choose up to 20 fields to track
    - the standard objects that are available for feedtracking are predetermined (but they include common standard objects such as Account, Case, Contact, etc.)
    - to allow for feed tracking on a custom object, we'll simply enable feed tracking on the Feed Tracking page
    - we're unable to track any fields with the Auto Number, Formula, Roll-Up Summary, Geolocation, or Text (Encrypted) data types

## <mark>Following</mark>

- <mark>in our personal feeds on the Chatter tab, any posts from groups that we're a part of or that mention us will appear</mark>
- <mark>if we want other posts to be present in our personal feed, we'll follow the related record, person, or topic by clicking the apropriate + Follow button</mark>

## Chatter Streams

[Chatter Streams (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_chatter_streams_overview.htm&type=5)

- self-created combinations of Chatter feeds from different entities such as individual users, groups, records, and topics
- we can create up to 100 personal Chatter streams with as many as 25 combined feeds each
- our Chatter streams will display on the Chatter tab

## Chatter Groups

[Collaborate in Chatter Groups (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_groups_parent.htm&type=5)

[Collaborate with Partners and Customers (Salesforce Help)](
https://help.salesforce.com/articleView?id=collab_with_customers.htm&type=5)

[Archived Chatter Groups (Salesforce Help)](https://help.salesforce.com/articleView?id=collab_group_archive.htm&type=5)

- Chatter groups are collections of related users made to make it easier for those who work together often to collaborate
- <mark>Public Groups</mark>
    - <mark>any user in an org can see a Public group and the posts, comments, and files that it contains</mark>
    - <mark>any user in the org can join the Public group of their volation, but they do not need to do so to be able to create their own posts or comments in the group</mark>
- <mark>Private Groups</mark>
    - <mark>only users who are members of the group can see the posts, comments, and files that it contains and add their own posts and comments</mark>
    - <mark>anyone in the org can request to join a Private group, but their request be approved before they'll be able to see the group's contents</mark>
- <mark>Unlisted Groups</mark>
    - <mark>only users who are members of the group can see the posts, comments, and files that it contains and add their own posts and comments</mark>
    - <mark>users who are not group members, can't even see that the group exists - they have to receive an invitation from the group owner or manager to be able to join and to even know about the group in the first place</mark>
    - to create Unlisted groups, we'll enable the Enable Unlisted Groups setting on the Chatter Settings Page in Setup
- <mark>Archived Groups</mark>
    - <mark>if there haven't been any new posts or comments for 90 days, a Chatter group will be automatically archived</mark>
    - <mark>when a Chatter group is archived, no one can make a new post, although posts can still be seen and new comments can be added to them</mark>
    - <mark>we can disable automatic archiving for a Chatter group</mark> by selecting the Edit Group and Disable automatic archiving options
    - <mark>we can reactivate an archived group</mark> by clicking the Activate Group button on the group detail page
- <mark>Groups with Customers</mark>
    - <mark>groups that contain both internal external users</mark>
    - <mark>can be either a Private or Unlisted group</mark>
- <mark>Broadcast-Only Groups</mark>
    - <mark>groups where only the group owner/managers can post, other users can only comment on those posts</mark>
    - <mark>can be either a Public, Private, or Unlisted group</mark>

| Characteristic/Feature | Public Group | Private Group | Unlisted Group |
| ---------------------- | ------------ | ------------- | -------------- |
| Non-Members Can See that Group Exists | Yes | Yes | No |
| Non-Members Can See Group's Contents | Yes | No | No |
| Non-Members Can Post | Yes | No | No |
| Can Be Broadcast-Only | Yes | Yes | Yes |
| Can Include Customers	| No | Yes | Yes |
| Need Approval to Join	| No | Yes | Yes |
| Can Ask to Join | No | Yes | No |

 
## Security in Chatter

- <mark>Chatter respects the declarative security model in our org</mark>
- users won't be able to see or follow a record's if they don't have access to the corresponding record
- if someone posts a link to a record in a place where a given user can see that post, but the viewing user doesn't have permission to access the record, the record link will be replaced [Record Not Available]
- <mark>if a user is mentioned in a group or record feed that they don't have access to, they'll have no way of knowing that the Chatter post was created</mark>
