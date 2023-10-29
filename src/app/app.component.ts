import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { LenisService } from './lenis-scroll/lenis.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PF7-LpmAppV3';
  lenis!: Lenis;
  ngOnInit(): void {
    initFlowbite();
    this.activatedRouter.fragment.subscribe((frag) => {
      if (!frag) {
        scrollTo(0, 0);
      }
    });

    /* inicia plugin de ScrollTrigger */
    this.lenis = this.lenisService.getlenisInstance();
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private lenisService: LenisService
  ) {}
}
