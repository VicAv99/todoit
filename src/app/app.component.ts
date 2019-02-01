import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './core/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Todo It';
  userInstance$: Observable<User>;
  links = [
    { path: '/todos', icon: 'loyalty', label: 'TODOS' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.userInstance$ = authService.user$;
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
