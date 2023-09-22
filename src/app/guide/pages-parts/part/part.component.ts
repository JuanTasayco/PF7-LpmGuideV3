import { Component, OnInit, signal } from '@angular/core';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';
import { InfoSectionsService } from '../../services/info-sections.service';
import { Seccion } from '../../interfaces/sections.interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-part',
  standalone: true,
  imports: [BannerSectionComponent, NgIf, RouterModule],
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss'],
})
export class PartComponent implements OnInit {
  public secciones = signal<Seccion[]>([]);
  public partname!: string;
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.infoSections.getInfoPerSectionName(id)))
      .subscribe((sectionsResponse) => {
        this.secciones.set(sectionsResponse);
      });

    this.activatedRoute.fragment.subscribe((pathName) => {
      if (pathName) {
        this.partname = pathName;
      }
    });
  }

  constructor(
    private infoSections: InfoSectionsService,
    private activatedRoute: ActivatedRoute
  ) {}
}
