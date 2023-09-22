import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import {
  CommonModule,
  NgFor,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Seccion } from '../../interfaces/sections.interfaces';

export interface DescriptionPart {
  part: string;
  description: string;
  nameSection: string;
}

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [NgFor, UpperCasePipe, TitleCasePipe],
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
})
export class BannerSectionComponent implements OnInit {
  ngOnInit(): void {}
  @Input('seccionesInput') secciones = signal<Seccion[]>([]);
  abc: string[] = 'abcdefghijklmnñopqrstwxyz'.split('');

  @HostListener('window:resize', [''])
  cambiarModoFlecha() {
    const squareLeft = document.querySelector('#square-left');
    const squareRight = document.querySelector('#square-right');
    if (window.innerWidth < 768) {
      squareLeft?.classList.remove('Banner-square--left');
      squareRight?.classList.remove('Banner-square--right');
    } else {
      squareLeft?.classList.add('Banner-square--left');
      squareRight?.classList.add('Banner-square--right');
    }
  }
}
