import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'PF7-LpmAppV3';
  constructor(private activatedRouter: ActivatedRoute) {}
  ngOnInit(): void {
    initFlowbite();
    this.activatedRouter.fragment.subscribe((frag) => {
      if (!frag) {
        scrollTo(0, 0);
      }
    });
  }
}
