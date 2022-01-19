# Module - Org Configuration

[Longform](<./LFOrg Configuration.md>)

## Company Information

[User Licenses (Salesforce Help)](https://help.salesforce.com/articleView?err=1&id=users_understanding_license_types.htm&type=5)

[Experience Cloud User Licenses (Salesforce Help)](https://help.salesforce.com/articleView?id=users_license_types_communities.htm&type=5)

[Available Feature Licenses (Salesforce Help)](https://help.salesforce.com/articleView?err=1&id=users_feature_licenses_available.htm&type=5)

[API Requests Limits (Salesforce Developer Limits Quick Reference)](https://developer.salesforce.com/docs/atlas.en-us.206.0.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_api.htm)

[Select Your Language, Locale, and Currency (Salesforce Help)](https://help.salesforce.com/articleView?id=admin_language_locale_currency.htm&type=5)

[Considerations for Enabling Multiple Currencies (Salesforce Help)](https://help.salesforce.com/articleView?id=admin_enable_multicurrency_implications.htm&type=5)

- found at Setup > Company Settings > <mark>Company Information</mark>
- Organization Detail
    - displays basic information about our company such as its name, points of contact, and address
    - displays our org's default settings like locale, language, and time zone
        - this is where we configure the default values for our org, but users can provide personal values in their User Settings
    - displays our organization edition, allocated and used storage space, and the amount of API requests we've made in the past 24 hours, among other information
    - displays our fiscal year and the currencies that our org has
        - <mark>we can enable multiple currencies</mark> for our org - by default, each org can only have one currency at a time
        - to enable multiple currencies, we'll Edit the Company Information page, select the Activate Multiple Currencies Checkbox, and then we'll be able to create multiple currencies and set their exchange rates
        - <mark>once we've enabled this feature, we're unable to disable it in the future</mark>
- <mark>User Licenses</mark>
    - contains information about the total number of licenses for a given license type, how many of that type we've consumed, and how many remain
    - the login-based licenses will be paid for by purchasing a set number of monthly logins for the user holding it (multiple logins on the same day will count as a single login)
- Feature Licenses
    - contains information about the total number of feature licenses for a given license type, how many of that type we've consumed, and how many remain
    - unlike our user licenses, feature licenses bestow access to whatever feature they're related to (there's no need to have permissions enabled on a user's profile or permission set because feature licenses bypass profiles and permission sets)
- Usage-based Entitlements
    - shows the monthly governor limits for relevant features (e.g. API requests) and how many of that monthly limit we have used

## Custom Fiscal Years

[Define Your Fiscal Year (Salesforce Help)](https://help.salesforce.com/articleView?id=admin_about_cfy.htm&type=5)

- we can customize our fiscal year for our orgs by going to the <mark>Fiscal Year</mark> page in setup
- by default, our org has a standard fiscal year that begins on the first day of January every year
- we can make our fiscal year start on the first day of any month in the Gregorian calendar without needing to create a custom fiscal year
- but if we want to change other factors our fiscal year, such as the length of its quarters, we'll need to create a custom fiscal year to do so
    - <mark>once we've enabled custom fiscal years, we're unable to disable the setting in the future</mark>
    - we'll be able to create a fiscal year using one of the available custom fiscal year templates
- when we have custom fiscal years enabled, we
    - lose the ability to use fiscal date functions in SOQL queries
    - lose any existing forecasts that have been created for the first quarter of the first custom fiscal year
    - must define a new custom fiscal year annually
 
## Trusted IPs and MFA

- Salesforce gives us the ability to set up multi-factor authentication (MFA) requirements on a profile-by-profile basis
    - to require MFA, we'll enable the Multi-Factor Authentication for User Interface Logins permission in the System Permissions of the profile
- Trusted IP Ranges
    - effectively a subset of Login IP Ranges
    - <mark>within the Trusted IP Range, users are not required to provide an additional form of authentication, even if their profile has MFA enabled</mark>
    - <mark>when logging from within the Login IP Ranges, but outside of the Trusted IP Range, users whose profiles have MFA enabled, will need to provide an additional form of authentication</mark>
    - Trusted IP Ranges are set on an org-wide basis on the Network Access page in Setup
