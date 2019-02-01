import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Output() deleted = new EventEmitter();
  @Output() selected = new EventEmitter();

  constructor() { }

  selectTodo(todo: Todo) {
    this.selected.emit(todo);
  }

  deleteTodo(todo: any) {
    this.deleted.emit(todo);
  }

}
