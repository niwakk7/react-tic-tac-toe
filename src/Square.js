import React from 'react';

//マスを作る
//Squareクラスは状態を持たないのでReact.Componentを継承するのではなく
//stateless functional componentsという関数でよいみたいです。

//引数はprops, DOMを返す
function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export default Square;
