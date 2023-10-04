import { Component, OnInit, signal } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [NgFor, TitleCasePipe],
  templateUrl: './sections-user.component.html',
  styleUrls: ['./sections-user.component.scss'],
})
export class SectionsUserComponent implements OnInit {
  public seccion = signal<Seccion>({
    id: '',
    titulo: '',
    titulo2: '',
    subtitulo: '',
    panel: '',
    seccion: '',
    ingreso: [],
    contenido: [],
  });

  get getKeysSeccion() {
    return Object.keys(this.seccion());
  }

  ngOnInit(): void {}

  constructor(private guideService: InfoSectionsService) {}
}
