import React, { useState } from 'react'

interface TodoFormProps {
  //way1 addTodo: (todo: string) => void;
  //way2 in types file more easy to use it in multiple component ,hear and home
  addTodo: addTodoFn;
}
//for each component i need interface to defind the type of his props

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
   // const [input, setInput] = React.useState('');
  
  //in this case we dont need import usesatate
  const [input, setInput] = useState('');
  //const handleChange = (e) => {
    // here typescript only sees a function has a parameter called e
    // and complains about the type of e variable
     // we have to define the type of e variable
    // e is an event object so we can define it as React.ChangeEvent<HTMLInputElement>
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setInput(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {// 
    e.preventDefault();
    addTodo(input);
    setInput('');
  };
//clickevent we dont need to define a type of e ,we
// for the click events normally we dont need to have the event details
    // if event details is needed than we can define the the type of e variable
    // e: React.MouseEvent<HTMLButtonElement>
    // this is a just example how to define click events
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert('Button clicked!');
  };
  return (
    <div className="input-form">
      <form className="form" onSubmit={handleSubmit}>

 
        <input
          type="text"
          className="input-task"
          placeholder="Enter a todo..."
          value={input}
          // here typescript automatically infers the type of the input and dont complain what is e variale
           // onChange={(e) => setInput(e.target.value)}
           onChange={handleChange}//ts has no problem here with the input ,but when this value outside (because we need to used in differant places) we have to give it a type 
        />
         <button
          className="btn-hover btn-color"
          type="submit"
          onClick={handleClick}
        >
          Add New Todo
        </button>
      </form>
    </div>
  )
}
export default TodoForm;