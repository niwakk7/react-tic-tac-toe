import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return <Square key={i}
                   value={this.props.squares[i].value}
                   onClick={() => this.props.onClick(i)}
                   highlighted={this.props.squares[i].highlighted} />;
  }

  renderRow(i) {
    let squares = [];
    const start = i * 3;
    for (let j = start; j < start + 3; j++) {
      squares.push(this.renderSquare(j));
    }
    return (
      <div key={i} className="board-row">
        {squares}
      </div>
    );
  }

  render() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;
