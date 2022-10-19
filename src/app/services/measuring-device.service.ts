import { DateFilter } from 'src/app/models/DateFilter';
import { API_CONFIG } from 'src/app/config/API_CONFIG';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeasuringDevice } from '../models/MeasuringDevice';

@Injectable({
  providedIn: 'root',
})
export class MeasuringDeviceService {
  constructor(private http: HttpClient) {}

  create(form: MeasuringDevice): Observable<MeasuringDevice> {
    return this.http.post<MeasuringDevice>(
      `${API_CONFIG.baseUrl}/measuring-device`,
      form
    );
  }

  deleteById(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/measuring-device/id=${id}`);
  }

  deleteByUser() {
    return this.http.delete(`${API_CONFIG.baseUrl}/measuring-device/all`);
  }

  updateById(id: string, form: MeasuringDevice): Observable<MeasuringDevice> {
    return this.http.put<MeasuringDevice>(
      `${API_CONFIG.baseUrl}/measuring-device/id=${id}`,
      form
    );
  }

  findById(id: string, measurementLimit: number): Observable<MeasuringDevice> {
    return this.http.get<MeasuringDevice>(
      `${API_CONFIG.baseUrl}/measuring-device/id=${id}/measurement-limit=${measurementLimit}`
    );
  }

  findAllByUser(measurementLimit: number): Observable<MeasuringDevice[]> {
    return this.http.get<MeasuringDevice[]>(
      `${API_CONFIG.baseUrl}/measuring-device/all/measurement-limit=${measurementLimit}`
    );
  }

  findAllByUserAndTimeRange(measurementLimit: number, filter: DateFilter): Observable<MeasuringDevice[]> {
    return this.http.get<MeasuringDevice[]>(
      `${API_CONFIG.baseUrl}/measuring-device/all/date=${filter.initialDate}to${filter.finalDate}/time=${filter.initialTime}to${filter.finalTime}/measurement-limit=${measurementLimit}`
    );
  }

  findAll(): Observable<MeasuringDevice[]> {
    return this.http.get<MeasuringDevice[]>(
      `${API_CONFIG.baseUrl}/measuring-device`
    );
  }
}
