import { Todo } from '../todo/todo.component';

export interface TodoState {
  todos?: Todo[];
  todoUpdated?: Todo;
}
