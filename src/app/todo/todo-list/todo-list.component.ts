import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos: Todo[];

  constructor() {
    console.log(this.todos);
  }

}
