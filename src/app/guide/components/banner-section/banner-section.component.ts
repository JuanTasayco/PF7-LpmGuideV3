import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
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
export class BannerSectionComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.secciones());
  }
  @Input('seccionesInput') secciones = signal<Seccion[]>([]);
  letrasDelAbecedario: string[] = 'abcdefghijklmnñopqrstwxyz'.split('');

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
      description:
        'Esta sección está orientada a conocer la ficha básica de trabajadores, recuerda que este sistema no almacena un historial de conceptos, por lo cual siempre conocerá los últimos datos, regrese al mes que regrese, siempre tomará informacióna actual.',
      nameSection: 'trabajadores',
    },
    {
      part: 'part3',
      description:
        'La renta de quinta es cálculada automáticamente por el sistema cada mes, caso contrario sucede con otras rentas ( Renta externa), esta necesita ser agregada manualmente cada mes, es necesario indicar que percibe otras rentas mensualmente y enviar los totales de ser necesario ( en caso cambie o se declare por primera vez) ',
      nameSection: 'renta',
    },
    {
      part: 'part4',
      description:
        'La sección de asistencias son todos los conceptos que necesitan ser colocados antes de llenar valores, registrar las fechas es importante para que el sistema pueda encontrar esta información y ajustar el cálculo en su tabla.',
      nameSection: 'asistencia',
    },
    {
      part: 'part5',
      description:
        'La sección de registros son todos los conceptos que necesitan tener a los trabajadores insertados en valores, de lo contrario no aparecerán en la lista de disponibilidad, esta información abarca la mayoría de conceptos variables disponibles y no se necesita mover nada en la tabla de valores.',
      nameSection: 'registros',
    },
    {
      part: 'part6',
      description:
        'Esta sección abarca los periodos de gratificación y cts, son periodos como cualquier otro pero se necesitan ciertas particularidades para trabajarse.',
      nameSection: 'especiales',
    },
  ];
}
