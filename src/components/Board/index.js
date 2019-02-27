import React from "react";
import styles from "./board.module.css";
import Cell from "../Cell";
import SudokuGame from "../../SudokuGame";

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
          onClick={(e) => {
            console.log(e);
            e.stopPropagation();
            this.handleCellClick({ row, column })
          }
        }
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

  /**
   * Causes cursor to move to the next cell. Wraps when it 
   * reaches end of row or column.
   */
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

  /**
   * Gets all values contained in a row
   */
  getRowValues(row, column) {
    const { game } = this.state;
    return game.getRowValues(row);
  }

  /**
   * Gets all values contained in a column
   */
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

  /**
   * Updates game grid and cause a UI rerender
   */
  handleCellUpdate(row, column, value) {
    const { game } = this.state;

    game.getItemAt(row, column).value = value;

    this.setState({
      game: game
    });
  }

  /**
   * Clears the board of any focus state.
   */
  handleWrapperClick() {
    const {game} = this.state;

    game.forEach((item, row, column) => {
      item.isEdit = false;
    })
    this.setState({
      game: game
    })
  }

  /**
   * Checks if the board has been completed.
   */
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
        <div className={styles.wrapper} onClick={() => this.handleWrapperClick()}>
          <div className={styles.grid}>{this.renderCells(rows, columns)}</div>

          <div className={styles['button-group']}>
            <button
              className={styles["check-game-button"]}
              onClick={(e) => {
                e.stopPropagation();
                this.createNewGame()}}
            >
              New Game
            </button>
           
           <button
              className={styles["new-game-button"]}
              onClick={(e) => {
                e.stopPropagation();
                this.checkIfComplete()}}
            >
              Check
            </button>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Board;
