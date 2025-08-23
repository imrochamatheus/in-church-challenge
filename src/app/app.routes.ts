import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/auth/auth.routes';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {
        path: 'eventos',
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
