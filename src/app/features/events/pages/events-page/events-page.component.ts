import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { catchError, EMPTY, take } from 'rxjs';

import { AppEvent } from '../../data-access/event.models';
import { EventService } from '../../data-access/event.service';
import { EventCardComponent } from '../../ui/event-card/event-card.component';

@Component({
  selector: 'app-events-page',
  imports: [EventCardComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss',
})
export class EventsPageComponent implements OnInit {
  public events: AppEvent[] = [];

  constructor(private readonly eventService: EventService) {}

  public ngOnInit(): void {
    this.eventService
      .getEvents()
      .pipe(
        take(1),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((events) => {
        this.events = events;
      });
  }

  public editEvent(eventId: string): void {}

  public deleteEvent(eventId: string): void {}
}
