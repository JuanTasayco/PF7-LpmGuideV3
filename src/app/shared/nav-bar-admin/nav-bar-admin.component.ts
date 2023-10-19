import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { CommonModule, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Flowbite } from 'src/app/guide/decorator/flowbite-decorator';
import { RouterModule } from '@angular/router';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';
@Component({
  selector: 'app-nav-bar-admin',
  standalone: true,
  imports: [RouterModule, NgFor, TitleCasePipe, NgIf],
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
@Flowbite()
export class NavBarAdminComponent implements AfterViewInit, OnInit {
  @ViewChild('menuDisplay') menuDisplayItem!: ElementRef<HTMLElement>;

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
  }

  get itemsKeys(): string[] {
    return Object.keys(this.items);
  }

  openMenuUser() {}

  constructor(
    private renderer2: Renderer2,
    private guideService: InfoSectionsService
  ) {}
  ngAfterViewInit(): void {}
}
