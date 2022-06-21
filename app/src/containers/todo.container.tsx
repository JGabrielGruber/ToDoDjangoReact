/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

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
  const resetTodo = useResetRecoilState(todoProvider);
  const navigate = useNavigate();

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
    } else {
      resetTodo();
    }
  };

  useEffect(fetchTodo, []);

  const handleSubmit = (item: Todo) => {
    const data = TodoModel.FromObject(item);
    if (!todo) {
      TodoRepository.create(data.toJSON())
        .then((json) => navigate(json.id))
        .catch((e) => {
          console.error(e);
          setError(true);
        })
        .finally(() => setLoading(false));
    } else {
      TodoRepository.update(data.toJSON())
        .then(fetchTodo)
        .catch((e) => {
          console.error(e);
          setError(true);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleDelete = () => {
    setLoading(true);
    TodoRepository.delete()
      .then(() => navigate('/'))
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const handleBack = () => navigate('/');

  return (
    <TodoView
      loading={loading}
      error={error}
      todo={todo}
      onRefresh={fetchTodo}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onBack={handleBack}
      {...props}
    />
  );
}

TodoContainer.defaultProps = {
  create: false,
};

export default TodoContainer;
