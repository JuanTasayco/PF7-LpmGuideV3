import { Injectable } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
@Injectable({
  providedIn: 'root',
})
export class LenisService {
  lenis!: Lenis;
  constructor() {
    this.lenis = new Lenis({
      smoothWheel: true,
      duration: 2.5,
    });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);
  }

  getlenisInstance(): Lenis {
    return this.lenis;
  }
}
