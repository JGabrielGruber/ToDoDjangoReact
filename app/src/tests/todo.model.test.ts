import TodoModel, { Todo, TodoJSON } from "../models/todo.model";

test('create instance of todo model', () => {
  const todo = new TodoModel(
    'Test task',
    'This is a test task'
  );
  expect(todo).toBeInstanceOf(TodoModel);
  expect(todo.done).toBeFalsy();
});

test('create instance of todo model from json', () => {
  const todo = TodoModel.FromJSON({
    id: 1,
    title: 'Test task',
    description: 'This is a test task',
    done: false,
    created: '2022-06-20T12:50:14.373920Z',
    edited: '2022-06-20T12:50:14.373920Z'
  });
  expect(todo).toBeInstanceOf(TodoModel);
  expect(todo).toMatchObject<Todo>;
});

test('transform to json an instance of todo model', () => {
  const todo = new TodoModel(
    'Test task',
    'This is a test task'
  );
  const json = todo.toJSON();
  expect(json).toMatchObject<TodoJSON>;
});
