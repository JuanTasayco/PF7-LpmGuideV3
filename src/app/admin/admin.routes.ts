import { Routes } from '@angular/router';
import { EditSectionComponent } from './pages/sections/edit-section.component';
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
        component: EditSectionComponent,
      },
      {
        path: 'sections/edit/:id',
        component: EditSectionComponent,
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
