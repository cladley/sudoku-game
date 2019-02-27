import { create2DArray } from "./helpers/createArrays";
import sudoku from "./sudoku";

class SudokuGame {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.createNewGame();
  }

  createNewGame() {
    this.gameBoard = sudoku.createNewPuzzle();
    this.completedGameBoard = this.copyArray(this.gameBoard);
    this.clearRandomSquares(this.gameBoard);

    this.grid = create2DArray(this.rows, this.columns, {
      isEdit: false,
      value: ""
    });

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.getItemAt(row, column).value = this.transformValue(
          this.gameBoard[row][column]
        );
      }
    }
  }

  copyArray(array) {
    return array.map(function(arr) {
      return arr.slice();
    });
  }

  clearRandomSquares(board) {
    for (let row = 0; row < board[0].length; row++) {
      let randomNumber = this.getRandomNumber(3, 5);
      while (randomNumber-- > 0) {
        const randomCol = this.getRandomNumber(0, 8);
        board[row][randomCol] = 0;
      }
    }
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkIfCorrect(board) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        
        if(!this.grid[row][col].value) return;

        if (parseInt(this.grid[row][col].value) !== this.completedGameBoard[row][col]) {
          return false;
        }
      }
    }

    return true;
  }

  transformValue(value) {
    if (value === 0) return "";
    return value;
  }

  getGridArray() {
    return this.grid;
  }

  getItemAt(row, column) {
    return this.grid[row][column];
  }

  getRowValues(row) {
    const values = [];
    for (let col = 0; col < this.columns; col++) {
      values.push(this.grid[row][col]);
    }
    return values;
  }

  getColumnValues(column) {
    const values = [];
    for (let row = 0; row < this.rows; row++) {
      values.push(this.grid[row][column]);
    }

    return values;
  }

  forEach(callback) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        callback(this.grid[row][col], row, col);
      }
    }
  }
}

export default SudokuGame;
