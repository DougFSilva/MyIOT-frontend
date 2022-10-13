import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/API_CONFIG';
import { DiscreteDevice } from '../models/DiscreteDevice';
import { DiscreteDeviceForm } from '../models/DiscreteDeviceForm';

@Injectable({
  providedIn: 'root'
})
export class DiscreteDeviceService {

  constructor(private http: HttpClient) { }

  create(form: DiscreteDeviceForm):Observable<DiscreteDevice> {
    return this.http.post<DiscreteDevice>(`${API_CONFIG.baseUrl}/discrete-device`, form)
  }

  deleteById(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/discrete-device/id=${id}`)
  }

  deleteByUser() {
    return this.http.delete(`${API_CONFIG.baseUrl}/discrete-device/all`)
  }

  updateById(id: string, form : DiscreteDeviceForm): Observable<DiscreteDevice> {
    return this.http.put<DiscreteDevice>(`${API_CONFIG.baseUrl}/discrete-device/id=${id}`, form)
  }

  publishStatusOnBrokerMqtt(id: string, status: boolean) {
    return this.http.post(`${API_CONFIG.baseUrl}/discrete-device/id=${id}/status=${status}`, null)
  }

  findById(id : string): Observable<DiscreteDevice> {
    return this.http.get<DiscreteDevice>(`${API_CONFIG.baseUrl}/discrete-device/id=${id}`)
  }

  findAllByUser() : Observable<DiscreteDevice[]> {
    return this.http.get<DiscreteDevice[]>(`${API_CONFIG.baseUrl}/discrete-device/all`)
  }

  findAll(): Observable<DiscreteDevice[]> {
    return this.http.get<DiscreteDevice[]>(`${API_CONFIG.baseUrl}/discrete-device/`)
  }
}
