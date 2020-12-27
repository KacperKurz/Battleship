# Battleship

## Api:
### post /
#### description:
adds a new game, while initializing player fields. Waits for both players to post and then gives control back to the first player.
#### requires:
* *id*: unique id of the game that will be created.
* *player*: either 1 or 2; determines which player will be used.
* *board*: table of 100 integers. 0 means emptyness, 1 means part of the ship, 2 means selected emptyness, 3 means selected part of the ship