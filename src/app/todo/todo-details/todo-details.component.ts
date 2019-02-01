import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Todo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {
  selectedTodo: Todo;
  @Input() group: FormGroup;
  @Input() set todo(value: Todo) {
    this.selectedTodo = Object.assign({}, value);
  }
  @Output() added = new EventEmitter();

  constructor() { }

  addTodo() {
    this.added.emit(this.group.value);
  }

}
