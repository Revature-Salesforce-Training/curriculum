import { LightningElement } from "lwc";

// Define any mock info here. This would include things like @api properties to fill out attributes.
export default class ShadowChild extends LightningElement {}

// Since this is a mock, we want to do away with any real functionality for the most part.
// We don't use the mock to test the component! It's just there so we don't rely on it when testing
// the component the child is housed in
