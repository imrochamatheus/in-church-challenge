import { Route } from '@angular/router';

export const eventRoutes: Route[] = [
  {
    path: '',
    title: 'Eventos',
    loadComponent: () =>
      import('./pages/events-page/events-page.component').then(
        (m) => m.EventsPageComponent
      ),
  },
  {
    path: ':id',
    title: 'Detalhes do Evento',
    loadComponent: () =>
      import('./pages/event-detail-page/event-detail-page.component').then(
        (m) => m.EventDetailPageComponent
      ),
  },
  {
    path: ':id/editar',
    title: 'Editar Evento',
    loadComponent: () =>
      import('./pages/event-edit-page/event-edit-page.component').then(
        (m) => m.EventEditPageComponent
      ),
  },
];
