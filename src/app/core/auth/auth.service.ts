import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/app/shared/models/user.model';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private router: Router,
    private af: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  login() {
    const provider = new auth.GoogleAuthProvider();

    return this.oAuthLogin(provider);
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
