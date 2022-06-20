import React from 'react';
import {
  AppBar,
  Container,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

import { Todo } from '../models/todo.model';
import LoadingComponent from '../components/loading.component';
import ErrorComponent from '../components/error.component';
import ItemComponent from '../components/item.component';

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

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            To Do list
          </Typography>
          <IconButton onClick={handleRefresh} title="Refresh">
            <SyncIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ErrorComponent open={error || false} onRetry={handleRefresh} />
      <LoadingComponent open={loading || false} />
      <Container>
        <List>
          {todos?.map((todo) => (
            <ItemComponent
              key={todo.id}
              to={todo.id}
              title={todo.title}
              description={todo.description}
              edited={todo.edited}
              done={todo.done}
            />
          ))}
        </List>
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
