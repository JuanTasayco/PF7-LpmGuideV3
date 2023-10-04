import { Component, OnInit, signal } from '@angular/core';
import { JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { Seccion } from '../../interfaces/sections.interfaces';
import { ModalComponent } from '../../components/modal-image/modal.component';

@Component({
  selector: 'app-part-concept',
  standalone: true,
  imports: [JsonPipe, NgFor, NgIf, TitleCasePipe, ModalComponent, RouterModule],
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
          this.infoSectionsService.getOnlyOneDataByTitle(concepto)
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
