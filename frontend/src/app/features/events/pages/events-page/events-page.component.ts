import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { catchError, EMPTY, finalize, take } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Grid3x3, LucideAngularModule, Table } from 'lucide-angular';

import { EventService } from '../../data-access/event.service';
import { AppEvent, EventCardModel } from '../../data-access/event.models';
import { EventCardComponent } from '../../ui/event-card/event-card.component';
import { EventsTableComponent } from '../../ui/events-table/events-table.component';

type ViewMode = 'cards' | 'table';

@Component({
  selector: 'app-events-page',
  imports: [
    ToastModule,
    CommonModule,
    PaginatorModule,
    EventCardComponent,
    LucideAngularModule,
    EventsTableComponent,
    ConfirmDialogModule,
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

  constructor(
    private readonly router: Router,
    private readonly eventService: EventService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    effect(() => this.fetch());
  }

  public confirmDelete(id: string, title?: string): void {
    this.confirmationService.confirm({
      header: 'Excluir evento',
      message: `Tem certeza que deseja excluir ${
        title ? `"${title}"` : 'este evento'
      }?`,
      rejectLabel: 'Cancelar',
      acceptLabel: 'Excluir',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.doDelete(id),
    });
  }

  private doDelete(id: string) {
    this.eventService
      .delete(id)
      .pipe(
        take(1),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao excluir o evento.',
          });

          return EMPTY;
        })
      )
      .subscribe({
        next: () => {
          const onlyOne = this.events().length === 1;
          const notFirst = this.page() > 0;

          onlyOne && notFirst ? this.page.update((p) => p - 1) : this.fetch();

          this.messageService.add({
            severity: 'success',
            summary: 'Removido',
            detail: 'Evento excluído com sucesso.',
          });
        },
      });
  }

  public fetch(): void {
    this.loading.set(true);
    this.eventService
      .getEvents({
        page: this.page() + 1,
        limit: this.rows(),
      })
      .pipe(
        take(1),
        catchError((err) => {
          return EMPTY;
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe((res) => {
        this.events.set(res.items);
        this.total.set(res.total);
      });
  }

  public onPageChange(e: PaginatorState) {
    if (typeof e.page === 'number') this.page.set(e.page);
    if (typeof e.rows === 'number') this.rows.set(e.rows);
  }

  public setView(mode: ViewMode) {
    this.view.set(mode);
  }

  public onView(event: EventCardModel): void {
    this.router.navigate(['/admin/eventos', event.id]);
  }

  public deleteEvent(event: AppEvent): void {
    this.confirmDelete(event.id, event.title);
  }
}
