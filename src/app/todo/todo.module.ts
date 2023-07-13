import { TODO_STATE_KEY, todoReducer } from './state/todo.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { TodoComponent } from './todo/todo.component';
import { TodoEffects } from './state/todo.effects';

@NgModule({
  declarations: [TodoComponent],
  exports: [TodoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StoreModule.forFeature(TODO_STATE_KEY, todoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodoModule {}
