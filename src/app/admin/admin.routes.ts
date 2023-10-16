import { Routes } from '@angular/router';
import { SectionsUserComponent } from './pages/sections/sections-user.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

export const routes_admin: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    children: [
      {
        path: 'sections/add',
        component: SectionsUserComponent,
      },
      {
        path: 'sections/edit/:id',
        component: SectionsUserComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'user/add',
        component: EditUserComponent,
      },
      {
        path: 'user/edit/:id',
        component: EditUserComponent,
      },
      {
        path: '**',
        redirectTo: 'sections/add',
      },
    ],
  },
];
