import { useRef } from "react";
import { memo } from "react";
import './App.css';
import { useState } from 'react';
const App = memo(function App() {
  const input = useRef('');
  const [todos, setTodos] = useState([]);

  // Update the input
  const handleChange = e => {
    input.current.value = e.target.value;
  };
  const handleClick = e => {
    // If input is empty, don't do anything
    if (!input.current.value) {
      alert("Input is empty, write something");
      return;
    }

    // Each todo will have a random ID, so we can delete it, and its value
    const todo = {
      id: Math.floor(Math.random() * 1000),
      value: input.current.value
    };

    // Update the list, and reset de input
    setTodos([...todos, todo]);
    input.current.value = '';
  };

  // Delete the corresponding to do
  function deleteItem(id) {
    setTodos(todos.filter(item => item.id !== id));
  }
  return <div className="container">
      <h1>My To Do List</h1>
      
      <div className="input">
        <input type="text" ref={input}></input>
        <button onClick={handleClick}></button>
      </div>

      <ul className="output">
        {todos.map(item => {
        return <li key={item.id}>
                  {item.value}
                  <button onClick={() => deleteItem(item.id)}></button>
                </li>;
      })}
      </ul>
    </div>;
});
export default App;