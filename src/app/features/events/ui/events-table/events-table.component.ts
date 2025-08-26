import { Component, input, OnInit, output } from '@angular/core';
import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { AppEvent } from '../../data-access/event.models';

@Component({
  selector: 'app-events-table',
  imports: [LucideAngularModule],
  templateUrl: './events-table.component.html',
})
export class EventsTableComponent {
  public events = input.required<AppEvent[]>();
  public edit = input.required<(id: string) => void>();
  public remove = input.required<(id: string) => void>();
  public view = output<AppEvent>();

  public readonly icons = {
    edit: Pencil,
    delete: Trash2,
  };

  public onView(event: AppEvent): void {
    this.view.emit(event);
  }
}
