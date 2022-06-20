import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { Link } from 'react-router-dom';

import TodoModel, { Todo } from '../models/todo.model';
import LoadingComponent from '../components/loading.component';
import ErrorComponent from '../components/error.component';

type TodoViewProps = {
  todo?: Todo;
  loading?: boolean;
  error?: boolean;
  onRefresh?: CallableFunction;
  onSubmit?: CallableFunction;
}

function TodoView(props: TodoViewProps) {
  const {
    todo,
    loading,
    error,
    onRefresh,
    onSubmit,
  } = props;

  const [local, setLocal] = useState<Todo>(new TodoModel('', ''));

  useEffect(() => {
    if (todo) {
      setLocal(todo);
    }
  }, [todo]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLocal({ ...local, title: value });
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLocal({ ...local, description: value });
  };

  const handleChangeDone = () => {
    setLocal({ ...local, done: !local.done });
  };

  const handleCancel = () => {
    if (todo) {
      setLocal(todo);
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(local);
    }
    return false;
  };

  return (
    <>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Link to="/">todos</Link>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            { todo ? todo.title : 'New To Do' }
          </Typography>
          <IconButton onClick={handleRefresh} title="Refresh">
            <SyncIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="form" onSubmit={handleSubmit}>
        <LoadingComponent open={loading || false} />
        <ErrorComponent open={error || false} onRetry={handleRefresh} />
        <FormControl fullWidth>
          <OutlinedInput
            fullWidth
            placeholder="A resume for your to do"
            name="title"
            onChange={handleChangeTitle}
            required
            title="Title"
            value={local?.title}
          />
        </FormControl>
        <FormControl fullWidth>
          <OutlinedInput
            fullWidth
            placeholder="Describe what you need to do"
            multiline
            name="description"
            onChange={handleChangeDescription}
            required
            title="Description"
            value={local?.description}
          />
        </FormControl>
        <FormControlLabel
          control={(
            <Switch
              checked={local.done}
              onChange={handleChangeDone}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          )}
          label="Done"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button disabled={!todo && todo === local} onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button type="submit">Save</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

TodoView.defaultProps = {
  todo: undefined,
  loading: false,
  error: false,
  onRefresh: () => { },
  onSubmit: () => { },
};

export type { TodoViewProps };

export default TodoView;
