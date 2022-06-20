import { atom } from 'recoil';
import TodoModel, { Todo } from '../models/todo.model';
import TodoRepository from '../repositories/todo.repository';

const todosProvider = atom({
  key: 'todosProvider',
  default: async () => {
    const keys: Array<number> = [];
    const values: Array<Todo> = [];
    const json = await TodoRepository.get();
    json.forEach((item) => {
      const todo = TodoModel.FromJSON(item);
      if (todo.id) {
        keys.push(todo.id);
        values.push(todo);
      }
    });
    return {
      keys: [] as number[],
      values: [] as Todo[],
    };
  },
});

export default todosProvider;
