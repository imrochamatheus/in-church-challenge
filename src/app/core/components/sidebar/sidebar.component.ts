import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  House,
  Users,
  Send,
  FileText,
  Download,
  CalendarDays,
  MessageSquare,
  LucideAngularModule,
} from 'lucide-angular';
import { MenuItem } from './sidebar.models';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public readonly icons = {
    house: House,
    users: Users,
    send: Send,
    fileText: FileText,
    download: Download,
    calendarDays: CalendarDays,
    messageSquare: MessageSquare,
  };

  public readonly items = signal<MenuItem[]>([
    { icon: House, label: 'Início', active: false },
    { icon: Users, label: 'Pessoas', active: false },
    { icon: CalendarDays, label: 'Células', active: false },
    { icon: MessageSquare, label: 'Orações', active: false },
    { icon: Users, label: 'Kids', active: false },
    { icon: FileText, label: 'Conteúdo', active: false },
    { icon: CalendarDays, label: 'Eventos', active: true },
    { icon: Send, label: 'Xmissão', active: false },
    { icon: Download, label: 'Loja', active: false },
  ]);

  public setActive(index: number): void {
    this.items.update((list) =>
      list.map((it, i) => ({ ...it, active: i === index }))
    );
  }
}
