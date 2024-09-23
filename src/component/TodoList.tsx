import React from 'react'
import TodoListItem from './TodoListItem';
interface TodoListProps {
  todos: TodoInterface[];
  deleteTodo: deleteTodoFn;
  toggleTodo: toggleTodoFn;
}
// when a function has a parameter we need to define the type of that parameter.
// we can define the types of the parameter with interface or type keyword.
// in react as our functions are React functional components we need to tell this function will be in React.FC type.

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
}) => { // this is func react component will take props we give type 
  return (
    <ul>
     {todos.map((item) => (
        <TodoListItem
          key={item.id}
          todo={item}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  )
}
export default TodoList;
// better to give the type for the fuc componet than props itself