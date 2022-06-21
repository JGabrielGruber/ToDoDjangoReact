import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TodoModel, { Todo } from '../models/todo.model';
import LoadingComponent from '../components/loading.component';
import ErrorComponent from '../components/error.component';

type TodoViewProps = {
  todo?: Todo;
  loading?: boolean;
  error?: boolean;
  onRefresh?: CallableFunction;
  onSubmit?: CallableFunction;
  onDelete?: CallableFunction;
  onBack?: CallableFunction;
}

function TodoView(props: TodoViewProps) {
  const {
    todo,
    loading,
    error,
    onRefresh,
    onSubmit,
    onDelete,
    onBack,
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

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (todo) {
      setLocal(todo);
    }
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(local);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Button onClick={handleBack} startIcon={<ArrowBackIcon />} size="small">
            back
          </Button>
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
        <Grid container spacing={4} direction="column">
          <Grid item md={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                placeholder="A resume for your to do"
                name="title"
                onChange={handleChangeTitle}
                required
                label="Title"
                value={local?.title}
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                placeholder="Describe what you need to do"
                multiline
                name="description"
                onChange={handleChangeDescription}
                required
                label="Description"
                value={local?.description}
              />
            </FormControl>
          </Grid>
          <Grid item md={3}>
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
          </Grid>
          { todo ? (
            <>
              <Grid item md={3}>
                <Typography>
                  {`Created ${local.created?.toLocaleString()}`}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography>
                  {`Edited ${local.edited?.toLocaleString()}`}
                </Typography>
              </Grid>
            </>
          ) : '' }
          <Grid container item spacing={2} direction="row">
            <Grid item xs={12} sm={12} md={3}>
              <Button color="error" fullWidth disabled={!todo} onClick={handleDelete} variant="outlined">
                Delete
              </Button>
            </Grid>
            <Grid item xs={0} md={3}>
              <Box sx={{ flexGrow: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button color="warning" fullWidth disabled={!todo && todo === local} onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button color="primary" fullWidth variant="contained" type="submit">Save</Button>
            </Grid>
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
  onDelete: () => { },
  onBack: () => { },
};

export type { TodoViewProps };

export default TodoView;
