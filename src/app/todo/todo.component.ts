import { Component, OnInit } from '@angular/core';
import { TodoService } from '../core/services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../shared/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<any[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos$ = this.todoService.all();
  }

}
