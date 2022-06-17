import { LightningElement } from 'lwc';

export default class ShadowDom extends LightningElement {
    eventTarget = "No buttons clicked!";
    hasRendered = false;
    elements;
    miscElements;

    renderedCallback() {
        if (this.hasRendered) return;
        this.hasRendered = true;
        this.elements = Array.from(this.template.querySelectorAll(".container *"));
        this.miscElements = Array.from(this.querySelectorAll("*"));
    }

    updateTarget(event) {
        let name = event.target.localName;
        if (name == "p") return;
        this.eventTarget = event.target.localName;
    }
}