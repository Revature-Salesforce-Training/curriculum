import { LightningElement, api } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class RecordViewFormDemo extends LightningElement {
    @api recordId;
    @api objectApiName;

    nameField = NAME_FIELD;
    phoneField = PHONE_FIELD;
    emailField = EMAIL_FIELD;
}