import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ModalComponent } from '../modal-image/modal.component';
import { switchMap } from 'rxjs';
import { InfoSectionsService } from '../../services/info-sections.service';
import { ActivatedRoute } from '@angular/router';
import { Seccion } from '../../interfaces/sections.interfaces';
import { AllSectionsComponent } from '../all-sections/all-sections.component';

@Component({
  selector: 'app-description-section',
  standalone: true,
  imports: [NgFor, NgIf, ModalComponent, TitleCasePipe],
  templateUrl: './description-section.component.html',
  styleUrls: ['./description-section.component.scss'],
})
export class DescriptionSectionComponent implements OnInit {
  public concepto = signal<Seccion>({
    titulo: '',
    titulo2: '',
    subtitulo: '',
    panel: '',
    seccion: '',
  });
  ngOnInit(): void {
    scrollTo(0, 0);
    this.activatedRoute.params
      .pipe(
        switchMap(({ title }) =>
          this.infoSectionsService.getOnlyOneDataByTitle(title)
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
