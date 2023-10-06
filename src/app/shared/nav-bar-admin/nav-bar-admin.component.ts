import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flowbite } from 'src/app/guide/decorator/flowbite-decorator';
@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
@Flowbite()
export class NavBarAdminComponent implements AfterViewInit {
  @ViewChild('menuDisplay') menuDisplayItem!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    /*     gsap.set(this.menuDisplayItem.nativeElement, {
      display: 'none',
    }); */
  }

  openMenuUser() {}

  constructor(private renderer2: Renderer2) {}
}
