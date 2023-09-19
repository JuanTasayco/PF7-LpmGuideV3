import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from '../../components/sections/sections.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SectionsComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent {
  constructor(private activatedRouter: ActivatedRoute) {}
}
