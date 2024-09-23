import React, { useEffect, useState } from 'react';
import TodoForm from '../component/TodoForm'
import TodoList from '../component/TodoList';
import axios, { AxiosError } from 'axios';
import { useTodos } from '../context/TodoContext';

const url = 'https://66c3d5edd057009ee9c15082.mockapi.io/api/todos';

// interface TodoInterface {
//   id: number | string;
//   task: string;
//   done: boolean;
// }

// type TodoInterface {
//     id: number | string;
//     task: string;
//     done: boolean;
// }

const Home = () => {

  const {todos, getTodos, addTodo, deleteTodo, toggleTodo} = useTodos();
  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  // setTodos(['Todo 1', 'Todo 2']);
  //   setTodos([
  //     { id: 1, task: 'Todo 1', done: false },
  //     { id: 2, task: 'Todo 2', done: false },
  //   ]);
  return (
    <div className="main">
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default Home;
