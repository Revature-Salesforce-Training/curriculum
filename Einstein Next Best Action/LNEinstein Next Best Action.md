# Module - Einstein Next Best Action

[Longform](<./LFEinstein Next Best Action.md>)

## Einstein Next Best Action

[Next Best Action](https://help.salesforce.com/s/articleView?id=sf.einstein_next_best_action.htm&type=5)

* predictive modeling is pretty common to be used nowadays
    * we use this to create connections between data points that aren't immediately obvious or are really complicated
    * the name we give to these "connections" are called `Insights` (this ties in with other Einstein features)
* Salesforce has its own AI called Einstein that can a lot of this heavy lifting for us
    * the extent of these features we won't cover here, but it's important to understand what is being referenced by "Einstein"
* the problem with predictive modeling is that the result of all this analysis and computation ends up being a number
    * data analysts are tasked with not only coming up with this predictive model, but also interpreting what the number means for our business
* once we have the number and know what the number means, how to we actually act upon that information?
* this is where `Next Best Action` comes into play, at the end of the chain of the prediction process

## Recommendations

[Recommendations](https://help.salesforce.com/s/articleView?id=sf.nba_recommendations_app.htm&type=5)

Recommendations

* these represent an actionable suggestion
* in order to make this more digestable, lets take an example of exercise
* each recommendation has a few parts to it:
    1. the proposal (`Name` and `Description` fields)
        - You should run daily
        - Running is good for your cardiovascular health
    2. the agreement (`Acceptance Label` field)
        - Ok, I will
    3. the rejection (`Rejection Label` field)
        - Not for me
    4. the action if they agree (`Action` field)
        - They run every single day
* so in the context of our business, these are suggestions made about what to do with a record
    * for example, you might have a recommendation to call about a special promotion on a Contact record

Creating Recommendations

* to create a Recommendation, we open up the `App Manager` and search for `Recommendations`
    * alternatively, if the `Recommendation` tab has already been added to an app, we can navigate to the `Recommendations` tab
* once on the `Recommendation` tab, we can click `New` at the top right and make our first Recommendation
* `Recommendations` have the following fields to fill out
    * `Name` (Optionally displayed under the Image)
    * `Image` (Optionally displayed at the top of the Recommendation in a banner)
    * `Description` (Optionally displayed under Name)
    * `Acceptance Label` (Text on the top button to accept the Recommendation)
    * `Rejection Label` (Text on the bottom button to reject the Recommendation)
    * `Action` (Flow that gets launched when the top button is clicked)
* the `Action` MUST be a Flow, and it can only be a Screen Flow or Autolaunched Flow
    * if the Flow is invalid or not active, the Recommendation will not be displayed

## Einstein Strategy Builder

[Strategy Builder](https://help.salesforce.com/s/articleView?id=sf.nba_strategy_builder.htm&type=5)

* if we have lots of Recommendations, how do we choose which to use?
* also, some may not be appropriate in certain contexts
* this is where our Action Strategies come in, built with the `Einstein Strategy Builder`

Action Strategies

* accessed by `Setup` > `Strategies` > `Next Best Action`
* set up on an Object by Object basis
* Action Strategies are created much like a Flow is
* the main features here are going to be the Recommendations and the Logic
* use the `Load` element to load in Recommendations to a branch
* use `Branch Logic` as logic gates using information on the record
* use `Recommendation Logic` as filters and sorts
    * sorts become important when there are multiple valid Recommendations
    * NBA can only display so many, which is configured when dragging in the `Einstein Next Best Action` component
    

## Einstein Next Best Action Component

[NBA Component](https://help.salesforce.com/s/articleView?id=sf.nba_admin_using_strategies.htm&type=5)

* in order to display our Recommendations, we use the `Einstein Next Best Action` component
    * accessible through the `Lightning App Builder`
* once it's on the page, we can configure our last few fields about how Recommendations are displayed
    * note that this is where we can optionally choose to display certain Recommendation fields like `Image`, `Description`, and `Name`
* after that, our actions are ready to be recommended
