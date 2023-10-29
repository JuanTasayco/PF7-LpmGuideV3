import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
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
  @ViewChild('descriptionMockup') descriptionMockup!: ElementRef<HTMLElement>;
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  @ViewChild('sectionContainer') sectionContainer!: ElementRef<HTMLElement>;

  lastUpdates: lastUpdates[] = [];
  ngOnInit(): void {
    this.infoSection.getUpdatesForSection().subscribe(({ last }: any) => {
      this.lastUpdates = last;
    });
  }
  ngAfterViewInit(): void {
    const mediumsectionContainer =
      this.sectionContainer?.nativeElement.clientHeight! / 2;

    gsap.to(this.descriptionMockup.nativeElement, {
      xPercent: -100,
      duration: 2,
      opacity: 0,
      scrollTrigger: {
        trigger: this.sectionContainer.nativeElement,
        start: `center ${mediumsectionContainer}`,
        end: `bottom ${mediumsectionContainer}`,
        scrub: true,
      },
    });
    const tl = gsap.timeline();

    tl.to(this.mobileMockup.nativeElement, {
      yPercent: 100,
      duration: 3,
      scrollTrigger: {
        trigger: this.sectionContainer.nativeElement,
        start: `center ${mediumsectionContainer}`,
        end: `bottom ${mediumsectionContainer}`,
        scrub: true,
        toggleActions: 'play reverse reverse reset',
      },
    });

    ScrollTrigger.create({
      trigger: this.container.nativeElement,
      start: '10% center',
      end: '85% center',
      scrub: true,
      pin: this.mobileMockup.nativeElement,
      pinSpacing: false,
      toggleActions: 'play reverse play reverse',
    });

    /* animation button */
  }

  constructor(private infoSection: InfoSectionsService) {}
}
