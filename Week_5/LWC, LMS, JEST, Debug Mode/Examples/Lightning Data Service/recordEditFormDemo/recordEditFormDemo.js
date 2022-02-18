import { LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import SOURCE_FIELD from '@salesforce/schema/Account.AccountSource';

export default class RecordEditFormDemo extends LightningElement {
    objectName = ACCOUNT_OBJECT;
    nameField = NAME_FIELD;
    industryField = INDUSTRY_FIELD;
    sourceField = SOURCE_FIELD;
    defaultSource = 'Web';

    handleSuccess() {
        const toastEvent = new ShowToastEvent({
            title: "Success",
            message: "Record created.",
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
    }
}