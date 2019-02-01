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

  constructor() { }

  deleteTodo(todo: any) {
    this.deleted.emit(todo);
  }

}
