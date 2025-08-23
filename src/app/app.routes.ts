import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Eventos',
        canMatch: [authGuard],
        loadComponent: () =>
          import(
            './features/events/pages/events-page/events-page.component'
          ).then((m) => m.EventsPageComponent),
      },
    ],
  },
  {
    path: 'auth',
    children: [...authRoutes],
  },
  {
    path: '**',
    redirectTo: '/auth/entrar',
  },
];
