# Module - Indexing

## Indexing

- Salesforce is designed to be used by large companies whose orgs store hundreds of thousands or millions of records
- to help users find the record(s) that they're looking for, each page in the Salesforce interface has a Global Search Box at the top
- depending on the amount of records within our orgs, it could be a staggering amount of data to search through to find a value in a specific field on a record
- to help mitigate this issue, the Global Search Box doesn't search against every field on every record
- rather <mark>it only searches against the Search Index (indexed fields on searchable objects)</mark>

### Searchable Objects

[Searchable Fields by Standard Object in Lightning Experience](https://help.salesforce.com/articleView?id=search_fields_lex.htm&type=5)

- the standard objects that are searchable are predetermined for us, but most of the common standard objects (e.g. Account and Contact) are searchable
- to make custom object searchable, we'll select the Allow Search checkbox when creating or editing the custom object

### Indexed Fields

- <mark>Salesforce automatically indexes primary keys (e.g. Id, Name, and Owner fields), foreign keys (Lookup/Master-Detail Relationship fields), and Audit dates (e.g. CreatedDate and LastModifiedDate fields)</mark>
- there are a select number of standard fields on standard objects that are indexed as well
- <mark>to have a custom field indexed, we'll mark it as either an External Id or Unique field</mark>
  - External Id fields can only have the Auto Number, Email, Number, or Text data types
  - fields that with Picklist (Multi-Select), Currency (if our org has multiple currencies enabled), Text Area (Long), and Text Area  (Encrypted) field data types cannot be Unique
- we can also contact Salesforce to request that a field that wouldn't be automatically indexed is indexed

### Search Index

[Custom Index Considerations for Selective SOQL Queries Section](https://help.salesforce.com/articleView?id=000325247&language=en_US%C2%A0&type=1&mode=1)

- Salesforce takes each value for an indexed field on a record of a searchable object and breaks them tokens
- each token has a link to the record that has that field value and the field value itself
when we execute a search through
  - the Global Search Box, the system will search against the tokens for our desired value
  - SOSL, the system will search against the text field values (or our selected type of field value) for the desired value
- when using SOQL, it's preferrable to filter on indexed fields whenever possible because of the performance increase through the tokenization that has already occurred
