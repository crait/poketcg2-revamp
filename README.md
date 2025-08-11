# Pokemon TCG 2 - Revamp

This is a ROM hack based off of Pokemon TCG 2, for the Gameboy. This ROM hack features a rebalanced approach to card effects/stats for a better gameplay experience, along with a few other tweaks.

## Gameplay Changes

Eventually, this ROM hack will include the following:

- Pokemon evolutions are no longer restricted by exact name matches. 
    - Example: Surfing Pikachu can evolve into Racihu.
    - Example: Dark Ivysaur can evolve into Venusuar.
- Deck construction is limited now limited to 4 of each Pokemon, regardless of naming.
    - Example: Surfing Pikachu, Flying Pikachu, and Pikachu all share the same name, so you can only have 4 of them in total.
- All cards were reviewed and almost every card adjusted so that cards have better balance. (These changes encourage evolution and allow new strategies. There are even some new effects for some cards.)
    - "Big basics" are substantially weakened.
    - Stage 2 Pokemon are much stronger.
- Opponents' decks are tweaked to better align with the new cards. The AI also has been adjusted to account for the deck changes.
- All cards can be acquired through booster packs and normal playthrough. Every card will appear in at least 1 of the opponents' decks.
- AI bug fixes and minor tweaks:
    - The AI no longer targets Mysterious Fossil/Clefairy Doll with Gust of Wind.
    - Jennifer's coin is changed to Pikachu

Tools:
- Created a deck-viewing web tool in order to view card data and NPC decks based off of assembly files.

To see the full list of card changes, please see this [Google Doc](https://docs.google.com/document/d/1UGCQfLr3KFe3WxqPLA96xznlQi7rDZiSahNdYVIH8bE/edit?usp=sharing). Feel free to also leave comments with your thoughts and suggestions.

## Progress

- [ ] Update card pool (Document-only) (378/446)
- [ ] Add card changes to GitHub repository
- [ ] Create card/deck-viewing tool
- [ ] Update decks (0/123)
- [x] Change all battles to use 6 prize cards
- [ ] Update Dark/Misc Pokemon names (0/48)
- [ ] Update Dark Pokemon evolution lines (0/8)
- [ ] Update stat screen to show a DARK symbol
- [ ] Add new splash screen to intro & credits
- [ ] Update POkemon/AI DB from document (0/446)
- [ ] Adjust cards that can be found in each pack (0/8)
- [ ] Fix AI targeting Mysterious Fossil/Clefairy Doll
- [x] Change Jennifer's coin to Pikachu coin
- [ ] Figure out a way to easily re-apply Arty's English patch that can support the changes

## Details

This is based off of pret's disassembly of Pokémon TCG 2 that uses the following ROM as a base:

- `Pokémon Card GB2 - GR Dan Sanjou! (J) [C][!].gbc`
- `sha1: a7e12bcc5f514e3aad8de570fd511aab0a308822`

You can find the original TCG 2 disassembly repo, [here](https://github.com/pret/poketcg2)