import axios from 'axios';

import { TodoJSON } from '../models/todo.model';

class TodoRepository {
  static pathname: string = '/api/todos';

  static listURL() {
    return new URL([
      global.location.protocol,
      '//',
      global.location.host,
      this.pathname,
      global.location.search,
    ].join(''));
  }

  static detailURL() {
    return new URL([
      global.location.protocol,
      '//',
      global.location.host,
      this.pathname,
      global.location.pathname,
      '/',
    ].join(''));
  }

  static async get(): Promise<Array<TodoJSON>> {
    return axios
      .get(this.listURL().toString())
      .then((response) => response.data);
  }

  static async getDetail(): Promise<TodoJSON> {
    return axios
      .get(this.detailURL().toString())
      .then((response) => response.data);
  }

  static async create(data: TodoJSON) {
    return axios
      .post(this.listURL().toString(), data)
      .then((response) => response.data);
  }

  static async update(data: TodoJSON) {
    return axios
      .put(this.detailURL().toString(), data)
      .then((response) => response.data);
  }

  static async delete() {
    return axios
      .delete(this.detailURL().toString())
      .then((response) => response.data);
  }
}

export default TodoRepository;
