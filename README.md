# Sudoku Game

## Technical Information
Technolgies used in game creation.
+ Javascript
+ Css Modules
+ React

## Sudoku algorithm
To create a new game, I first create a solved board and then remove 
some cells to create a challenge for the player.

To create a solved board, I step through each blank square in sequence. I gather up 
all values that are in the square's same row, column and 3x3 block. With this
list I then compare with all valid numbers and extract numbers that have not been used yet.
I pick a number at random from this list and place in the squre and then move to the next empty square. 
If I do not have anymore valid numbers to place and I have not reached the end of the board, this means
that the board is incorrect. With this, I go back to the previous square I was at and try a different number.
This is called a recursive backtracking algorithm.  

## Instructions for use

To run the game 
+ npm run start

To run the tests
+ npm run test

Player can navigate the board by either clicking into a cell with the mouse or using
the arrow and tab keys.

Player can create a brand new board by clicking on the 'New Game' button.

Player can check if thay have completed the board correctly by clicking the 'Check' button.

## Further development
With more time to develop the game I would like to add a number of different things.

+ Have a difficulty option to create harder games
+ Option to create different sized boards.
+ Improve styling so that it works nicely for mobile.
+ Give option to show user the completed board.
+ Analyze the algorithm to improve performance.
+ Create a range of tests to fully test the game.
