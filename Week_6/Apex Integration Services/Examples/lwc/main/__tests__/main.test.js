import { createElement } from 'lwc';
import Main from 'c/main';

describe('c-main testing suite', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    it('testing', () => {
        const element = createElement('c-main', {
            is: Main
        });
        document.body.appendChild(element);

        const myDiv = element.shadowRoot.querySelector('.myDiv');
        const myBtn = element.shadowRoot.querySelector('.myBtn');
        myBtn.click();

        //resolving the promise isn't really requied here. 
        //we would use that when we are waiting for some async request
        return Promise.resolve().then(() => {
            expect(myDiv.textContent).toBe('HI THIS IS MY TEST!');
        });
    });
});