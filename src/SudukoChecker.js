const SudokuChecker = {
  rowCount: 0,
  colCount: 0,
  check(grid, rows, columns) {
    this.rowCount = Number.parseInt(rows);
    this.colCount = Number.parseInt(columns);

    if (
      this.validateRows(grid, this.rowCount) &&
      this.validateColumns(grid, this.colCount) &&
      this.validateSubGrids(grid)
    ) {
      alert("Board is correct");
    } else {
      alert("Board is not correct");
    }
  },

  validateRows(grid, rowCount) {
    for (let row = 0; row < rowCount; row++) {
      const values = this.getRowValues(grid, row, rowCount);
      if (!this.validate(values, rowCount)) return false;
    }

    return true;
  },

  validateColumns(grid, colCount) {
    for (let column = 0; column < colCount; column++) {
      const values = this.getColumnValues(grid, column, colCount);
      if (!this.validate(values, colCount)) return false;
    }
    return true;
  },

  validateSubGrids(grid) {
    return true;
  },

  validate(nums, count) {
    if (new Set(nums).size === count) {
      return true;
    }

    return false;
  },

  getRowValues(grid, row, rowCount) {
    const values = [];

    for (let col = 0; col < rowCount; col++) {
      values.push(grid[row][col]);
    }
    return values;
  },

  getColumnValues(grid, column, colCount) {
    const values = [];

    for (let row = 0; row < colCount; row++) {
      values.push(grid[row][column]);
    }

    return values;
  }
};

export default SudokuChecker;
