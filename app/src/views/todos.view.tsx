import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SyncIcon from '@mui/icons-material/Sync';

import { Todo } from '../models/todo.model';
import LoadingComponent from '../components/loading.component';
import ErrorComponent from '../components/error.component';
import ItemComponent from '../components/item.component';
import SearchComponent from '../components/search.component';

type TodosViewProps = {
  todos?: Array<Todo>;
  loading?: boolean;
  error?: boolean;
  onRefresh?: CallableFunction;
  search?: string;
  conditionals: Array<string>;
  conditional: number,
  onChangeConditional: CallableFunction;
  orders: Array<string>;
  order: number,
  onChangeOrder: CallableFunction;
  onFind: CallableFunction;
}

function TodosView(props: TodosViewProps) {
  const {
    todos,
    loading,
    error,
    onRefresh,
    search,
    onFind,
    conditionals,
    conditional,
    onChangeConditional,
    orders,
    order,
    onChangeOrder,
  } = props;

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (search) {
      setQuery(search);
    }
  }, [search]);

  const handleChangeQuery = setQuery;

  const handleFind = () => {
    onFind(query);
  };

  const handleChangeOrder = (e: SelectChangeEvent) => {
    onChangeOrder(e.target.value);
  };

  const handleChangeConditional = (e: SelectChangeEvent) => {
    onChangeConditional(e.target.value);
  };

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
          <Grid
            container
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                To Do list
              </Typography>
            </Grid>
            <Grid item container xs={8} spacing={2} direction="row">
              <Grid item md={6}>
                <SearchComponent value={query} onChange={handleChangeQuery} onClick={handleFind} />
              </Grid>
              <Grid item md={3}>
                <FormControl fullWidth>
                  <InputLabel id="sort-select-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={order.toString()}
                    label="Sort"
                    onChange={handleChangeOrder}
                  >
                    {orders.map((item, index) => (
                      <MenuItem key={item} value={index}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3}>
                <FormControl fullWidth>
                  <InputLabel id="done-select-label">Show only</InputLabel>
                  <Select
                    labelId="done-select-label"
                    id="done-select"
                    value={conditional.toString()}
                    label="Done"
                    onChange={handleChangeConditional}
                  >
                    {conditionals.map((item, index) => (
                      <MenuItem key={item} value={index}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={handleRefresh} title="Refresh">
                <SyncIcon />
              </IconButton>
            </Grid>
          </Grid>
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
  search: '',
};

export type { TodosViewProps };

export default TodosView;
