import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Eye, LucideAngularModule, Pencil, Trash2 } from 'lucide-angular';
import { EventCardModel } from '../../data-access/event.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  public event = input.required<EventCardModel>();
  public remove = output<EventCardModel>();

  constructor(private readonly router: Router) {}

  public readonly icons = {
    edit: Pencil,
    delete: Trash2,
    view: Eye,
  };

  public onEdit(): void {
    this.router.navigate(['admin/eventos', this.event().id, 'editar']);
  }

  public onRemove(): void {
    this.remove.emit(this.event());
  }

  public onView(): void {
    this.router.navigate(['admin/eventos', this.event().id]);
  }
}
