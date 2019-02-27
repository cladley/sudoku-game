import { create2DArray } from "./helpers/createArrays";

const sudoku = {
  /**
   * gets the next square in sequence.
   */
  getNextSquare(row, column, board) {
    const boardSize = board[0].length;
    let nextRow = row;
    let nextCol = column;

    if (column + 1 > boardSize - 1) {
      nextCol = 0;
      nextRow = nextRow + 1;
    } else {
      nextCol = column + 1;
    }

    if (nextRow > boardSize - 1) {
      return null;
    } else {
      return {
        row: nextRow,
        col: nextCol,
        value: board[nextRow][nextCol]
      };
    }
  },

  /**
   * Finds the next empty square or return null if at end
   * of board.
   */
  getNextEmptySquare(currentRow, currentColumn, board) {
    let square = this.getNextSquare(currentRow, currentColumn, board);

    while (square !== null && square.value !== 0) {
      square = this.getNextEmptySquare(square.row, square.col, board);
    }

    return square;
  },

  /**
   * Gets all values for a row
   */
  getRow(row, board) {
    return board[row];
  },

  /**
   * Gets all values for a column
   */
  getColumn(column, board) {
    const values = [];
    for (let row = 0; row < board[0].length; row++) {
      values.push(board[row][column]);
    }
    return values;
  },

  /**
   * Gets all values the can be place at board position
   */
  getAllCandidateValues(row, column, board) {
    const valueSet = new Set();
    const allAvailableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const rowValues = this.getRow(row, board);
    const columnValues = this.getColumn(column, board);
    const blockValues = this.getBlock(row, column, board);

    for (let r = 0; r < rowValues.length; r++) {
      valueSet.add(rowValues[r]);
    }

    for (let c = 0; c < columnValues.length; c++) {
      valueSet.add(columnValues[c]);
    }

    for (let b = 0; b < blockValues.length; b++) {
      valueSet.add(blockValues[b]);
    }

    let candidateValues = [];
    for (let v of allAvailableValues) {
      if (!valueSet.has(v)) {
        candidateValues.push(v);
      }
    }
    return candidateValues.sort(() => Math.random() - 0.5);
  },

  /**
   * Get all values for a 3x3 block
   */
  getBlock(row, column, board) {
    const values = [];
    let r = row - (row % 3);
    let c = column - (column % 3);

    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        values.push(board[i][j]);
      }
    }

    return values;
  },

  /**
   * Creates a new board by using a recursive backtracking algorithm
   */
  solve(row, col, board) {
    let nextSquare = this.getNextEmptySquare(row, col, board);

    if (!nextSquare) {
      return true;
    } else {
      let nextRow = nextSquare.row;
      let nextCol = nextSquare.col;

      let allCandidateValues = this.getAllCandidateValues(
        nextRow,
        nextCol,
        board
      );

      for (let i = 0; i < allCandidateValues.length; i++) {
        const currentValue = allCandidateValues[i];
        board[nextRow][nextCol] = currentValue;

        if (this.solve(nextRow, nextCol, board)) {
          return true;
        } else {
          board[nextRow][nextCol] = 0;
        }
      }

      return false;
    }
  },

  /**
   * Loops through board and clear random squares.
   */
  clearRandomSquares(board) {
    for (let row = 0; row < board[0].length; row++) {
      let randomNumber = this.getRandomNumber(3, 5);
      while (randomNumber-- > 0) {
        const randomCol = this.getRandomNumber(0, 8);
        board[row][randomCol] = 0;
      }
    }
  },

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  copyArray(array) {
    return array.map(function(arr) {
      return arr.slice();
    });
  },

  createNewPuzzle() {
    const puzzleArray = create2DArray(9, 9, 0);
    this.solve(0, -1, puzzleArray);
    this.completedArray = this.copyArray(puzzleArray);
    return puzzleArray;
  }
};

export default sudoku;
