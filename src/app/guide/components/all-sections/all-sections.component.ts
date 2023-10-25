import { Component, OnInit, signal } from '@angular/core';
import { KeyValuePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Seccion } from '../../interfaces/sections.interfaces';
import { InfoSectionsService } from '../../services/info-sections.service';
import { Flowbite } from '../../decorator/flowbite-decorator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-sections',
  standalone: true,
  imports: [NgFor, NgIf, KeyValuePipe, TitleCasePipe, RouterModule],
  templateUrl: './all-sections.component.html',
  styleUrls: ['./all-sections.component.scss'],
})
@Flowbite()
export class AllSectionsComponent implements OnInit {
  questions = signal<Seccion[]>([]);
  sections!: { [key: string]: any[] };
  ngOnInit(): void {
    this.guideService.getAllSections().subscribe((info: Seccion[]) => {
      let sections: string[] = [...new Set(info.map((info) => info.seccion))];
      const objectSection: { [key: string]: any[] } = {};
      sections.forEach((element) => {
        objectSection[element] = [];
      });

      info.forEach((param) => {
        objectSection[param.seccion].push(param);
      });

      this.sections = objectSection;
      console.log(this.sections);
    });
  }
  constructor(private guideService: InfoSectionsService) {}
}
