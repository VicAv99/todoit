import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/app/shared/models/user.model';
import { auth } from 'firebase';
import { CoreModule } from '../core.module';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private router: Router,
    private af: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.af.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async login() {
    const provider = new auth.GoogleAuthProvider();
    return await this.oAuthLogin(provider).then(() => {
      this.router.navigateByUrl('/todos');
    });
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  private async oAuthLogin(provider: auth.GoogleAuthProvider) {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.af.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }
}
