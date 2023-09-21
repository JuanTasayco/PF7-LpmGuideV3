import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { PartComponent } from './pages-parts/index';

export const routes_pages: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalComponent,
      },
      {
        path: 'about',
        component: AboutMeComponent,
      },
      {
        path: 'contents',
        component: ContentsComponent,
      },
      {
        path: 'questions',
        component: QuestionsComponent,
      },
      {
        path: 'part/:id',
        component: PartComponent,
      },
      
      {
        path: '**',
        redirectTo: 'principal',
      },
    ],
  },
];
