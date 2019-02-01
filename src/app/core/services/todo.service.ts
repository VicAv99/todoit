import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Todo } from 'src/app/shared/models/todo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoCollection: AngularFirestoreCollection<Todo>;
  individualTodo: AngularFirestoreDocument;

  constructor(private af: AngularFirestore) {
    this.todoCollection = this.af.collection('todos');
  }

  all() {
    return this.todoCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;

          return { id, data };
        }).sort((a: any, b: any) => {
          return a.data.createdAt - b.data.createdAt;
        });
      }));
  }

  create(todo: Todo) {
    const timestamp = new Date().getTime();
    todo.createdAt = timestamp;

    return this.af.collection('todos').add({
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt
    });
  }

  update(todo: Todo) {
    this.individualTodo = this.af.doc(`todos/${todo.id}`);
    this.individualTodo.update(todo);
  }

  delete(id: any) {
    return this.af.doc(`todos/${id}`);
  }
}
