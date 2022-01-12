# Module - Activities

## Types of Activities

[Create custom fields for Tasks or Events (Salesforce Knowledge Article)](https://help.salesforce.com/articleView?id=000335522&language=en_US&type=1&mode=1)

- there are two types of activities in Salesforce - tasks and events
- <mark>tasks are like sticky notes or members of a to-do list - they have a set due date or time that they need to be completed by and serve to give users reminders of what they need to accomplish</mark>
- <mark>events have a set start and end time and include activities such as meetings and conferences</mark>
- both the Task and Event standard objects have WhoId and WhatId relationship fields
    - these fields determine the entity that the activity is related to
    - WhoId field can hold a record Id of a Contact or Lead
    - WhatId field can hold the record Id of Account, Asset, Campaign, Case, Contract, Opportunity, Product2, Solution, or custom object record (so long as the custom object has activities enabled)
        - to enable activities for a custom object, we'll select Allow Activities when creating or editing the custom object
- within Setup, we're unable to add new fields to the Task or Event objects in Object Manager
    - to add new fields to either of these objects, we'll go to the Activity object in Object Manager and create a new field there
    - on the last step of the field creation wizard, we'll be able to choose to add the field to our page layouts for the Task and Event objects

## Tasks and the User Interface

- any tasks that have been assigned to a user will show up in the Today's Tasks standard Lightning component that's included on Lightning home pages by default, Tasks tab, and the Activity standard Lightning component on the record detail page of the record that they're related to
 

## Events and the User Interface

- any events that we have been assigned to will show up in the Today's Events standard Lightning component that's included on Lightning home pages by default, Activity standard Lightning component on the record detail page of the record they're related to, and the Calendar tab
- <mark>we can create multiday events by simply creating a new event with the start and end time more than 24 hours apart</mark>
 

## Calendars

[Use Calendars to Track and Visualize Dates in Salesforce Objects in Lightning Experience (Salesforce Help)](https://help.salesforce.com/articleView?id=calendar_create_examples.htm&type=5)

- when we visit the Calendar tab, we see the My Events calendar that holds Event records that we own
- Object Calendars
    - we create a custom calendar based off of a date field on an object
    - this calendar will display records of the object based on their value for the selected date field
- Sharing Calendars
    - OWDs for the Calendar object
        - Hide Details and Add Events
            - users are able to add events to other users' calendar, but any existing events already on those calendars only have their start and end times shown and are given the busy label
        - Hide Details
            - users aren't able to add events to other users' calendars and any existing events on those calendars only have their start and end times shown and are given the busy label
        - Show Details
            - users aren't able to add events to other users' calendars but they can see all information about events on those calendars
        - Show Details and Add Events
            - allows users to see all information about existing events on other users' calendars and add new events to those calendars
            - the OWD for the Calendar object in our org will determine the available access options when sharing a calendar
 

| OWD | Can Give Hide Details and Add Events Access | Can Give Show Details Access | Can Give Show Details and Add Events |
| ------------ | --- | --- | --- |
| Hide Details | Yes | Yes | Yes |
| Hide Details and Add Events | No | No | Yes |
| Show Details | No | No | Yes |
 

## Public and Resource Calendars

[Create and Manage a Public Calendar or a Resource Calendar (Salesforce Help)](https://help.salesforce.com/articleView?id=customize_groupcal.htm&type=5)

- <mark>public calendars are generally used for department or company-wide events such as meetings or social events</mark>
- <mark>resource calendars are used to denote the available of shared resources, such as conference rooms</mark>
- to create a Public or Resource calendar, we'll go to the Public Calendars and Resources page in Setup
- <mark>once we've created a calendar, we'll be able to choose the users and groups within our org who have access to the calendar and their level of access</mark>
