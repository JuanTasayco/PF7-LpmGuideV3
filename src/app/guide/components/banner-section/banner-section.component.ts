import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import {
  CommonModule,
  NgFor,
  NgIf,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Seccion } from '../../interfaces/sections.interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InfoSectionsService } from '../../services/info-sections.service';
import { switchMap, tap } from 'rxjs';

export interface DescriptionPart {
  part: string;
  description: string;
  nameSection: string;
}

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [NgFor, UpperCasePipe, TitleCasePipe, RouterLink, NgIf],
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
})
export class BannerSectionComponent implements OnInit {
  secciones = signal<Seccion[]>([]);
  currentSection = signal<string>('');
  ngOnInit(): void {
    scrollTo(0, 0);
    this.activatedRoute.params
      .pipe(
        tap(({ section }) => {
          this.currentSection.set(section);
        }),
        switchMap(({ section }) =>
          this.infoSectionService.getInfoPerSectionName(section)
        )
      )
      .subscribe((response) => {
        this.secciones.update(() => response);
      });
  }

  infoSectionService = inject(InfoSectionsService);
  activatedRoute = inject(ActivatedRoute);
}
