import React from "react";
import styles from "./board.module.css";
import Cell from "../Cell";
import SudokuGame from "../../SudokuGame";
import { create2DArray } from "../../helpers/createArrays";
import SudukoChecker from "../../SudukoChecker";
import sudoku from "../../sudoku";

class Board extends React.Component {
  state = {
    game: null
  };

  constructor(props) {
    super(props);
    let root = document.documentElement;
    root.style.setProperty("--rows", props.rows);
    root.style.setProperty("--columns", props.columns);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.game === null) {
      return {
        game: new SudokuGame(nextProps.rows, nextProps.columns)
      };
    }

    return null;
  }

  renderCells(rows, columns) {
    const { game } = this.state;
    const cells = [];
    let count = 0;

    game.forEach((item, row, column) => {
      cells.push(
        <Cell
          key={count++}
          row={row}
          column={column}
          onClick={() => this.handleCellClick({ row, column })}
          onCellUpdate={value => this.handleCellUpdate(row, column, value)}
          onDirectionChange={direction =>
            this.moveToNextCell(direction, row, column)
          }
          value={item.value}
          isEdit={item.isEdit}
        />
      );
    });

    return cells;
  }

  moveToNextCell(direction, currentRow, currentColumn) {
    const { game } = this.state;
    const { rows, columns } = this.props;
    let nextRow = currentRow;
    let nextCol = currentColumn;

    if (direction === "Up") {
      nextRow = nextRow - 1 < 0 ? rows - 1 : nextRow - 1;
    }

    if (direction === "Down") {
      nextRow = nextRow + 1 > rows - 1 ? 0 : nextRow + 1;
    }

    if (direction === "Left") {
      nextCol = nextCol - 1 < 0 ? columns - 1 : nextCol - 1;
    }

    if (direction === "Right") {
      nextCol = nextCol + 1 > columns - 1 ? 0 : nextCol + 1;
    }

    game.forEach((item, row, col) => {
      item.isEdit = false;
      if (row === nextRow && col === nextCol) {
        item.isEdit = true;
      }
    });

    this.setState({
      game: game
    });
  }

  getRowValues(row, column) {
    const { game } = this.state;
    return game.getRowValues(row);
  }

  getColumnValues(row, column) {
    const { game } = this.state;
    return game.getColumnValues(row);
  }

  handleCellClick = ({ row, column }) => {
    const { game } = this.state;
    game.getItemAt(row, column).isEdit = !game.getItemAt(row, column).isEdit;

    this.setState({
      game: game
    });
  };

  handleCellUpdate(row, column, value) {
    const { game } = this.state;
    game.getItemAt(row, column).value = value;

    this.setState({
      game: game
    });
  }

  // This is for when we are checking to see if we have a winner
  gatherValuesForChecking() {
    const { game } = this.state;
    const { rows, columns } = this.props;
    const gridNumbers = create2DArray(rows, columns);

    game.forEach((item, row, column) => {
      gridNumbers[row][column] = Number.parseInt(item.value);
    });

    return gridNumbers;
  }

  // This is for when we are checking to see if we have a winner
  checkIfComplete() {
    const { game } = this.state;
    if (game.checkIfCorrect()) {
      alert("It is correct");
    } else {
      alert("It is not correct");
    }
  }

  createNewGame() {
    const { rows, columns } = this.props;

    const game = new SudokuGame(rows, columns);
    this.setState({
      game
    });
  }

  render() {
    const { rows, columns } = this.props;
    return (
      <React.Fragment>
        <div className={styles.grid}>{this.renderCells(rows, columns)}</div>
        <button
          className={styles["new-game-button"]}
          onClick={() => this.checkIfComplete()}
        >
          Check
        </button>

        <button
          className={styles["check-game-button"]}
          onClick={() => this.createNewGame()}
        >
          New Game
        </button>
      </React.Fragment>
    );
  }
}

export default Board;
