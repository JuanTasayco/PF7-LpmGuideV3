import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [NgFor, NgIf, JsonPipe, TitleCasePipe, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
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

  constructor(private guideService: InfoSectionsService) {}
}
