import { Action, createReducer, on } from '@ngrx/store';
import { TodoState } from './todo.model';
import { TodoAction } from './todo.actions';

export const TODO_STATE_KEY = 'todos-section';

const initialState: TodoState = {};

const reducer = createReducer(
  initialState,

  on(
    TodoAction.getTodosSuccess,
    (state: TodoState, action): TodoState => ({
      ...state,
      todos: action.params.todos,
    })
  ),

  on(
    TodoAction.updateTodoSuccess,
    (state: TodoState, action): TodoState => ({
      ...state,
      todoUpdated: action.params.todo,
    })
  )
);

export function todoReducer(state: TodoState, action: Action) {
  return reducer(state, action);
}
