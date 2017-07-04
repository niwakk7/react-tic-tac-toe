import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    let className = 'square';
    if (this.props.highlighted) {
      className += ' highlighted';
    }
    return (
      <button className={className} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
