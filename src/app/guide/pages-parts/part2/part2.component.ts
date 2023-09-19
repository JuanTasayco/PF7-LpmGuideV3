import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';

@Component({
  selector: 'app-part2',
  standalone: true,
  imports: [BannerSectionComponent],
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.scss'],
})
export class Part2Component {}
