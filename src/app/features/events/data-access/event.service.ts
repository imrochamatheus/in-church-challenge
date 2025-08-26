import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { AppEvent, ListParams, ListResult } from './event.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private readonly http: HttpClient) {}

  public getById(id: string): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${environment.apiUrl}/events/${id}`);
  }

  public getEvents(params: ListParams): Observable<ListResult<AppEvent>> {
    const httpParams = new HttpParams().set('order', 'desc');

    return this.http
      .get<AppEvent[]>(`${environment.apiUrl}/events`, { params: httpParams })
      .pipe(
        map((response) => {
          const total = response.length;

          const page = Math.max(1, Number(params.page) || 1);
          const limit = Math.max(1, Number(params.limit) || total || 1);

          const start = (page - 1) * limit;
          const end = start + limit;

          const items = response
            .slice(start, end)
            .map((event) => ({ ...event }));

          return { items, total } as ListResult<AppEvent>;
        })
      );
  }
}
