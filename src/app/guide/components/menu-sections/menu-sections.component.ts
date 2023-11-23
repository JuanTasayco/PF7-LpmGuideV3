import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { KeyValuePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { RouterModule } from '@angular/router';
import { ImgPipe } from '../../pipes/img.pipe';
import { AllSectionsComponent } from '../all-sections/all-sections.component';
import {
  Calendary,
  CalendaryObject,
} from '../../interfaces/sections.interfaces';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [
    NgFor,
    TitleCasePipe,
    RouterModule,
    ImgPipe,
    AllSectionsComponent,
    NgIf,
    KeyValuePipe,
  ],
  templateUrl: './menu-sections.component.html',
  styleUrls: ['./menu-sections.component.scss'],
})
export class MenuSectionsComponent implements OnInit {
  /*   public sections = signal<Record<Calendary, CalendaryObject> | null>(null); */
  sections!: Record<Calendary, CalendaryObject[]>;
  firstContentChanged: boolean = false;
  ngOnInit(): void {
    this.infoSectionService.getCalendary().subscribe((response) => {
      /*    this.sections.set(<Record<Calendary, CalendaryObject>>response); */
      this.sections = response;
      console.log(this.sections);
    });
  }

  constructor(private infoSectionService: InfoSectionsService) {}
}
