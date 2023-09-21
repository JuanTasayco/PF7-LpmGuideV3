import { Component, OnInit, signal } from '@angular/core';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';
import { InfoSectionsService } from '../../services/info-sections.service';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from '../../interfaces/sections.interfaces';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-part2',
  standalone: true,
  imports: [BannerSectionComponent,NgIf],
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss'],
})
export class Part2Component implements OnInit {
  public secciones = signal<Seccion[]>([]);
  public partname!: string;
  ngOnInit(): void {
    this.infoSections
      .getInfoPerSectionName('trabajadores')
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
