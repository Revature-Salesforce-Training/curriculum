import { LightningElement, api, wire } from 'lwc';
import getQueryContacts from '@salesforce/apex/ContactsHelper.getQueryContacts';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
    publish
  } from "lightning/messageService";
import testChannel from '@salesforce/messageChannel/testChannel__c';

export default class Main extends LightningElement {

    searchString;
    @wire(getQueryContacts, {query: '$searchString'})
    cons;

    @wire(MessageContext)
    messageContext;

    fields = [NAME_FIELD, PHONE_FIELD, EMAIL_FIELD];
    objectApiName = 'Contact';

    handleInput(e) {
        this.searchString = e.target.value;
    }

    sendM(e) {
        const payload = { message : 'MY LMS MESSAGE!' };
        publish(this.messageContext, testChannel, payload);
    }
}