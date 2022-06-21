/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import TodoModel, { Todo } from '../models/todo.model';

import todosProvider from '../providers/todos.provider';
import TodoRepository from '../repositories/todo.repository';
import TodosView from '../views/todos.view';

function TodosContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getParams = () => new URLSearchParams(global.location.search);

  const [order, setOrder] = useState(() => {
    switch (getParams().get('ordering')) {
      case 'edited':
        return 1;
      case '-created':
        return 2;
      case 'created':
        return 3;
      default:
        return 0;
    }
  });
  const [conditional, setConditional] = useState(() => {
    switch (getParams().get('conditional')) {
      case 'done':
        return 1;
      case '-done':
        return 2;
      default:
        return 0;
    }
  });

  const [todos, setTodos] = useRecoilState(todosProvider);
  const navigate = useNavigate();

  const fetchTodos = () => {
    setLoading(true);
    TodoRepository.get()
      .then((json) => {
        const keys: Array<number> = [];
        const values: Array<Todo> = [];
        json.forEach((item) => {
          const todo = TodoModel.FromJSON(item);
          if (todo.id) {
            keys.push(todo.id);
            values.push(todo);
          }
        });
        setTodos({
          keys,
          values,
        });
        setError(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchTodos, []);

  const conditionals = ['Both', 'Done', 'Not done'];
  const handleChangeConditional = (index: number) => {
    const params = getParams();
    setConditional(index);
    switch (index) {
      case 1:
        params.set('conditional', 'done');
        break;
      case 2:
        params.set('conditional', '-done');
        break;
      default:
        params.delete('conditional');
    }
    navigate(`/?${params.toString()}`);
    fetchTodos();
  };

  const orders = ['Edited desc', 'Edited asc', 'Created desc', 'Created asc'];
  const handleChangeOrder = (index: number) => {
    const params = getParams();
    setOrder(index);
    switch (index) {
      case 1:
        params.set('ordering', 'edited');
        break;
      case 2:
        params.set('ordering', '-created');
        break;
      case 3:
        params.set('ordering', 'created');
        break;
      default:
        params.delete('ordering');
    }
    navigate(`/?${params.toString()}`);
    fetchTodos();
  };

  const handleFind = (query: string) => {
    const params = getParams();
    if (query !== '') {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    navigate(`/?${params.toString()}`);
    fetchTodos();
  };

  return (
    <TodosView
      loading={loading}
      error={error}
      todos={todos.values}
      onRefresh={fetchTodos}
      conditionals={conditionals}
      onChangeConditional={handleChangeConditional}
      orders={orders}
      onChangeOrder={handleChangeOrder}
      search={getParams().get('search') || ''}
      onFind={handleFind}
      order={order}
      conditional={conditional}
    />
  );
}

export default TodosContainer;
