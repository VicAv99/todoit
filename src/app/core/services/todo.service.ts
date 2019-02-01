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

  constructor(private af: AngularFirestore) { }

  all() {
    this.todoCollection = this.af.collection('todos');
    this.todoCollection.stateChanges().subscribe();
    return this.todoCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Todo;
          const id = a.payload.doc.id;

          return { id, ...data };
        }).sort((a: any, b: any) => {
          return a.createdAt - b.createdAt;
        });
      }));
  }

  create(todo: Todo) {
    const createdAt = new Date().getTime();

    return this.af.collection('todos').add({
      title: '',
      description: todo.description,
      createdAt
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
