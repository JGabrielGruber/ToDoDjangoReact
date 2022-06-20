import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoContainer from './containers/todo.container';

import TodosContainer from './containers/todos.container';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodosContainer />} />
        <Route path="/new" element={<TodoContainer create />} />
        <Route path="/:id" element={<TodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
