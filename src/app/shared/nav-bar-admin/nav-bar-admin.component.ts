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
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [RouterModule],
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
