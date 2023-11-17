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
    this.infoSectionService
      .getSectionsName()
      .subscribe((responseSections: string[]) => {
        this.sections.set(responseSections);
      });
  }

  constructor(private infoSectionService: InfoSectionsService) {}

  @ViewChild('accordions') accordionContainer!: ElementRef<HTMLElement>;
  @ViewChildren('accordion') accordions!: QueryList<ElementRef>;
  @ViewChildren('text') textsAccordion!: QueryList<ElementRef>;
  ngAfterViewInit(): void {
    setTimeout(() => {
      const tl = gsap.timeline({
        ease: 'linear',
        scrollTrigger: {
          trigger: this.accordionContainer.nativeElement,
          pin: true,
          start: 'top 20%',
          end: 'bottom 20%',
          scrub: 1,
          markers: true,
        },

        onStart: () => {
          this.firstContentChanged = true;
        },
      });

      tl.to('.accordion .text', {
        height: 0,
        paddingBottom: 0,
        opacity: 0,
        stagger: 0.5,
      });
      tl.to(
        '.accordion',
        {
          marginBottom: -15,
          stagger: 0.5,
        },
        '<'
      );
    }, 1500);
  }
}
