import { LightningElement, api } from 'lwc';

export default class newHeader extends LightningElement {
    
    @api messagetochild;
    reactive = 'these fields are reactive all the time!';
    parentCallingChildMethod = 'Results from calling child method from parent will go here!';

    //examples of lifecycle hooks
    connectedCallback() {
        console.log("Child component connected!");
    }

    disconnectedCallback() {
        console.log("Child component disconnected!");
    }

    renderedCallback(){
        let elem = this.template.querySelector(".reactive");
        elem.textContent += ' and it was reactive!';
    }

    //this is an example of passing an event up to a parent!
    handleChange(e) {
        this.dispatchEvent(new CustomEvent("inputchange", {detail: e.target.value}));
    }



    @api childMethod() {
        this.parentCallingChildMethod = 'You called a child method from the parent!';
    }

    handleChildEv() {
        this.dispatchEvent(new CustomEvent("grandchildfired"));
    }
}