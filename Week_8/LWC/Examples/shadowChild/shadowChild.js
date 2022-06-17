import { LightningElement } from 'lwc';

export default class ShadowChild extends LightningElement {
    eventTarget = "No buttons clicked!";
    elements;
    miscElements;
    hasRendered = false;

    renderedCallback() {
        if (this.hasRendered) return;
        this.hasRendered = true;
        this.elements = Array.from(this.template.querySelectorAll("*"));
        this.miscElements = Array.from(this.querySelectorAll("*"));
    }

    updateTarget(event) {
        let name = event.target.localName;
        if (name == "p" || name == "div") return;
        this.eventTarget = name;
    }
}