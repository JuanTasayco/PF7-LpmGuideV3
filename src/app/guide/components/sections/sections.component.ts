import { AfterViewInit, Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [NgFor, TitleCasePipe],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit, AfterViewInit {
  public sections = signal<string[]>(['']);

  ngOnInit(): void {
    /* tengo  5 secciones*/
    /* la idea del personalSections es acomodar la data a 7 secciones */
    this.infoSectionService
      .getSections()
      .subscribe((responseSections: string[]) => {
        /* por el momento está vacío en otras maquinas, usaré personal Sections */
        /*       this.sections.set(responseSections); */
      });
    this.sections.set([
      'flujo básico',
      'trabajadores',
      'asistencias',
      'registros',
      'asistencias',
      'renta',
      'reportes',
    ]);
  }

  constructor(private infoSectionService: InfoSectionsService) {}
  ngAfterViewInit(): void {}
}
