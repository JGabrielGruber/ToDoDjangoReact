import React from 'react';
import {
  AppBar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { Link } from 'react-router-dom';

import { Todo } from '../models/todo.model';

type TodosViewProps = {
  todos?: Array<Todo>;
  loading?: boolean;
  error?: boolean;
  onRefresh?: CallableFunction;
}

function TodosView(props: TodosViewProps) {
  const {
    todos,
    loading,
    error,
    onRefresh,
  } = props;

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    return false;
  };

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
            <Link to={`${todo.id}`}>
              <ListItemText primary={todo.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todos
          </Typography>
          <IconButton onClick={handleRefresh} title="Refresh">
            <SyncIcon />
          </IconButton>
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
  onRefresh: () => { },
};

export type { TodosViewProps };

export default TodosView;
