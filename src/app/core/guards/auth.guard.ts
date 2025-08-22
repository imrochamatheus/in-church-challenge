import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../features/auth/data-access/auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  const returnUrl = router.routerState.snapshot.url;

  return router.createUrlTree(['/auth/entrar'], {
    queryParams: { returnUrl },
  });
};
