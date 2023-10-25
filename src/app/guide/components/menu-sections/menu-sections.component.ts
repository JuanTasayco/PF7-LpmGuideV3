import { AfterViewInit, Component, Input, OnInit, signal } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { RouterModule } from '@angular/router';
import { ImgPipe } from '../../pipes/img.pipe';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [NgFor, TitleCasePipe, RouterModule, ImgPipe],
  templateUrl: './menu-sections.component.html',
  styleUrls: ['./menu-sections.component.scss'],
})
export class MenuSectionsComponent implements OnInit, AfterViewInit {
  public sections = signal<string[]>(['']);

  ngOnInit(): void {
    this.infoSectionService
      .getSectionsName()
      .subscribe((responseSections: string[]) => {
        this.sections.set(responseSections);
      });
  }

  constructor(private infoSectionService: InfoSectionsService) {}
  ngAfterViewInit(): void {}
}

/*  this.sections.set([
      'principal',
      'trabajadores',
      'asistencias',
      'registros',
      'renta',
      'reportes',
    ]); */
