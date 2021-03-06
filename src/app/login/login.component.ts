import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

}
