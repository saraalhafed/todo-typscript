import React from 'react';
import Home from './pages/Home';

const App = () => {
  return<div className="container">
  <div className="form-control">
    <h2 className="text">Todo App with TypeScript</h2>
    <div className="form">
      <Home/>
    </div>
  </div>
</div>
};

export default App;
