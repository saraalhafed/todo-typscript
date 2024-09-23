import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoProvider } from './context/TodoContext';

const root = ReactDOM.createRoot(
  // here we try to access the root element from index.html
  // if it doesn't exist, it will throw an error
  // we are sure that in our html file we have a div with this id
  // now we need to gurantee that it exists to TypeScript
  // to gurantee that it we use (as) keyword

  document.getElementById('root') as HTMLElement // garanty for js ,access the dom element and it is html
);
root.render(
<TodoProvider>
    <App />
  </TodoProvider>
);

