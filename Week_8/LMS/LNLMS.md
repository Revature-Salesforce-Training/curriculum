## Lightning Message Service
[Docs reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.use_message_channel)

Use Lightning message service to communicate across the DOM within a Lightning page. Communicate between Visualforce pages 
embedded in the same Lightning page, Aura components, and Lightning web components, including components in a utility bar and 
pop-out utilities. Choose whether a component subscribes to messages from the entire application, or from only the active area.

## Creating/importing a message channel

To create a Lightning message channel, use the LightningMessageChannel metadata type. Include the XML definition in the 
force-app/main/default/messageChannels/ directory. The LightningMessageChannel file name follows the format 
messageChannelName.messageChannel-meta.xml.

```
<?xml version="1.0" encoding="UTF-8"?>
<LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
    <masterLabel>testChannel</masterLabel>
    <isExposed>true</isExposed>
    <description>This is a sample Lightning Message Channel.</description>
    <lightningMessageFields>
        <fieldName>message</fieldName>
        <description>This is sample message</description>
    </lightningMessageFields>
</LightningMessageChannel>
```

Note that we have specified only one lightningMessageFields. We could have supplied even more, to send a variety of data at once. Below we 
see an example of how to import our channel. We do this both on the publisher side as well as subscriber side.

```
import channelName from '@salesforce/messageChannel/channelReference__c';
```

Note the '__c' postfix to our channel name. 

## Publishing

```
import {
    MessageContext,
    publish
  } from "lightning/messageService";
import testChannel from '@salesforce/messageChannel/testChannel__c';

export default class Main extends LightningElement {

    @wire(MessageContext)
    messageContext;
	
	sendM(e) {
        const payload = { message : 'MY LMS MESSAGE!' };
        publish(this.messageContext, testChannel, payload);
    }
	
}
```

Note that we need to @wire our messageContext. We also need to have some event to propogate the necessity of sending a message in the first place. 
Here we just have a method 'sendM' to represent that event. That could be from a button click or any other number of events that could necessitate 
some kind of communication. Our pulish method that we call will take three parameters: our messageContext, the name of our channel, and the content 
of our message made up of an object.

## Subscribing

```
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';

import exampleLMS from '@salesforce/messageChannel/testChannel__c';

export default class Child extends LightningElement {

    subscription = null;
    @wire(MessageContext)
    messageContext;

    messageFromLMS;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                exampleLMS,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(r) {
        console.log(r.message);
        this.messageFromLMS = r.message;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
}
```

Note here that not all the functionality is being used or is even really necessary. I just wanted to include it all to show your options. 
Pay attention to the fourth parameter of our subscribe method. This is letting LMS know that we should listen out for that message on an 
application level, not jus through direct lineage. 