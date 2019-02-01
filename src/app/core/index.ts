import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodos from './todo/todo.reducer';
import { Todo } from '../shared/models/todo.model';

export interface AppState {
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: fromTodos.todosReducer
};

// -------------------------------------------------------------------
// TODOS SELECTORS
// -------------------------------------------------------------------
export const selectTodosState = createFeatureSelector<fromTodos.TodosState>('todos');

export const selectTodoIds = createSelector(
  selectTodosState,
  fromTodos.selectTodoIds
);
export const selectTodoEntities = createSelector(
  selectTodosState,
  fromTodos.selectTodoEntities
);
export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodos.selectAllTodos
);
export const selectCurrentTodoId = createSelector(
  selectTodosState,
  fromTodos.getSelectedTodoId
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
