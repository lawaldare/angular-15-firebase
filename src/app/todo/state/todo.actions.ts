import { createAction, props } from '@ngrx/store';
import { Todo } from '../todo/todo.component';

const GET_TODOS = '[Homepage] Get Todos';
const GET_TODOS_SUCCESS = `${GET_TODOS} successfully`;

const ADD_TODO = '[Homepage] Add Todo';

const UPDATE_TODO = '[Homepage] Update Todo';
const UPDATE_TODO_SUCCESS = `${UPDATE_TODO} successfully`;

const DELETE_TODO = '[Homepage] Delete Todo';

export const TodoEffect = {
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
};

export const TodoAction = {
  getTodos: createAction(GET_TODOS),
  getTodosSuccess: createAction(
    GET_TODOS_SUCCESS,
    props<{ params: { todos: Todo[] } }>()
  ),
  addTodo: createAction(ADD_TODO, props<{ params: { todo: Todo } }>()),
  updateTodo: createAction(UPDATE_TODO, props<{ params: { todo: Todo } }>()),
  updateTodoSuccess: createAction(
    UPDATE_TODO_SUCCESS,
    props<{ params: { todo: Todo } }>()
  ),
  deleteTodo: createAction(
    DELETE_TODO,
    props<{ params: { todoId: string } }>()
  ),
};
