import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.model';
import { TODO_STATE_KEY } from './todo.reducer';

const todoState = createFeatureSelector<TodoState>(TODO_STATE_KEY);

export const TodoSelectors = {
  state: todoState,
  todos: createSelector(todoState, (state) => state.todos),
};
