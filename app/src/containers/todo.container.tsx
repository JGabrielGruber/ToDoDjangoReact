/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Navigate } from 'react-router-dom';

import TodoModel, { Todo } from '../models/todo.model';
import todoProvider from '../providers/todo.provider';
import TodoRepository from '../repositories/todo.repository';
import TodoView, { TodoViewProps } from '../views/todo.view';

interface TodoContainerProps extends TodoViewProps {
  create?: boolean
}

function TodoContainer(props: TodoContainerProps) {
  const { create } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [todo, setTodo] = useRecoilState(todoProvider);

  const fetchTodo = () => {
    if (!create) {
      setLoading(true);
      TodoRepository.getDetail()
        .then((json) => {
          setTodo(TodoModel.FromJSON(json));
          setError(false);
        })
        .catch((e) => {
          console.error(e);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(fetchTodo, []);

  const handleSubmit = (item: Todo) => {
    const data = TodoModel.FromObject(item);
    if (!todo) {
      TodoRepository.create(data.toJSON())
        .then((json) => <Navigate to={json.id} />)
        .catch((e) => {
          console.error(e);
          setError(true);
        });
    } else {
      TodoRepository.update(data.toJSON())
        .then(fetchTodo)
        .catch((e) => {
          console.error(e);
          setError(true);
        });
    }
  };

  return (
    <TodoView
      loading={loading}
      error={error}
      todo={todo}
      onRefresh={fetchTodo}
      onSubmit={handleSubmit}
      {...props}
    />
  );
}

TodoContainer.defaultProps = {
  create: false,
};

export default TodoContainer;
