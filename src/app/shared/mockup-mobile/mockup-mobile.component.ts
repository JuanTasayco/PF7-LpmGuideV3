import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mockup-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mockup-mobile.component.html',
  styleUrls: ['./mockup-mobile.component.scss'],
})
export class MockupMobileComponent implements OnInit {
  @Input('urlImgMockup') imgMockup: string = '';
  @Input('altImgName') altImgName: string = '';
  ngOnInit(): void {}
}
