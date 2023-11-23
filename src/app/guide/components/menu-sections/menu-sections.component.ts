import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from '../../services/info-sections.service';
import { RouterModule } from '@angular/router';
import { ImgPipe } from '../../pipes/img.pipe';
import { AllSectionsComponent } from '../all-sections/all-sections.component';
import { gsap } from 'gsap';
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
  ],
  templateUrl: './menu-sections.component.html',
  styleUrls: ['./menu-sections.component.scss'],
})
export class MenuSectionsComponent implements OnInit, AfterViewInit {
  public sections = signal<string[]>([]);
  firstContentChanged: boolean = false;
  ngOnInit(): void {
    /*     this.infoSectionService
      .getSectionsName()
      .subscribe((responseSections: string[]) => {
        this.sections.set(responseSections);
        console.log(this.sections());
      }); */

    this.infoSectionService.getAllSections().subscribe(console.log);
  }

  constructor(private infoSectionService: InfoSectionsService) {}

  @ViewChild('accordions') accordionContainer!: ElementRef<HTMLElement>;
  @ViewChildren('accordion') accordions!: QueryList<ElementRef>;
  @ViewChildren('text') textsAccordion!: QueryList<ElementRef>;
  ngAfterViewInit(): void {}
}
