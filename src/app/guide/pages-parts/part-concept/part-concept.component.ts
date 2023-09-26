import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, JsonPipe, NgFor, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Seccion } from '../../interfaces/sections.interfaces';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-part-concept',
  standalone: true,
  imports: [JsonPipe, NgFor, TitleCasePipe,ModalComponent],
  templateUrl: './part-concept.component.html',
  styleUrls: ['./part-concept.component.scss'],
})
export class PartConceptComponent implements OnInit {
  public concepto = signal<Seccion>({
    titulo: '',
    titulo2: '',
    subtitulo: '',
    panel: '',
    seccion: '',
  });
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ concepto }) =>
          this.infoSectionsService.getDataByConcept(concepto)
        )
      )
      .subscribe((response) => {
        this.concepto.set(<Seccion>response);
      });
  }

  constructor(
    private infoSectionsService: InfoSectionsService,
    private activatedRoute: ActivatedRoute
  ) {}
}
