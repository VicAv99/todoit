import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as todoReducers from './todo/todo.reducer';

// tslint:disable-next-line:no-empty-interface
export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  todos: todoReducers
};
