import { Injectable, ɵisBoundToModule } from '@angular/core';
import { Todo } from './create-student/create-student.component';
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosRef = collection(this.firestore, environment.collectionId);

  constructor(private firestore: Firestore) {}

  getTodos(): Observable<any[]> {
    const queryTodos = query(this.todosRef);
    return collectionData(queryTodos);
  }

  addTodo(todo: Todo) {
    return addDoc(this.todosRef, todo);
  }

  async updateTodo(todo: Todo) {
    let queryTodo = query(this.todosRef, where('id', '==', todo.id));
    const querySnapshot = await getDocs(queryTodo);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, environment.collectionId, document.id);
      await updateDoc(docRef, { ...todo });
    });
  }

  async deleteTodo(id: string) {
    let queryTodo = query(this.todosRef, where('id', '==', id));
    const querySnapshot = await getDocs(queryTodo);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, environment.collectionId, document.id);
      await deleteDoc(docRef);
    });
  }
}
