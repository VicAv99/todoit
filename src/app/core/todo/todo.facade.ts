import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllTodos, selectCurrentTodo } from '..';
import { TodosActionTypes } from './todo.actions';
import * as TodosActions from './todo.actions';
import { TodosState } from './todo.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodosFacade {
  allTodos$ = this.store.pipe(select(selectAllTodos));
  currentTodo$ = this.store.pipe(select(selectCurrentTodo));

  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === TodosActionTypes.AddTodo
        || action.type === TodosActionTypes.UpdateTodo
        || action.type === TodosActionTypes.DeleteTodo
      )
    );

  constructor(private store: Store<TodosState>, private actions$: ActionsSubject) {}

  selectTodo(itemId: any) {
    this.store.dispatch(new TodosActions.TodoSelected(itemId));
  }

  loadTodos() {
    this.store.dispatch(new TodosActions.LoadTodos());
  }

  addTodo(item: any) {
    this.store.dispatch(new TodosActions.AddTodo(item));
  }

  updateTodo(item: any) {
    this.store.dispatch(new TodosActions.UpdateTodo(item));
  }

  deleteTodo(item: any) {
    this.store.dispatch(new TodosActions.DeleteTodo(item));
  }
}
