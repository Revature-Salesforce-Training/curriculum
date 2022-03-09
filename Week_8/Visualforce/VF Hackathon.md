## Visualforce Hackathon

Teams will create a Pokédex that will use the [Poke API](https://pokeapi.co/) and allow users to view information about 
Pokémon through a Visualforce user interface.

## Requirements

- Each team should create a Pokedex pulling information from the PokeAPI that will be surfaced
via Visualforce.

- Create a Visualforce page and associated custom Apex code (either through a custom controller
or controller extension).

As a whole, the team must have
  * At least one Visualforce page that makes use of the <apex:param> standard component.
  * At least one Visualforce page that overrides a standard button or action.

The team should implement sound and logical branching strategies using version control, in addition to
working in paired programming.

## Stretch goals

* Battling
  * A user should be able to select a team of six Pokémon from the Pokedex to do battle.
  * They should then be able to battle against either a team pulled from another org or a randomly generated team of six.
  * There should be some form of competition between the local team and the retrieved team (although the parameters of this and the determination of the winner are up to the team’s implementation/preferences).

* Pokémon Teams
  * Each development team must expose a RESTful webservice containing one or more prebuilt Pokémon teams (along with the relevant information for all included Pokémon) that other orgs can consume.
  * A user should be able to save Pokémon teams that they have created for use in later battles.

* The team should make use of platform events that will be fired once a battle is completed. These events should be handled by either an appropriate declarative tool or Apex trigger and update a win-loss field on the team record (if it exists) with the result of the battle.