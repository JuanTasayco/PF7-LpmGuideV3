import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import {
  Part1Component,
  Part2Component,
  Part3Component,
  Part4Component,
  Part5Component,
  Part6Component,
} from './pages-parts/index';

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
        path: 'part1',
        component: Part1Component,
      },
      {
        path: 'part2',
        component: Part2Component,
      },
      {
        path: 'part3',
        component: Part3Component,
      },
      {
        path: 'part4',
        component: Part4Component,
      },
      {
        path: 'part5',
        component: Part5Component,
      },
      {
        path: 'part6',
        component: Part6Component,
      },
      {
        path: '**',
        redirectTo: 'principal',
      },
    ],
  },
];
