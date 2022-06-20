import React from 'react';
import { Paper } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import TodoContainer from './containers/todo.container';
import TodosContainer from './containers/todos.container';

function App() {
  return (
    <Paper sx={{ minHeight: '100vh', borderRadius: 0 }}>
      <Routes>
        <Route path="/" element={<TodosContainer />} />
        <Route path="/new" element={<TodoContainer create />} />
        <Route path="/:id" element={<TodoContainer />} />
      </Routes>
    </Paper>
  );
}

export default App;
