import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { LoginForm } from 'src/app/models/LoginForm';
import { LoggedUser } from 'src/app/models/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: LoggedUser = {
    user: '',
    token: '',
    profiles: [],
  };
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  authenticate(form: LoginForm) {
    return this.http.post<LoggedUser>(`${API_CONFIG.baseUrl}/auth`, form, {
      observe: 'body',
      responseType: 'json',
    });
  }

  successfullyLogin(loggedUser: LoggedUser) {
    localStorage.setItem('token', loggedUser.token);
    localStorage.setItem('user', loggedUser.user);
    localStorage.setItem('profiles', loggedUser.profiles.toString());
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"])
  }
}
