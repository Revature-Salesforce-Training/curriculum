// First, we need our imports. Import the createElement function so we can insert our element into the jsdom
import { createElement } from "lwc";

// Next, we need the component we're running tests for. Import that bad boy
import TestingLwc from "c/testingLwc";

// describe is used to define a test suite, or a collection of tests
describe("c-testing-lwc basic", () => {
  // afterEach is ran after the end of every test. Use this to clean up your mess
  afterEach(() => {
    // We're not using a browser, we're actually using a node.js construction called the jsdom for our tests
    // This jsdom is shared between tests, so all this does is clear our the jsdom
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // it defines a single test. The it block is identical to the test block, you can use these terms interchangably
  // We give it a name that describes what the test is supposed to do
  it("Ensure guitarists are different", () => {
    // Where have we seen this syntax before? That's right: oss lwc in index.js!
    const testComponent = createElement("c-testing-lwc", { is: TestingLwc });

    // We then insert the element into the jsdom for our testing purposes
    document.body.appendChild(testComponent);

    // Pop Quiz: What lifecycle hooks have been fired so far?

    let guitarist1 = testComponent.getGuitarist();
    let guitarist2 = testComponent.getGuitarist();

    // We use expect for our Asserts. We use matchers in order to assert what we're expecting
    // Here, we're expecting the first name to not be the same as the second name
    expect(guitarist1.name).not.toBe(guitarist2.name);
  });
});

// Now, let's see how we test the wire service and data
// Lets import what we need now
import { getRecord } from "lightning/uiRecordApi";

// You may see some documentation using registerLdsTestWireAdapter. This is deprecated and no longer needed
// Simply use the method you've imported to emit instead
/* -- DEPRECATED -- import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest'; -- DEPRECATED -- */

import GetAccount from "@salesforce/apex/WebController.GetAccount";

// We need to import setImmediate in order to test out our imperative method call
import { setImmediate } from "timers";

// This is a variable that stores the mock record json
const mockRecord = require("./data/recordMock.json");

// We use a jest-transformer in order to redefine what is returned by the import
jest.mock(
  // First, we set the endpoint we're mocking for
  "@salesforce/apex/WebController.GetAccount",

  // Then, we mock the return value of the import. Here, we return a mock function
  () => ({
    default: jest.fn()
  }),

  // Finally, we set the virtual option to true. This means that the endpoint is not on our machine
  { virtual: true }
);

describe("c-testing-lwc with data", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("UI API wire displays", () => {
    const testComponent = createElement("c-testing-lwc", { is: TestingLwc });
    document.body.appendChild(testComponent);

    // We use the .emit function to send our mock data to the wire service looking for a response
    getRecord.emit(mockRecord);

    // We return a resolved promise to tell the framework to wait for the update before proceeding
    return Promise.resolve().then(() => {
      // If you remember, this function should have made a <p> tag render with the account name, so lets check that
      const accountElement = testComponent.shadowRoot.querySelector("p");
      const actualName = accountElement.textContent;

      // Now we just say what we're expecting and see if it all worked!
      expect(actualName).toBe(mockRecord.fields.Name.value);
    });
  });

  test("Custom method fires", () => {
    const testComponent = createElement("c-testing-lwc", { is: TestingLwc });
    document.body.appendChild(testComponent);

    // We need to tell the mock function what it should return, so we pass in our data
    // Note here we can also use our mock data from the data folder, but this is simple enough
    GetAccount.mockResolvedValue({ Name: "Test Account" });

    // The function is fired when the button is clicked, so let's click that button
    const button = testComponent.shadowRoot.querySelector("lightning-button");
    button.click();

    /*
            A point to make here about the lightning-button:
            We're not actually using the REAL lightning-button here, since it exists in a different namespace. 
            What we're actually using is a mock provided to us that has all the cumbersome functionality stripped away. 
            We can still fire those event listeners though as we did above. Just something to note.

            We can create our own mocks by placing them in a __mocks__ folder on a child component and creating them like normal LWC. The
            reason we may decide to do this is ensure we are performing proper unit tests and only testing our component
            and not any children components. Just be sure to add that to the .forceignore!

            An example of a mock is in the shadowChild component
        */

    // Here, we have slightly different Promise syntax. setImmediate is used for long acting functions, which our
    // imperative method call is. Thus, we must return a new Promise(setImmediate)
    return new Promise(setImmediate).then(() => {
      // Once we've resolved the promise, everything is as it was before
      const accountElement = testComponent.shadowRoot.querySelector("p");
      const actualName = accountElement.textContent;

      expect(actualName).toBe("Test Account");
    });
  });
});
