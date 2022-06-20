import React from 'react';
import {
  AppBar, Container, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography,
} from '@mui/material';
import { Todo } from '../models/todo.model';

type TodosViewProps = {
  todos?: Array<Todo>;
  loading?: boolean;
  error?: boolean;
}

function TodosView(props: TodosViewProps) {
  const { todos, loading, error } = props;
  const renderTodos = () => {
    if (error) {
      return (
        <p>error</p>
      );
    } if (loading) {
      return (
        <p>loading</p>
      );
    }
    return (
      <List>
        {todos?.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemButton>
              <ListItemText primary={todo.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {renderTodos()}
      </Container>
    </>
  );
}

TodosView.defaultProps = {
  todos: [],
  loading: false,
  error: false,
};

export default TodosView;
