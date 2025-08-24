import { Component, input, OnInit } from '@angular/core';
import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { AppEvent } from '../../data-access/event.models';

@Component({
  selector: 'app-events-table',
  imports: [LucideAngularModule],
  templateUrl: './events-table.component.html',
})
export class EventsTableComponent implements OnInit {
  public events = input.required<AppEvent[]>();
  public edit = input.required<(id: string) => void>();
  public remove = input.required<(id: string) => void>();

  public readonly icons = {
    edit: Pencil,
    delete: Trash2,
  };

  public ngOnInit(): void {}
}
