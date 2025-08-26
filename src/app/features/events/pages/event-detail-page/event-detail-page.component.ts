import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, effect, signal } from '@angular/core';

import { catchError, EMPTY, finalize, take } from 'rxjs';
import {
  Tag,
  Clock,
  Users,
  MapPin,
  Pencil,
  Ticket,
  ArrowLeft,
  CalendarDays,
  LucideAngularModule,
} from 'lucide-angular';

import { AppEvent } from '../../data-access/event.models';
import { EventService } from '../../data-access/event.service';

@Component({
  selector: 'app-event-detail-page',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './event-detail-page.component.html',
  styleUrl: './event-detail-page.component.scss',
})
export class EventDetailPageComponent {
  public readonly loading = signal(true);
  public readonly error = signal<string | null>(null);
  public readonly event = signal<AppEvent | null>(null);

  public readonly icons = {
    tag: Tag,
    clock: Clock,
    users: Users,
    mapPin: MapPin,
    ticket: Ticket,
    pencil: Pencil,
    arrowLeft: ArrowLeft,
    calendar: CalendarDays,
  };

  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly eventsService: EventService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    effect(() => {
      const id = this.activatedRoute.snapshot.paramMap.get('id');

      if (!id) {
        this.error.set('Evento não encontrado.');
        this.loading.set(false);

        return;
      }

      this.loading.set(true);
      this.eventsService
        .getById(id)
        .pipe(
          take(1),
          catchError((err) => {
            this.error.set('Não foi possível carregar o evento.');
            return EMPTY;
          }),
          finalize(() => {
            this.loading.set(false);
          })
        )
        .subscribe((event) => {
          this.event.set(event);
        });
    });
  }

  public back(): void {
    this.location.back();
  }

  public edit(): void {
    const id = this.event()?.id;
    if (id) this.router.navigate(['/eventos', id, 'editar']);
  }

  public get statusClasses(): string {
    const s = this.event()?.status;

    return s === 'active'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700';
  }
}
