import { Component, input, output } from '@angular/core';
import { Eye, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { AppEvent, EventCardModel } from '../../data-access/event.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-table',
  imports: [LucideAngularModule],
  templateUrl: './events-table.component.html',
})
export class EventsTableComponent {
  public events = input.required<AppEvent[]>();
  public remove = output<AppEvent>();

  constructor(private readonly router: Router) {}

  public readonly icons = {
    edit: Pencil,
    delete: Trash2,
    view: Eye,
  };

  public onView(event: AppEvent): void {
    this.router.navigate(['admin/eventos', event.id]);
  }

  public onEdit(event: AppEvent): void {
    this.router.navigate(['admin/eventos', event.id, 'editar']);
  }
}
