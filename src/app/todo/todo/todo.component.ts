import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../todo-service.service';
import { map, tap } from 'rxjs';
import { TodoState } from '../state/todo.model';
import { TodoSelectors } from '../state/todo.selectors';
import { Store } from '@ngrx/store';
import { TodoAction } from '../state/todo.actions';

export interface Todo {
  id: string;
  text: string;
}

@Component({
  selector: 'dl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  form = this.formBuilder.group({
    todo: new FormControl(''),
  });

  editForm = this.formBuilder.group({
    todoToBeEdited: new FormControl(''),
  });

  showEditForm = false;
  todoEdited!: Todo;

  readonly todos$ = this.store.select(TodoSelectors.todos);

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private store: Store<TodoState>
  ) {}

  ngOnInit(): void {
    console.log('heelo there');
    this.store.dispatch(TodoAction.getTodos());
  }

  addTodo() {
    const text = this.form.value.todo;
    if (text) {
      const todo: Todo = {
        id: new Date().getTime().toString(),
        text,
      };
      this.store.dispatch(TodoAction.addTodo({ params: { todo } }));
      this.form.reset();
    } else {
      alert('Please enter a todo');
    }
  }

  editTodo(todo: Todo) {
    this.showEditForm = true;
    this.todoEdited = todo;
    this.editForm.setValue({
      todoToBeEdited: todo.text,
    });
  }

  updateTodo() {
    const updatedTodoText = this.editForm.value.todoToBeEdited;

    if (updatedTodoText) {
      const todo: Todo = {
        id: this.todoEdited.id,
        text: updatedTodoText,
      };
      this.store.dispatch(TodoAction.updateTodo({ params: { todo } }));
      this.form.reset();
      this.showEditForm = false;
    } else {
      alert('Please enter a todo');
    }
  }

  deletedTodo(id: string) {
    if (confirm(`Are you sure you want to delete this todo`)) {
      this.store.dispatch(TodoAction.deleteTodo({ params: { todoId: id } }));
    }
  }
}
