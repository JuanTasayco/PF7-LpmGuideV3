import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from 'src/app/shared/nav-bar/nav-bar.component';
import { gsap } from 'gsap';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('allContent') container!: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    /* animacion principal ocultando contenido ( el del logo está en el navbar) */
    gsap.fromTo(
      this.container.nativeElement,
      {
        visibility: 'hidden',
        opacity: 0,
        overflow: 'hidden',
      },
      {
        delay: 1.4,
        opacity: 1,
        visibility: 'inherit',
      }
    );
  }
}
