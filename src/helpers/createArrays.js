const create2DArray = (rows, columns, cellInitialValue = "") => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    grid[row] = new Array(columns);
    for (let column = 0; column < columns; column++) {
      grid[row][column] =
        typeof cellInitialValue === "object"
          ? Object.create(cellInitialValue)
          : cellInitialValue;
    }
  }

  return grid;
};

export { create2DArray };
