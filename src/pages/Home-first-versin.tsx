import React, { useEffect, useState } from 'react'
import  TodoForm  from '../component/TodoForm';
import  TodoList from '../component/TodoList';
import axios, { AxiosError } from 'axios';


const url = "https://66c3d5edd057009ee9c15082.mockapi.io/api/todos"
//we need to tell ts what the type of this obj
// with type we can define every thing
//for global type  make seperat file,automaticly recognise this type and use it without export
//interface/ type (custom type create our own type): to define type for obj 
/* interface TodoInterface {
  id: number | string;
  task: string;
  done: boolean;
} */
//in this array we will have this type every obj will be in this shap

// type TodoInterface {
//     id: number | string;
//     task: string;
//     done: boolean;
// }
 const Home = () => {
  
  
  // here we define an array. We need to also tell what we are going to store in this array. We here tell this array will contain objects in it. And every object will contain id, task and done. To tell this we define an interface.
  const [todos, setTodos] = useState<TodoInterface[]>([]);
//fetch data and stor that in state
const getTodos = async () => {
  try {
    const { data } = await axios.get<TodoInterface[]>(url); //this data contain this type ,the data will be in this shaps
      setTodos(data);
  } catch (error) {
    console.log(error);
  }
};

 // const addTodo = async (todo: string) => {
  const addTodo: addTodoFn = async (todo) => {
  const todoObj = {
    task: todo,
    done: false,
  };

  try {
    const { data } = await axios<TodoInterface>({ // data wich created in api ,data will be in this type ,its for ts 
      method: 'POST',
      url,
      data: todoObj,
    });

    setTodos([...todos, data]);
      getTodos();

  } catch (error) {
    console.log(error);

// first chekc the type of error. if the error in that type then we can accces these fields
if (error instanceof AxiosError) {
  // console.log(error.response?.data || error.message || error);
  //if we have axios error than i see the first one 
  console.log(error.response?.data);
}




     // error.message exist if the type of error is Error class
      // by adding a type guard we can check if the error is an instance of Error
      if (error instanceof Error) {
        console.log(error.message);
      }

      
  }
};


const deleteTodo: deleteTodoFn = async (id) => {
  try {
    await axios.delete(`${url}/${id}`);
      getTodos();
  }
  catch (error) {
    console.log(error);
  }
}

const toggleTodo: toggleTodoFn = async (item) => {
  try {
    await axios({
      method: 'PUT', // as api doc 
      url: `${url}/${item.id}`,
      data: {
       // ...item, if i dont kow how api work ,it better to have 
        done: !item.done,//we keep everything as it and we chang just done part in the respons data
      },
    });

    getTodos();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getTodos();
}, []);

console.log(todos);
  //setTodos(['Todo 1', 'Todo 2']); //ts give error to define type for this variable,
 /*  setTodos([
    { id: 1, task: 'Todo 1', done: false },
    { id: 2, task: 'Todo 2', done: false },
  ]); */
  return (
    <div className='main'>
  
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
      {/* /ts give error if ther is no props todos and what kind of types for this props  */}


    </div>
  )
}
export default Home;
