import { Component, input, output, signal } from '@angular/core';
import {
  Grid3x3,
  Search,
  Funnel,
  LogOut,
  Download,
  CalendarDays,
  LucideAngularModule,
} from 'lucide-angular';
import { AuthService } from '../../../features/auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [LucideAngularModule],
})
export class HeaderComponent {
  public searchTerm = input<string>('');
  public search = output<string>();
  public newEvent = output<void>();

  public isSearchOpen = signal(false);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public readonly icons = {
    grid: Grid3x3,
    search: Search,
    funnel: Funnel,
    logout: LogOut,
    download: Download,
    calendarDays: CalendarDays,
  };

  public onInput(e: Event): void {
    const term = (e.target as HTMLInputElement).value;
    this.search.emit(term);
  }

  public onLogout() {
    this.authService.logout();
  }

  public getUserName(): string {
    if (this.authService.user() === null) {
      this.router.navigate(['auth', 'login']);
    }

    return this.authService.user()?.username.split(' ')[0] || '';
  }
}
