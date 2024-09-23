interface TodoInterface {
    id: number | string;
    task: string;
    done: boolean;
  }
  //dont reapeat our self
  //define type for func ,better to use type but not must
  type addTodoFn = (todo: string) => void;
  type deleteTodoFn = (id: number | string) => void;
  type toggleTodoFn = (item: TodoInterface) => void;
  //we define types for props or parameter for func