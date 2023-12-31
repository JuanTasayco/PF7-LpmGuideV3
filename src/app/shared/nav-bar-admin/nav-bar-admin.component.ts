import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  OnInit,
  signal,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Flowbite } from 'src/app/guide/decorator/flowbite-decorator';
import { Router, RouterModule } from '@angular/router';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/admin/interfaces/admin.interfaces';
import { toArray } from 'gsap';
@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [RouterModule, NgFor, TitleCasePipe, NgIf, NgClass],
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
@Flowbite()
export class NavBarAdminComponent implements AfterViewInit, OnInit {
  @ViewChild('menuDisplay') menuDisplayItem!: ElementRef<HTMLElement>;
  currentUser = signal<User | null>(null);
  items!: { [key: string]: any[] };

  ngOnInit(): void {
    this.guideService.getAllSections().subscribe((info) => {
      let sections: string[] = [...new Set(info.map((info) => info.seccion))];
      const objectSection: { [key: string]: any[] } = {};
      sections.forEach((element) => {
        objectSection[element] = [];
      });

      info.forEach((param) => {
        objectSection[param.seccion].push(param);
      });

      this.items = objectSection;
    });

    this.currentUser.update(this.authService.currentUser());
  }

  get itemsKeys(): string[] {
    return Object.keys(this.items);
  }

  @ViewChildren('submenusDropdown') submenus!: QueryList<ElementRef>;
  openSections(pos: number) {
    const items: Array<ElementRef> = this.submenus.toArray();
    items.forEach(({ nativeElement: el }, index) => {
      if (index == pos) {
        el.classList.toggle('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  exitSesion() {
    localStorage.removeItem('keyToken');
    this.route.navigate(['/guide/principal']);
  }

  ngAfterViewInit(): void {}

  constructor(
    private guideService: InfoSectionsService,
    private authService: AuthService,
    private route: Router
  ) {}
}

/* aria expanded=false */
/*  */
