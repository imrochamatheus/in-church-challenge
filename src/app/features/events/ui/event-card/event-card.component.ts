import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { EventCardModel } from '../../data-access/event.models';

@Component({
  selector: 'app-event-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  public event = input.required<EventCardModel>();
  public edit = output<EventCardModel>();
  public remove = output<EventCardModel>();
  public view = output<EventCardModel>();

  public readonly icons = {
    edit: Pencil,
    delete: Trash2,
  };

  public onEdit(): void {
    this.edit.emit(this.event());
  }

  public onRemove(): void {
    this.remove.emit(this.event());
  }

  public onView(): void {
    this.view.emit(this.event());
  }
}
