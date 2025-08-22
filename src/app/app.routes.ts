import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/entrar',
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
