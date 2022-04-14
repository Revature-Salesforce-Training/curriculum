import { LightningElement } from 'lwc';

export default class Grandchild extends LightningElement {

    fireGrandchildEvent() {
        this.dispatchEvent(new CustomEvent("grandchildev"));
    }
}