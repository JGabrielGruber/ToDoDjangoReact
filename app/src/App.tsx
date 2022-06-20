import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TodosContainer from './containers/todos.container';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodosContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
