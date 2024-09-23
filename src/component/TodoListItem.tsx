import React from 'react';

interface TodoListItemProps {
  todo: TodoInterface;
  deleteTodo: deleteTodoFn;
  toggleTodo: toggleTodoFn;
}
const TodoListItem: React.FC<TodoListItemProps> = ({todo,
  deleteTodo,
  toggleTodo }) => {
    return (
    <li>
       <p
        onClick={() => toggleTodo(todo)} // change the done value
        className={todo.done ? 'checked' : ''}// for the style 
      >
        {todo.task} {/* we need just the text part  */}
      </p>
      <span className="task-icons" onClick={() => deleteTodo(todo.id)}>
        ✖️
      </span>
    </li>
  )
}
export default TodoListItem;
/* from postman we check the todo : 
  {
        "task": "walk the dog",
        "isDone": false,
        "done": false,
        "id": "1"
    }, */