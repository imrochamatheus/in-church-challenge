import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AppEvent } from './event.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private readonly http: HttpClient) {}

  public getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${environment.apiUrl}/events`);
  }
}
