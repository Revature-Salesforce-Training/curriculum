##  Lightning Data Service

The LDS is a tool that can be used to load, create, edit, or delete a record in a component without the use of Apex code.
LDS handles sharing rules and field-level security automatically. LDS is also very effecient in its performance, so it would be 
considered a best practice to use LDS whenever feasible. 

One big reason LDS is so effecient:
  * It has a cache that is shared with all components that use it. 
    * This means that records only need to be loaded once and can be accessed by other components utilizing LDS. 
	
To interact with LDS we make use of some built-in components of the Salesforce Lightning Component Library.

## lightning-record-form
[Docs reference](https://developer.salesforce.com/docs/component-library/bundle/lightning-record-form/documentation)

Using this component to create record forms is easier than building forms manually with lightning-record-edit-form or lightning-record-view-form. 
The lightning-record-form component provides these helpful features:

  * Switches between view and edit modes automatically when the user begins editing a field in a view form
  * Provides Cancel and Save buttons automatically in edit forms
  * Uses the object's default record layout with support for multiple columns
  * Loads all fields in the object's compact or full layout, or only the fields you specify
  
However, lightning-record-form is less customizable. To customize the form layout or provide custom rendering of record data, use 
lightning-record-edit-form (add or update a record) and lightning-record-view-form (view a record).

## lightning-record-view-form
[Docs reference](https://developer.salesforce.com/docs/component-library/bundle/lightning-record-view-form/documentation)

Use the lightning-record-view-form component to create a form that displays Salesforce record data for specified fields associated with that 
record. The fields are rendered with their labels and current values as read-only.

Use the lightning-output-field component to render fields as read only. 

```
<lightning-record-view-form
    object-api-name={objectApiName}
    record-id={recordId}
>
    <lightning-output-field field-name={nameField}> </lightning-output-field>
</lightning-record-view-form>
```

## lightning-record-edit-form
[Docs reference](https://developer.salesforce.com/docs/component-library/bundle/lightning-record-edit-form/documentation)

Use the lightning-record-edit-form component to create a form that's used to add a Salesforce record or update fields in an existing record on 
an object. The component displays fields with their labels and the current values, and enables you to edit their values.

lightning-record-edit-form supports the following features.

  * Editing a record's specified fields, given the record ID.
  * Creating a record using specified fields.
  * Customizing the form layout
  * Custom rendering of record data
  
To specify editable fields, use lightning-input-field components inside lightning-record-edit-form component.

To display record fields as read-only in lightning-record-edit-form, use lightning-output-field components to specify those fields. You can also 
use HTML and other display components such as lightning-formatted-name to display non-editable content.

To display all fields as read-only, use the lightning-record-form component with mode="readonly" or the lightning-record-view-form component 
instead of lightning-record-edit-form.

```
<lightning-record-edit-form
    object-api-name="{objectApiName}"
    record-id="{recordId}"
>
    <lightning-input-field field-name="{nameField}"> </lightning-input-field>
    <div class="slds-var-m-top_medium">
        <lightning-button variant="brand" type="submit" label="Save">
        </lightning-button>
    </div>
</lightning-record-edit-form>

```

## What about delete?

So we can view with the view-form. Go figure. We can view/edit with the record-form and we can view/edit/create with the record-edit-form. All with 
various levels of customizations and baked in features. But earlier we said we can delete. So what about that? This is where wire adapters and 
functions come into play. 

## Wire Adapters and Functions
[Docs Reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_ui_api)

Wire adapters and JavaScript functions are built on top of Lightning Data Service (LDS) and User Interface API. Use these wire adapters and 
functions to work with Salesforce data and metadata.

These wire adapters and functions first need to be imported in from a module before we can use them. There are many at our disposal:
  * lightning/uiListsApi
  * lightning/uiObjectInfoApi
  * lightning/uiRecordApi
  * and more...
  
 For our purposes, and what you will likely run into the most for now, is the uiRecordApi. This is also where we can start to use the LDS to delete 
 a record if we so wish.
 
 First the import.
 ```
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 ```
 
 Then perhaps we have a button press that calls a method in our component's class. Note that deleteRecord from the uiRecordApi will return a promise 
 that we can manipulate. In this case, we are displaying a toast message.
 
 ```
 delete(event) {
	deleteRecord(this.recordId)
	.then(() => {
		this.dispatchEvent(
			new ShowToastEvent({
				title: 'Success',
				message: 'Record deleted',
				variant: 'success'
			})
		)
		.catch(error => {
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Error deleting record',
					message: error.body.message,
					variant: 'error'
				})
			);
		});
 }
 ```