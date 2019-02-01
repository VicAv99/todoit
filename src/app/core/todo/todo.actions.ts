import { Action } from '@ngrx/store';
import { Todo } from 'src/app/shared/models/todo.model';

export enum TodosActionTypes {
  TodosAction = '[Todos] Action',
  TodoSelected = '[Todos] Selected',
  LoadTodos = '[Todos] Load Data',
  TodosLoaded = '[Todos] Data Loaded',
  AddTodo = '[Todos] Add Data',
  TodoAdded = '[Todos] Data Added',
  UpdateTodo = '[Todos] Update Data',
  TodoUpdated = '[Todos] Data Updated',
  DeleteTodo = '[Todos] Delete Data',
  TodoDeleted = '[Todos] Data Deleted'
}

export class Todos implements Action {
  readonly type = TodosActionTypes.TodosAction;
}

export class TodoSelected implements Action {
  readonly type = TodosActionTypes.TodoSelected;
  constructor(public payload) {}
}

export class LoadTodos implements Action {
  readonly type = TodosActionTypes.LoadTodos;
  constructor() {}
}

export class TodosLoaded implements Action {
  readonly type = TodosActionTypes.TodosLoaded;
  constructor(public payload: Todo[]) {}
}

export class AddTodo implements Action {
  readonly type = TodosActionTypes.AddTodo;
  constructor(public payload: Todo) {}
}

export class TodoAdded implements Action {
  readonly type = TodosActionTypes.TodoAdded;
  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodosActionTypes.UpdateTodo;
  constructor(public payload: Todo) {}
}

export class TodoUpdated implements Action {
  readonly type = TodosActionTypes.TodoUpdated;
  constructor(public payload: Todo) {}
}

export class DeleteTodo implements Action {
  readonly type = TodosActionTypes.DeleteTodo;
  constructor(public payload: Todo) {}
}

export class TodoDeleted implements Action {
  readonly type = TodosActionTypes.TodoDeleted;
  constructor(public payload: Todo) {}
}

export type TodosActions =
  | Todos
  | TodoSelected
  | LoadTodos
  | TodosLoaded
  | AddTodo
  | TodoAdded
  | UpdateTodo
  | TodoUpdated
  | DeleteTodo
  | TodoDeleted;
