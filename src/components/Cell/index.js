import React from "react";
import NumberInput from "../NumberInput";
import styles from "./cell.module.css";

class Cell extends React.Component {
  onDirectionKeyPress = key => {
    let direction = "";

    switch (key) {
      case "ArrowUp":
        direction = "Up";
        break;
      case "ArrowDown":
        direction = "Down";
        break;
      case "ArrowLeft":
        direction = "Left";
        break;
      case "ArrowRight":
      case "Tab":
        direction = "Right";
        break;
      default:
        direction = "Right";
    }

    this.props.onDirectionChange(direction);
  };

  render() {
    const { value, isEdit, onCellUpdate, onClick } = this.props;

    return (
      <div className={styles.cell} onClick={(e) => onClick(e)}>
        {isEdit ? (
          <NumberInput
            autoFocus
            value={value}
            onEnterPress={(e) => onClick(e)}
            onKeyPress={this.onDirectionKeyPress}
            onKeyDown={this.onDirectionKeyPress}
            onChange={e => onCellUpdate(e.target.value)}
          />
        ) : (
          value
        )}
      </div>
    );
  }
}

export default Cell;
