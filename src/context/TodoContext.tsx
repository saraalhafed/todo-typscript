import { createContext, useContext, useState } from "react";
import axios, { AxiosError } from 'axios';
const url = 'https://66c3d5edd057009ee9c15082.mockapi.io/api/todos';
interface TodoContextInterface {
    todos: TodoInterface[];//array inclue all the  todo objcts 
    getTodos: () => void;
    addTodo: addTodoFn;
    toggleTodo: toggleTodoFn;
    deleteTodo: deleteTodoFn;
}

const TodoContext = createContext<TodoContextInterface | undefined>(undefined);
//inistaily is undefined (we create an context ),than we need to 
// in feauture kan have value has this type TodoContextInterface

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {// to tell ts this is func component and this is children, this line to defined the type of children for ts
    const [todos, setTodos] = useState<TodoInterface[]>([]);//need add type for todos state

    const getTodos = async () => {  //dont need to add type for func because has no parameter
        try {
          const { data } = await axios.get<TodoInterface[]>(url);//type of data wich we recievie from api, is optional to add it 
                                                              
          setTodos(data);                                   
        } catch (error) {
          console.log(error);
        }
      };
    
      // const addTodo = async (todo: string) => { i define the type not for parameter itself but for the func
      const addTodo: addTodoFn = async (todo) => {
        //creat obj and add it to the api
        const todoObj = {
          task: todo, // wich inside p the taxt
          done: false,
        };
    
        try {
          const { data } = await axios<TodoInterface>({
            method: 'POST',
            url,
            data: todoObj,
          });
    
          setTodos([...todos, data]); //we keep this array as it(maybe there are another todos,not empty array) and add new todo 
          getTodos(); //to see all todos (old and new)
        } catch (error) {
          // first chekc the type of error. if the error in that type then we can accces these fields
          if (error instanceof AxiosError) {
            // console.log(error.response?.data || error.message || error);
            console.log(error.response?.data);
          }
    
          // error.message exist if the type of error is Error class
          // by adding a type guard we can check if the error is an instance of Error
          if (error instanceof Error) {
            console.log(error.message);
          }
    
          console.log(error);
        }
      };
    
      const deleteTodo: deleteTodoFn = async (id) => {
        try {
          await axios.delete(`${url}/${id}`);
          getTodos();
        } catch (error) {
          console.log(error);
        }
      };
    
      const toggleTodo: toggleTodoFn = async (item) => {
           // item is an obj,here we defind the type for the func itself
        try {
          await axios({
            method: 'PUT',
            url: `${url}/${item.id}`,
            data: {
              ...item,
              done: !item.done,
            },
          });
    
          getTodos();
        } catch (error) {
          console.log(error);
        }
      };
    
      return (
        <TodoContext.Provider
          value={{ todos, getTodos, addTodo, toggleTodo, deleteTodo }}
        >
          {children}
        </TodoContext.Provider>
      );
    };
    //custom hook
    
    export const useTodos = (): TodoContextInterface => {
        const context = useContext(TodoContext);
        if (!context) {// initaly this func is undefind
          throw new Error('useTodos must be used within a TodoProvider');
        }
        return context;//than when we add todo we have 
      };
      ;