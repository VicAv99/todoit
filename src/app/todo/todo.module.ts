import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../core/auth/auth.guard';

const routes: Route[] = [
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TodoModule { }
