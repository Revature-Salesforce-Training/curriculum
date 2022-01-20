import { LightningElement } from 'lwc';

export default class App extends LightningElement {

    username = 'Ethan';
    areDetailsVisible = false;

    people = [
        {Name: "John"},
        {Name: "Joe"},
        {Name: "Sue"}
    ];

    handleChange(event) {
     
        this.areDetailsVisible = event.target.checked;
    }
}