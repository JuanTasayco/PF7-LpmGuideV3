import { Component, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from '../../interfaces/sections.interfaces';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';

@Component({
  selector: 'app-part3',
  standalone: true,
  imports: [NgIf, BannerSectionComponent],
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.scss'],
})
export class Part3Component implements OnInit {
  public secciones = signal<Seccion[]>([]);
  public partname!: string;

  ngOnInit(): void {
    this.infoSections
      .getInfoPerSectionName('renta')
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
