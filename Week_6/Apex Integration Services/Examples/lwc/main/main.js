import { LightningElement } from 'lwc';
import getJoke from '@salesforce/apex/IntegrationExample.getJoke';

export default class Main extends LightningElement {

    joke;

    fetchJoke() {
        getJoke().then((res) => {
            this.joke = res;
            console.log(res);
        });
    }
}