import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as todoReducers from './todo/todo.reducer';
import { Todo } from '../shared/models/todo.model';

// tslint:disable-next-line:no-empty-interface
export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  todos: todoReducers
};

// -------------------------------------------------------------------
// TODOS SELECTORS
// -------------------------------------------------------------------
export const selectTodosState = createFeatureSelector<todoReducers.TodosState>('todos');

export const selectTodoIds = createSelector(
  selectTodosState,
  todoReducers.selectTodoIds
);
export const selectTodoEntities = createSelector(
  selectTodosState,
  todoReducers.selectTodoEntities
);
export const selectAllTodos = createSelector(
  selectTodosState,
  todoReducers.selectAllTodos
);
export const selectCurrentTodoId = createSelector(
  selectTodosState,
  todoReducers.getSelectedTodoId
);

const emptyTodo: Todo = {
  id: null,
  title: '',
  description: '',
  createdAt: ''
};

export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => {
    return todoId ? todoEntities[todoId] : emptyTodo;
  }
);
