import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { TodosState } from './todo.reducer';
import { TodoService } from '../services/todo.service';
import {
  TodosActionTypes,
  LoadTodos,
  TodosLoaded,
  AddTodo,
  TodoAdded,
  UpdateTodo,
  TodoUpdated,
  TodoDeleted,
  DeleteTodo
} from './todo.actions';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { of } from 'rxjs';

@Injectable({ providedIn: CoreModule })
export class TodosEffects {
  @Effect()
  loadTodos$ = this.dataPersistence.fetch(TodosActionTypes.LoadTodos, {
    run: (action: LoadTodos, state: TodosState) => {
      return this.todoService.all().pipe(map((res: any[]) => new TodosLoaded(res)));
    },
    onError: (action: LoadTodos, error: any) => {
      this.notificationsService.notify(error);
    }
  });

  @Effect()
  addProject$ = this.dataPersistence.pessimisticUpdate(TodosActionTypes.AddTodo, {
    run: (action: AddTodo, state: TodosState) => {
      return of(this.todoService.create(action.payload)).pipe(
        map((res: any) => new TodoAdded(res))
      );
    },

    onError: (action: AddTodo, error) => {
      this.notificationsService.notify(error);
    }
  });

  @Effect()
  updateProject$ = this.dataPersistence.pessimisticUpdate(TodosActionTypes.UpdateTodo, {
    run: (action: UpdateTodo, state: TodosState) => {
      // No clue why this works only like this...
      return of(this.todoService.update(action.payload.id).update(action.payload)).pipe(
        map((res: any) => new TodoUpdated(action.payload))
      );
    },

    onError: (action: UpdateTodo, error) => {
      this.notificationsService.notify(error);
    }
  });

  @Effect()
  deleteTodo$ = this.dataPersistence.pessimisticUpdate(TodosActionTypes.DeleteTodo, {
    run: (action: DeleteTodo, state: TodosState) => {
      return of(this.todoService.delete(action.payload).delete()).pipe(
        map(_ => new TodoDeleted(action.payload))
      );
    },

    onError: (action: DeleteTodo, error) => {
      this.notificationsService.notify(error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TodosState>,
    private todoService: TodoService,
    private notificationsService: NotificationsService
  ) {}
}
