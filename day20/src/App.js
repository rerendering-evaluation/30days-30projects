import { useRef } from "react";
import { useCallback } from "react";
import { memo } from "react";
import './App.css';
import { useState } from 'react';
import DarkTheme from './components/DarkTheme';
const Square = memo(function Square({
  handleClick,
  value
}) {
  return <button className='square' onClick={handleClick}>{value}</button>;
});
const App = memo(function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const bool = useRef(true);
  const handleClick = i => {
    if (calculateWinner() || squares[i]) {
      return;
    }
    squares[i] = bool.value ? 'X' : '0';
    setSquares(squares);
    bool.current = !bool.current.value;
  };
  function calculateWinner() {
    const winningPossibilities = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < winningPossibilities.length; i++) {
      const [a, b, c] = winningPossibilities[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  const handleRestart = () => {
    bool.current = true;
    setSquares(Array(9).fill(null));
  };
  const winner = calculateWinner();
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${bool.value ? 'X' : 'O'}`;
  }
  return <div className='container'>
      <DarkTheme />
      <div className='row'>
        <Square value={squares[0]} handleClick={useCallback(() => handleClick(0), [])} />
        <Square value={squares[1]} handleClick={useCallback(() => handleClick(1), [])} />
        <Square value={squares[2]} handleClick={useCallback(() => handleClick(2), [])} />
      </div>
      <div className='row'>
        <Square value={squares[3]} handleClick={useCallback(() => handleClick(3), [])} />
        <Square value={squares[4]} handleClick={useCallback(() => handleClick(4), [])} />
        <Square value={squares[5]} handleClick={useCallback(() => handleClick(5), [])} />
      </div>
      <div className='row'>
        <Square value={squares[6]} handleClick={useCallback(() => handleClick(6), [])} />
        <Square value={squares[7]} handleClick={useCallback(() => handleClick(7), [])} />
        <Square value={squares[8]} handleClick={useCallback(() => handleClick(8), [])} />
      </div>
      <div className='status'>{status}</div>
      <button className='restart' onClick={handleRestart}>Restart</button>
    </div>;
});
export default App;