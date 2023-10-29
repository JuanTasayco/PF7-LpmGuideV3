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
    /* animacion principal escalando logo ( el contenido desaparecido está en el home) */

    /* const tl = gsap.timeline({});

    gsap.set(this.lpmImgLogo.nativeElement, {
      position: 'absolute',
      left: '50%',
      top: '450%',
      scale: 8,
    });

    tl.from(this.lpmImgLogo.nativeElement, {
      opacity: 0,
      duration: 1,
    })
      .to(this.lpmImgLogo.nativeElement, {
        y: '0',
        left: 'auto',
        top: 'auto',

        scale: 1,
        x: '0',
      })
      .to(this.lpmImgLogo.nativeElement, {
        position: 'relative',
      }); */
  }
}
