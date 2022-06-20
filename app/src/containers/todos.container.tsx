/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import TodoModel, { Todo } from '../models/todo.model';

import todosProvider from '../providers/todos.provider';
import TodoRepository from '../repositories/todo.repository';
import TodosView, { TodosViewProps } from '../views/todos.view';

function TodosContainer(props: TodosViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [todos, setTodos] = useRecoilState(todosProvider);

  const fetchTodos = () => {
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
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  };

  useEffect(fetchTodos, []);

  return (
    <TodosView
      loading={loading}
      error={error}
      todos={todos.values}
      onRefresh={fetchTodos}
      {...props}
    />
  );
}

export default TodosContainer;
