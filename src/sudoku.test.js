import * as helpers from "./helpers/createArrays";
import sudoku from "./sudoku";

const dummyBoard = [
  [2, 0, 6, 0, 1, 9, 0, 4, 3],
  [5, 4, 1, 0, 0, 0, 0, 7, 0],
  [9, 0, 8, 4, 0, 7, 6, 1, 0],
  [1, 2, 4, 0, 0, 6, 3, 0, 8],
  [0, 5, 9, 0, 4, 1, 7, 0, 0],
  [0, 8, 7, 0, 0, 5, 1, 9, 0],
  [0, 0, 5, 1, 9, 2, 4, 3, 0],
  [4, 1, 3, 7, 0, 8, 9, 0, 2],
  [0, 9, 2, 0, 6, 4, 5, 8, 0]
];

helpers.create2DArray = jest.fn().mockReturnValue(dummyBoard);

describe("sudoku component", () => {
  let board;

  beforeEach(() => {
    board = helpers.create2DArray(9, 9, 0);
  });

  test("getRow() return a values of row as an array", () => {
    const firstRowValues = dummyBoard[0];
    const row = sudoku.getRow(0, board);
    expect(row).toEqual(firstRowValues);
  });

  test('getColumn() to return values of a column as an array', () => {
    const firstColumnValues = [2,5,9,1,0,0,0,4,0];
    const column = sudoku.getColumn(0, board);
    expect(column).toEqual(firstColumnValues);
  });

  test('getBlock() to return values of 3x3 block as an array', () => {
    const firstBlockValues = [0, 1, 9, 0, 0, 0, 4, 0, 7];
    const block = sudoku.getBlock(0, 4, board);
    expect(block).toEqual(firstBlockValues)
  });

  test('getNextSquare() should return the next square in sequence', () => {
    const expectedNextSquare = {row: 1, col: 0, value: 5};
    const nextSquare = sudoku.getNextSquare(0, 8, board);
    expect(nextSquare).toEqual(expectedNextSquare);
  });

  test('getNextEmptySquare() should return the next empty square in sequence', () => {
    const expectNextEmptySquare = {row: 1, col: 3, value: 0};
    const nextEmpty = sudoku.getNextEmptySquare(1, 0, board);
    expect(nextEmpty).toEqual(expectNextEmptySquare);
  });

  test('getAllCandidateValues() should return all legal values that can go into a square', () => {
    const expectedCandidateValues = [7];
    const candidateValues = sudoku.getAllCandidateValues(0, 1, board);
    expect(candidateValues).toEqual(expectedCandidateValues);
  });
});
