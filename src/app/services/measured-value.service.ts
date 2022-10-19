import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MeasuredValue } from 'src/app/models/Measuredvalue';
import { DateFilter } from 'src/app/models/DateFilter';
import { API_CONFIG } from 'src/app/config/API_CONFIG';

@Injectable({
  providedIn: 'root',
})
export class MeasuredValueService {
  constructor(private http: HttpClient) {}

  create(form: MeasuredValue): Observable<MeasuredValue> {
    return this.http.post<MeasuredValue>(
      `${API_CONFIG.baseUrl}/measured-value`,
      form
    );
  }

  deleteById(deviceId: string, id: string) {
    return this.http.delete(
      `${API_CONFIG.baseUrl}/measured-value/device-id=${deviceId}/id=${id}`
    );
  }

  deleteAllByDevice(deviceId: string) {
    return this.http.delete(
      `${API_CONFIG.baseUrl}/measured-value/device-id=${deviceId}`
    );
  }

  deleteByTimeRange(deviceId: string, filter: DateFilter) {
    return this.http.delete(
      `${API_CONFIG.baseUrl}/measured-value/device-id=${deviceId}/date=${filter.initialDate}to${filter.finalDate}/time=${filter.initialTime}to${filter.finalTime}`
    );
  }

  findAllByDevice(
    deviceId: string,
    limit: number
  ): Observable<MeasuredValue[]> {
    return this.http.get<MeasuredValue[]>(
      `${API_CONFIG.baseUrl}/measured-value/device-id=${deviceId}/limit=${limit}`
    );
  }

  findByTimeRange(
    deviceId: string,
    filter: DateFilter
  ): Observable<MeasuredValue[]> {
    return this.http.get<MeasuredValue[]>(
      `${API_CONFIG.baseUrl}/measured-value/device-id=${deviceId}/date=${filter.initialDate}to${filter.finalDate}/time=${filter.initialTime}to${filter.finalTime}`
    );
  }
}
