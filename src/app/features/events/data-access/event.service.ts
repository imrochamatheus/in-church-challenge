import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventCardModel } from './event.models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private readonly http: HttpClient) {}

  public getEvents(): Observable<EventCardModel[]> {
    return this.http.get<EventCardModel[]>(`${environment.apiUrl}/events`);
  }
}
