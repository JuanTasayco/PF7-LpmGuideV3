import { Component, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavLinks {
  name: string;
  link: string;
  fragment?: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public navItems = signal<NavLinks[]>([
    {
      name: 'Acerca de',
      link: '/guide/about',
    },
    {
      name: 'Contenido',
      link: '/guide/contents',
      fragment: 'mi-section',
    },
    {
      name: 'Preguntas frecuentas',
      link: '/guide/questions',
    }
  
  ]);
}
