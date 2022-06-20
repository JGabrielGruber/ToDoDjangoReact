import axios from 'axios';
import TodoModel, { TodoJSON } from '../models/todo.model';
import TodoRepository from '../repositories/todo.repository';

// eslint-disable-next-line no-var
var id: number = 0;

// Workaround for JEST Express Error: Cross origin http://localhost forbidden
if (typeof process !== 'undefined') {
  // eslint-disable-next-line global-require
  axios.defaults.adapter = require('axios/lib/adapters/http');
}

test('get todos trough repository', async () => {
  TodoRepository.pathname = ':3000/api/todos';
  const json = await TodoRepository.get();
  expect(json).toMatchObject<Array<TodoJSON>>;
});

test('create todo trough repository', async () => {
  TodoRepository.pathname = ':3000/api/todos/';
  const todo = new TodoModel('App test todo', 'This is a todo created by the app test');
  const json = await TodoRepository.create(todo.toJSON());
  expect(json).toMatchObject<TodoJSON>;
  id = json.id;
});

test('get todo detail trough repository', async () => {
  TodoRepository.pathname = `:3000/api/todos/${id}`;
  const json = await TodoRepository.get();
  expect(json).toMatchObject<TodoJSON>;
});

test('delete todo trough repository', async () => {
  TodoRepository.pathname = `:3000/api/todos/${id}`;
  const json = await TodoRepository.delete();
  expect(json).toBe('');
});
