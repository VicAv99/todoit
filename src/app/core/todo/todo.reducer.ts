import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from '../../shared/models/todo.model';

import { TodosActions, TodosActionTypes } from './todo.actions';

export interface TodosState extends EntityState<Todo> {
  selectedTodoId: string | null;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();
export const initialState: TodosState = adapter.getInitialState({
  selectedTodoId: null,
});

export function TodosReducer(state = initialState, action: TodosActions): TodosState {
  switch (action.type) {
    case TodosActionTypes.TodoSelected: {
      return Object.assign({}, state, { selectedTodoId: action.payload });
    }

    case TodosActionTypes.TodosLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case TodosActionTypes.TodoAdded: {
      return adapter.addOne(action.payload, state);
    }

    case TodosActionTypes.TodoUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case TodosActionTypes.TodoDeleted: {
      return adapter.removeOne(action.payload.id.toString(), state);
    }

    default:
      return state;
  }
}

export const getSelectedTodoId = (state: TodosState) => state.selectedTodoId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of Todo ids
export const selectTodoIds = selectIds;

// select the dictionary of Todo entities
export const selectTodoEntities = selectEntities;

// select the array of Todos
export const selectAllTodos = selectAll;

// select the total Todo count
export const selectTodoTotal = selectTotal;
