import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';

@Component({
  selector: 'app-part1',
  standalone: true,
  imports: [BannerSectionComponent],
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.scss'],
})
export class Part1Component {}
