import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.user$.pipe(
      take(1),
      map((user: User) => !!user),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
