import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'guide',
    loadChildren: () =>
      import('src/app/guide/guide.routes').then((route) => route.routes_pages),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('src/app/shared/error-page/error-page.component').then(
        (component) => component.ErrorPageComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((route) => route.routes_auth),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('src/app/admin/admin.routes').then((route) => route.routes_admin),
  },
  {
    path: '**',
    redirectTo: 'guide',
  },
];
