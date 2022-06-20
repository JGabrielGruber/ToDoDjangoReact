import { atom } from 'recoil';
import TodoModel from '../models/todo.model';
import TodoRepository from '../repositories/todo.repository';

const todoProvider = atom({
  key: 'todoProvider',
  default: async () => {
    const json = await TodoRepository.getDetail();
    return TodoModel.FromJSON(json);
  },
});

export default todoProvider;
