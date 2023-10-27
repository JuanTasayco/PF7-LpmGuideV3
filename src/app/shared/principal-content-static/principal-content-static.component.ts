import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockupMobileComponent } from '../mockup-mobile/mockup-mobile.component';
import { gsap } from 'gsap';
@Component({
  selector: 'app-principal-content-static',
  standalone: true,
  imports: [RouterModule, MockupMobileComponent],
  templateUrl: './principal-content-static.component.html',
  styleUrls: ['./principal-content-static.component.scss'],
})
export class PrincipalContentStaticComponent implements AfterViewInit {
  @ViewChild('containerMockup')
  containerMockup!: ElementRef<HTMLElement>;
  @ViewChild('mobileMockup') mobileMockup!: ElementRef<HTMLElement>;
  @ViewChild('descriptionMockup') descriptionMockup!: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    gsap.to(this.descriptionMockup.nativeElement, {
      xPercent: -100,
      duration: 2,
      scrollTrigger: {
        trigger: this.containerMockup.nativeElement,
        markers: true,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
    gsap.to(this.mobileMockup.nativeElement, {
      xPercent: 100,
      duration: 2,
      scrollTrigger: {
        trigger: this.containerMockup.nativeElement,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}
