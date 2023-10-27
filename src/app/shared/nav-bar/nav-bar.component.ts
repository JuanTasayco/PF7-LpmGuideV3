import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
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
export class NavBarComponent implements AfterViewInit {
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
    },
  ]);

  @ViewChild('lpmLetterLogo') lpmLetterLogo!: ElementRef<HTMLElement>;
  @ViewChild('lpmLogo') lpmImgLogo!: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    gsap.from(this.lpmImgLogo.nativeElement, {
      duration: 1,
      z: -1000,
      rotate: 360,
      scaleX: 0.53,
    });

    gsap.from(this.lpmLetterLogo.nativeElement, {
      yPercent: 200,
      duration: 0.5,
      ease: 'power1.out',
    });
  }
}
