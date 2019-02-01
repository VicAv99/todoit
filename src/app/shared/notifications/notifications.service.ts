import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  notify(message: string, action = '') {
    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}
