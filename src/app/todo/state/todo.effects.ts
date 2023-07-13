import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from 'src/app/todo-service.service';
import { TodoAction, TodoEffect } from './todo.actions';
import { catchError, from, map, mergeMap, of, tap } from 'rxjs';
import { sort } from '../util';
import { Store } from '@ngrx/store';

@Injectable()
export class TodoEffects {
  constructor(
    private action$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}

  getTodos$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoEffect.GET_TODOS),
      mergeMap(() => {
        return this.todoService.getTodos().pipe(
          map((todos) => {
            return TodoAction.getTodosSuccess({
              params: { todos: sort(todos) },
            });
          })
        );
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoEffect.ADD_TODO),
      mergeMap((action: any) =>
        from(this.todoService.addTodo(action.params.todo)).pipe(
          map(() => TodoAction.getTodos())
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoEffect.UPDATE_TODO),
      mergeMap((action: any) =>
        from(this.todoService.updateTodo(action.params.todo)).pipe(
          tap(() =>
            this.store.dispatch(
              TodoAction.updateTodoSuccess({
                params: { todo: action.params.todo },
              })
            )
          ),
          map(() => TodoAction.getTodos())
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.action$.pipe(
      ofType(TodoEffect.DELETE_TODO),
      mergeMap((action: any) =>
        from(this.todoService.deleteTodo(action.params.todoId)).pipe(
          map(() => TodoAction.getTodos())
        )
      )
    )
  );
}
