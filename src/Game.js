import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      stepNumber: 0,
      history: [{
        squares: Array(9).fill({ value: null, highlighted: false }),
        location: null
      }],
      xIsNext: true,
      ascending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i].value) {
      return;
    }

    squares[i] = { value: this.state.xIsNext ? 'X' : 'O', highlighted: false };
    const winLine = calculateWinner(squares);
    if (winLine) {
      for (let j of winLine) {
        squares[j] = { value: squares[j].value, highlighted: true };
      }
    }
    const x = (i % 3) + 1;
    const y = Math.floor(i / 3) + 1;
    this.setState({
      stepNumber: history.length,
      history: history.concat([{
        squares: squares,
        location: {
          x: x,
          y: y
        }
      }]),
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });
  }

  toggleOrder() {
    this.setState({
      ascending: !this.state.ascending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winLine = calculateWinner(current.squares);
    const descending = !this.state.ascending;

    let status;
    if (winLine) {
      status = 'Winner: ' + current.squares[winLine[0]].value;
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    }

    let moves = history.map((step, move) => {
      let desc = step.location ? 'Move (' + step.location.x + ', ' + step.location.y + ')' : 'Game start';
      if (move === this.state.stepNumber) {
        desc = <b>{desc}</b>;
      }
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    if (descending) {
      moves.sort((a, b) => { return b.key - a.key; });
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div><button onClick={() => this.toggleOrder()}>Toggle order</button></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
      return [a, b, c];
    }
  }
  return null;
}

export default Game;
