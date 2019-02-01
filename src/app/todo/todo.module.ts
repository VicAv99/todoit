import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/auth/auth.guard';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [TodoComponent, TodoListComponent, TodoDetailsComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TodoModule { }
