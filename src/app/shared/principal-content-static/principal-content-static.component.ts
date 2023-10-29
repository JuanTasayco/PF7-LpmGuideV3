import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { RouterModule } from '@angular/router';
import { MockupMobileComponent } from '../mockup-mobile/mockup-mobile.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgFor, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';

type lastUpdates = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-principal-content-static',
  standalone: true,
  imports: [RouterModule, MockupMobileComponent, TitleCasePipe, NgFor],
  templateUrl: './principal-content-static.component.html',
  styleUrls: ['./principal-content-static.component.scss'],
})
export class PrincipalContentStaticComponent implements AfterViewInit, OnInit {
  @ViewChild('mobileMockup') mobileMockup!: ElementRef<HTMLElement>;
  @ViewChild('descriptions') descriptions!: ElementRef<HTMLElement>;
  @ViewChild('principalContainer') principalContainer!: ElementRef<HTMLElement>;
  @ViewChildren('childrenContainer') childrenContainers!: QueryList<ElementRef>;
  lastUpdates: lastUpdates[] = [];
  ngOnInit(): void {
    this.infoSection.getUpdatesForSection().subscribe(({ last }: any) => {
      this.lastUpdates = last;
    });
  }
  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    this.childrenContainers.forEach(({ nativeElement: el }) => {
      tl.from(el, {
        xPercent: -100,
        scrollTrigger: {
          trigger: el,
          scrub: 1,
          start: 'top center',
          end: 'top center',
        },
      });
    });

    ScrollTrigger.create({
      trigger: this.principalContainer.nativeElement,
      start: 'top 8%',
      end: '75% 8%',
      scrub: 1,
      pin: this.mobileMockup.nativeElement,
      pinSpacing: false,
      toggleActions: 'play reverse play reverse',
    });

    /* animation button */
  }

  constructor(private infoSection: InfoSectionsService) {}
}
