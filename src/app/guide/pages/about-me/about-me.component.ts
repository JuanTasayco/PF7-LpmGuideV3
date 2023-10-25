import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSectionsComponent } from '../../components/menu-sections/menu-sections.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MenuSectionsComponent, FooterComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  constructor(private activatedRouter: ActivatedRoute) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
