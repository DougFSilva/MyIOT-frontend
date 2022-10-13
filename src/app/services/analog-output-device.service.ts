import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnalogOutputDeviceForm } from 'src/app/models/AnalogOutputDeviceForm';
import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { AnalogOutputDevice } from 'src/app/models/AnalogOutputDevice';

@Injectable({
  providedIn: 'root'
})
export class AnalogOutputDeviceService {

  constructor(private http : HttpClient) { }

  create(form: AnalogOutputDeviceForm):Observable<AnalogOutputDevice> {
    return this.http.post<AnalogOutputDevice>(`${API_CONFIG.baseUrl}/analog-output-device`, form)
  }

  deleteById(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/analog-output-device/id=${id}`)
  }

  deleteByUser() {
    return this.http.delete(`${API_CONFIG.baseUrl}/analog-output-device/all`)
  }

  updateById(id: string, form : AnalogOutputDeviceForm): Observable<AnalogOutputDevice> {
    return this.http.put<AnalogOutputDevice>(`${API_CONFIG.baseUrl}/analog-output-device/id=${id}`, form)
  }

  publishOutputOnBrokerMqtt(id: string, output: number) {
    return this.http.post(`${API_CONFIG.baseUrl}/analog-output-device/id=${id}/output=${output}`, null)
  }

  findById(id : string): Observable<AnalogOutputDevice> {
    return this.http.get<AnalogOutputDevice>(`${API_CONFIG.baseUrl}/analog-output-device/id=${id}`)
  }

  findAllByUser() : Observable<AnalogOutputDevice[]> {
    return this.http.get<AnalogOutputDevice[]>(`${API_CONFIG.baseUrl}/analog-output-device/all`)
  }

  findAll(): Observable<AnalogOutputDevice[]> {
    return this.http.get<AnalogOutputDevice[]>(`${API_CONFIG.baseUrl}/analog-output-device/`)
  }

}
