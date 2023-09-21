import { Component, OnInit, signal } from '@angular/core';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';
import { InfoSectionsService } from '../../services/info-sections.service';
import { Seccion } from '../../interfaces/sections.interfaces';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-part1',
  standalone: true,
  imports: [BannerSectionComponent, NgIf],
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss'],
})
export class Part1Component implements OnInit {
  public secciones = signal<Seccion[]>([]);
  public partname!: string;
  ngOnInit(): void {
    this.infoSections
      .getInfoPerSectionName('principal')
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
