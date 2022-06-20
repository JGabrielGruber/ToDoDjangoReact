import { atom } from 'recoil';
import { Todo } from '../models/todo.model';

const todoProvider = atom<Todo>({
  key: 'todoProvider',
  default: undefined,
});

export default todoProvider;
