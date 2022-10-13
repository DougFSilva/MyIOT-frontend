import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserForm } from 'src/app/models/UserForm';
import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  constructor(private http: HttpClient) { }

  delete(id: string){
    return this.http.delete(`${API_CONFIG.baseUrl}/admin/id=${id}`)
  }

  update(id: string, form: UserForm): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/admin/id=${id}`, form)
  }

  findById(id: string):Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/admin/id=${id}`)
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/admin/email=${email}`)
  }

  findAll():Observable<User[]>{
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/admin`)
  }

  findAllToAprove(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/admin/to-approve`)
  }

  approveRegistration(id: string, approved: boolean): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/admin/approve-registration/id=${id}/${approved}`, null)
  }

}
