import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import {
  KeyValuePipe,
  NgClass,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { RouterModule } from '@angular/router';
import { ImgPipe } from '../../pipes/img.pipe';
import { AllSectionsComponent } from '../all-sections/all-sections.component';
import {
  Calendary,
  CalendaryObject,
} from '../../interfaces/sections.interfaces';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [
    NgFor,
    TitleCasePipe,
    RouterModule,
    ImgPipe,
    AllSectionsComponent,
    NgIf,
    KeyValuePipe,
    NgClass,
  ],
  templateUrl: './menu-sections.component.html',
  styleUrls: ['./menu-sections.component.scss'],
})
export class MenuSectionsComponent implements OnInit {
  /*   public sections = signal<Record<Calendary, CalendaryObject> | null>(null); */
  sections!: Record<Calendary, CalendaryObject[]>;
  firstContentChanged: boolean = false;
  ngOnInit(): void {
    this.infoSectionService.getCalendary().subscribe((response) => {
      /*    this.sections.set(<Record<Calendary, CalendaryObject>>response); */
      this.sections = response;

      const orderedKeys: Calendary[] = ['asistencias', 'reportes', 'valores'];

      // Crea un objeto vacío para almacenar el resultado ordenado
      const sortedResponse: Record<Calendary, CalendaryObject[]> = {} as Record<
        Calendary,
        CalendaryObject[]
      >;

      // Ordena las claves según el orden definido y asigna los valores correspondientes
      orderedKeys.forEach((key) => {
        sortedResponse[key] = response[key];
      });
    });
  }

  constructor(private infoSectionService: InfoSectionsService) {}
}
