import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';
import { Seccion } from '../../interfaces/sections.interfaces';
import { InfoSectionsService } from '../../services/info-sections.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-part5',
  standalone: true,
  imports: [NgIf, BannerSectionComponent],
  templateUrl: './part5.component.html',
  styleUrls: ['./part5.component.scss'],
})
export class Part5Component implements OnInit {
  public secciones = signal<Seccion[]>([]);
  public partname!: string;
  ngOnInit(): void {
    this.infoSections
      .getInfoPerSectionName('registros')
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
