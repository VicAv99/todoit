import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { CoreModule } from '../core.module';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.user$.pipe(
      take(1),
      map((user: User) => !!user),
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.notificationsService.notify('You are not authorized', 'Sorry');
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
