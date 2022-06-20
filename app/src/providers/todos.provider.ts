import { atom } from 'recoil';
import { Todo } from '../models/todo.model';

const todosProvider = atom({
  key: 'todosProvider',
  default: {
    keys: [] as number[],
    values: [] as Todo[],
  },
});

export default todosProvider;
