import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { Grid3x3, LucideAngularModule, Table } from 'lucide-angular';

import { AppEvent } from '../../data-access/event.models';
import { EventService } from '../../data-access/event.service';
import { EventCardComponent } from '../../ui/event-card/event-card.component';
import { EventsTableComponent } from '../../ui/events-table/events-table.component';

type ViewMode = 'cards' | 'table';

@Component({
  selector: 'app-events-page',
  imports: [
    CommonModule,
    PaginatorModule,
    EventCardComponent,
    LucideAngularModule,
    EventsTableComponent,
  ],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss',
})
export class EventsPageComponent {
  public readonly rows = signal(8);
  public readonly page = signal(0);
  public readonly total = signal(0);
  public readonly loading = signal(false);
  public readonly events = signal<AppEvent[]>([]);
  public readonly view = signal<ViewMode>('cards');

  public readonly icons = {
    grid: Grid3x3,
    table: Table,
  };

  constructor(private readonly eventService: EventService) {
    effect(() => this.fetch());
  }

  public fetch(): void {
    this.loading.set(true);
    this.eventService
      .getEvents({
        page: this.page() + 1,
        limit: this.rows(),
      })
      .subscribe({
        next: (res) => {
          this.events.set(res.items);
          this.total.set(res.total);
          this.loading.set(false);

          console.log(this.rows());
          console.log(this.page());
          console.log(res);
        },
        error: () => this.loading.set(false),
      });
  }

  public onPageChange(e: PaginatorState) {
    if (typeof e.page === 'number') this.page.set(e.page);
    if (typeof e.rows === 'number') this.rows.set(e.rows);
  }

  public setView(mode: ViewMode) {
    this.view.set(mode);
  }

  public editEvent = (id: string) => console.log('edit', id);
  public deleteEvent = (id: string) => console.log('delete', id);
}
