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

  private personalSections = signal<string[]>([
    'flujo básico, trabajadores, asistencias, registros,asistencias,renta, reportes',
  ]);

  ngOnInit(): void {
    /* tengo  5 secciones*/
    /* la idea del personalSections es acomodar la data a 7 secciones */
    this.infoSectionService
      .getSections()
      .subscribe((responseSections: string[]) => {
        this.sections.set(responseSections);
      });
  }

  constructor(private infoSectionService: InfoSectionsService) {}
  ngAfterViewInit(): void {}
}
