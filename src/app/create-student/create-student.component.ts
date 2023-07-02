import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo-service.service';
import { map, tap } from 'rxjs';

export interface Todo {
  id: string;
  text: string;
}

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  form = this.formBuilder.group({
    todo: new FormControl(''),
  });

  editForm = this.formBuilder.group({
    todoToBeEdited: new FormControl(''),
  });

  showEditForm = false;
  todoEdited!: Todo;

  todos$ = this.todoService.getTodos().pipe(
    map((todos) =>
      todos.sort((a: Todo, b: Todo) => {
        var textA = a.text.toUpperCase();
        var textB = b.text.toUpperCase();

        if (textA < textB) {
          return -1;
        }
        if (textA > textB) {
          return 1;
        }

        return 0;
      })
    )
  );

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  addTodo() {
    const text = this.form.value.todo;
    if (text) {
      const todo: Todo = {
        id: new Date().getTime().toString(),
        text,
      };
      this.todoService.addTodo(todo);
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
      this.todoService.updateTodo(todo);
      this.form.reset();
      this.showEditForm = false;
    } else {
      alert('Please enter a todo');
    }
  }

  deletedTodo(id: string) {
    if (confirm(`Are you sure you want to delete this todo`)) {
      this.todoService.deleteTodo(id);
    }
  }
}
