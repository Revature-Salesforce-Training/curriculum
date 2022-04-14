import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {

    username = 'Ethan';
    valueToSendToChild = 'This is a message passed from parent to child using @api!';
    areDetailsVisible = false;
    status = 'Child Component not connected yet!';


    /*
    This won't let us update because it's not using @track

    people = [
        {id: '1gds4a541', Name: "John"},
        {id: '2fdsaf343', Name: "Joe"},
        {id: 'fdsa3345g', Name: "Sue"}
    ];
    */
    //this will work because track "tracks" reactivity inside arrays and objects
    
    @track people = [
        {id: '1gds4a541', name: "John"},
        {id: '2fdsaf343', name: "Joe"},
        {id: 'fdsa3345g', name: "Sue"}
    ];

    handleChange(event) {
        
        this.areDetailsVisible = event.target.checked;
        if (this.areDetailsVisible) {
            this.status = 'Child component connected';
        } else {
            this.status = 'Child component disconnected';
        }
    }

    handleInputChange(e) {
        this.username = e.detail;
    }

    handleChildMethodCall() {

        if(this.template.querySelector('my-child')) {
            this.template.querySelector('my-child').childMethod();
        } else {
            this.template.querySelector('.btn').textContent = 'HEY! You have to render the child first!';
        }
    }

    testTrack() {
        this.people[0].name = 'Track worked!';
    }

    handleGrandchild() {
        console.log('grandchild event fired!');
    }
}