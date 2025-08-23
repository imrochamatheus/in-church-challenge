import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { EventCardModel } from '../../data-access/event.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  public event = input.required<EventCardModel>();
  public edit = output<EventCardModel>();
  public remove = output<EventCardModel>();

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
}
