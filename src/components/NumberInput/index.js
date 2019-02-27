import React from "react";

class NumberInput extends React.Component {
  componentDidMount() {
    this.element.setSelectionRange(0,1);
  }

  handleInputChange = e => {
    const value = e.target.value;

    if (value === "" || (!isNaN(value) && Number.parseInt(value) > 0 && Number.parseInt(value) < 10)) {
      this.props.onChange(e);
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.onEnterPress(e);
    }

    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab"
    ) {
      e.preventDefault();
      this.props.onKeyPress(e.key);
    }
  };

  render() {
    const { value } = this.props;
    return (
      <input
        ref={element => this.element = element}
        value={value}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        autoFocus
      />
    );
  }
}

export default NumberInput;
