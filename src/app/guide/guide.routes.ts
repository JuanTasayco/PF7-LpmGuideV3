import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { DescriptionSectionComponent } from './components/description-section/description-section.component';
import { BannerSectionComponent } from './components/banner-section/banner-section.component';

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
        path: 'part/:title',
        component: DescriptionSectionComponent,
      },

      {
        path: 'part/section/:section',
        component: BannerSectionComponent,
      },

      {
        path: '**',
        redirectTo: 'principal',
      },
    ],
  },
];
