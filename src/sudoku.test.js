import { create2DArray } from "./helpers/createArrays";
import sudoku from "./sudoku";

const setBoardToInitialValue = board => {
  board[0][0] = 1;
  board[0][3] = 2;
};

describe("sudoku component", () => {
  let board;

  beforeEach(() => {
    board = create2DArray(9, 9, 0);
  });

  test("getRow() return a values of row as an array", () => {
    const row = sudoku.getRow(0, board);
    expect(row).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
