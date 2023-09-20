import { Component, HostListener, Input, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Seccion } from '../../interfaces/sections.interfaces';

export interface DescriptionPart {
  part: string;
  description: string;
  nameSection: string;
}

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
})
export class BannerSectionComponent {
  @Input('seccionesInput') secciones = signal<Seccion[]>([]);
  letrasDelAbecedario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTWXYZ'.split('');

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

  provisionalData: DescriptionPart[] = [
    {
      part: 'part1',
      description:
        'Esta sección te ayudará a entender el flujo principal del sistema, desde la inserción de valores, hasta los reportes, es necesario que entiendas que aquí parte todo y es  vital entender estos 3 puntos, las demás secciones siguientes están incluidas y funcionan bajo ellas, deben seguirse en orden para evitar problemas.',
      nameSection: 'principal',
    },
    {
      part: 'part2',
      description: '',
      nameSection: 'trabajadores',
    },
    {
      part: 'part3',
      description: '',
      nameSection: 'renta',
    },
    {
      part: 'part4',
      description: '',
      nameSection: 'asistencia',
    },
    {
      part: 'part5',
      description: '',
      nameSection: 'registros',
    },
    {
      part: 'part6',
      description: '',
      nameSection: 'especiales',
    },
  ];
}
