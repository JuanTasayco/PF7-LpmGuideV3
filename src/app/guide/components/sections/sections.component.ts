import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Secciones } from '../../interfaces/sections.interfaces';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent {
  @Input() sections: Secciones[] = [];
}
