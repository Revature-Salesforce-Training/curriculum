import { LightningElement, wire } from 'lwc';
import getQueryContacts from '@salesforce/apex/ContactsHelper.getQueryContacts';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import {
    MessageContext,
    publish
  } from "lightning/messageService";
import testChannel from '@salesforce/messageChannel/testChannel__c';

export default class Main extends LightningElement {

    searchString;
    dataFromImperitiveCall;
    errorFromImperitiveCall;
    @wire(getQueryContacts, {query: '$searchString'}) 
    cons;

    /* Now let's do the above, but imperitively

        Instead of our implementation above, we just won't have lines 20-21 at all.
        We will instead have some logic in our handleInput method, check that out.
    */

    @wire(MessageContext)
    messageContext;

    fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];
    objectApiName = 'Contact';

    handleInput(e) {
        this.searchString = e.target.value;

        /*
            would look something like this. Notice that if we do it this way, 
            we get a promise back to use that we can make use of. Either by 
            handling the results returned or an error message.

            You want to call an Apex method imperitevely in these situations:
            1. when a method isn't annotated with cacheable=true 
                (when any method inserts, updates, or deletes data)
            2. to control when invocation occurs
            3. to work with objects not supported by the UI Api like task/event
            4. to call a method from ES6 module that doesn't extend LightningElement

            DOCS REFERENCE
            https://developer.salesforce.com/docs/component-library/documentation/en/lwc/apex_call_imperative

            getQueryContacts(e.target.value)
                .then(result => {
                    this.dataFromImperitiveCall = result;
                })
                .catch(error => {
                    this.errorFromImperitiveCall = error;
                });
        */
    }

    sendM(e) {
        const payload = { message : 'MY LMS MESSAGE!' };
        publish(this.messageContext, testChannel, payload);
    }
}