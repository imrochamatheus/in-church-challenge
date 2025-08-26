import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/auth/auth.routes';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { eventRoutes } from './features/events/events.routes';

export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {
        path: 'eventos',
        title: 'Eventos',
        canMatch: [authGuard],
        children: [...eventRoutes],
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
