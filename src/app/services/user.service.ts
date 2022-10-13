import { UserUpdatePasswordForm } from './../models/UserUpdatePasswordForm';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserForm } from 'src/app/models/UserForm';
import { User } from 'src/app/models/User';
import { API_CONFIG } from 'src/app/config/API_CONFIG';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(form: UserForm): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/user`, form);
  }

  delete() {
    return this.http.delete(`${API_CONFIG.baseUrl}/user`);
  }

  update(form: UserForm): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/user`, form);
  }

  updatePassword(form: UserUpdatePasswordForm): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/user/password/`, form)
  }

  find(): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/user`)
  }
}
