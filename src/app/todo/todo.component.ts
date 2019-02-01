import { Component, OnInit } from '@angular/core';
import { TodoService } from '../core/services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../shared/models/todo.model';
import { TodosFacade } from '../core/todo/todo.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  form: FormGroup;
  todos$: Observable<any[]> = this.todoFacade.allTodos$;
  currentTodo$: Observable<any> = this.todoFacade.currentTodo$;

  constructor(
    private todoFacade: TodosFacade,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.todoFacade.loadTodos();
    this.initForm();
  }

  selectTodo(todo: Todo) {
    this.todoFacade.selectTodo(todo.id);
    this.form.patchValue(todo);
  }

  saveTodo(todo: any) {
    console.log(todo);
    todo.id ? this.todoFacade.updateTodo(todo) :
      this.todoFacade.addTodo(todo);
  }

  deleteTodo(todo: any) {
    this.todoFacade.deleteTodo(todo);
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      description: ['', Validators.required]
    });
  }

}
